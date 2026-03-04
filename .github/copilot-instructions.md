---
description: 'AI-assisted Playwright test automation framework for pw-ai-workshop'
applyTo: '**'
---

## Project Overview

This is a **Playwright + TypeScript test automation framework** for the TAI Shop QA practice environment. The project is designed as a hands-on masterclass for building scalable test automation with AI agents.

**Key Tech Stack:**
- Playwright 1.58.2 with TypeScript
- Google Chrome (primary browser target)
- ESLint + TypeScript strict mode
- Faker.js for test data generation
- Prettier for code formatting

**Testing Environment:** https://tai-shop.razvanvancea.ro (QA sandbox - no real data/payments)

---

## Project Structure & Conventions

### Test File Organization
- **Location:** `tests/` directory
- **Pattern:** `<feature>.spec.ts` (e.g., `user-authentication.spec.ts`, `checkout.spec.ts`)
- **Scope:** One test file per major feature; group related tests in `test.describe()` blocks

### Test Naming & Tagging
- Use descriptive titles: `Feature - Specific action or scenario`
- Tag smoke tests with `@smoke` for quick regression runs
- Example: `test('login - accept valid credentials @smoke', ...)`

### Custom Test Attributes
- Uses `testIdAttribute: 'test-data'` in playwright.config.ts
- Prefer `page.getByTestId('submitBtn')` when stable selectors are available
- Fallback to role-based locators: `getByRole('button', { name: 'Sign In' })`

---

## Test Writing Guidelines

### Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.


### Test Structure
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.


### File Organization
- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- **Scope**: Aim for one test file per major application feature or page.

### Assertion Best Practices
- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.

---

## Developer Workflows

### Running Tests

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run with visible browser UI |
| `npm run test:debug` | Interactive debugging mode |
| `npm run test:ui` | Playwright test UI (recommended for development) |
| `npm run test:smoke` | Run only smoke-tagged tests (`@smoke`) |
| `npm run test:repeat` | Stress test: run each test 10 times |

### Code Quality

- **Linting & Type Checking:** `npm run lint` (enforces ESLint + TypeScript strict)
- **Formatting:** `npm run prettier --write .` (automatic code formatting)
- **Report Viewing:** `npm run show:report` (opens last HTML test report)
- **Trace Analysis:** `npm run open:trace path/to/trace.zip` (debug failed tests)

### Test Configuration (`playwright.config.ts`)

**Key Settings:**
- `testIdAttribute: 'test-data'` - Custom test ID selector for stability
- `trace: 'retain-on-failure'` - Captures traces only for failed tests
- `screenshot: 'only-on-failure'` - Screenshots only when tests fail
- `timeout: 60000` - Global test timeout
- `workers: undefined` (local) / `1` (CI) - Parallel execution control

---

## Code Patterns & Conventions

### Test Data Generation
- Use **Faker.js** for dynamic test data: `faker.internet.email()`, `faker.person.firstName()`
- Example from codebase:
  ```typescript
  await page.getByRole('textbox', { name: 'Email address *' })
    .fill(faker.internet.email());
  ```

### Common TAI Shop Workflows
- **Login Flow:** Fill email/password fields, click "Sign In", verify "Log Out" link appears
- **Account Creation:** Navigate to register.html, fill form fields, handle country dropdown
- **Checkout:** Verify cart button shows "PROCEED TO CHECKOUT" in element `#prooood`
- **Success Messages:** Check element `#message` for success/error text

### Browser & Environment
- Single browser target: **Google Chrome** (not cross-browser yet)
- Test against: `https://tai-shop.razvanvancea.ro` (QA sandbox, safe to break)
- No persistent test data - credentials reset between runs

---

## ESLint & TypeScript Rules

**Enforced Rules** (from eslint.config.mjs):
- `@typescript-eslint/no-floating-promises` - All async operations must be awaited
- `@typescript-eslint/await-thenable` - Only await Promise-returning functions
- TypeScript strict mode enabled globally (tsconfig.json)

**Key Implications for AI:**
- ❌ WRONG: `page.goto('url')` (missing await)
- ✅ CORRECT: `await page.goto('url')`
- Never skip `await` on async Playwright operations


## Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Movie Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  });

  test('Search for a movie by title', async ({ page }) => {
    await test.step('Activate and perform search', async () => {
      await page.getByRole('search').click();
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.fill('Garfield');
      await searchInput.press('Enter');
    });

    await test.step('Verify search results', async () => {
      // Verify the accessibility tree of the search results
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - main:
          - heading "Garfield" [level=1]
          - heading "search results" [level=2]
          - list "movies":
            - listitem "movie":
              - link "poster of The Garfield Movie The Garfield Movie rating":
                - /url: /playwright-movies-app/movie?id=tt5779228&page=1
                - img "poster of The Garfield Movie"
                - heading "The Garfield Movie" [level=2]
      `);
    });
  });
});
```

---

## AI Agent Workflow Tips

### For Writing New Tests
1. **Analyze the app** with Playwright Inspector: `npm run test:debug`
2. **Generate selectors** using Playwright codegen: `npx playwright codegen https://tai-shop.razvanvancea.ro`
3. **Prioritize selectors** in this order:
   - Test ID: `getByTestId('submitBtn')`
   - Role: `getByRole('button', { name: 'Sign In' })`
   - Label: `getByLabel('Email Address')`
   - Text: `getByText('Click me')`
4. **Use test.step()** to structure complex scenarios
5. **Never** use hardcoded `wait()` or `setTimeout()` - rely on auto-waiting

### For Debugging Failures
1. Check trace: `npm run show:report` → click test → view trace
2. Enable headed mode: `npm run test:headed`
3. Use pause: `await page.pause()` to inspect DOM state
4. Verify selectors exist: log `page.locator(...)` results before assertions

---

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented
- [ ] All async operations have `await` keyword (ESLint enforces this)
- [ ] No hardcoded waits - use auto-waiting instead