# 첫 수업 시작 체크리스트

**MyWorldProject HQ — 멀티 프로덕트 통합 AI 오케스트레이션**  
*Multi-Product Integrated AI Orchestration*

이 문서는 첫 수업에서 학생이 **clone 직후 30분 안에 HQ를 세팅하고, 자기 프로덕트 1개를 Agent가 이해하게 만드는 것**을 목표로 합니다.

---

## 0. 오늘 목표

- [ ] MyWorldProject HQ를 clone한다.
- [ ] `setup:classroom`을 실행한다.
- [ ] 내 프로덕트 1개를 `product-registry.md`에 등록한다.
- [ ] Cursor 멀티루트에 HQ + 프로덕트 폴더를 연다.
- [ ] Agent에게 첫 PRD 또는 작업 요청을 보낸다.

---

## 1. 준비물

- [ ] Git 설치
- [ ] Node.js 설치
- [ ] Cursor 설치
- [ ] GitHub 계정 로그인 가능
- [ ] 내가 만들 서비스 아이디어 1개 준비

서비스 아이디어 예시:

- 동네 중고거래 앱
- 예약 관리 SaaS
- 동아리 커뮤니티 앱
- AI 블로그 생성 서비스

---

## 2. HQ clone

```bash
git clone https://github.com/alexkwon002/myworldproject-classroom.git
cd myworldproject-classroom
npm run setup:classroom
```

완료 확인:

- [ ] `workspace/context/product-registry.md` 생성됨
- [ ] `workspace/context/workspace-todo.md` 생성됨
- [ ] `workspace/context/workspace-state.json` 생성됨
- [ ] `myworldproject.code-workspace` 생성됨

---

## 3. 내 프로덕트 폴더 만들기

프로젝트는 원하는 위치에 만듭니다.

```bash
mkdir -p ../class-projects/student-shop-app
```

이미 GitHub repo가 있으면 clone해도 됩니다.

```bash
git clone <내 GitHub repo URL> ../class-projects/student-shop-app
```

체크:

- [ ] 프로젝트 폴더가 원하는 위치에 있음
- [ ] HQ 폴더 안에 억지로 만들지 않아도 됨

---

## 4. Agent에게 워크스페이스 등록 요청

Cursor Agent에게 아래처럼 말합니다.

```text
[IT] 새 프로덕트 shop-app을 등록해줘.
프로젝트 폴더는 ../class-projects/student-shop-app이고, 역할은 web, 기술스택은 Next.js, 포트는 3000이야.
product-registry.md, github-registry.md, myworldproject.code-workspace, workspace-state.json까지 정리해줘.
```

체크:

- [ ] Agent가 `product-registry.md`에 프로덕트를 등록함
- [ ] Agent가 `local_path`를 HQ 기준 상대경로로 변환함
- [ ] Agent가 `myworldproject.code-workspace`에 폴더를 추가함
- [ ] Agent가 `active_product_id`를 설정함

---

## 5. 옵션 B 경로 규칙

프로젝트는 어디에 clone해도 됩니다. 단, registry에는 HQ 기준 상대경로만 들어갑니다.

예시:

| 실제 위치 | Agent가 기록할 `local_path` |
|---|---|
| `../class-projects/student-shop-app` | `../projects/shop-web` |
| `../class-projects/student-blog-saas` | `../../Desktop/shop-web` |
| `../class-projects/my-api` | `../dev/acme/api` |

체크:

- [ ] `local_path`에 `/Users/...` 같은 절대경로가 없음
- [ ] Cursor 좌측 파일 트리에 HQ와 내 프로젝트 폴더가 함께 보임

---

## 6. Agent에게 첫 요청

Cursor Agent에게 아래 중 하나를 입력합니다.

```text
[프로덕트] active_product_id 기준으로 내 서비스 PRD 초안 작성해줘.
```

또는:

```text
[프로덕트] shop-app PRD 초안 작성해줘.
```

다음 단계 요청 예시:

- `[디자인] shop-app 초기 화면 IA 만들어줘.`
- `[Web] shop-app 랜딩 페이지 구조 설계해줘.`
- `[API] shop-app 로그인/회원가입 API 설계해줘.`
- `[IT] shop-app GitHub repo 연결 절차 안내해줘.`

---

## 8. 수업 중 금지

- [ ] `.env` 실값을 Git에 올리지 않는다.
- [ ] `local_path`에 절대경로를 쓰지 않는다.
- [ ] HQ 폴더에서 `gcloud`, `firebase` CLI를 실행하지 않는다.
- [ ] Agent에게 `workspace-history.md` 전체를 읽으라고 하지 않는다.

---

## 9. 막혔을 때 Agent에게 이렇게 말하기

```text
[IT] product-registry.md와 workspace 설정을 점검해줘.
```

```text
[프로덕트] 내 product-registry 기준으로 다음에 해야 할 작업을 정리해줘.
```

```text
[QA] 지금 셋업이 첫 수업 체크리스트를 통과했는지 확인해줘.
```

---

## 완료 기준

- [ ] `npm run setup:classroom` 성공
- [ ] 프로덕트 1개 이상 등록
- [ ] Cursor 멀티루트에 HQ + 프로덕트 폴더 표시
- [ ] Agent가 내 `product_id`와 `local_path`를 설명할 수 있음
- [ ] 첫 PRD 또는 첫 작업 계획이 생성됨
