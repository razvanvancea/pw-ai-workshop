import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro');
  });

  test('login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('admin@admin.com', 'admin123');

    await test.step('Verify logout link is visible', async () => {
      await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    });
  });

  test('logout test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('admin@admin.com', 'admin123');
    await loginPage.logoutBtn.click();
    await expect(page.locator('#loginSection')).toContainText('Welcome back');
  });

  test('create account test', async ({ page }) => {
    await page.getByRole('link', { name: 'Create account' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Sparrow');
    await page.getByRole('textbox', { name: 'Phone number' }).fill('07200000000');
    await page.getByLabel('Country').selectOption('Romania');
    await page.getByRole('textbox', { name: 'Email address *' }).fill('somerandommail@gmail.com');
    await page.getByRole('textbox', { name: 'Password *' }).fill('Superpass.123');
    await page.getByRole('checkbox', { name: 'I agree with the terms and' }).check();
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.locator('#message')).toContainText('Success!');
    await expect(page.getByText('Success! Your account has')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Sign In' })).toBeVisible();
  });
});
