class LoginPage {
  signinBtn = '#signin';
  emailField = 'input[name="email"]';
  passwordField = 'input[name="password"]';
  submitBtn = 'button[type="submit"].width_login';

  visit() {
    cy.visit('https://int.ilmzone.com');
  }

  clickSignin() {
    cy.get(this.signinBtn).click();
  }

  enterEmail(email) {
    cy.get(this.emailField).type(email);
  }

  enterPassword(password) {
    cy.get(this.passwordField).type(password);
  }

  clickLogin() {
    cy.get(this.submitBtn).click();
  }

  takeScreenshot(name) {
    cy.screenshot(name);
  }
}

export default LoginPage;
