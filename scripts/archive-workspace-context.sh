#!/usr/bin/env bash
# workspace-history 30일 롤링 아카이브 + (선택) todo completed 정리
# SoT: company-rules.mdc § 토큰 절약
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CTX="$ROOT/workspace/context"
ARCHIVE="$CTX/archive"
DAYS="${ARCHIVE_HISTORY_DAYS:-30}"

mkdir -p "$ARCHIVE"

python3 - "$CTX" "$ARCHIVE" "$DAYS" <<'PY'
import sys
from pathlib import Path
from datetime import date, datetime, timedelta
import re

ctx, archive, days = Path(sys.argv[1]), Path(sys.argv[2]), int(sys.argv[3])
history = ctx / "workspace-history.md"
cutoff = date.today() - timedelta(days=days)

text = history.read_text(encoding="utf-8")
lines = text.splitlines(keepends=True)
preamble_end = 0
for i, line in enumerate(lines):
    if line.startswith("## 20"):
        preamble_end = i
        break
preamble = "".join(lines[:preamble_end]) if preamble_end else "# Workspace History\n\n"

sections, cur = [], None
for line in lines[preamble_end:]:
    m = re.match(r"^## (20\d\d-\d\d-\d\d)", line)
    if m:
        if cur:
            sections.append(cur)
        cur = {"date_str": m.group(1), "lines": [line]}
    elif cur is not None:
        cur["lines"].append(line)
if cur:
    sections.append(cur)

keep, by_month = [], {}
for s in sections:
    d = datetime.strptime(s["date_str"], "%Y-%m-%d").date()
    blob = "".join(s["lines"])
    if d >= cutoff:
        keep.append(blob)
    else:
        by_month.setdefault(s["date_str"][:7], []).append(blob)

for month, chunks in by_month.items():
    p = archive / f"history-{month}.md"
    hdr = f"# Workspace History Archive — {month}\n\n"
    body = "".join(chunks)
    if p.exists() and body not in p.read_text(encoding="utf-8"):
        p.write_text(p.read_text(encoding="utf-8") + body, encoding="utf-8")
    elif not p.exists():
        p.write_text(hdr + body, encoding="utf-8")

history.write_text(preamble + "".join(keep), encoding="utf-8")
print(f"history: kept {len(keep)} sections (>= {cutoff}), archived months {list(by_month.keys())}")
PY

echo "Done. archive: $ARCHIVE"
