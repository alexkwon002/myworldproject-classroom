# Product Registry

> **단일 진실 원천(SoT)** — Agent는 SessionStart·작업 시작 전 이 파일을 먼저 읽는다.
> 프로덕트 **N개** 등록 가능. 행 추가 후 Cursor 멀티루트에 프로젝트 폴더를 연결한다.

**최종 업데이트**: (설정일)

---

## Products

| id | name | description | stage | infra |
|---|---|---|---|---|
| _example_ | _My First Product_ | _한 줄 설명_ | _idea \| mvp \| growth_ | _vercel \| gcp \| aws \| local_ |

---

## Projects (레포 · 멀티루트)

| product_id | project_key | role | local_path | stack | port |
|---|---|---|---|---|---|
| _example_ | api | backend-api | `../class-projects/student-shop-app` | Next.js + Prisma | 3000 |

### local_path 규칙 (옵션 B — 위치 자유, 상대경로 필수)

- **HQ 폴더 기준 상대 경로**만 사용 (`../`, `../../` 등)
- 프로젝트는 **어디에 clone해도 됨** — registry의 `local_path`만 HQ에서 실제로 열리면 OK
- **절대 경로 금지** (`/Users/...`, `C:\...`) — 다른 PC·수업 환경에서 깨짐

**예시 (HQ가 `~/work/myworldproject`일 때)**

| 실제 clone 위치 | registry local_path |
|---|---|
| `~/work/projects/shop-api` | `../projects/shop-api` |
| `../class-projects/student-blog-saas` | `../../Desktop/my-app` |
| `../class-projects/my-api` | `../dev/acme/api` |

경로 확인: HQ에서 `cd <local_path> && pwd` 로 열리는지 검증.

---

## GitHub (선택)

| product_id | github_owner | default_branch | gh_login |
|---|---|---|---|
| _example_ | _myusername_ | main | _myusername_ |

---

## Agent 키워드 매핑 (선택)

| 키워드 | project_key | 설명 |
|---|---|---|
| `[API]` | api | 백엔드 API |
| `[Admin]` | admin | 관리자 |
| `[Flutter]` | app | 모바일 앱 |
| `[Web]` | web | 웹 프론트 |

프로덕트별 키워드는 위 표를 확장해 정의한다.
