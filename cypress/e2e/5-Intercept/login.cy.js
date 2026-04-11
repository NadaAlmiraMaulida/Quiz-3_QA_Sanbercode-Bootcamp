describe("OrangeHRM Login Feature - Intercept Implementation", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

  it("TC001 - Login Berhasil (Intercept Action Summary)", () => {
    // Intercept API dashboard setelah login berhasil
    cy.intercept("GET", "**/api/v2/dashboard/employees/action-summary").as("actionSummary");

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    // Validasi
    cy.wait("@actionSummary").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/dashboard");
  });

  it("TC002 - Login Gagal Password Salah (Intercept Validate)", () => {
    // Intercept API pengecekan kredensial (POST)
    cy.intercept("POST", "**/auth/validate").as("loginAuth");

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("salah123");
    cy.get('button[type="submit"]').click();

    // Validasi
    cy.wait("@loginAuth").its("response.statusCode").should("be.oneOf", [200, 302]);
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC003 - Login Gagal Username Salah (Intercept Localization)", () => {
    // Intercept request file bahasa/messages yang dipanggil saat error muncul
    cy.intercept("GET", "**/core/i18n/messages").as("languageData");

    cy.get('input[name="username"]').type("SalahUser");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.wait("@languageData");
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("TC004 - Cek Header Login (Intercept Branding Image)", () => {
    // Intercept loading asset gambar logo
    cy.intercept("GET", "**/branding/images/ohrm_logo.png").as("getLogo");

    // Validasi elemen terlihat
    cy.get('img[alt="orangehrm-logo"]').should("be.visible");

    // Memastikan asset gambar berhasil di-load
    cy.wait("@getLogo").its("response.statusCode").should("eq", 200);
  });

  it("TC0085 - Klik Forgot Password (Intercept Reset Password Page)", () => {
    // Intercept request ke endpoint reset password
    cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgotPassRequest");

    cy.contains("Forgot your password?").click();

    // Validasi: Pastikan halaman tujuan merespon dengan baik
    cy.wait("@forgotPassRequest").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "requestPasswordResetCode");
  });
});
