describe("OrangeHRM Login Feature", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

  it("TC001 - Login dengan username valid & password valid", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
  });

  it("TC002 - Login gagal dengan password salah", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("salah123");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC003 - Login gagal dengan username salah", () => {
    cy.get('input[name="username"]').type("SalahUser");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC004 - Login gagal dengan field kosong", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC005 - Login hanya isi username", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC006 - Login hanya isi password", () => {
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.contains("Required").should("be.visible");
  });

  it("TC007 - Verifikasi elemen login tampil", () => {
    cy.get("h5.oxd-text.oxd-text--h5.orangehrm-login-title").should("be.visible");

    cy.get('img[alt="orangehrm-logo"]').should("be.visible");

    cy.get('input[name="username"]').should("be.visible");

    cy.get('input[name="password"]').should("be.visible");

    cy.get('button[type="submit"]').should("be.visible");
  });

  it("TC008 - Klik Forgot Password", () => {
    cy.contains("Forgot your password?").should("be.visible").click();

    cy.url().should("include", "requestPasswordResetCode");
  });
});
