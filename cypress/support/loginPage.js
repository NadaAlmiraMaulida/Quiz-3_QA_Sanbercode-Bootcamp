class LoginPage {
  // Selectors
  get usernameInput() { return cy.get('input[name="username"]'); }
  get passwordInput() { return cy.get('input[name="password"]'); }
  get loginButton() { return cy.get('button[type="submit"]'); }
  get errorMessage() { return cy.get(".oxd-alert-content-text"); }
  get requiredMessage() { return cy.get(".oxd-input-group > .oxd-text"); }
  get forgotPassword() { return cy.get(".orangehrm-login-forgot > .oxd-text"); }

  // Actions 
  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }

  submitLogin(username, password) {
    if (username) this.usernameInput.type(username);
    if (password) this.passwordInput.type(password);
    this.loginButton.click();
  }
}

export const loginPage = new LoginPage();