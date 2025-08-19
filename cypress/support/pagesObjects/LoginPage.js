// cypress/support/pageObjects/LoginPage.js

class LoginPage {
  visit() {
    cy.visit('https://seubarriga.wcaquino.me/login');
  }

  // Geração de dados únicos
  gerarEmailUnico(prefixo = 'usuario') {
    return `${prefixo}_${Date.now()}@teste.com`;
  }

  gerarNomeUnico(prefixo = 'Usuario') {
    return `${prefixo}_${Date.now()}`;
  }

  // Preenchimento de campos
  fillEmail(email) {
    cy.get('#email').clear().type(email);
  }

  fillPassword(password) {
    cy.get('#senha').clear().type(password);
  }

  clickEntrar() {
    cy.get('button[type="submit"]').click();
  }

  fazerLogin(email, senha) {
    this.fillEmail(email);
    this.fillPassword(senha);
    this.clickEntrar();
  }

  // Validações de sucesso
  shouldShowWelcomeMessage() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Bem vindo');
  }

  // Validações de erro
  shouldShowEmailObrigatorio() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Email é um campo obrigatório');
  }

  shouldShowSenhaObrigatorio() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Senha é um campo obrigatório');
  }

  shouldShowProblemasLogin() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Problemas com o login do usuário');
  }

  shouldShowEmailSemArroba() {
    cy.get('#email').then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      expect(message).to.include('Inclua um "@" no endereço de e-mail');
    });
  }

shouldShowEmailMultiplosArrobas() {
  cy.get('#email:invalid').then(($input) => {
    const mensagem = $input[0].validationMessage;    
    // Verificamos apenas as partes essenciais da mensagem, ignorando as aspas
    expect(mensagem).to.include('A parte depois de "@" não deve conter o símbolo');
  });
}
shouldShowEmailError() {
  cy.get('#email:invalid').then(($input) => {
    const mensagem = $input[0].validationMessage;    
    // Verificamos apenas as partes essenciais da mensagem, ignorando as aspas
    expect(mensagem).to.include('Inclua um "@" no endereço de e-mail');
  });
}
  shouldShowEmailSemUsuario() {
    cy.get('#email:invalid').then(($input) => {
    const mensagem = $input[0].validationMessage;    
    // Verificamos apenas as partes essenciais da mensagem, ignorando as aspas
    expect(mensagem).to.include('Insira uma parte seguida por');
  });
  }

  shouldShowEmailSemDominio() {
    cy.get('.alert').should('be.visible').and('contain.text', 'Insira um domínio de e-mail após "@"');
  }

  // Métodos para testar campos obrigatórios
  testarCampoObrigatorio(campo) {
    switch (campo) {
      case 'email':
        this.fillPassword('123456');
        this.clickEntrar();
        this.shouldShowEmailObrigatorio();
        break;
        
      case 'senha':
        this.fillEmail('teste@email.com');
        this.clickEntrar();
        this.shouldShowSenhaObrigatorio();
        break;
        
      case 'ambos':
        this.clickEntrar();
        this.shouldShowEmailObrigatorio();
        this.shouldShowSenhaObrigatorio();
        break;
    }
  }

  // Método para fazer logout
  fazerLogout() {
    cy.contains('Sair').click();
    cy.contains('Login').should('be.visible');
  }

  // Método para testar múltiplas tentativas de login
  testarMultiplasTentativas(email, senhaErrada, tentativas = 3) {
    for (let i = 0; i < tentativas; i++) {
      this.fillEmail(email);
      this.fillPassword(senhaErrada);
      this.clickEntrar();
      this.shouldShowProblemasLogin();
    }
  }

  // Verificações de URL
  shouldBeOnLoginPage() {
    cy.url().should('include', '/login');
  }

  shouldBeOnHomePage() {
    // O sistema pode redirecionar para /logar ou /home
    cy.url().should('match', /\/home|\/logar/);
  }

  // Verificação de redirecionamento após login
  shouldBeLoggedIn() {
    // O sistema pode redirecionar para /logar ou /home
    cy.url().should('match', /\/home|\/logar/);
    this.shouldShowWelcomeMessage();
  }

  // Verificação de redirecionamento após logout
  shouldBeLoggedOut() {
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  }

  // Aguardar elementos
  waitForElement(selector, timeout = 30000) {
    cy.get(selector, { timeout }).should('be.visible');
  }

  waitForText(text, timeout = 30000) {
    cy.contains(text, { timeout }).should('be.visible');
  }

  // Aguardar tempo específico
  wait(ms) {
    cy.wait(ms);
  }
}

module.exports = new LoginPage();