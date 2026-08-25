# brain-quiz — measured search volume (US)

Pulled 2026-08-25 with [`tools/kw.py`](../../tools/kw.py) → Semrush via the Apify actor
`pro100chok/semrush-scraper` (keyword mode). **26 seeds, ~$0.39 spent.**

Supplies volume for the candidates in [`keywords-round-2.txt`](keywords-round-2.txt) and
[`keywords-to-research.md`](keywords-to-research.md). Raw JSON: `kw-brain.json`,
`kw-brain-2.json`, `kw-brain-quiz.json` (~700 keyword ideas between them).

Columns: US volume/month, KD (0–100 difficulty, lower = easier).

---

## The headline

**~80,000/mo reachable, much of it under KD 30.** One topic dominates: **cranial nerves**
is ~40,000/mo on its own, mostly uncontested. Build it completely before touching anything
else.

For comparison, the sibling BedAndMarket project is ~21,600/mo at higher difficulty
against funded competitors. Same effort, four times the reach here.

---

## Priority order

| Cluster | Vol/mo | KD | Note |
|---|---|---|---|
| Cranial nerve mnemonics | ~38,000 | 8–30 | Start here. Nothing is close. |
| Sympathetic vs parasympathetic | ~17,000 | 31–43 | **One page**, all permutations |
| Labeled brain diagrams | ~25,000 | 10–58 | Word order swings KD wildly |
| Broca's / Wernicke's | ~6,000 | 19–25 | Fix the apostrophes first |
| Quiz keywords | ~5,000 | 7–41 | Your product. Absurdly uncontested. |
| "what part of the brain controls X" | 4,400+ | 58 | Real but competitive |
| 3D brain model | ~2,300 | 25–36 | Users' words, not "teaching resources" |
| Damage / symptoms | ~1,500 | 25–39 | Easy filler |

---

## Clusters

### Cranial nerve mnemonics — ~38,000/mo, KD 8–30 — the whole business
```
12 cranial nerves                 9,900   KD 71   ← the hard head term, skip
cranial nerve mnemonic            9,900   KD 25   ← same volume, a third the difficulty
cranial nerves mnemonic           9,900   KD 29
mnemonics for the cranial nerves  6,600   KD 19
mnemonic for cranial nerves       2,900   KD 23
cranial nerve 12                  2,400   KD 22
12 cranial nerves and functions   1,300   KD 39
12 cranial nerves mnemonic        1,300   KD 30
mnemonics for cranial nerves      1,000   KD 11
cranial nerve mnemonics             720   KD  8
mnemonic device for cranial nerves  720   KD 17
```
**The "dirty" variants total ~5,200/mo** (`cranial nerves mnemonic dirty` 1,300,
`mnemonic device for cranial nerves dirty` 1,600, plus more). Med students want the rude
version. That's a brand-voice decision, not a keyword one — but the demand is unambiguous.

### Sympathetic vs parasympathetic — ~17,000/mo, KD 31–43 — ONE page
```
parasympathetic nervous system vs sympathetic       5,400   KD 33   ← reversed order wins
sympathetic vs parasympathetic nervous system       3,600   KD 38   commercial intent
sympathetic nervous system vs parasympathetic ns    2,400   KD 32
parasympathetic nervous system vs sympathetic ns    1,900   KD 31
parasympathetic vs sympathetic nervous system       1,900   KD 40
sympathetic vs parasympathetic nervous systems      1,300   KD 43
```
Google reads all six as the same intent — do not build six pages. Tagged *commercial*,
unusual for anatomy, meaning it sees people buying study products behind it.

### Labeled brain diagrams — ~25,000/mo, KD 10–58 — word order is everything
```
brain diagram labeled             6,600   KD 38
diagram labeled brain             6,600   KD 47
labeled brain diagram             1,900   KD 29
brain labeled diagram             1,900   KD 54   ← same 3 words, 25 points harder
diagram of brain with label       1,300   KD 10   ← nearly free
labeled diagram of a brain        1,300   KD 22
labeling brain diagram            1,300   KD 31
labelled brain diagram            1,300   KD 58   ← British spelling, own volume
parts of the brain quiz             720   KD 30
brain labeling quiz                 720   KD 29
sheep brain labeled diagram         320   KD 14   ← dissection labs = teachers
```

### Quiz — ~5,000/mo, KD 7–41 — your product, and nobody is defending it
```
cranial nerves quiz          1,300   KD 11
brain quiz                   1,300   KD 41   ← contested by brain-training/personality
cranial nerve quiz           1,000   KD 13
brain anatomy quiz           1,000   KD 32
parts of the brain quiz        720   KD 30
brain labeling quiz            720   KD 29
brain regions quiz             590   KD 27
nervous system quiz            390   KD 13
left or right brain quiz       320   KD 11
cranial nerves labeling quiz   260   KD 11
neuroanatomy quiz              170   KD  7   ← lowest KD found
```
Domain is `brainquiz.study`. `brain quiz` at KD 41 is contested by brain-training games
and personality quizzes, not anatomy — win the KD 7–13 specific quizzes and the domain
lifts anyway.

### Broca's / Wernicke's — ~6,000/mo — the apostrophe costs 2,850/mo on one line
```
brocas area vs wernickes area        50   KD 19   ← as listed in keywords-round-2.txt
broca's area vs wernicke's area   2,900   KD 20   ← what people actually type
wernicke's area vs broca's area   2,900   KD 23
wernicke vs broca's area          1,600   KD 20
broca vs wernicke's area            590   KD 25
broca's vs wernicke's area          480   KD 20
```
**Audit every possessive in the 84-item list** — `brocas`, `wernickes`, `willis`.

### 3D brain model — ~2,300/mo — users' words, not yours
```
3d brain model               1,300   KD 36
brain 3d model               1,000   KD 25
────────────────────────────────────────────
brain diagram for powerpoint         0
neuroanatomy teaching resources      0
free interactive brain model for teaching  0
```
Teachers don't self-identify as teachers in the search box. They search for the object.

### Damage / symptoms — ~1,500/mo, KD 25–39
```
frontal lobe damage symptoms          720   KD 39
what happens if the amygdala is damaged 260  KD 25
what happens if the hippocampus is damaged 210 KD 44
temporal lobe damage symptoms         170   KD 29
left temporal lobe damage symptoms    140   KD 33
```

### Function lookups
```
what part of the brain controls memory  4,400   KD 58
lobes of the brain and their functions  1,000   KD 50
4 lobes of the brain and their functions  590   KD 59
```
Real volume, harder. The other 19 "what part of the brain controls X" from the list were
not individually tested.

---

## Dead / traps

- **`limbic system structures and functions`** — 30/mo. Low value.
- **`hippocampus vs amygdala`** — KD **88** at only 320/mo. Don't fight it head-on; its
  long tail (`amygdala vs hippocampus function`/`location`/`mri`) is KD 0 at 20/mo each.
  Note `amygdala vs hippocampus` is KD 75 — 13 points easier for the identical question.
- **`how to calculate occupancy rate`-style contamination:** `how to memorize brain anatomy`
  is 20/mo while `cranial nerve mnemonic` is 9,900. Nobody searches the general study
  problem; everybody searches the specific thing they're stuck on. Several general-form
  entries in the 84 will return near zero for this reason.
- **`brain rot quiz`** 1,600 KD 19 and `italian brain rot quiz` 480 KD 18 — meme traffic,
  zero relation to neuroanatomy. With a domain called brainquiz.study you may catch some
  by accident; traffic that bounces instantly teaches Google the wrong thing about the site.
- **The mnemonic pattern does NOT generalize.** `cranial nerve mnemonic` 9,900 ·
  `circle of willis mnemonic` 210 · `meninges mnemonic` 20. Cranial nerves is an outlier,
  not a repeatable template.

---

## Untested from your 84

Most individual entries were never seeded — the runs used 26 cluster representatives.
Still unmeasured: 19 of the 20 `what part of the brain controls X` variants, the
`which lobe controls X` family, most `what happens if X is damaged` entries,
`grey matter vs white matter`, `afferent vs efferent`, `upper vs lower motor neuron`,
`cns vs pns`, the circle-of-willis anatomy terms, `ventricles of the brain`,
`meninges layers`, `blood brain barrier function`, and the study-method group
(`neuroanatomy study guide`, `brain anatomy flashcards`, `brain anatomy practice test`).

Seed them 6–10 at a time, spread across vocabularies. See the method rules in the
sibling file: `BedAndMarket/docs/seo/KEYWORDS-VOLUME.md`.
