import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'
  // console.log(faker.internet.email());
  
test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro');
  });

  // npx playwright codegen https://tai-shop.razvanvancea.ro
  test('login test - codegen', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  await expect(page.locator('#prooood')).toContainText('PROCEED TO CHECKOUT');
});

test('create account', async ({ page }) => {
  await page.getByRole('link', { name: 'Create account' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('john');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('doe');
  await page.getByRole('textbox', { name: 'Phone number' }).fill('0723223232');
  await page.getByLabel('Country').selectOption('Australia');
  await page.getByRole('textbox', { name: 'Email address *' }).fill(faker.internet.email());
  console.log(faker.internet.email());
  await page.getByRole('textbox', { name: 'Password *' }).fill('qweqweqwe123');
  await page.getByRole('checkbox', { name: 'I agree with the terms and' }).check();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('#message')).toContainText('Success! Your account has been created. Please keep in mind you WILL NOT be able to use the new credentials for login, because this website does not have a database integration yet. You can still use admin@admin.com / admin123 for login flow.');
});

  test('login test @rv', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    await page.getByTestId('submitBtn').click();
    await page.pause();

    await test.step('Verify logout link is visible', async () => {
      await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    });
  });
});
