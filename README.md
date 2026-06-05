# MyWorldProject HQ

**멀티 프로덕트 통합 AI 오케스트레이션**  
*Multi-Product Integrated AI Orchestration*

1인 창업자·학습자가 **AI Agent 팀(13팀)·스킬·PDCA**로 **프로덕트 N개**를 동시에 기획·개발·운영하기 위한 **헤드쿼터(HQ)** 저장소입니다.  
제품 소스코드는 이 repo가 아니라, 각자 등록한 **프로덕트 레포**에 둡니다.

---

## 첫 수업 체크리스트

첫 수업에서는 [CLASSROOM_CHECKLIST.md](./CLASSROOM_CHECKLIST.md)를 따라 진행하세요.  
목표는 clone 직후 `setup:classroom` 실행, 프로덕트 1개 등록, Cursor 멀티루트 연결, Agent 첫 요청까지 완료하는 것입니다.

---

## 이 repo에 있는 것 / 없는 것

| 포함 (GitHub) | 미포함 (로컬 전용) |
|---|---|
| 13팀 조직·스킬·PDCA 룰 | 강사 개인 workhistory (`workspace/local/`) |
| Agent 지시 (`AGENTS.md`, `.cursor/rules/`) | 개인 산출물 본문 (`outputs/**` README 제외) |
| 프로덕트 등록 템플릿 | `myworldproject.code-workspace` (본인 PC) |
| `workspace/context/` 빈 템플릿 | `.cursor/rules/instructor.local.mdc` |

---

## 빠른 시작 (학생 · 첫 clone)

### 1. Clone & 셋업

```bash
git clone https://github.com/alexkwon002/myworldproject-classroom.git
cd myworldproject-classroom
npm run setup:classroom
```

### 2. Cursor에서 HQ 열기

- `myworldproject.code-workspace.example`을 복사해 `myworldproject.code-workspace` 생성 (setup이 자동 생성)
- Cursor: **File → Open Workspace from File** → `myworldproject.code-workspace`

### 3. AI 바이브 코딩 방식으로 프로젝트 등록

이 수업에서는 `product-registry.md`나 `myworldproject.code-workspace`를 학생이 직접 오래 편집하지 않습니다.  
학생은 **원하는 폴더에 프로젝트를 만들거나 clone**하고, Cursor Agent에게 등록을 요청합니다.

#### 3-1. 원하는 위치에 프로젝트 폴더 만들기

프로젝트는 어디에 있어도 됩니다.

```bash
# 예시: 원하는 위치에 프로젝트 폴더 생성
mkdir -p ../class-projects/student-shop-app
```

이미 GitHub repo가 있다면 원하는 위치에 clone하세요.

```bash
git clone <내 GitHub repo URL> ../class-projects/student-shop-app
```

#### 3-2. Agent에게 워크스페이스 등록 요청

Cursor Agent에게 아래처럼 말합니다.

```text
[IT] ../class-projects/student-shop-app 폴더를 shop-app 프로덕트의 web 프로젝트로 워크스페이스에 추가해줘.
product-registry.md, github-registry.md, myworldproject.code-workspace, workspace-state.json까지 같이 정리해줘.
```

또는 새 프로덕트를 처음 시작할 때:

```text
[IT] 새 프로덕트 shop-app을 등록해줘.
프로젝트 폴더는 ../class-projects/student-shop-app이고, 역할은 web, 기술스택은 Next.js, 포트는 3000으로 해줘.
워크스페이스에도 추가하고 active_product_id도 shop-app으로 설정해줘.
```

#### 3-3. Agent가 처리해야 하는 일

Agent는 요청을 받으면 다음을 대신 처리합니다.

- `workspace/context/product-registry.md`에 프로덕트·프로젝트 등록
- `workspace/context/github-registry.md`에 GitHub 정보가 있으면 등록
- `myworldproject.code-workspace`에 폴더 추가
- `workspace/context/workspace-state.json`의 `active_product_id` 설정
- 경로를 HQ 기준 상대 경로로 변환

**경로 규칙 (옵션 B)**  
- 학생은 프로젝트를 원하는 위치에 둠
- Agent가 `local_path`를 **HQ 기준 상대 경로**로 계산
- registry에는 절대 경로(`/Users/...`)를 넣지 않음

### 4. Agent에게 작업 요청

| 키워드 | 역할 |
|---|---|
| `[프로덕트]` | PRD·로드맵 |
| `[API]` | 백엔드 |
| `[Admin]` | 어드민 |
| `[Flutter]` | 모바일 |
| `[Web]` | 웹·랜딩 |
| `[IT]` | GitHub·워크스페이스 |

예시:

```text
[프로덕트] active_product_id 기준으로 서비스 PRD 초안 작성해줘.
[Web] active_product_id 기준으로 첫 랜딩 페이지 IA를 설계해줘.
[API] shop-app 로그인 API 설계해줘.
```

프로젝트 등록이 잘 되었는지 확인하려면:

```text
[QA] 현재 워크스페이스가 첫 수업 체크리스트를 통과했는지 확인해줘.
```

---

## AI Agent가 읽는 진입점

새 채팅 시작 시 Agent는 다음 순서로 맥락을 파악합니다.

1. `AGENTS.md`
2. `.cursor/rules/classroom.mdc`
3. `.cursor/rules/company-rules.mdc`
4. `workspace/context/product-registry.md` (**필수**)
5. `workspace/context/workspace-todo.md` (Active PDCA + Pending만)

---

## 디렉터리 구조

```text
MyWorldProject/
├── .cursor/rules/          # Agent 규칙 (classroom + company)
├── .cursor/skills/         # 실행 스킬 (배포·보안·인프라 등)
├── organization/           # 13팀 조직·스킬 카탈로그
├── workspace/
│   ├── context/            # 학생·운영자 런타임 (registry, todo, history)
│   ├── templates/        # setup:classroom 시드
│   └── agents/             # Agent 메타 (registry 기반)
├── outputs/                # 팀별 산출물 (본문은 로컬, README만 Git)
├── scripts/
│   ├── setup-classroom.sh
│   └── setup-instructor.sh
└── AGENTS.md
```

---

## 조직 구조 (13팀)

| 그룹 | 팀 |
|---|---|
| 제품/서비스 | 프로덕트, 디자인, QA |
| 기술 | IT |
| 성장 | 마케팅, 광고영업, 사업개발, 데이터 |
| 운영 | 운영, 고객센터 |
| 경영지원 | 재무, 홍보/법무, HR |

상세: `organization/org-chart.md` · `organization/skills-registry.md`

---

## PDCA

모든 작업은 **Plan → Do → Check → Act** 사이클을 따릅니다.  
규칙: `.cursor/rules/pdca-workflow.mdc`

- **Plan**: `workspace-todo.md` Active PDCA 등록
- **Act**: `workspace-history.md`에 1~3문장 기록

---

## npm scripts

| 명령 | 용도 |
|---|---|
| `npm run setup:classroom` | 학생·첫 clone 온보딩 |
| `npm run setup:instructor` | 강사 개인 오버레이 (`workspace/local/`) |
| `npm run archive:context` | 30일 초과 history 아카이브 |
| `npm run security:install-hooks` | pre-commit/pre-push 보안 Hook |

---

## 강사 (Instructor) 전용

본인 프로젝트·계정·workhistory는 GitHub에 올리지 않습니다.

```bash
npm run setup:instructor
# .cursor/rules/instructor.local.mdc.example → instructor.local.mdc 복사 후 편집
```

- 컨텍스트: `workspace/local/context/`
- 멀티루트: `myworldproject.code-workspace` (gitignore)

---

## 주의

- `gcloud` / `firebase` CLI는 **프로덕트 레포 cwd**에서 실행 (HQ cwd 금지)
- `.env` 실파일 Git 커밋 금지
- `workspace-history.md` 전체 Read 금지 (Agent) — `Grep`·`archive/`만
