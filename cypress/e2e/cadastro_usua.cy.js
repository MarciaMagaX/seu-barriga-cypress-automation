/// <reference types="cypress" />

describe('Cadastro Usuário - Validações e Fluxos', () => {
  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/cadastro');
  });

  // Cadastro com dados válidos
  it('CT001 - Deve cadastrar com dados válidos', () => {
    const email = `sucesso_${Date.now()}@teste.com`;
    cy.get('#nome').type('Maria Teste');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });

  // Senha menor que 6 caracteres
  it('CT002 - Não deve permitir senha menor que 6 caracteres', () => {
    const email = `senha_curta_${Date.now()}@teste.com`;
    cy.get('#nome').type('Ana');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('123');
    cy.contains('Cadastrar').click();
    cy.contains('A senha deve conter no mínimo 6 caracteres').should('be.visible');
  });

  // Email com espaços antes/depois
  it('CT003 - Não deve permitir espaços antes/depois no email', () => {
    const email = ` espacos_${Date.now()}@email.com `;
    cy.get('#nome').type('Carlos');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('O email não deve conter espaços').should('be.visible');
  });

  // Nome apenas com números
  it('CT004 - Não deve permitir nome só com números', () => {
    const email = `num_${Date.now()}@email.com`;
    cy.get('#nome').type('123456');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('Teste123');
    cy.contains('Cadastrar').click();
    cy.contains('O nome deve conter apenas letras').should('be.visible');
  });

  // Nome com letras e números
  it('CT005 - Não deve permitir nome com letras e números', () => {
    const email = `lucas456_${Date.now()}@email.com`;
    cy.get('#nome').type('Lucas456');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('Teste456');
    cy.contains('Cadastrar').click();
    cy.contains('O nome deve conter apenas letras').should('be.visible');
  });

  // Nome em branco
  it('CT006 - Não deve permitir nome em branco', () => {
    cy.get('#email').type('teste@email.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Nome é um campo obrigatório').should('be.visible');
  });

  // Email em branco
  it('CT007 - Não deve permitir email em branco', () => {
    cy.get('#nome').type('Carlos');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Email é um campo obrigatório').should('be.visible');
  });

  // Senha em branco
  it('CT008 - Não deve permitir senha em branco', () => {
    cy.get('#nome').type('Carlos');
    cy.get('#email').type('carlos@teste.com');
    cy.contains('Cadastrar').click();
    cy.contains('Senha é um campo obrigatório').should('be.visible');
  });

  // Todos os campos em branco
  it('CT009 - Não deve permitir todos os campos em branco', () => {
    cy.contains('Cadastrar').click();
    cy.contains('Nome é um campo obrigatório').should('be.visible');
    cy.contains('Email é um campo obrigatório').should('be.visible');
    cy.contains('Senha é um campo obrigatório').should('be.visible');
  });

  // Todos os campos só com espaço em branco
  it('CT010 - Não deve permitir apenas espaços em todos os campos', () => {
    cy.get('#nome').type(' ');
    cy.get('#email').type(' ');
    cy.get('input[type="password"]').type(' ');
    cy.contains('Cadastrar').click();
    cy.contains('Nome é um campo obrigatório').should('be.visible');
    cy.contains('Email é um campo obrigatório').should('be.visible');
    cy.contains('Senha é um campo obrigatório').should('be.visible');
  });

  // Email inválido (sem @)
  it('CT011 - Não deve permitir email sem "@"', () => {
    cy.get('#nome').type('João');
    cy.get('#email').type('joao.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Inclua um “@” no endereço de e-mail').should('be.visible');
  });

  // Email com caracteres especiais inválidos
  it('CT012 - Não deve permitir email com múltiplos "@"', () => {
    cy.get('#nome').type('Joana');
    cy.get('#email').type('joana@@teste.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('A parte depois de “@” não deve conter o símbolo “@”').should('be.visible');
  });

  // Nome só com caracteres especiais
  it('CT013 - Não deve permitir nome só com caracteres especiais', () => {
    cy.get('#nome').type('&@*!@');
    cy.get('#email').type('maria@email.com');
    cy.get('input[type="password"]').type('Teste123');
    cy.contains('Cadastrar').click();
    cy.contains('O nome deve conter apenas letras').should('be.visible');
  });

  // Email já cadastrado
  it('CT014 - Não deve permitir email já cadastrado', () => {
    const emailDuplicado = `duplicado_${Date.now()}@teste.com`;
    // 1º cadastro com sucesso
    cy.get('#nome').type('Usuário Original');
    cy.get('#email').type(emailDuplicado);
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');

    // 2º tentativa com o mesmo e-mail
    cy.visit('https://seubarriga.wcaquino.me/cadastro');
    cy.get('#nome').type('Usuário Cópia');
    cy.get('#email').type(emailDuplicado);
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Endereço de email já utilizado').should('be.visible');
  });

  // Nome com letras acentuadas (exemplo de aceitação, ajuste se regra for diferente)
  it('CT015 - Deve permitir nome com letras acentuadas', () => {
    const email = `acentuado_${Date.now()}@teste.com`;
    cy.get('#nome').type('José Ávila');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('Teste123');
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });

  // Nome com espaço no meio (exemplo de aceitação, ajuste se regra for diferente)
  it('CT016 - Deve permitir nome composto', () => {
    const email = `composto_${Date.now()}@teste.com`;
    cy.get('#nome').type('Maria Clara');
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('Teste123');
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });

  // Email sem nome de usuário (ex: @teste.com)
  it('CT017 - Não deve permitir email sem nome de usuário', () => {
    cy.get('#nome').type('Gabriel');
    cy.get('#email').type('@teste.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Insira uma parte seguida por "@"').should('be.visible');
  });

  // Email mal formatado (ex: maria@)
  it('CT018 - Não deve permitir email sem domínio', () => {
    cy.get('#nome').type('Gabriela');
    cy.get('#email').type('maria@');
    cy.get('input[type="password"]').type('123456');
    cy.contains('Cadastrar').click();
    cy.contains('Insira um domínio de e-mail após "@"').should('be.visible');
  });

  // Nome com traço ou apóstrofo (exemplo de aceitação, ajuste se regra for diferente)
  it('CT019 - Deve permitir nome com traço ou apóstrofo', () => {
    const email = `tracoapostrofo_${Date.now()}@teste.com`;
    cy.get('#nome').type("Ana-Clara D'Ávila");
    cy.get('#email').type(email);
    cy.get('input[type="password"]').type('Teste123');
    cy.contains('Cadastrar').click();
    cy.contains('Usuário inserido com sucesso').should('be.visible');
  });
});