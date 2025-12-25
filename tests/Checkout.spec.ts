import { test } from '@playwright/test';
import { CheckoutPage } from '../Pages/CheckoutPage';

test('Demoblaze - checkout flow (UI + AddToCart API | POM)', async ({ page }) => {

  const checkout = new CheckoutPage(page);

  await page.goto('https://www.demoblaze.com/');

  await checkout.login('Hammad341', 'Hammad@341');

  await checkout.addFirstProductWithApiValidation();

  await checkout.openCartAndVerify();

  await checkout.placeOrder({
    name: 'Hammad',
    country: 'Pakistan',
    city: 'Lahore',
    card: '4111111111111111',
    month: '12',
    year: '2026'
  });

  await checkout.validatePurchaseSuccess();
});



