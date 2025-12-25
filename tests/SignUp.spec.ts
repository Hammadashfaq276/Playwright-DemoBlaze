import { test, expect } from "@playwright/test";

test("UI signup triggers API → validate payload & alert", async ({ page }) => {

  // 🔹 Unique username to ensure success alert
  const timestamp = Date.now();
  const username = `user_${timestamp}`;
  const password = "pass123";

  // -------- OPEN PAGE & MODAL --------
  await page.goto("https://demoblaze.com/");
  await page.click("#signin2");
  await page.waitForSelector("#signInModalLabel", { state: "visible" });

  // -------- ENTER USER DATA --------
  await page.fill("#sign-username", username);
  await page.fill("#sign-password", password);

  console.log("🧑 UI entered data:", username);

  // -------- INTERCEPT API REQUEST --------
  let apiPayload: { username: string; password: string } | null = null;
  await page.route('https://api.demoblaze.com/signup', async route => {
    const request = route.request();
    const postData = request.postData();
    if (postData) {
      apiPayload = JSON.parse(postData);
    }
    // Mock successful response to ensure alert appears
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({})
    });
  });

  // -------- CLICK SIGNUP → ALERT --------
  const [dialog] = await Promise.all([
    page.waitForEvent("dialog"),
    page.click("button[onclick='register()']")
  ]);

  // -------- VALIDATE API PAYLOAD --------
  expect(apiPayload).not.toBeNull();
  expect(apiPayload!.username).toBe(username);

  // Decode Base64 password
  const decodedPassword = Buffer.from(apiPayload!.password, 'base64').toString('utf-8');
  expect(decodedPassword).toBe(password);

  console.log("🚀 API payload validated:", apiPayload);

  // -------- VALIDATE UI ALERT --------
  await page.waitForTimeout(2000); // Allow alert to be visible
  expect(dialog.message()).toBe("Sign up successful.");  // real alert
  await dialog.accept();

  console.log("✅ UI Signup alert validated and accepted for user:", username);
});



















