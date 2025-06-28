// cypress/support/pageObjects/LoginPage.js

class LoginPage {
  accessPageLogin() {
    cy.visit('/login'); // ajuste a rota se necessário
  }

  fillEmail(email) {
    cy.get('[data-test=email], #email, input[name=email]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-test=senha], #senha, input[name=senha]').clear().type(password);
  }

  submit() {
    cy.get('[data-test=login-submit], .btn-login, button[type=submit]').click();
  }

  getEmailError() {
    return cy.contains(/email.*obrigatório|email.*inválido|inclua um "@"/i);
  }

  getPasswordError() {
    return cy.contains(/senha.*obrigatório|min.*caracteres/i);
  }

  getGenericError() {
    return cy.contains(/problema com o login|usuário/i);
  }

  getWelcomeMessage() {
    return cy.contains(/bem vindo/i);
  }
}

export default new LoginPage();