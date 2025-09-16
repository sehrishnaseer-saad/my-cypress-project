import LoginPage from '../pages/LoginPage';

describe('Login', () => {
  it('Verify student can login', () => {
    const page = new LoginPage();
    const randomEmail = `user_${Math.random().toString(36).substring(2, 10)}@mailinator.com`;

    page.visit();
    page.clickSignin();
    page.enterEmail(randomEmail);
    page.enterPassword('password123');
    page.clickLogin();
    page.takeScreenshot('login-error-message');
  });
});




