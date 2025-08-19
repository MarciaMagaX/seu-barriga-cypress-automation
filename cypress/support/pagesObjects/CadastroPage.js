class CadastroPage {
  visit() {
    cy.visit('https://seubarriga.wcaquino.me/cadastro');
  }

  // Geração de dados únicos
  gerarEmailUnico(prefixo = 'usuario') {
    return `${prefixo}_${Date.now()}@teste.com`;
  }

  gerarNomeUnico(prefixo = 'Usuario') {
    return `${prefixo}_${Date.now()}`;
  }

  // Preenchimento de campos
  fillNome(nome) {
    cy.get('#nome').clear().type(nome);
  }

  fillEmail(email) {
    cy.get('#email').clear().type(email);
  }

  fillSenha(senha) {
    cy.get('input[type="password"]').clear().type(senha);
  }

  clickCadastrar() {
    cy.get('input[type="submit"]').click(); // Seletor mais robusto
  }

  cadastrarUsuario(nome, email, senha = '123456') {
    this.fillNome(nome);
    this.fillEmail(email);
    this.fillSenha(senha);
    this.clickCadastrar();
  }

  // Validações de sucesso
  shouldShowSuccessMessage() {
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  }
  // Adicione este método junto com as outras validações
  shouldNotShowSuccessMessage() {
    cy.contains('Usuário inserido com sucesso').should('not.exist');
  }
  shouldNotShowNomeObrigatorio() {
  cy.contains('Nome é um campo obrigatório').should('not.exist');
}
  // Validações de erro
  shouldShowNomeObrigatorio() {
    cy.contains('Nome é um campo obrigatório').should('be.visible');
  }

  shouldShowEmailObrigatorio() {
    cy.contains('Email é um campo obrigatório').should('be.visible');
  }

  shouldShowSenhaObrigatorio() {
    cy.contains('Senha é um campo obrigatório').should('be.visible');
  }

  shouldShowEmailDuplicado() {
    cy.contains('Endereço de email já utilizado').should('be.visible');
  }

  shouldShowSenhaCurta() {
    cy.contains('A senha deve conter no mínimo 6 caracteres').should('be.visible');
  }

  shouldShowEmailSemArroba() {
    // A validação é feita pelo navegador
    cy.get('#email:invalid').should('exist');
  }

  shouldShowEmailMultiplosArrobas() {
    // A validação é feita pelo navegador
    cy.get('#email:invalid').should('exist');
  }

  shouldShowEmailSemUsuario() {
    // A validação é feita pelo navegador
    cy.get('#email:invalid').should('exist');
  }

  shouldShowEmailSemDominio() {
    // A validação é feita pelo navegador
    cy.get('#email:invalid').should('exist');
  }
  
  // Novo método para validar o valor de um campo
  validateEmailInput(value) {
    cy.get('#email').should('have.value', value);
  }

  // Métodos para testar campos obrigatórios
  testarCampoObrigatorio(campo) {
    switch (campo) {
      case 'nome':
        this.fillEmail('teste@email.com');
        this.fillSenha('123456');
        this.clickCadastrar();
        this.shouldShowNomeObrigatorio();
        break;

      case 'email':
        this.fillNome('Carlos');
        this.fillSenha('123456');
        this.clickCadastrar();
        this.shouldShowEmailObrigatorio();
        break;

      case 'senha':
        this.fillNome('Carlos');
        this.fillEmail('carlos@teste.com');
        this.clickCadastrar();
        this.shouldShowSenhaObrigatorio();
        break;

      case 'todos':
        this.clickCadastrar();
        this.shouldShowNomeObrigatorio();
        this.shouldShowEmailObrigatorio();
        this.shouldShowSenhaObrigatorio();
        break;
    }
  }

  // Método para testar email duplicado
  testarEmailDuplicado(nome, email, senha = '123456') {
    // Primeiro cadastro
    this.cadastrarUsuario(nome, email, senha);
    this.shouldShowSuccessMessage();

    // Tentativa de cadastro duplicado
    this.visit();
    this.cadastrarUsuario('Usuário Cópia', email, senha);
    this.shouldShowEmailDuplicado();
  }
}

module.exports = new CadastroPage();