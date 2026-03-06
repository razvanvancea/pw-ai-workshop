import { test, expect } from '../fixtures/pages';

test.describe('Promo Code / Voucher Discount', () => {
  test('should apply valid promo code TAIVOUCHER30 and reduce total by 30%', async ({
    page,
    loginPage,
  }) => {
    // Prices defined as constants for mathematical verification
    const SUBTOTAL = 49.99;
    const SHIPPING = 15.0;
    const TOTAL_BEFORE_DISCOUNT = parseFloat((SUBTOTAL + SHIPPING).toFixed(2)); // $64.99
    const DISCOUNT_RATE = 0.3;
    // 30% discount is applied to the full total (subtotal + shipping)
    const TOTAL_AFTER_DISCOUNT = parseFloat(
      (TOTAL_BEFORE_DISCOUNT * (1 - DISCOUNT_RATE)).toFixed(2)
    ); // $45.49

    await test.step('Log in and add Calvin Klein CK One ($49.99) to cart', async () => {
      await page.goto(process.env.URL);
      await loginPage.login('admin@admin.com', 'admin123');
      await page
        .getByRole('link', { name: 'Calvin Klein CK One' })
        .locator('..')
        .getByRole('button', { name: 'ADD TO CART' })
        .click();
      await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
      // Verify cart total reflects the product price
      await expect(page.locator('strong').filter({ hasText: 'Total' }).locator('..')).toContainText(
        `$${SUBTOTAL}`
      );
    });

    await test.step('Proceed to checkout and verify Order Summary', async () => {
      await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
      await expect(page.getByRole('heading', { name: 'Shipping Details' })).toBeVisible();
      await page.getByRole('textbox', { name: 'Phone Number *' }).fill('+1 (555) 123-4567');
      await page.getByRole('textbox', { name: 'Street Address *' }).fill('123 Main Street');
      await page.getByRole('textbox', { name: 'City *' }).fill('New York');
      await page.locator('#countries_dropdown_menu').selectOption('United States of America');
      await expect(page.locator('#subtotal-value')).toHaveText(`$${SUBTOTAL}`);
      await expect(page.locator('#shipping-value')).toHaveText(`$${SHIPPING.toFixed(2)}`);
      await expect(page.locator('#total-value')).toHaveText(`$${TOTAL_BEFORE_DISCOUNT.toFixed(2)}`);
    });

    await test.step('Apply promo code TAIVOUCHER30 and verify discounted total', async () => {
      await page.getByPlaceholder('Enter promo code').fill('TAIVOUCHER30');
      await page.getByRole('button', { name: 'Apply' }).click();
      await expect(page.locator('#voucherMessage')).toContainText('Voucher applied! 30% discount');
      // Verify total is reduced by 30% (discount applies to the full total including shipping)
      await expect(page.locator('#total-value')).toHaveText(`$${TOTAL_AFTER_DISCOUNT.toFixed(2)}`);
      // Subtotal row remains unchanged
      await expect(page.locator('#subtotal-value')).toHaveText(`$${SUBTOTAL}`);
    });

    await test.step('Verify voucher cannot be applied a second time', async () => {
      await page.getByRole('button', { name: 'Apply' }).click();
      // Total must not decrease further; the voucher is only applied once
      await expect(page.locator('#total-value')).toHaveText(`$${TOTAL_AFTER_DISCOUNT.toFixed(2)}`);
    });
  });
});
