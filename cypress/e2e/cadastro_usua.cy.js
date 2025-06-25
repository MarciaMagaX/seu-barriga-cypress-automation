/// <reference types="cypress" />

describe('Cadastro com dados válidos - Seu Barriga', () => {
  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/cadastro')
  })

  it('CT001 - Cadastro com dados válidos', () => {
    const email = `sucesso_${Date.now()}@teste.com`
    cy.get('#nome').type('Maria Teste')
    cy.get('#email').type(email)
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')
  })

  it('CT002 - Senha curta', () => {
    const email = `senha_curta_${Date.now()}@teste.com`
    cy.get('#nome').type('Ana')
    cy.get('#email').type(email)
    cy.get('input[type="password"]').type('123')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')
  })

  it('CT003 - Email com espaços antes e depois', () => {
    const email = `   espacos_${Date.now()}@email.com   `
    cy.get('#nome').type('Carlos')
    cy.get('#email').type(email)
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')
  })

  it('CT004 - Nome com números', () => {
    const email = `num_${Date.now()}@email.com`
    cy.get('#nome').type('123456')
    cy.get('#email').type(email)
    cy.get('input[type="password"]').type('Teste123')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')
  })

  it('CT005 - Nome com letras e números', () => {
    const email = `lucas456_${Date.now()}@email.com`
    cy.get('#nome').type('Lucas456')
    cy.get('#email').type(email)
    cy.get('input[type="password"]').type('Teste456')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')
  })
})


/// <reference types="cypress" />

describe('Validação de campos obrigatórios e erros - Seu Barriga', () => {
  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/cadastro')
  })

  it('CT006 - Nome em branco', () => {
    cy.get('#email').type('teste@email.com')
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Nome é um campo obrigatório').should('be.visible')
  })

  it('CT007 - Email em branco', () => {
    cy.get('#nome').type('Carlos')
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Email é um campo obrigatório').should('be.visible')
  })

  it('CT008 - Senha em branco', () => {
    cy.get('#nome').type('Carlos')
    cy.get('#email').type('carlos@teste.com')
    cy.contains('Cadastrar').click()
    cy.contains('Senha é um campo obrigatório').should('be.visible')
  })

  it('CT009 - Todos os campos em branco', () => {
    cy.contains('Cadastrar').click()
    cy.contains('Nome é um campo obrigatório').should('be.visible')
    cy.contains('Email é um campo obrigatório').should('be.visible')
    cy.contains('Senha é um campo obrigatório').should('be.visible')
  })

  it('CT010 - Campos com espaços em branco', () => {
    cy.get('#nome').type('     ')
    cy.get('#email').type('     ')
    cy.get('input[type="password"]').type('     ')
    cy.contains('Cadastrar').click()
    cy.contains('Nome é um campo obrigatório').should('be.visible')
    cy.contains('Email é um campo obrigatório').should('be.visible')
    cy.contains('Senha é um campo obrigatório').should('be.visible')
  })

  it('CT011 - Email inválido (sem @)', () => {
    cy.get('#nome').type('João')
    cy.get('#email').type('joao.com')
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Inclua um “@” no endereço de e-mail').should('be.visible')
  })

  it('CT012 - Caracteres especiais no email', () => {
    cy.get('#nome').type('Teste')
    cy.get('#email').type('teste@@teste.com')
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('A parte depois de “@” não deve conter o símbolo “@”').should('be.visible')
  })

  it('CT013 - Nome com caracteres especiais e email inválido', () => {
    cy.get('#nome').type('&@*!@')
    cy.get('#email').type('mariaemail.com')
    cy.get('input[type="password"]').type('Teste123')
    cy.contains('Cadastrar').click()
    cy.contains('Inclua um “@” no endereço de e-mail').should('be.visible')
  })

  it('CT014 - Email já cadastrado', () => {
    const emailDuplicado = `duplicado_${Date.now()}@teste.com`

    cy.get('#nome').type('Usuário Original')
    cy.get('#email').type(emailDuplicado)
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Usuário inserido com sucesso').should('be.visible')

    // tenta cadastrar de novo com o mesmo email
    cy.visit('https://seubarriga.wcaquino.me/cadastro')
    cy.get('#nome').type('Usuário Cópia')
    cy.get('#email').type(emailDuplicado)
    cy.get('input[type="password"]').type('123456')
    cy.contains('Cadastrar').click()
    cy.contains('Endereço de email já utilizado').should('be.visible')
  })
})
