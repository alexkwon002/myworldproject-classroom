# Backend / API 트랙

## 범위

- API 라우트 설계
- DB 모델링
- 인증/인가
- 입력 검증
- 에러 응답 규격

## Agent 요청 예시

```text
[API] active_product_id 기준으로 로그인 API와 사용자 테이블 초안을 설계해줘.
```

## 원칙

- 실제 대상 프로젝트는 `workspace/context/product-registry.md`에서 확인한다.
- `.env.*` 실값 수정·노출은 사용자 확인 없이는 진행하지 않는다.
- HQ cwd가 아니라 대상 프로덕트 cwd에서 제품 명령을 실행한다.
