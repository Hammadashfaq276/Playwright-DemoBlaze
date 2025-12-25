 import { Page, Locator, Dialog } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signupButton = page.locator("button[onclick='register()']");
  }

  async openSignupModal() {
    await this.page.click("#signin2");
    await this.page.waitForSelector("#signInModalLabel", { state: "visible" });
  }

  async fillSignupForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickSignup(): Promise<Dialog> {
    const dialog = await Promise.all([
      this.page.waitForEvent("dialog"),
      this.signupButton.click()
    ]);
    return dialog[0]; // Return the dialog for validation
  }
}
