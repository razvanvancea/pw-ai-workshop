# TAI Shop – Top 5 Missing Automated Test Cases

## Application Overview

TAI Shop is a sandbox e-commerce application (https://tai-shop.razvanvancea.ro) with the following pages and features: Login, Registration, Password Recovery, Product Listing (sort, paginate, favourite), Product Detail (reviews, meta), Shopping Cart (add, change quantity, remove), a 2-step Checkout (Shipping form → Online Payment card page OR Pay on Delivery → Order Confirmation), and a promo-code/voucher subsystem. Existing automated coverage includes: valid login, logout, account registration, and a basic "add to cart" assertion. The five scenarios below represent the highest-risk business flows with zero automated coverage today.

## Test Scenarios

### 1. End-to-End Checkout – Pay on Delivery @smoke

**Seed:** `tests/seed.spec.ts`

#### 1.1. should complete full order placement via Pay on Delivery @smoke

**File:** `tests/checkout-pay-on-delivery.spec.ts`

**Steps:**
  1. Navigate to https://tai-shop.razvanvancea.ro and log in with admin@admin.com / admin123
    - expect: The shopping cart panel and product grid are visible; 'Log Out' link is shown in the nav
  2. Click 'ADD TO CART' on the first product (Essence Mascara Lash Princess, $9.99)
    - expect: The product appears in the cart panel with quantity 1 and cart total shows $9.99
  3. Click the 'PROCEED TO CHECKOUT' button
    - expect: The Shipping Details form is displayed with step indicator showing step 1 of 2 (Shipping)
  4. Fill in Phone Number: '+1 (555) 123-4567', Street Address: '123 Main Street', City: 'New York', Country: 'United States of America'
    - expect: All fields are populated and the country dropdown shows 'United States of America'
  5. Verify that 'Pay on Delivery' radio button is selected by default
    - expect: The 'Pay on Delivery' option is pre-selected
  6. Verify the Order Summary section shows Subtotal $9.99, Shipping $15.00 and Total $24.99
    - expect: Subtotal is $9.99, Shipping is $15.00 and Total is $24.99
  7. Click the 'Place Order' button
    - expect: Page URL contains 'payment=completed', heading reads 'Order Confirmed!', order amount shows $24.99, shipping address shows '123 Main Street, New York, United States of America', and contact phone shows '+1 (555) 123-4567'

### 2. End-to-End Checkout – Online Card Payment

**Seed:** `tests/seed.spec.ts`

#### 2.1. should complete full order placement via Online Card Payment

**File:** `tests/checkout-card-payment.spec.ts`

**Steps:**
  1. Navigate to https://tai-shop.razvanvancea.ro and log in with admin@admin.com / admin123
    - expect: Product grid is visible and user is authenticated
  2. Click 'ADD TO CART' on any product (e.g. Red Lipstick, $12.99)
    - expect: Item appears in the cart with total $12.99
  3. Click 'PROCEED TO CHECKOUT'
    - expect: Shipping Details form (step 1) is displayed
  4. Fill in all required shipping fields: Phone Number, Street Address, City, Country
    - expect: All fields are valid and no inline errors appear
  5. Select the 'Online Payment' radio button
    - expect: The 'Online Payment' option becomes checked
  6. Click 'Place Order'
    - expect: Browser navigates to payment.html; page title contains 'Payment | TAI Shop'; a credit-card form is visible with fields: Cardholder Name, Card Number, Expiry Date, CVV; step indicator shows step 2 'Payment'
  7. Fill in Cardholder Name: 'Jane Smith', Card Number: '1234 5678 9012 3456', Expiry Date: '12/28', CVV: '321'
    - expect: All card fields are populated; the card preview at the top of the form updates with the entered values
  8. Click 'Complete Payment'
    - expect: Page URL contains 'payment=completed', heading reads 'Order Confirmed!', order amount is correct, and shipping address matches what was entered

### 3. Promo Code / Voucher Discount

**Seed:** `tests/seed.spec.ts`

#### 3.1. should apply valid promo code TAIVOUCHER30 and reduce total by 30%

**File:** `tests/promo-code.spec.ts`

**Steps:**
  1. Log in and add a product priced at $49.99 (Calvin Klein CK One) to the cart
    - expect: Cart total shows $49.99
  2. Click 'PROCEED TO CHECKOUT' and fill in all required shipping fields
    - expect: Shipping form is shown; Order Summary shows Subtotal $49.99, Shipping $15.00, Total $64.99
  3. In the Promo Code field, type 'TAIVOUCHER30' and click 'Apply'
    - expect: A success message 'Voucher applied! 30% discount' is displayed; Total is reduced by 30% of the subtotal (new total: ~$49.99 – 30% = $34.99 + $15.00 = $49.99 total, i.e. $49.99 × 0.7 + $15.00 = $49.99); confirm the displayed Total value equals the mathematically expected discounted amount
  4. Verify the Apply button cannot apply the same voucher a second time (click Apply again with the same code)
    - expect: The total does not decrease again; the voucher is only applied once

#### 3.2. should reject an invalid promo code

**File:** `tests/promo-code.spec.ts`

**Steps:**
  1. Log in, add a product to cart, proceed to checkout, and fill in required shipping fields
    - expect: Checkout shipping form is shown
  2. In the Promo Code field, type an invalid code 'INVALIDCODE99' and click 'Apply'
    - expect: An error or warning message is displayed indicating the code is not valid; the order total remains unchanged

### 4. Cart Management – Quantity Update and Item Removal

**Seed:** `tests/seed.spec.ts`

#### 4.1. should update total price when item quantity is changed in the cart

**File:** `tests/cart-management.spec.ts`

**Steps:**
  1. Log in and add 'Red Nail Polish' ($8.99) to the cart
    - expect: Cart shows 1 × Red Nail Polish, total $8.99
  2. In the cart panel, change the quantity spinbutton value from 1 to 3
    - expect: The cart total updates to $26.97 (3 × $8.99); the quantity spinner shows 3
  3. Change the quantity back to 1
    - expect: Cart total returns to $8.99

#### 4.2. should remove an item from the cart and reset total to $0

**File:** `tests/cart-management.spec.ts`

**Steps:**
  1. Log in and add any product to the cart
    - expect: Item appears in the cart and total is greater than $0
  2. Click the 'REMOVE' button next to the product in the cart
    - expect: The product row disappears from the cart; the cart total resets to $0; no 'REMOVE' button is visible

#### 4.3. should prevent checkout when the cart is empty @smoke

**File:** `tests/cart-management.spec.ts`

**Steps:**
  1. Log in without adding any items to the cart; verify total shows $0
    - expect: The SHOPPING CART panel shows $0 and no items
  2. Click 'PROCEED TO CHECKOUT' with an empty cart
    - expect: Either the checkout button is disabled OR a validation message appears preventing the user from progressing; the checkout shipping form is NOT shown

### 5. Checkout Shipping Form – Required Field Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. should block order placement when required shipping fields are empty

**File:** `tests/checkout-validation.spec.ts`

**Steps:**
  1. Log in, add a product to the cart, and click 'PROCEED TO CHECKOUT'
    - expect: Shipping Details form is shown with all fields empty
  2. Leave all required fields empty (Phone Number, Street Address, City, Country) and click 'Place Order'
    - expect: The form does NOT submit; validation error indicators or messages appear for each required field; the page remains on the Shipping form (no navigation to payment.html or order confirmation)
  3. Fill in only the Phone Number field and click 'Place Order' again
    - expect: Validation still prevents submission; remaining required fields (Street Address, City, Country) are highlighted as invalid
  4. Fill in all required fields with valid data and click 'Place Order'
    - expect: Form submits successfully and the user progresses to the next step (payment.html or order confirmation depending on selected payment method)

#### 5.2. should show a login error when invalid credentials are submitted

**File:** `tests/checkout-validation.spec.ts`

**Steps:**
  1. Navigate to the login page (https://tai-shop.razvanvancea.ro)
    - expect: Login form is visible
  2. Enter email 'wrong@example.com' and password 'wrongpassword' then click 'Sign In'
    - expect: An error message is displayed indicating invalid credentials; the user remains on the login page; the product grid is NOT shown
  3. Clear the fields, enter the correct credentials admin@admin.com / admin123, and click 'Sign In'
    - expect: Login succeeds; 'Log Out' link is visible; product grid is displayed
