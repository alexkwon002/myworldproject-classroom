# AI Agent Instructions — MyWorldProject Classroom

**멀티 프로덕트 통합 AI 오케스트레이션** (Multi-Product Integrated AI Orchestration)

Cursor Agent가 이 저장소를 clone한 직후 따라야 할 지시입니다.

## 1. 당신의 역할

MyWorldProject Classroom은 **학생이 AI 바이브 코딩으로 프로덕트 N개를 운영하는 HQ 템플릿**입니다.  
제품 소스코드는 이 repo가 아니라, `workspace/context/product-registry.md`에 등록된 각 프로덕트 레포에 둡니다.

**프로젝트 경로**: `product-registry.md`의 `local_path` — HQ 기준 **상대 경로** (clone 위치 자유, 절대경로 금지)

## 2. SessionStart 체크리스트

```
1. workspace/context/product-registry.md  → 프로덕트 N개 · 레포 경로 (필수 Read)
2. workspace/context/workspace-state.json → active_product_id 확인
3. workspace/context/workspace-todo.md    → Active PDCA + Pending만 Read
4. .cursor/rules/classroom.mdc            → 수업·온보딩 규칙
5. .cursor/rules/company-rules.mdc        → 공통 HQ 규칙
```

## 3. 프로덕트가 없을 때

`product-registry.md`에 `_example_`만 있으면:
1. 사용자에게 서비스 아이디어·기술 스택 확인
2. 원하는 프로젝트 폴더를 먼저 만들거나 clone하도록 안내
3. Agent가 registry와 `myworldproject.code-workspace`를 대신 업데이트

## 4. 프로덕트가 있을 때

- 모든 경로·배포·GitHub 질문 → **registry 표가 정답**
- 코드 작업 → 해당 `local_path` 레포에서 수행
- HQ에는 rules, skills, registry, todo, history, outputs만 기록

## 5. 금지

- 강사/타인의 프로덕트명·계정·URL 추측
- HQ cwd에서 제품별 `gcloud` / `firebase` / 배포 CLI 실행
- `workspace-history.md` 전체 Read
- Secret·`.env` 실값 기록·커밋
- registry에 절대경로 기록

## 6. 키워드 라우팅

사용자가 `[API]`, `[Web]`, `[IT]`, `[프로덕트]` 등을 붙이면 `company-rules.mdc` 팀 표로 역할 전환.

## 7. 참고 문서

| 문서 | 용도 |
|---|---|
| `README.md` | 학생 온보딩 |
| `CLASSROOM_CHECKLIST.md` | 첫 수업 1페이지 체크리스트 |
| `organization/org-chart.md` | 13팀 구조 |
| `organization/skills-registry.md` | 스킬 목록 |
| `.cursor/rules/pdca-workflow.mdc` | PDCA 상세 |
