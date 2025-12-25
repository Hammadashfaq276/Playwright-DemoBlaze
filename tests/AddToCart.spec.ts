 import { test } from '@playwright/test';
import { CartPage } from '../Pages/CartPage';

test('Demoblaze - add 5 products & remove first product (UI + API | POM)', async ({ page }) => {

  const cart = new CartPage(page);

  await page.goto('https://www.demoblaze.com/');

  await cart.login('Hammad341', 'Hammad@341');

  await cart.addProductsWithApiValidation(5);

  await cart.openCart();

  await cart.removeFirstItemAndValidate();
});










