 import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
    this.logoutButton = page.locator('#logout2');
    this.welcomeText = page.locator('#nameofuser');
  }

  async openLoginModal() {
    await this.page.click('#login2');
    await this.page.waitForSelector('#logInModalLabel', { state: 'visible' });
  }

  async loginUI(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginUI() {
    await this.welcomeText.waitFor({ state: 'visible' });
    const text = await this.welcomeText.textContent();
    return text?.includes('Welcome') ?? false;
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForSelector('#login2', { state: 'visible' });
  }
}
