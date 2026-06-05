# IT팀

IT팀은 학생 프로덕트의 기술 실행을 담당합니다. 단, 팀을 여러 개로 쪼개기보다 **IT팀 안에 하위 기술 트랙**을 둡니다.

이유:
- 수업 초반에는 팀이 너무 많으면 Agent 라우팅이 복잡해집니다.
- 프론트엔드·백엔드·보안·DevOps는 서로 강하게 연결됩니다.
- 학생은 `[IT]`, `[Web]`, `[API]`, `[Security]`처럼 키워드로 충분히 구분할 수 있습니다.

## 하위 기술 트랙

| 트랙 | 문서 | 범위 |
|---|---|---|
| Frontend / Web | `frontend.md` | 웹 UI, 랜딩, 접근성, 성능 |
| Backend / API | `backend.md` | API, 인증, DB, 서버 로직 |
| Mobile | `mobile.md` | Flutter/React Native 앱 |
| Security | `security.md` | Secret, 인증/인가, 입력 검증, 취약점 |
| DevOps | `devops.md` | GitHub, 배포, 환경변수, 워크스페이스 |

## 기본 책임

- `product-registry.md` 기반 프로젝트 경로 확인
- `myworldproject.code-workspace` 멀티루트 폴더 추가/수정
- GitHub repo 연결 안내
- `.env.*` 실값 커밋 방지
- HQ cwd에서 제품 CLI 실행 방지

## Agent 프롬프트 예시

```text
[IT] ../class-projects/student-shop-app 폴더를 shop-app 프로덕트의 web 프로젝트로 워크스페이스에 추가해줘.
```

```text
[Security] active_product_id 기준으로 env/secret 노출 위험을 점검해줘.
```
