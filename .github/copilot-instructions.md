# Copilot Instructions - Playwright AI Workshop

## Project Overview

This is a **Playwright test automation framework** targeting SauceLabs demo app (`https://www.saucedemo.com/`). The project demonstrates scalable test architecture patterns with AI-assisted test generation and maintenance workflows. Tests use TypeScript with Page Object Model (POM) pattern.

## Architecture

### Key Structure
- **`tests/`** - Test specifications organized by feature (e.g., `user-authentication.spec.ts`, `order.spec.ts`)
- **`pages/`** - Page Object classes encapsulating UI interactions (e.g., `LoginPage`)
- **`.github/instructions/`** - Detailed coding standards (`playwright.instructions.md`)
- **`playwright.config.ts`** - Test configuration with trace, screenshot, and video settings

### Page Object Model Pattern
Use dedicated page classes (`pages/*.page.ts`) to:
- Encapsulate element locators as properties
- Provide high-level action methods (e.g., `doLogin()`)
- Enable test reuse and maintainability

Example: `LoginPage` provides `doLogin(email, password)` method hiding selector details.

## Test Writing Standards

### Locators
Prefer **role-based locators** for resilience:
```typescript
// Good - accessible, maintainable
page.getByRole('button', { name: 'Open Menu' })

// Acceptable - data attributes
page.locator('[data-test="login-button"]')

// Avoid - brittle CSS paths
page.locator('#login-form > div > button')
```

### Assertions
- Use **auto-retrying assertions** with `await`: `await expect(locator).toContainText('text')`
- For visibility: `await expect(locator).toBeVisible()`
- For counts: `await expect(page.getByRole('listitem')).toHaveCount(3)`
- Avoid hard-coded waits; rely on Playwright's built-in waiting

### Test Organization
- Group related tests in `test.describe()` blocks
- Use `test.beforeEach()` for common setup (navigation, login)
- Use `test.step()` for complex interactions (for improved reporting)
- Follow naming: `<Feature> - <Scenario>` (e.g., "User Authentication - Login Test")

### Patterns from Codebase
```typescript
// Current pattern: Initialize page class in test
test('logout test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin('standard_user', 'secret_sauce');
  // ... continue with assertions
});
```

## Development Workflows

### Running Tests
```bash
npm run test:headless    # Default: serial execution, CI-like
npm run test:headed      # Visual mode for debugging
npm run test:debug       # Playwright inspector
npm run test:ui          # Interactive UI mode
npm run test:smoke       # Filter tests tagged with @smoke
npm run show:report      # View HTML test report
```

### Key Configuration Settings
- **Timeout**: 60s per test, 15s per assertion (explicit waits rare)
- **Parallel**: Enabled locally; CI runs serially (workers=1)
- **Artifacts**: Screenshots on failure, traces retained on failure, videos off by default
- **Retries**: 0 locally, 2 on CI

### Code Generation
```bash
npm run codegen  # Interactive tool to generate test code against SauceLabs demo
```

## Project-Specific Conventions

1. **Test Site**: All tests target `https://www.saucedemo.com/` (SauceLabs demo)
2. **Test Account**: Use `standard_user` / `secret_sauce` for login tests
3. **Data Attributes**: SauceLabs demo uses `data-test` attributes for reliable selectors
4. **No baseURL Config**: Tests use full URLs in `page.goto()`
5. **Named Scripts**: Use npm scripts (not raw `npx playwright` commands)

## AI Agent Guidance

When generating or refactoring tests:
1. **Check [playwright.instructions.md](./instructions/playwright.instructions.md)** for detailed standards
2. **Extract POM methods** for repeated interactions - don't inline complex flows
3. **Use `test.step()`** for multi-step scenarios (improves reports, aids debugging)
4. **Verify locators** against actual SauceLabs demo structure - use `npm run codegen` to validate
5. **Avoid test interdependencies** - each test should be independently runnable
6. **Prefer existing page classes** over creating new ones when possible

## Common Tasks

- **Add new test**: Create in `tests/<feature>.spec.ts`, follow existing structure
- **Create page object**: Add to `pages/<page-name>.page.ts`, export class
- **Debug failing test**: Use `npm run test:debug` or `npm run test:headed`
- **Update selectors**: Validate with `npm run codegen` before committing
- **Format code**: Run `npm run format` before commit (Prettier configured)
