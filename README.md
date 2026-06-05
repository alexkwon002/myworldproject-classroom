# MyWorldProject Classroom

**멀티 프로덕트 통합 AI 오케스트레이션**  
*Multi-Product Integrated AI Orchestration*

AI 바이브 코딩 수업을 위한 Classroom HQ 템플릿입니다. 학생은 이 repo를 clone한 뒤 **프로덕트 N개**를 등록하고, Cursor Agent와 함께 PRD, 디자인, API, 웹/앱, 보안, 배포 흐름을 만들어 갑니다.

제품 소스코드는 이 repo가 아니라, 각자 등록한 **프로덕트 레포**에 둡니다.

---

## 첫 수업 체크리스트

첫 수업에서는 [CLASSROOM_CHECKLIST.md](./CLASSROOM_CHECKLIST.md)를 따라 진행하세요.  
목표는 clone 직후 `setup:classroom` 실행, 프로덕트 1개 등록, Cursor 멀티루트 연결, Agent 첫 요청까지 완료하는 것입니다.

---

## 이 repo에 있는 것 / 없는 것

| 포함 | 로컬에서 생성되는 것 |
|---|---|
| 13팀 조직 구조 | `myworldproject.code-workspace` |
| Agent 지시 (`AGENTS.md`, `.cursor/rules/`) | 학생 개인 산출물 (`outputs/**` README 제외) |
| 실행 스킬 (`.cursor/skills/`) | `workspace/.profile` |
| 프로덕트 등록 템플릿 | 각자 만든 프로덕트 레포 |
| `workspace/context/` 빈 상태 파일 | `.env.*` 실파일 |

---

## 빠른 시작

```bash
git clone https://github.com/alexkwon002/myworldproject-classroom.git
cd myworldproject-classroom
npm run setup:classroom
```

Cursor에서 `myworldproject.code-workspace`를 엽니다.

---

## AI 바이브 코딩 방식으로 프로젝트 등록

학생이 직접 `product-registry.md`나 `myworldproject.code-workspace`를 오래 편집하지 않습니다.  
원하는 위치에 프로젝트 폴더를 만들고 Agent에게 등록을 요청합니다.

```bash
mkdir -p ../class-projects/student-shop-app
```

Agent 요청:

```text
[IT] 새 프로덕트 shop-app을 등록해줘.
프로젝트 폴더는 ../class-projects/student-shop-app이고, 역할은 web, 기술스택은 Next.js, 포트는 3000으로 해줘.
워크스페이스에도 추가하고 active_product_id도 shop-app으로 설정해줘.
```

Agent가 처리할 일:

- `workspace/context/product-registry.md`에 프로덕트·프로젝트 등록
- `workspace/context/github-registry.md`에 GitHub 정보가 있으면 등록
- `myworldproject.code-workspace`에 폴더 추가
- `workspace/context/workspace-state.json`의 `active_product_id` 설정
- 절대경로가 아니라 HQ 기준 상대경로로 변환

---

## Agent 요청 키워드

| 키워드 | 역할 |
|---|---|
| `[프로덕트]` | PRD, MVP 범위, 로드맵 |
| `[디자인]` | 화면 IA, UX/UI, 디자인 시스템 |
| `[QA]` | 테스트, 릴리스 체크리스트 |
| `[IT]` | GitHub, 워크스페이스, DevOps |
| `[Web]` | 프론트엔드, 랜딩, 웹 UI |
| `[API]` | 백엔드, DB, 인증, 서버 로직 |
| `[Flutter]` / `[Mobile]` | 모바일 앱 |
| `[Security]` | Secret, 인증/인가, 취약점 점검 |
| `[마케팅]` | 콘텐츠, SEO, ASO |
| `[데이터]` | KPI, 퍼널, 실험 분석 |

예시:

```text
[프로덕트] active_product_id 기준으로 서비스 PRD 초안 작성해줘.
[Web] active_product_id 기준으로 첫 랜딩 페이지 IA를 설계해줘.
[API] 로그인 API와 사용자 테이블 초안을 설계해줘.
[Security] 현재 프로젝트의 env/secret 노출 위험을 점검해줘.
```

---

## Rules를 AI와 함께 만들고 개선하기

Rules는 Agent의 지속적인 행동 규칙입니다. 수업 중 팀의 개발 원칙, 파일 경로 규칙, 보안 정책, 응답 스타일을 `.cursor/rules/`에 추가하거나 개선할 수 있습니다.

### 새 Rule 만들기

```text
[IT] 우리 수업에서 사용할 코딩 규칙을 .cursor/rules/coding-style.mdc로 만들어줘.
범위는 TypeScript/React 기준이고, 보안·가독성·검증 기준을 포함해줘.
```

### 기존 Rule 개선하기

```text
[IT] classroom.mdc를 읽고 학생이 product-registry를 직접 편집하지 않아도 되도록 Agent 행동 규칙을 개선해줘.
```

### Rule 검증하기

```text
[QA] .cursor/rules에 충돌되는 지시가 있는지 점검하고, 학생용으로 어려운 표현을 쉽게 바꿔줘.
```

권장 원칙:

- rule은 짧고 명확하게 유지
- 제품명·개인 경로·계정 하드코딩 금지
- 반복되는 Agent 행동만 rule로 승격
- 한 번성 작업 지시는 rule로 만들지 않음

---

## Skills를 AI와 함께 만들고 개선하기

Skills는 반복 가능한 작업 절차입니다. 예를 들어 GitHub 워크스페이스 등록, 보안 점검, PRD 작성, 배포 점검처럼 수업 중 반복되는 절차를 `.cursor/skills/`에 문서화합니다.

### 새 Skill 만들기

```text
[IT] PRD를 작성하는 반복 절차를 product-prd skill로 만들어줘.
사용 시점, 입력값, 산출물 위치, 검증 체크리스트를 포함해줘.
```

### 기존 Skill 개선하기

```text
[IT] github-workspace skill을 개선해서 학생이 폴더 경로만 말하면 registry와 code-workspace를 같이 갱신하도록 해줘.
```

### Skill 사용 요청

```text
[프로덕트] product-planning skill을 사용해서 active_product_id의 MVP 범위를 정리해줘.
```

권장 원칙:

- skill은 “반복 가능한 절차”에만 만든다.
- 입력, 처리 단계, 산출물, 검증 기준을 포함한다.
- 특정 학생의 프로젝트명은 예시로만 쓰고 실제 대상은 registry에서 읽는다.

---

## 조직 구조

| 그룹 | 팀 |
|---|---|
| 제품/서비스 | 프로덕트, 디자인, QA |
| 기술 | IT |
| 성장 | 마케팅, 광고영업, 사업개발, 데이터 |
| 운영 | 운영, 고객센터 |
| 경영지원 | 재무, 홍보/법무, HR |

상세: `organization/org-chart.md`

### IT팀 기술 트랙

프론트엔드·백엔드·보안은 별도 팀이 아니라 **IT팀 하위 기술 트랙**으로 둡니다.

| 키워드 | 트랙 | 문서 |
|---|---|---|
| `[Web]` | Frontend / Web | `organization/teams/it/frontend.md` |
| `[API]` | Backend / API | `organization/teams/it/backend.md` |
| `[Flutter]` / `[Mobile]` | Mobile | `organization/teams/it/mobile.md` |
| `[Security]` | Security | `organization/teams/it/security.md` |
| `[IT]` | DevOps / Workspace | `organization/teams/it/devops.md` |

---

## AI Agent가 읽는 진입점

1. `AGENTS.md`
2. `.cursor/rules/classroom.mdc`
3. `.cursor/rules/company-rules.mdc`
4. `workspace/context/product-registry.md`
5. `workspace/context/workspace-state.json`
6. `workspace/context/workspace-todo.md`

---

## 디렉터리 구조

```text
MyWorldProject-Classroom/
├── .cursor/rules/          # Agent 규칙
├── .cursor/skills/         # 반복 작업 스킬
├── organization/           # 13팀 + IT 기술 트랙
├── workspace/
│   ├── context/            # registry, state, todo, history
│   ├── templates/          # setup 시드
│   └── agents/             # Agent 메타
├── outputs/                # 팀별 산출물 (README만 Git)
├── scripts/
└── AGENTS.md
```

---

## npm scripts

| 명령 | 용도 |
|---|---|
| `npm run setup:classroom` | 학생 첫 clone 온보딩 |
| `npm run archive:context` | 30일 초과 history 아카이브 |
| `npm run security:install-hooks` | pre-commit/pre-push 보안 Hook |

---

## 주의

- 제품별 CLI는 대상 프로덕트 폴더에서 실행
- `.env` 실파일 Git 커밋 금지
- `workspace-history.md` 전체 Read 금지 — 필요한 경우 검색 또는 부분 읽기
- `product-registry.md`에 절대경로 기록 금지
