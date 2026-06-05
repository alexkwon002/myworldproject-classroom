#!/usr/bin/env bash
# MyWorldProject HQ — 강사(개인 운영) 오버레이
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> MyWorldProject setup:instructor"

echo "instructor" > workspace/.profile

mkdir -p workspace/local/context/archive workspace/local/outputs workspace/local/agents workspace/local/scripts

if [ ! -f .cursor/rules/instructor.local.mdc ]; then
  if [ -f .cursor/rules/instructor.local.mdc.example ]; then
    cp .cursor/rules/instructor.local.mdc.example .cursor/rules/instructor.local.mdc
    echo "  created .cursor/rules/instructor.local.mdc (example에서 복사 — 내용 수정 필요)"
  else
    echo "  WARN: instructor.local.mdc.example 없음"
  fi
fi

# local context 없으면 templates로 시드
if [ ! -f workspace/local/context/product-registry.md ]; then
  cp workspace/templates/product-registry.md workspace/local/context/
  cp workspace/templates/github-registry.md workspace/local/context/
  cp workspace/templates/env-secrets-registry.md workspace/local/context/
  cp workspace/templates/workspace-todo.md workspace/local/context/
  cp workspace/templates/workspace-history.md workspace/local/context/
  echo "  seeded workspace/local/context/ from templates"
fi

if [ ! -f myworldproject.code-workspace ] && [ -f workspace/local/myworldproject.code-workspace ]; then
  cp workspace/local/myworldproject.code-workspace myworldproject.code-workspace
  echo "  restored myworldproject.code-workspace from workspace/local/"
fi

cat > workspace/context/workspace-state.json <<EOF
{
  "profile": "instructor",
  "hq_version": "2.0",
  "notes": "instructor 모드 — context는 workspace/local/context/ 우선"
}
EOF

echo ""
echo "✓ setup:instructor 완료"
echo "  - context: workspace/local/context/"
echo "  - rules: .cursor/rules/instructor.local.mdc"
echo "  - workspace: myworldproject.code-workspace (gitignore)"
