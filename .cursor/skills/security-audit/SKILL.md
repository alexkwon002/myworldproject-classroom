---
name: security-audit
description: Review student projects for secrets, unsafe env handling, authentication risks, and common web vulnerabilities.
---

# Security Audit

- Do not expose `.env` values.
- Commit `.env.example` only.
- Validate user input.
- Check auth/session boundaries.
- Report findings before changing security-sensitive files.
