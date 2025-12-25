 import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly products: Locator;
  readonly cartRows: Locator;

  constructor(private page: Page) {
    this.products = page.locator('.card-title a');
    this.cartRows = page.locator('#tbodyid > tr');
  }

  // 🔐 Login
  async login(username: string, password: string) {
    await this.page.click('#login2');
    await this.page.fill('#loginusername', username);
    await this.page.fill('#loginpassword', password);
    await this.page.click('button:has-text("Log in")');
    await expect(this.page.locator('#nameofuser')).toContainText('Welcome');
  }

  // 🛒 Add first product with API validation
  async addFirstProductWithApiValidation() {
    await this.products.first().click();

    const responsePromise = this.page.waitForResponse(
      res => res.url().includes('/addtocart') && res.status() === 200
    );

    this.page.once('dialog', d => d.accept());
    await this.page.click('a:has-text("Add to cart")');

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    const body = JSON.parse(response.request().postData()!);
    expect(body).toHaveProperty('prod_id');
  }

  // 🧾 Open cart & verify product
  async openCartAndVerify() {
    await this.page.click('#cartur');
    await expect(this.cartRows.first()).toBeVisible();
  }

  // 🛍️ Place order & fill checkout form
  async placeOrder(details: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
    await this.page.click('button:has-text("Place Order")');
    await expect(this.page.locator('#orderModal')).toBeVisible();

    await this.page.fill('#name', details.name);
    await this.page.fill('#country', details.country);
    await this.page.fill('#city', details.city);
    await this.page.fill('#card', details.card);
    await this.page.fill('#month', details.month);
    await this.page.fill('#year', details.year);

    await this.page.click('button:has-text("Purchase")');
  }

  // 🎉 Validate success popup
  async validatePurchaseSuccess() {
    const successPopup = this.page.locator('.sweet-alert');
    await expect(successPopup).toBeVisible();
    await expect(successPopup).toContainText('Thank you for your purchase!');
    await this.page.click('button:has-text("OK")');
  }
}
