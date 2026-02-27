---
name: review-branch-vs-main
description: 'PR-style review: current branch vs main (TypeScript + Playwright standards, reliability, maintainability)'
argument-hint: 'Optional: focus=<area> severity=<only blockers|full> (Example: focus=auth severity=full)'
agent: 'pw-code-reviewer-specialist'
model: 'Claude Sonnet 4.6'
tools: ['read', 'search', 'edit']
---

## Task
Perform a **pull-request style code review** of the **current branch compared to `main`** (base branch), focusing on **TypeScript + Playwright test automation standards**, **design patterns**, **maintainability**, and **reliability**.

### Required context (so this is truly “branch vs main”)
In VS Code Copilot Chat, **attach Git diff context** before running the review:

1) Click **Add Context (@)** in Copilot Chat  
2) Select **Git → Branch (Diff with Main Branch)**  
   - This should include *all committed changes* on the branch plus any local modifications (depending on your setup).

If that Git diff context is not attached, **pause and ask me to attach it** (do not attempt a repo-wide review).

### Optional inputs (if provided in the chat input)
- `focus`: ${input:focus:optional focus area (e.g., auth, selectors, fixtures, CI stability)}
- `severity`: ${input:severity:full|only blockers}

## Review rules
- Review **ONLY** what’s in the diff vs `main`. Do not audit unrelated files.
- Follow any repo custom instructions (Playwright/TypeScript) if present; they override generic advice.
- Prioritize: **reliability/determinism** > correctness/coverage > maintainability > performance > security hygiene.
- Enforce Playwright guidance:
  - Prefer role/label/testid locators; avoid brittle selectors and strict-mode violations.
  - Use `test.step()` for multi-stage flows.
  - Prefer web-first assertions (`toHaveText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`).
  - Avoid `toBeVisible()` unless specifically testing visibility changes.
  - Avoid `waitForTimeout` and increased default timeouts.

## Output format
Use this exact structure:

### Diff Summary
- Files changed
- High-level risks
- Notable themes (if any)

### 🔴 BLOCKER (must fix)
For each:
- **File:** `path` (approx location)
- **What**
- **Why it matters**
- **How to fix** (include snippet when helpful)

### 🟠 MAJOR (should fix)

### 🟡 MINOR (nice to have)

### Architecture Notes
- Patterns observed (fixtures/POM/helpers/test layout)
- Opportunities to reduce flake risk and improve maintainability

### Risk assessment
- **Risk:** Low / Medium / High
- **Drivers:** (flake risk, missing assertions, brittle selectors, parallel safety, typing risk, etc.)

## First action
Start by confirming that the Git diff context **Branch (Diff with Main Branch)** is present.
If present, proceed with the review immediately.
If not present, ask me to attach it and do nothing else.