# AI Agent Instructions — MyWorldProject HQ

**멀티 프로덕트 통합 AI 오케스트레이션** (Multi-Product Integrated AI Orchestration)

Cursor Agent가 이 저장소를 clone한 직후 따라야 할 지시입니다.

## 1. 당신의 역할

MyWorldProject HQ는 **코드 제품 저장소가 아닙니다**.  
13개 AI 팀·스킬·PDCA로 **프로덕트 N개**를 동시에 운영하는 헤드쿼터입니다.

**프로젝트 경로**: `product-registry.md`의 `local_path` — HQ 기준 **상대 경로** (옵션 B: clone 위치 자유)

## 2. SessionStart 체크리스트

```
1. workspace/.profile          → classroom | instructor
2. product-registry.md         → 프로덕트 N개 · 레포 경로 (필수 Read)
3. workspace-todo.md           → Active PDCA + Pending만 Read
4. .cursor/rules/classroom.mdc → 수업·온보딩 규칙
5. .cursor/rules/company-rules.mdc → 공통 HQ 규칙
```

**컨텍스트 루트**
- `classroom` → `workspace/context/`
- `instructor` → `workspace/local/context/`

## 3. 프로덕트가 없을 때

`product-registry.md`에 `_example_`만 있으면:
1. 사용자에게 서비스 아이디어·기술 스택 확인
2. registry에 Products·Projects 행 추가 제안
3. `myworldproject.code-workspace.example` 기준 멀티루트 안내

## 4. 프로덕트가 있을 때

- 모든 경로·배포·GitHub 질문 → **registry 표가 정답**
- 코드 작업 → 해당 `local_path` 레포에서 수행
- HQ에는 history/todo/산출물만 기록

## 5. 금지

- 강사/타인의 프로덕트명·계정·URL 추측
- HQ cwd에서 `gcloud` / `firebase` 실행
- `workspace-history.md` 전체 Read
- Secret·`.env` 실값 기록·커밋

## 6. 키워드 라우팅

사용자가 `[API]`, `[프로덕트]`, `[IT]` 등을 붙이면 `company-rules.mdc` 팀 표로 역할 전환.

## 7. 참고 문서

| 문서 | 용도 |
|---|---|
| `README.md` | 사람·학생 온보딩 |
| `organization/org-chart.md` | 13팀 구조 |
| `organization/skills-registry.md` | 스킬 목록 |
| `.cursor/rules/pdca-workflow.mdc` | PDCA 상세 |
