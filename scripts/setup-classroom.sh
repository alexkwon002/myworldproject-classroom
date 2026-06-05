#!/usr/bin/env bash
# MyWorldProject HQ — 학생·첫 clone 온보딩
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> MyWorldProject setup:classroom"

# 1. Profile
echo "classroom" > workspace/.profile

# 2. Classroom local cleanup (개인 산출물·이력 제거)
rm -rf outputs 2>/dev/null || true
mkdir -p outputs
mkdir -p workspace/context/archive
rm -f workspace/context/archive/history-*.md workspace/context/archive/workspace-todo-completed.md 2>/dev/null || true

# 3. Context from templates (항상 덮어쓰기)
cp -f workspace/templates/product-registry.md workspace/context/product-registry.md
cp -f workspace/templates/workspace-history.md workspace/context/workspace-history.md
cp -f workspace/templates/workspace-todo.md workspace/context/workspace-todo.md
cp -f workspace/templates/github-registry.md workspace/context/github-registry.md
cp -f workspace/templates/env-secrets-registry.md workspace/context/env-secrets-registry.md

cat > workspace/context/archive/README.md <<'EOF'
# Archive

완료된 TODO·30일 초과 history를 월별로 보관합니다.
EOF

# 4. outputs 팀 폴더 (README만)
TEAMS=(product design qa it marketing ad-sales business-development data operations customer-service finance ir-pr-legal hr)
for t in "${TEAMS[@]}"; do
  mkdir -p "outputs/$t"
  cat > "outputs/$t/README.md" <<EOF
# ${t} outputs

팀 산출물 저장 폴더 (로컬 전용). GitHub에는 README만 포함됩니다.
EOF
done

# 5. Workspace state
DATE="$(date +%Y-%m-%d)"
cat > workspace/context/workspace-state.json <<EOF
{
  "profile": "classroom",
  "hq_version": "2.0",
  "products_registered": 0,
  "active_product_id": null,
  "last_setup": "${DATE}",
  "notes": "product-registry.md에 프로덕트를 등록하고 active_product_id를 설정하세요"
}
EOF

# 6. Code workspace (없으면 example 복사)
if [ ! -f myworldproject.code-workspace ]; then
  cp myworldproject.code-workspace.example myworldproject.code-workspace 2>/dev/null || true
fi

echo ""
echo "✓ setup:classroom 완료"
echo ""
echo "다음 단계:"
echo "  1. workspace/context/product-registry.md — 프로덕트·프로젝트 등록"
echo "  2. 프로덕트 레포 clone (local_path는 HQ 기준 상대경로)"
echo "  3. myworldproject.code-workspace 에 폴더 추가 후 Cursor에서 열기"
echo "  4. workspace/context/workspace-state.json — active_product_id 설정"
echo ""
echo "Agent: AGENTS.md · .cursor/rules/classroom.mdc"
