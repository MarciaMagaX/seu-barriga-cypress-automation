/// <reference types="cypress" />

describe('Exemplo de uso dos Commands Personalizados', () => {
  
  describe('Commands de Cadastro', () => {
    
    it('Exemplo: Cadastrar usuário válido', () => {
      cy.cadastrarUsuario('João Silva', null, '123456')
      // O email será gerado automaticamente
    })
    
    it('Exemplo: Cadastrar usuário com email específico', () => {
      cy.cadastrarUsuario('Maria Santos', 'maria@teste.com', 'senha123')
    })
    
    it('Exemplo: Testar campo obrigatório - nome', () => {
      cy.testarCampoObrigatorio('nome')
    })
    
    it('Exemplo: Testar campo obrigatório - email', () => {
      cy.testarCampoObrigatorio('email')
    })
    
    it('Exemplo: Testar campo obrigatório - senha', () => {
      cy.testarCampoObrigatorio('senha')
    })
    
    it('Exemplo: Testar todos os campos obrigatórios', () => {
      cy.testarCampoObrigatorio('todos')
    })
    
    it('Exemplo: Cadastrar usuário com dados inválidos', () => {
      cy.cadastrarUsuarioInvalido('     ', 'email_invalido', '     ')
    })
    
    it('Exemplo: Testar email duplicado', () => {
      const email = cy.gerarEmailUnico('duplicado')
      cy.testarEmailDuplicado('Usuário Original', email, '123456')
    })
  })
  
  describe('Commands de Login', () => {
    
    it('Exemplo: Fazer login válido', () => {
      // Primeiro cadastra um usuário
      cy.cadastrarUsuario('Usuário Login', null, '123456').then((usuario) => {
        // Depois faz login
        cy.fazerLogin(usuario.email, usuario.senha)
      })
    })
    
    it('Exemplo: Testar login inválido', () => {
      cy.testarLoginInvalido('email_invalido@teste.com', 'senha_errada')
    })
    
    it('Exemplo: Testar campo obrigatório no login - email', () => {
      cy.testarCampoObrigatorioLogin('email')
    })
    
    it('Exemplo: Testar campo obrigatório no login - senha', () => {
      cy.testarCampoObrigatorioLogin('senha')
    })
    
    it('Exemplo: Testar ambos os campos obrigatórios no login', () => {
      cy.testarCampoObrigatorioLogin('ambos')
    })
    
    it('Exemplo: Login e logout completo', () => {
      // Cadastra usuário
      cy.cadastrarUsuario('Usuário Logout', null, '123456').then((usuario) => {
        // Faz login
        cy.fazerLogin(usuario.email, usuario.senha)
        // Faz logout
        cy.fazerLogout()
      })
    })
  })
  
  describe('Commands Auxiliares', () => {
    
    it('Exemplo: Gerar email único', () => {
      const email1 = cy.gerarEmailUnico('teste1')
      const email2 = cy.gerarEmailUnico('teste2')
      
      cy.log('Email 1: ' + email1)
      cy.log('Email 2: ' + email2)
      
      // Os emails serão diferentes
      expect(email1).to.not.equal(email2)
    })
    
    it('Exemplo: Limpar dados de teste', () => {
      cy.limparDadosTeste()
    })
  })
  
  describe('Fluxo Completo', () => {
    
    it('Exemplo: Fluxo completo de cadastro e login', () => {
      // 1. Cadastra um usuário
      cy.cadastrarUsuario('Usuário Completo', null, '123456').then((usuario) => {
        cy.log('Usuário cadastrado: ' + usuario.nome + ' - ' + usuario.email)
        
        // 2. Faz login
        cy.fazerLogin(usuario.email, usuario.senha)
        
        // 3. Verifica se está logado
        cy.contains('Bem vindo').should('be.visible')
        
        // 4. Faz logout
        cy.fazerLogout()
        
        // 5. Verifica se voltou para a página de login
        cy.contains('Login').should('be.visible')
      })
    })
  })
})
