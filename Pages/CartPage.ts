 import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly products: Locator;
  readonly deleteLinks: Locator;

  constructor(private page: Page) {
    this.products = page.locator('.card-title a');
    this.deleteLinks = page.locator('a:has-text("Delete")');
  }

  // 🔐 Login
  async login(username: string, password: string) {
    await this.page.click('#login2');
    await this.page.fill('#loginusername', username);
    await this.page.fill('#loginpassword', password);
    await this.page.click('button:has-text("Log in")');
    await expect(this.page.locator('#nameofuser')).toContainText('Welcome');
  }

  // 🛒 Add N products with API validation
  async addProductsWithApiValidation(count: number) {
    for (let i = 0; i < count; i++) {
      await this.products.nth(i).click();

      const responsePromise = this.page.waitForResponse(
        res => res.url().includes('/addtocart') && res.status() === 200
      );

      this.page.once('dialog', d => d.accept());
      await this.page.click('a:has-text("Add to cart")');

      const response = await responsePromise;
      expect(response.status()).toBe(200);

      const body = JSON.parse(response.request().postData()!);
      expect(body).toHaveProperty('prod_id');

      await this.page.click('a:has-text("Home")');
    }
  }

  // 🧾 Open cart
  async openCart() {
    await this.page.click('#cartur');
    await this.deleteLinks.first().waitFor({ state: 'visible' });
  }

  async getCartCount(): Promise<number> {
    return await this.deleteLinks.count();
  }

  // ❌ Remove first item & validate decrease
  async removeFirstItemAndValidate() {
    const initialCount = await this.getCartCount();
    expect(initialCount).toBeGreaterThan(0);

    await this.deleteLinks.first().click();

    await expect.poll(async () => {
      const currentCount = await this.getCartCount();
      return currentCount < initialCount;
    }).toBeTruthy();
  }
}
