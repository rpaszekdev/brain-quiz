#!/usr/bin/env python3
"""Semrush keyword research via Apify. Usage: APIFY_TOKEN=... python3 kw.py "noclegi rewal" "apartamenty rewal" """
import json, os, sys, urllib.request

ACTOR = "pro100chok~semrush-scraper"
TOKEN = os.environ["APIFY_TOKEN"]  # Apify → Settings → API & Integrations
DB = os.environ.get("KW_DB", "pl")

seeds = sys.argv[1:]
if not seeds:
    sys.exit("give me at least one keyword")

# ponytail: maxTotalChargeUsd is Apify's own spend cap — beats any guard I could write here.
# run-sync-* drops the connection at 300s hard, so keep seeds few (they expand for free anyway).
req = urllib.request.Request(
    f"https://api.apify.com/v2/actors/{ACTOR}/run-sync-get-dataset-items"
    f"?token={TOKEN}&maxTotalChargeUsd={os.environ.get('KW_BUDGET', '1')}",
    # concurrency tracks seed count: run-sync dies at 300s and a timed-out run still bills
    data=json.dumps({"mode": "keyword", "keywords": seeds, "database": DB,
                     "concurrency": min(len(seeds), 10)}).encode(),
    headers={"Content-Type": "application/json"},
)
rows = json.load(urllib.request.urlopen(req, timeout=300))
json.dump(rows, open("kw.json", "w"), ensure_ascii=False, indent=2)

print(f"{'keyword':<38}{DB:>7}{'world':>8}{'cpc':>7}{'KD':>5}  top countries")
for r in rows:
    by_country = r.get("volume_by_country") or []
    world = sum(c.get("volume") or 0 for c in by_country)
    top = " ".join(f"{c['country']}:{c['volume']}" for c in by_country[:3] if c.get("volume"))
    print(f"{r.get('keyword',''):<38}{r.get('volume') or 0:>7}{world:>8}{r.get('cpc_usd') or 0:>7.2f}"
          f"{r.get('keyword_difficulty') or 0:>5}  {top}")

ideas = {i["keyword"]: i for r in rows for i in (r.get("related_keywords") or []) + (r.get("questions") or [])}
print(f"\n--- {len(ideas)} ideas (free, came with the seeds) → kw.json ---")
for i in sorted(ideas.values(), key=lambda x: -(x.get("volume") or 0))[:40]:
    print(f"{i['keyword']:<44}{i.get('volume') or 0:>8}  KD {i.get('keyword_difficulty') or 0}")
