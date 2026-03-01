import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();

    // Docs: https://fakerjs.dev/api/
    console.log('Random email: ' + faker.internet.email());
  });

  test('recover password', async ({ page }) => {
    const randomEmail = faker.internet.email();
    await page.getByRole('link', { name: 'Forgot your password?' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill(randomEmail);
    await page.getByRole('button', { name: 'Send Reset Link' }).click();
    await expect(page.locator('#resetMessage')).toContainText('✓ Check your email');
  });
});
