 import { Page, Locator } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly openModalLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openModalLink = page.locator('a[data-target="#exampleModal"]');
    this.nameInput = page.locator('#recipient-name');
    this.emailInput = page.locator('#recipient-email');
    this.messageInput = page.locator('#message-text');
    this.sendButton = page.locator('button[onclick="send()"]');
  }

  async openModal() {
    await this.openModalLink.click();
    await this.page.waitForSelector('#exampleModal', { state: 'visible' });
  }

  async fillForm(name: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  // 🔑 Stable sendForm: capture dialog message and accept inside
  async sendForm(): Promise<string> {
    return new Promise(async (resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
      await this.sendButton.click();
    });
  }
}

