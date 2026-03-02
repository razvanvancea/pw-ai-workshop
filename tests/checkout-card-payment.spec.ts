// @ai-generated
import { test, expect } from '../fixtures/pages';

test.describe('Checkout - Card Payment', () => {
  test('should complete full order placement via Online Card Payment', async ({
    page,
    loginPage,
  }) => {
    // 1. Navigate to https://tai-shop.razvanvancea.ro and log in with admin@admin.com / admin123
    await test.step('Navigate and log in', async () => {
      await page.goto('https://tai-shop.razvanvancea.ro');
      await loginPage.login('admin@admin.com', 'admin123');
      await expect(loginPage.logoutBtn).toBeVisible();
    });

    // 2. Click 'ADD TO CART' on Red Lipstick ($12.99)
    await test.step('Add Red Lipstick to cart', async () => {
      await page.getByRole('button', { name: 'ADD TO CART' }).nth(3).click();
      await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
      await expect(
        page.locator('.cart-item-title').filter({ hasText: 'Red Lipstick' })
      ).toBeVisible();
      await expect(page.locator('.cart-price').filter({ hasText: '$12.99' })).toBeVisible();
    });

    // 3. Click 'PROCEED TO CHECKOUT'
    await test.step('Proceed to checkout', async () => {
      await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
      await expect(page.getByRole('heading', { name: 'Shipping Details' })).toBeVisible();
    });

    // 4. Fill in all required shipping fields: Phone Number, Street Address, City, Country
    await test.step('Fill in shipping details', async () => {
      await page.getByRole('textbox', { name: 'Phone Number *' }).fill('+1 (555) 123-4567');
      await page.getByRole('textbox', { name: 'Street Address *' }).fill('123 Main Street, Apt 4B');
      await page.getByRole('textbox', { name: 'City *' }).fill('New York');
      await page.locator('#countries_dropdown_menu').selectOption('United States of America');
    });

    // 5. Select the 'Online Payment' radio button
    await test.step('Select Online Payment option', async () => {
      await page.getByRole('radio', { name: 'Online Payment' }).click();
      await expect(page.getByRole('radio', { name: 'Online Payment' })).toBeChecked();
    });

    // 6. Click 'Place Order' and verify navigation to payment page
    await test.step('Place order and verify payment page', async () => {
      await page.getByRole('button', { name: 'Place Order' }).click();
      await expect(page).toHaveURL(/payment\.html/);
      await expect(page).toHaveTitle(/Payment \| TAI Shop/);
      await expect(page.getByRole('textbox', { name: 'Cardholder Name *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Card Number *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Expiry Date *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'CVV *' })).toBeVisible();
      await expect(page.getByText('Payment').nth(1)).toBeVisible();
    });

    // 7. Fill in Cardholder Name, Card Number, Expiry Date, CVV
    await test.step('Fill in card details', async () => {
      await page.getByRole('textbox', { name: 'Cardholder Name *' }).fill('Jane Smith');
      await page.getByRole('textbox', { name: 'Card Number *' }).fill('1234 5678 9012 3456');
      await page.getByRole('textbox', { name: 'Expiry Date *' }).fill('12/28');
      await page.getByRole('textbox', { name: 'CVV *' }).fill('321');
      await expect(page.getByText('Jane Smith')).toBeVisible();
      await expect(page.getByText('12/28')).toBeVisible();
    });

    // 8. Click 'Complete Payment' and verify order confirmation
    await test.step('Complete payment and verify order confirmation', async () => {
      await page.getByRole('button', { name: 'Complete Payment' }).click();
      await expect(page).toHaveURL(/payment=completed/);
      await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();
      await expect(page.getByText('$27.99')).toBeVisible();
      await expect(page.getByText('123 Main Street, Apt 4B')).toBeVisible();
    });
  });
});
