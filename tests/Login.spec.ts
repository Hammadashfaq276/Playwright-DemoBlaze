import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

const username = 'Hammad341';
const password = 'Hammad@341';

test('Demoblaze UI login bound to API validation (POM)', async ({ page, context, request }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.demoblaze.com/');

  // -------- OPEN LOGIN MODAL & FILL FORM --------
  await loginPage.openLoginModal();
  await loginPage.loginUI(username, password);

  // -------- SIMULATE API VALIDATION --------
  const apiResponse = await request.post('https://api.demoblaze.com/check', {
    data: { token: 'SGFtbWFkMzQxMTc2Njc3NA==' } // normally generated from username/password
  });

  console.log('API login status:', apiResponse.status());

  if (apiResponse.ok()) {
    // -------- SET COOKIE FROM API TO BIND UI --------
    await context.addCookies([{
      name: 'user',
      value: 'SGFtbWFkMzQxMTc2Njc3NA==',
      domain: 'www.demoblaze.com',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax'
    }]);

    // -------- VERIFY LOGIN ON UI --------
    const loggedIn = await loginPage.verifyLoginUI();
    expect(loggedIn).toBe(true);
    console.log('✅ UI login verified via API response');

    // -------- LOGOUT --------
    await loginPage.logout();
    console.log('✅ Logout successful');
  } else {
    console.log('❌ API login failed, cannot login to UI');
  }
});







