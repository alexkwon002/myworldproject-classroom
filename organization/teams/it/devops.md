# DevOps / Workspace 트랙

## 범위

- GitHub repo 연결
- workspace 폴더 등록
- 배포 전략
- 환경변수 관리
- CI/CD 기본 설계

## Agent 요청 예시

```text
[IT] 이 프로젝트를 GitHub repo와 연결하고 workspace registry를 정리해줘.
```

## 원칙

- 실제 대상 프로젝트는 `workspace/context/product-registry.md`에서 확인한다.
- `.env.*` 실값 수정·노출은 사용자 확인 없이는 진행하지 않는다.
- HQ cwd가 아니라 대상 프로덕트 cwd에서 제품 명령을 실행한다.
