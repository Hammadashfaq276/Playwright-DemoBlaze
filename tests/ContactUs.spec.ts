 import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../Pages/ContactUsPage';

test('Demoblaze Contact Us UI + API validation (POM)', async ({ page }) => {

  const contactData = {
    name: 'Hammad',
    email: 'hammad@test.com',
    message: 'This is a test message from Playwright'
  };

  const contactUsPage = new ContactUsPage(page);

  // -------- OPEN HOMEPAGE --------
  await page.goto('https://www.demoblaze.com/');

  // -------- INTERCEPT CONTACT API --------
  await page.route('**/contact', async (route) => {
    const request = route.request();
    const postData = request.postDataJSON();

    console.log('Intercepted API payload:', postData);

    // Validate API payload matches UI data
    expect(postData.name).toBe(contactData.name);
    expect(postData.email).toBe(contactData.email);
    expect(postData.message).toBe(contactData.message);

    // Respond with simulated success
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success' })
    });
  });

  // -------- OPEN MODAL & FILL FORM --------
  await contactUsPage.openModal();
  await contactUsPage.fillForm(contactData.name, contactData.email, contactData.message);

  // -------- SEND FORM & HANDLE ALERT STABLY --------
  const alertMessage = await contactUsPage.sendForm();
  console.log('UI alert message:', alertMessage);
  expect(alertMessage).toContain('Thanks'); // optional check

  console.log('✅ Contact Us UI + API validation completed successfully');
});
