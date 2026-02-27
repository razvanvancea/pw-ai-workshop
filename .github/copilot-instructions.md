---
description: 'Playwright test generation instructions'
applyTo: '**'
---

## Project Overview

Playwright + TypeScript E2E test framework targeting **https://tai-shop.razvanvancea.ro/** (e-commerce app). Tests run against **Google Chrome** only (the sole active project in `playwright.config.ts`). Test credentials: `admin@admin.com` / `admin123`.

## Architecture & Key Files

- `tests/` — All test files, named `<feature>.spec.ts` (one file per feature/page)
- `pages/` — Page Object Model classes (see `pages/login.page.ts` for the established pattern)
- `playwright.config.ts` — Custom `testIdAttribute: 'test-data'` (not the default `data-testid`), 60s test timeout, 15s expect timeout

### Page Object Pattern

Page objects live in `pages/`, export a class that takes `Page` in constructor, expose locators as `readonly` properties, and encapsulate reusable workflows as `async` methods. Example from `pages/login.page.ts`:

```typescript
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  // ...locators as readonly properties
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
  }
  async doLogin(email: string, password: string) { /* ... */ }
}
```

When creating new page objects, follow this same structure. Import and instantiate them in tests: `const loginPage = new LoginPage(page);`

## Test Writing Rules

### Locators (Priority Order)
1. Role-based: `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`
2. Test ID: `getByTestId('myId')` — resolves to `[test-data="myId"]` due to custom config
3. Use `test.step()` to group related interactions for better reporting

### Assertions
- Use auto-retrying web-first assertions (`await expect(locator).toHaveText()`, `toContainText`, `toHaveURL`, `toHaveCount`, `toMatchAriaSnapshot`)
- Avoid `toBeVisible()` unless specifically testing visibility changes
- Rely on Playwright's auto-waiting; never add hard-coded waits

### Structure
- `import { test, expect } from '@playwright/test';`
- Group related tests under `test.describe()`
- Use `beforeEach` for common setup (e.g., `page.goto`)
- Tag smoke tests with `@smoke` in the test title (run via `npm run test:smoke`)

### ESLint Enforcement
The project enforces `@typescript-eslint/no-floating-promises` and `@typescript-eslint/await-thenable`. Every Playwright call returning a Promise **must** be awaited. Unhandled promises will fail linting.

## Developer Commands

| Command | Purpose |
|---|---|
| `npm run test:headless` | Run all tests headless, single worker |
| `npm run test:headed` | Run all tests with browser visible |
| `npm run test:debug` | Run headed with Playwright Inspector |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:smoke` | Run only `@smoke`-tagged tests |
| `npm run show:report` | Open HTML report |
| `npm run codegen` | Launch Playwright codegen |
| `npm run lint` | TypeScript check + ESLint |
| `npm run format` | Prettier formatting |

## Available Libraries

- `@faker-js/faker` — Use for generating dynamic test data (names, emails, etc.) instead of hardcoding values
- `@playwright/test` — Core test framework

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators use accessible, role-based selectors; `getByTestId` maps to `test-data` attribute
- [ ] Every async Playwright call is `await`-ed (ESLint will catch violations)
- [ ] Reusable interactions are extracted into page objects in `pages/`
- [ ] Tests are grouped with `test.describe()` and use `test.step()` for multi-step flows
- [ ] Smoke-critical tests include `@smoke` in the title
