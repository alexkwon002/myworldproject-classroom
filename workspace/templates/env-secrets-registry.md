# Environment & Secrets Registry

> 환경변수 **키 이름**·Secret Manager **리소스 이름**만 기록. **실값 금지.**

**최종 업데이트**: (날짜)

---

## By Project

| product_id | project_key | env_file | secret_store | notes |
|---|---|---|---|---|
| _example_ | api | `.env.local` | _(Vercel Env / GCP Secret Manager)_ | |

---

## 공통 규칙

- `.env.*` 실파일은 **절대 Git 커밋 금지**
- `.env.example` 만 커밋 (placeholder)
- Agent가 `.env` 수정 시 **사용자 확인 필수**
