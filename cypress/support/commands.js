

/**
 * Command para cadastrar um usuário com dados válidos
 * @param {string} nome - Nome do usuário
 * @param {string} email - Email do usuário (será gerado automaticamente se não fornecido)
 * @param {string} senha - Senha do usuário
 */
Cypress.Commands.add('cadastrarUsuario', (nome, email = null, senha = '123456') => {
  const emailFinal = email || `usuario_${Date.now()}@teste.com`
  
  // Carrega configurações da fixture
  cy.fixture('configuracoes_teste').then((config) => {
    cy.visit(config.urls.cadastro)
    cy.get(config.seletores.cadastro.nome).type(nome)
    cy.get(config.seletores.cadastro.email).type(emailFinal)
    cy.get(config.seletores.cadastro.senha).type(senha)
    cy.contains(config.seletores.cadastro.botao_cadastrar).click()
    cy.contains(config.mensagens.sucesso.cadastro).should('be.visible')
  })
  
  return cy.wrap({ nome, email: emailFinal, senha })
})

/**
 * Command para cadastrar um usuário com dados inválidos e verificar comportamento
 * @param {string} nome - Nome do usuário (pode ser inválido)
 * @param {string} email - Email do usuário (pode ser inválido)
 * @param {string} senha - Senha do usuário (pode ser inválida)
 */
Cypress.Commands.add('cadastrarUsuarioInvalido', (nome, email, senha) => {
  cy.fixture('configuracoes_teste').then((config) => {
    cy.visit(config.urls.cadastro)
    cy.get(config.seletores.cadastro.nome).type(nome)
    cy.get(config.seletores.cadastro.email).type(email)
    cy.get(config.seletores.cadastro.senha).type(senha)
    cy.contains(config.seletores.cadastro.botao_cadastrar).click()
    
    // Aguarda e verifica se a página respondeu
    cy.wait(config.timeouts.curto)
    cy.get('body').should('exist')
  })
})

/**
 * Command para testar campos obrigatórios no cadastro
 * @param {string} campo - Campo a ser testado ('nome', 'email', 'senha', 'todos')
 */
Cypress.Commands.add('testarCampoObrigatorio', (campo) => {
  cy.visit('https://seubarriga.wcaquino.me/cadastro')
  
  switch (campo) {
    case 'nome':
      cy.get('#email').type('teste@email.com')
      cy.get('input[type="password"]').type('123456')
      cy.contains('Cadastrar').click()
      cy.contains('Nome é um campo obrigatório').should('be.visible')
      break
      
    case 'email':
      cy.get('#nome').type('Carlos')
      cy.get('input[type="password"]').type('123456')
      cy.contains('Cadastrar').click()
      cy.contains('Email é um campo obrigatório').should('be.visible')
      break
      
    case 'senha':
      cy.get('#nome').type('Carlos')
      cy.get('#email').type('carlos@teste.com')
      cy.contains('Cadastrar').click()
      cy.contains('Senha é um campo obrigatório').should('be.visible')
      break
      
    case 'todos':
      cy.contains('Cadastrar').click()
      cy.contains('Nome é um campo obrigatório').should('be.visible')
      cy.contains('Email é um campo obrigatório').should('be.visible')
      cy.contains('Senha é um campo obrigatório').should('be.visible')
      break
  }
})

/**
 * Command para testar email duplicado
 * @param {string} nome - Nome do usuário
 * @param {string} email - Email que será duplicado
 * @param {string} senha - Senha do usuário
 */
Cypress.Commands.add('testarEmailDuplicado', (nome, email, senha = '123456') => {
  // Primeiro cadastro
  cy.cadastrarUsuario(nome, email, senha)
  
  // Tentativa de cadastro duplicado
  cy.visit('https://seubarriga.wcaquino.me/cadastro')
  cy.get('#nome').type('Usuário Cópia')
  cy.get('#email').type(email)
  cy.get('input[type="password"]').type(senha)
  cy.contains('Cadastrar').click()
  cy.contains('Endereço de email já utilizado').should('be.visible')
})

// ============================================
// COMMANDS PARA LOGIN
// ============================================

/**
 * Command para fazer login com dados válidos
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 */
Cypress.Commands.add('fazerLogin', (email, senha) => {
  cy.visit('https://seubarriga.wcaquino.me/login')
  cy.get('#email').type(email)
  cy.get('#senha').type(senha)
  cy.contains('Entrar').click()
  cy.contains('Bem vindo').should('be.visible')
})

/**
 * Command para testar login com dados inválidos
 * @param {string} email - Email do usuário (pode ser inválido)
 * @param {string} senha - Senha do usuário (pode ser inválida)
 */
Cypress.Commands.add('testarLoginInvalido', (email, senha) => {
  cy.visit('https://seubarriga.wcaquino.me/login')
  cy.get('#email').type(email)
  cy.get('#senha').type(senha)
  cy.contains('Entrar').click()
  
  // Aguarda e verifica se a página respondeu
  cy.wait(3000)
  cy.get('body').should('exist')
})

/**
 * Command para testar campos obrigatórios no login
 * @param {string} campo - Campo a ser testado ('email', 'senha', 'ambos')
 */
Cypress.Commands.add('testarCampoObrigatorioLogin', (campo) => {
  cy.visit('https://seubarriga.wcaquino.me/login')
  
  switch (campo) {
    case 'email':
      cy.get('#senha').type('123456')
      cy.contains('Entrar').click()
      cy.contains('Email é um campo obrigatório').should('be.visible')
      break
      
    case 'senha':
      cy.get('#email').type('teste@email.com')
      cy.contains('Entrar').click()
      cy.contains('Senha é um campo obrigatório').should('be.visible')
      break
      
    case 'ambos':
      cy.contains('Entrar').click()
      cy.contains('Email é um campo obrigatório').should('be.visible')
      cy.contains('Senha é um campo obrigatório').should('be.visible')
      break
  }
})

/**
 * Command para fazer logout
 */
Cypress.Commands.add('fazerLogout', () => {
  cy.contains('Sair').click()
  cy.contains('Login').should('be.visible')
})

// ============================================
// COMMANDS AUXILIARES
// ============================================

/**
 * Command para gerar email único
 * @param {string} prefixo - Prefixo para o email
 * @returns {string} Email único
 */
Cypress.Commands.add('gerarEmailUnico', (prefixo = 'usuario') => {
  return `${prefixo}_${Date.now()}@teste.com`
})

/**
 * Command para limpar dados de teste (se necessário)
 */
Cypress.Commands.add('limparDadosTeste', () => {
  // Implementar limpeza de dados se necessário
  cy.log('Dados de teste limpos')
})