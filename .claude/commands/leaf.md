---
description: Process LeafMarker UI tasks queued by the browser extension
---

You are the dispatcher for the `/leaf` command. The user is interacting with a LeafMarker-connected project: they annotate elements in their browser, the extension writes those annotations as tasks into `.leafmarker/leafmarker-tasks-detail.json`, and you process them.

**Architecture in one paragraph:** the JSON file is the single source of truth. A bundled CLI at `.leafmarker/lm.js` is the only sanctioned way to read/write task state — it does atomic writes, merges fields you don't touch, and verifies every transition by re-reading. Never edit the JSON file directly with file tools. Always shell out to the CLI. This dramatically reduces context, removes a whole class of "wrong row updated" bugs, and is faster.

## Step 1 — Check the CLI is present

Before anything else, confirm `.leafmarker/lm.js` exists. If it doesn't:

- The user's project was connected before the CLI shipped, or the connection was deployed by an older extension version.
- Tell the user: "Your `.leafmarker/lm.js` is missing. Right-click the LeafMarker popup or use the popup's settings to reinstall the integration, then re-run `/leaf`."
- Stop. Do not attempt direct JSON edits as a fallback.

## Step 2 — Parse the user's intent

Look at the words after `/leaf` in the user's message. Dispatch to the right branch below. If it's ambiguous, do the default (process). If the user typed only `/leaf`, also do the default.

| User input | Branch |
|---|---|
| `/leaf` (alone), `process`, `run`, `go`, `yolo`, `auto`, `no prompts`, `execute` | **Process** in **yolo** mode (default — work through every queued task back-to-back, no prompts) |
| `step`, `step leaf`, `one at a time`, `walk me through` | Process in **step** mode (approve each task) |
| `batch`, `batch leaf`, `group these` | Process in **batch** mode (group related, approve per-group) |
| `list`, `tasks`, `give me ...`, `what's queued` | **List** (text-only summary) |
| `list --with-images`, `list with screenshots`, `show me with images` | **List with images** (text + inline PNGs, Claude Code only) |
| `show <id>`, `tell me about <id>`, `inspect <id>` | **Show** (single task with its screenshot) |
| `current`, `what am i on`, `what's doing` | **Current** (single row) |
| `next`, `what's next` | **Next** (peek upcoming) |
| `clear ...`, `delete ...`, `nuke ...`, `cleanup` | **Clear** (with confirmation) |
| `help`, `commands`, `what can you do` | **Help** (print this dispatcher's surface to the user) |

## NON-NEGOTIABLE: Task completion discipline (applies to Process branches)

These rules override every other instruction in this file. Read them once, never violate them.

1. **Every status change goes through the CLI.** `node .leafmarker/lm.js start <id>` to begin work, `done <id>` when the change is applied, `fail <id> "<reason>"` when it can't be done. Never write to the JSON yourself.

2. **Track the exact `id` you're working on.** Get it once from `lm next` or `lm current`, hold it in working memory for the whole task. If you lose it, run `lm current` to recover — never operate by index, position, or "the one I just did."

3. **Mark `done` (or `fail`) the instant the work is complete — no exceptions.** The moment you finish the implementation, your *very next action* is to run `lm done <id>` (or `lm fail <id> <reason>`). Do not check anything, do not start another task, do not summarize, do not respond to the user, until that CLI call has returned successfully.

4. **One task's context at a time — strictly.** Do not preload other tasks' comments or screenshots. The right loop is:
   - `lm current` → must return `null` (the single-`doing` invariant; see rule 5).
   - `lm next` → JSON of one task.
   - Read its `comment`, open its single screenshot at `.leafmarker/screenshots/{id}.png`, read whatever source files this task needs.
   - Apply the change.
   - `lm done <id>` (verifies the write).
   - Then — and only then — `lm current` again to confirm null, then `lm next`.

5. **Single-`doing` invariant.** **At most one task may be in `doing` at any moment.** Before EVERY call to `lm next` — at the start of `/leaf` AND between every iteration of the loop — run `lm current` first. If it returns a task (not null):
   - **Work already finished on disk** (the requested change is applied and saved): call `lm done <id>` to update the status.
   - **Work incomplete:** finish it now, then `lm done <id>`. Or, if it genuinely can't be completed: `lm fail <id> "<reason>"`.

   Only once `lm current` returns `null` may you call `lm next`. This rule has no exceptions and no shortcuts. The invariant exists because two simultaneous `doing` rows confuse the popup, mislead the user about progress, and risk losing the wrong task's status if you get distracted.

6. **Never close a session with anything in `doing`.** Before you stop, `lm current` must return null. If it doesn't, decide `done` or `fail` first.

## Process branch (the default)

```
1. Run `node .leafmarker/lm.js current` — **mandatory before every iteration.**
   - If it returns a task → resolve it before going further:
     • Work already finished on disk: `lm done <id>`.
     • Work incomplete: finish it, then `lm done <id>` (or `lm fail <id> <reason>`).
   - If it returns `null` → invariant satisfied; proceed to step 2.
2. Run `node .leafmarker/lm.js next`
   - If `null` → go to Loop termination check.
   - Otherwise: this is your task. Note the id.
3. Run `node .leafmarker/lm.js start <id>`
   - This atomically marks 'to do' → 'doing' and verifies.
4. Read `.leafmarker/screenshots/<id>.png` if it exists, plus the source file(s) you need.
5. Apply the change. Be specific and minimal — don't refactor surrounding code.
6. Mode-specific confirmation:
   - yolo (default): skip the confirmation. Apply, then `lm done <id>` immediately. If the task can't be done, `lm fail <id> <reason>` and continue.
   - step (opt-in): show the user the diff or summary, ask for approval before mark-done.
     - On approval → `node .leafmarker/lm.js done <id>`.
     - On rejection → `node .leafmarker/lm.js fail <id> "<user's reason>"`.
   - batch: group related tasks (same selector / same component), apply the group, confirm per-group, then run `lm done` for each id in turn (one CLI call per id, never batched in your head).
7. Loop back to **step 1** (the `lm current` check). The single-`doing` invariant must hold at every iteration boundary, not just at startup.
```

## Loop termination — when to stop executing

`/leaf` does not exit when `lm next` first returns null. New tasks may arrive while you were processing the snapshot.

- When `lm next` returns null, **wait ~3 seconds** (a small pause to let any in-flight extension write land), then call `lm next` again.
- If the second call also returns null → you're done. Print the final report (see below) and exit.
- If the second call returns a task → loop back into the Process branch.

**Hard cap circuit breaker:** if you have processed 50 tasks total in a single `/leaf` run, or executed 30 processing cycles (a cycle = one trip through Process branch + null check), stop and report. The hard cap protects against a queue bug where rows resurface after being marked done.

**Final report on exit:**

```
Executed N tasks across K cycles:
  ✓ done: <count>
  ✗ failed: <count>
Queue now: <to do>=N1, <doing>=N2 (should be 0).
```

If you hit the hard cap, say so explicitly.

## List branch

Listing the queue means loading every selected task's full comment, status, and metadata into your context. For a 50-task queue that's a few thousand tokens — not ruinous, but not free either. Be honest about that with the user before you do it.

**Step 1 — cheap probe + confirmation.** Run `node .leafmarker/lm.js count` first. This returns just totals and per-status counts (tiny output, no task bodies). Then tell the user something like:

> Heads up: there are **N tasks** in the queue (X `to do`, Y `doing`, Z `done`, W `failed`). Loading the full list will pull every comment and metadata field into my context — roughly N×80–150 tokens depending on how long your comments are. Want me to load them? (yes / no)

Adapt the wording to fit naturally — don't be robotic. The point is: tell the user what's about to happen and let them say no.

If the user added a filter (`list todo`, `list done`, etc.), call `lm count` first anyway and report only the relevant bucket: "There are X `to do` tasks. Load them? (yes / no)" — the count is free either way.

**Step 2 — only on `yes`, run the actual load.** `node .leafmarker/lm.js list [filter]` where filter is `to do`, `doing`, `done`, or `failed` if the user asked for a specific status (otherwise omit it).

**Default = text only.** Format the JSON as a readable table for the chat. Show: id, status, title, **the full comment as written by the user** (no truncation — users typed it for a reason and the popup already shows truncated previews), pageUrl. Don't dump the raw JSON unless the user asks for it. Do **not** load screenshots — the user is just glancing at the list.

**Skip the confirmation when the queue is tiny.** If `lm count` returns total ≤ 3 (or filtered count ≤ 3), just go ahead and load — the context cost is negligible and the confirmation prompt would be more friction than the data.

**Opt-in: `--with-images`.** If the user explicitly asked for images (`list --with-images`, "with screenshots", "show me visually"), append a markdown image embed for each task using the `screenshotPath` field returned by `lm list`:

```markdown
![task-abc123](.leafmarker/screenshots/task-abc123.png)
```

**CRITICAL: do NOT use the Read tool for these screenshots.** Read loads the image bytes into your context, which is wasteful when the user only wants to *see* the image, not have you analyse it. A markdown image embed in your chat output costs zero context; the chat UI renders the file directly from disk. Only reach for Read if the user explicitly asks you to describe / analyse / look at a specific screenshot.

The `screenshotPath` field is project-root-relative — drop it straight into the markdown without modification.

Caveat to surface: markdown image embeds only render in chat UIs that display PNGs inline (Claude Code, claude.ai web). Plain-terminal tools (some Codex CLI setups) will show the path as text. If you can detect you're in a non-rendering env, tell the user briefly. If unsure, just emit the markdown — the path is still useful as text fallback.

## Show branch

Run `node .leafmarker/lm.js get <id>`. Print the full record readably: id, status, title, comment, selector, pageUrl, timestamps. Then emit a markdown image embed for the screenshot:

```markdown
![<id>](.leafmarker/screenshots/<id>.png)
```

Same rule as above: **markdown embed, not Read**. Single image, single task, ideal for "what was that bug again?" If the user follows up with "look at the screenshot and tell me what's wrong," *then* use Read.

## Current branch

Run `node .leafmarker/lm.js current`. Print the single task readably: id, title, comment, pageUrl, when it was started (`updatedAt`).

## Next branch

Run `node .leafmarker/lm.js next`. Print readably (same fields as current). Make clear it's a peek — you have not started it.

## Clear branch

This is destructive. Always confirm before deleting.

1. Run a dry-run to count what would be cleared:
   ```
   node .leafmarker/lm.js clear <set> --dry-run
   ```
   `<set>` is one of:
   - `done` — only completed tasks (default if user said "clear" with no qualifier or "clear done" / "clear completed")
   - `failed` — only failed tasks ("clear failed" / "clear errors")
   - `done-and-failed` — both ("clear finished" / "clear done and failed")
   - `all` — everything except `doing` ("clear all" / "nuke everything"). For this set, ask the user **twice** before proceeding.

2. Show the user the count and the first ~5 ids that would be removed. Ask "Proceed? (yes / no)".

3. On `yes`, run the same command **without** `--dry-run`:
   ```
   node .leafmarker/lm.js clear <set>
   ```

4. Report the JSON output readably: cleared count, screenshots deleted, remaining queue breakdown.

The CLI never wipes `doing` rows even with `--all` — that's a hard-coded safety. Do not try to bypass it.

## Help branch

Print this surface to the user:

```
/leaf                    execute every queued task back-to-back (default = yolo, no prompts)
/leaf step               process one task at a time, approve each
/leaf batch              group related tasks, approve per-group
/leaf list [status]      show the queue (text only), optionally filtered
/leaf list --with-images show the queue and render each screenshot inline (Claude Code)
/leaf show <id>          full record + screenshot for one task
/leaf current            what's in progress
/leaf next               peek at the next 'to do'
/leaf clear done         remove finished tasks (asks to confirm)
/leaf clear failed       remove failed tasks
/leaf clear all          nuke everything except 'doing' (double confirm)
/leaf help               this list

Modes:
  yolo  — default. Apply changes without prompting; failures get `lm fail` + a reason and execution continues.
  step  — approve each task before marking done. Use when you want to eyeball every change.
  batch — group related tasks (same selector / component) and apply per-group with one approval.
```

## Reference

The full workflow rules — including dependency detection, screenshot validation, and framework adaptation — are in `.leafmarker/leafmarker-workflow.mdc`. Read it once at the start of a session if you haven't.
