# Security 트랙

## 범위

- Secret 관리
- .env.example 정책
- 인증/인가 경계
- 입력값 검증
- OWASP 기본 점검

## Agent 요청 예시

```text
[Security] 현재 프로젝트에서 커밋되면 안 되는 파일과 보안 규칙을 점검해줘.
```

## 원칙

- 실제 대상 프로젝트는 `workspace/context/product-registry.md`에서 확인한다.
- `.env.*` 실값 수정·노출은 사용자 확인 없이는 진행하지 않는다.
- HQ cwd가 아니라 대상 프로덕트 cwd에서 제품 명령을 실행한다.
