// spec: Checkout & Order Flow - Critical Path
// seed: tests/seed.spec.ts
// @ai-generated

/*
 * Scenario: 1.1. Complete checkout flow with all required fields and Pay on Delivery
 *
 * Steps:
 *   1. Login with valid credentials (admin@admin.com / admin123)
 *      - expect: User is logged in successfully
 *      - expect: Shopping cart is visible and empty
 *   2. Add multiple products to cart (at least 2 different items with varying prices)
 *      - expect: Each product is added to cart successfully
 *      - expect: Cart total updates correctly after each addition
 *      - expect: Cart displays correct item count
 *   3. Click 'PROCEED TO CHECKOUT' button
 *      - expect: User navigates to checkout page
 *      - expect: Shipping step is displayed (Step 1 of 2)
 *      - expect: Order summary shows correct subtotal
 *   4. Fill in shipping form: Phone Number (+1 (555) 123-4567), Street Address (123 Main St),
 *      City (New York), Country (United States of America)
 *      - expect: All fields accept the input without validation errors
 *      - expect: Form state is preserved while filling
 *   5. Verify 'Pay on Delivery' payment option is selected by default
 *      - expect: Pay on Delivery radio button is pre-selected
 *      - expect: Online Payment option is available but not selected
 *   6. Verify order summary shows: Subtotal + Shipping = Total
 *      (e.g., Subtotal: $29.98, Shipping: $15.00, Total: $44.98)
 *      - expect: All monetary values are displayed correctly
 *      - expect: Subtotal excludes shipping
 *      - expect: Total includes shipping
 *      - expect: Amounts are formatted with dollar signs and two decimals
 *   7. Click 'Place Order' button
 *      - expect: Order is successfully placed
 *      - expect: User is redirected to confirmation page
 *      - expect: Cart is cleared after order placement
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Checkout & Order Flow - Critical Path', () => {
  test('Complete checkout flow with all required fields and Pay on Delivery @smoke', async ({ page }) => {
    await page.goto('/');

    const loginPage = new LoginPage(page);

    await test.step('Login with valid credentials', async () => {
      // Verify cart is initially empty using specific cart total selector
      await expect(page.locator('.cart-total-price')).toContainText('$0');
      
      await loginPage.doLogin('admin@admin.com', 'admin123');
    });

    await test.step('Add multiple products to cart', async () => {
      // Add two products using the working pattern
      await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
      await page.getByRole('button', { name: 'ADD TO CART' }).nth(1).click();

      // Verify each product was added (REMOVE buttons appear)
      await expect(page.getByRole('button', { name: 'REMOVE' })).toHaveCount(2);
      
      // Verify cart total updates correctly using specific cart selector
      await expect(page.locator('.cart-total-price')).toContainText('$29.98');
    });

    await test.step('Proceed to checkout', async () => {
      await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();

      // Verify shipping step is displayed
      await expect(page.getByRole('heading', { name: 'Shipping Details' })).toBeVisible();
      
      // Verify order summary shows correct subtotal using specific selector
      await expect(page.locator('#subtotal-value')).toContainText('$29.98');
    });

    await test.step('Fill in shipping form', async () => {
      await page.getByRole('textbox', { name: 'Phone Number *' }).fill('+1 (555) 123-4567');
      await page.getByRole('textbox', { name: 'Street Address *' }).fill('123 Main St');
      await page.getByRole('textbox', { name: 'City *' }).fill('New York');
      
      // Use the ID selector that works
      await page.locator('#countries_dropdown_menu').selectOption(['United States of America']);
    });

    await test.step('Verify Pay on Delivery is pre-selected', async () => {
      await expect(page.getByRole('radio', { name: 'Pay on Delivery' })).toBeChecked();
      await expect(page.getByRole('radio', { name: 'Online Payment' })).not.toBeChecked();
    });

    await test.step('Verify order summary totals', async () => {
      // Verify all monetary values using specific selectors to avoid duplicates
      await expect(page.locator('#subtotal-value')).toContainText('$29.98');
      await expect(page.getByText('$15.00').first()).toBeVisible();
      await expect(page.getByText('$44.98').first()).toBeVisible();
    });

    await test.step('Place the order and verify confirmation', async () => {
      await page.getByRole('button', { name: 'Place Order' }).click();

      await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();

      await page.getByRole('button', { name: 'Back to Home' }).click();

      // Verify cart is cleared after order placement using specific cart selector
      await expect(page.locator('.cart-total-price')).toContainText('$0');
    });
  });
});