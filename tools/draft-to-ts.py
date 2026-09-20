#!/usr/bin/env python3
"""Convert docs/drafts/<slug>.md into typed content for lib/seo/.

Usage:  python3 tools/draft-to-ts.py <slug> [slug ...]
        python3 tools/draft-to-ts.py --all

Region drafts (a slug that is already a /brain/ page, or has meshes) emit a
RegionCopy fragment on stdout; everything else emits a full ArticlePage module.

Why a one-off transcriber rather than a build-time importer: any node:fs read
inside lib/seo/ is one non-type import away from breaking the client bundle,
and generated TypeScript is type-checked by `next build`, costs nothing at
runtime, and shows up in a diff a human can review. Why not hand-transcribe:
the seven drafts carry 119 bold runs and 163 bullets between them.

ponytail: stdlib only, and the markdown subset is exactly what minimax-drafts.py
emits — no general-purpose parser, no gray-matter, no remark.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRAFTS = os.path.join(ROOT, "docs", "drafts")

# Sections the content model owns as typed fields rather than prose.
FAQ_HEADING = "frequently asked questions"
SOURCES_HEADING = "sources to verify"

# Bare internal paths the drafts write in prose; linkify them on the way in so
# they ship clickable. The article validator only checks links that exist, so
# it would never flag a path left as plain text.
KNOWN_PATHS = ("/3d-brain-model", "/browse")


def parse_frontmatter(text):
    """The subset minimax-drafts.py writes: flat `key: value` and `key: [a, b]`."""
    match = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not match:
        raise SystemExit("draft has no frontmatter")
    meta = {}
    for line in match.group(1).split("\n"):
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            meta[key.strip()] = [v.strip() for v in value[1:-1].split(",") if v.strip()]
        else:
            meta[key.strip()] = value.strip('"').strip("'")
    return meta, text[match.end():]


def inline(text):
    """Split a line into plain runs, {bold}, and {href,label} link objects."""
    # No italic primitive in the content model and no reason to add one: drop
    # the markers, keep the words.
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"\1", text)
    parts = []
    pattern = re.compile(r"\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)")
    cursor = 0
    for m in pattern.finditer(text):
        if m.start() > cursor:
            parts.append(text[cursor:m.start()])
        if m.group(1) is not None:
            parts.append({"bold": m.group(1)})
        else:
            parts.append({"href": m.group(3), "label": m.group(2)})
        cursor = m.end()
    if cursor < len(text):
        parts.append(text[cursor:])

    # Linkify the first bare mention of a known path in a plain run.
    for index, part in enumerate(parts):
        if not isinstance(part, str):
            continue
        for path in KNOWN_PATHS:
            if path in part and not any(
                isinstance(p, dict) and p.get("href") == path for p in parts
            ):
                before, _, after = part.partition(path)
                parts[index : index + 1] = [
                    p for p in (before, {"href": path, "label": path.strip("/").replace("-", " ")}, after) if p != ""
                ]
                break

    parts = [p for p in parts if p != ""]
    if len(parts) == 1 and isinstance(parts[0], str):
        return parts[0]
    return parts


def parse_body(body):
    """-> (answer, [ {heading, blocks, subsections} ], faqs, sources)"""
    answer_lines = []
    sections = []
    current = None
    sub = None
    faqs = []
    sources = []
    pending_list = []

    def flush_list(target):
        nonlocal pending_list
        if pending_list:
            target.append({"items": pending_list})
            pending_list = []

    def target_blocks():
        if current is None:
            return None
        return sub["body"] if sub else current["body"]

    mode = "intro"
    fenced = False
    for raw in body.split("\n"):
        line = raw.rstrip()

        # The generator occasionally wraps a trailing section in a code fence.
        # There is no code block in the content model, and the fence marker is
        # not content, so drop the markers and keep whatever is between them.
        if line.strip().startswith("```"):
            fenced = not fenced
            continue

        if line.startswith("## "):
            blocks = target_blocks()
            if blocks is not None:
                flush_list(blocks)
            heading = line[3:].strip()
            lowered = heading.lower()
            sub = None
            if lowered == FAQ_HEADING:
                mode, current = "faq", None
            elif lowered == SOURCES_HEADING:
                mode, current = "sources", None
            else:
                mode = "section"
                current = {"heading": heading, "body": [], "subsections": []}
                sections.append(current)
            continue

        if line.startswith("### "):
            heading = line[4:].strip()
            if mode == "faq":
                faqs.append({"question": heading, "answer": ""})
                sub = None
            elif current is not None:
                flush_list(target_blocks())
                sub = {"heading": heading, "body": []}
                current["subsections"].append(sub)
            continue

        if not line.strip():
            blocks = target_blocks()
            if blocks is not None:
                flush_list(blocks)
            continue

        if line.startswith("- "):
            item = line[2:].strip()
            if mode == "sources":
                sources.append(item)
            else:
                pending_list.append(inline(item))
            continue

        if mode == "intro":
            answer_lines.append(line.strip())
        elif mode == "faq" and faqs:
            faqs[-1]["answer"] = (faqs[-1]["answer"] + " " + line.strip()).strip()
        elif mode == "sources":
            sources.append(line.strip())
        else:
            blocks = target_blocks()
            if blocks is not None:
                flush_list(blocks)
                blocks.append(inline(line.strip()))

    blocks = target_blocks()
    if blocks is not None:
        flush_list(blocks)

    for section in sections:
        if not section["subsections"]:
            del section["subsections"]

    return " ".join(answer_lines), sections, faqs, sources


ANSWER_MAX_WORDS = 40


def trim_answer(text):
    """Keep whole sentences up to the 40-word cap the validators enforce.

    The drafts open with a 2-4 sentence paragraph. The first sentence or two is
    the actual answer; the rest is already repeated in "What is the X?".
    """
    kept, total = [], 0
    for sentence in re.split(r"(?<=[.!?])\s+", text.strip()):
        words = len(sentence.split())
        if kept and total + words > ANSWER_MAX_WORDS:
            break
        kept.append(sentence)
        total += words
    return " ".join(kept)


def ts(value, indent=2):
    """JSON is valid TS object syntax for this shape; just re-indent it."""
    dumped = json.dumps(value, indent=2, ensure_ascii=False)
    pad = " " * indent
    return dumped.replace("\n", "\n" + pad)


def emit_region(slug, meta, answer, sections, faqs, sources):
    """A standalone longform module, merged over the authored RegionCopy.

    Kept separate from the hand-written copy files on purpose: this file is
    regenerated whenever the draft changes, and the authored intro, FAQs and
    related links must survive that.
    """
    const = slug.upper().replace("-", "_") + "_LONGFORM"
    payload = {
        "answer": answer,
        "updated": meta.get("updated", TODAY),
        "sections": sections,
        "sources": sources,
    }
    return (
        f"// Generated from docs/drafts/{slug}.md by tools/draft-to-ts.py.\n"
        f"// Edit the draft and re-run; do not hand-edit this file.\n"
        f'import type {{ RegionLongform }} from "./types";\n\n'
        f"export const {const} = {ts(payload, 0)} as const satisfies RegionLongform;\n"
    )


def emit_article(slug, meta, answer, sections, faqs, sources):
    const = slug.upper().replace("-", "_") + "_ARTICLE"
    intro = [answer] + (
        [] if not sections else []
    )
    page = {
        "collection": meta.get("collection", "anatomy"),
        "slug": slug,
        "primaryKeyword": meta.get("primary_keyword", slug.replace("-", " ")).title(),
        "title": meta.get("title", ""),
        "description": meta.get("description", ""),
        "h1": meta.get("h1", meta.get("title", "")),
        "updated": meta.get("updated", TODAY),
        "intro": intro,
        "sections": sections,
        "faqs": faqs,
        "sources": sources,
        "related": [],
    }
    return (
        f"// Generated from docs/drafts/{slug}.md by tools/draft-to-ts.py — edit the draft, re-run.\n"
        f'import type {{ ArticlePage }} from "./types";\n\n'
        f"export const {const} = {ts(page, 0)} as const satisfies ArticlePage;\n"
    )


TODAY = __import__("datetime").date.today().isoformat()


def convert(slug, as_region):
    path = os.path.join(DRAFTS, f"{slug}.md")
    text = open(path, encoding="utf-8").read()
    if not text.strip():
        raise SystemExit(f"{slug}.md is empty — regenerate it with tools/minimax-drafts.py")
    meta, body = parse_frontmatter(text)
    answer, sections, faqs, sources = parse_body(body)
    answer = trim_answer(answer)

    emit = emit_region if as_region else emit_article
    return emit(slug, meta, answer, sections, faqs, sources)


def main(argv):
    as_region = "--region" in argv
    slugs = [a for a in argv if not a.startswith("--")]
    if "--all" in argv:
        slugs = sorted(
            f[:-3] for f in os.listdir(DRAFTS)
            if f.endswith(".md") and os.path.getsize(os.path.join(DRAFTS, f)) > 0
        )
    if not slugs:
        raise SystemExit(__doc__)
    for slug in slugs:
        sys.stdout.write(convert(slug, as_region))


if __name__ == "__main__":
    main(sys.argv[1:])
