import { loginPage } from "../../support/loginPage";

describe("OrangeHRM Login Feature with POM & Fixtures", () => {
  beforeEach(() => {
    // Memanggil data dari fixture
    cy.fixture("loginData").as("user");
    loginPage.visit();
  });

  it("TC001 - Login dengan username & password valid", function () {
    loginPage.submitLogin(this.user.validUser.username, this.user.validUser.password);
    cy.url().should("include", "/dashboard");
  });

  it("TC002 - Login gagal dengan password salah", function () {
    loginPage.submitLogin(this.user.invalidPassword.username, this.user.invalidPassword.password);
    loginPage.errorMessage.should("contain", "Invalid credentials");
  });

  it("TC003 - Login gagal dengan username salah", function () {
    loginPage.submitLogin(this.user.invalidUsername.username, this.user.invalidUsername.password);
    loginPage.errorMessage.should("contain", "Invalid credentials");
  });

  it("TC004 - Login gagal dengan field kosong", function () {
    loginPage.submitLogin(null, null); 
    loginPage.requiredMessage.should("contain", "Required");
  });

  it("TC005 - Verifikasi halaman Forgot Password", function () {
    loginPage.forgotPassword.click();
    cy.url().should("include", "requestPasswordResetCode");
  });
});
