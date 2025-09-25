// cypress/e2e/login.cy.js

describe("Login Page Visual Regression", () => {
  it("should match the login page snapshot", () => {
    cy.visit("https://example.com/login", { failOnStatusCode: false });
  // 👈 Go to the login page
    cy.compareSnapshot("login-page", { errorThreshold: 0.05 });
    // "login-page" = snapshot name
    // 0.05 = allow 5% pixel diff
  });
});
