---
name: github-workspace
description: Register product repositories, workspace folders, GitHub remotes, and classroom registry entries. Use when adding/removing projects or updating myworldproject.code-workspace.
---

# GitHub & Workspace Management

## Required Source of Truth

Always read `workspace/context/product-registry.md` before adding or modifying projects.

## Rules

- Never guess a GitHub owner or repo.
- Never write absolute paths to `product-registry.md`.
- Convert user-provided paths to paths relative to the HQ folder.
- Update `myworldproject.code-workspace` when adding project folders.
- Update `workspace/context/workspace-state.json` when setting `active_product_id`.

## Checklist

- [ ] Product row exists
- [ ] Project row exists
- [ ] `local_path` is relative
- [ ] Workspace folder added
- [ ] `active_product_id` set when requested
