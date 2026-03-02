import { test, expect } from '@playwright/test';

test.describe('Place order test suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tai-shop.razvanvancea.ro');
  });

  test('add to cart test', async ({ page }) => {
    // use the debugger and start the 'add to cart' test from here
  });
});
