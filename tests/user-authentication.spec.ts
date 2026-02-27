import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login test', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();

     // Docs: https://fakerjs.dev/api/
  console.log(faker.person.fullName());
  });
});
