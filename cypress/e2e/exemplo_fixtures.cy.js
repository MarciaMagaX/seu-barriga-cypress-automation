/// <reference types="cypress" />

describe('Exemplo de uso das Fixtures', () => {
  
  describe('Usando Fixtures de Usuários Válidos', () => {
    
    beforeEach(() => {
      cy.fixture('usuarios_validos').as('usuariosValidos')
    })
    
    it('Cadastrar usuários usando fixture', function() {
      // Usa o primeiro usuário da fixture
      const usuario = this.usuariosValidos[0]
      
      cy.cadastrarUsuario(usuario.nome, usuario.email, usuario.senha)
      cy.log(`Usuário cadastrado: ${usuario.descricao}`)
    })
    
    it('Cadastrar múltiplos usuários da fixture', function() {
      // Itera sobre todos os usuários da fixture
      this.usuariosValidos.forEach((usuario, index) => {
        cy.log(`Testando usuário ${index + 1}: ${usuario.descricao}`)
        
        // Gera email único para evitar conflitos
        const emailUnico = cy.gerarEmailUnico(`usuario_${index}`)
        
        cy.cadastrarUsuario(usuario.nome, emailUnico, usuario.senha)
      })
    })
    
    it('Testar diferentes tipos de senha', function() {
      // Filtra usuários com senhas específicas
      const usuariosComSenhasDiferentes = this.usuariosValidos.filter(
        usuario => usuario.senha !== '123456'
      )
      
      usuariosComSenhasDiferentes.forEach((usuario, index) => {
        const emailUnico = cy.gerarEmailUnico(`senha_${index}`)
        cy.cadastrarUsuario(usuario.nome, emailUnico, usuario.senha)
        cy.log(`Testado: ${usuario.descricao} - Senha: ${usuario.senha}`)
      })
    })
  })
  
  describe('Usando Fixtures de Usuários Inválidos', () => {
    
    beforeEach(() => {
      cy.fixture('usuarios_invalidos').as('usuariosInvalidos')
    })
    
    it('Testar todos os cenários de dados inválidos', function() {
      this.usuariosInvalidos.forEach((usuario, index) => {
        cy.log(`Testando cenário ${index + 1}: ${usuario.descricao}`)
        
        cy.cadastrarUsuarioInvalido(usuario.nome, usuario.email, usuario.senha)
      })
    })
    
    it('Testar campos obrigatórios específicos', function() {
      // Filtra apenas os casos de campos obrigatórios
      const camposObrigatorios = this.usuariosInvalidos.filter(
        usuario => usuario.erro_esperado.includes('obrigatório')
      )
      
      camposObrigatorios.forEach((usuario) => {
        cy.log(`Testando: ${usuario.descricao}`)
        
        if (usuario.nome === '') {
          cy.testarCampoObrigatorio('nome')
        } else if (usuario.email === '') {
          cy.testarCampoObrigatorio('email')
        } else if (usuario.senha === '') {
          cy.testarCampoObrigatorio('senha')
        }
      })
    })
  })
  
  describe('Usando Fixtures de Credenciais de Login', () => {
    
    beforeEach(() => {
      cy.fixture('credenciais_login').as('credenciais')
    })
    
    it('Testar login com usuários válidos', function() {
      // Primeiro cadastra os usuários
      this.credenciais.usuarios_validos.forEach((usuario, index) => {
        const emailUnico = cy.gerarEmailUnico(`login_${index}`)
        cy.cadastrarUsuario(usuario.nome, emailUnico, usuario.senha)
      })
      
      // Depois testa o login
      this.credenciais.usuarios_validos.forEach((usuario, index) => {
        const emailUnico = cy.gerarEmailUnico(`login_${index}`)
        cy.fazerLogin(emailUnico, usuario.senha)
        cy.fazerLogout()
      })
    })
    
    it('Testar login com dados inválidos', function() {
      this.credenciais.usuarios_invalidos.forEach((usuario) => {
        cy.log(`Testando: ${usuario.descricao}`)
        cy.testarLoginInvalido(usuario.email, usuario.senha)
      })
    })
    
    it('Testar campos obrigatórios no login', function() {
      const camposObrigatorios = this.credenciais.campos_obrigatorios
      
      // Testa email vazio
      cy.testarCampoObrigatorioLogin('email')
      
      // Testa senha vazia
      cy.testarCampoObrigatorioLogin('senha')
      
      // Testa ambos vazios
      cy.testarCampoObrigatorioLogin('ambos')
    })
  })
  
  describe('Usando Fixtures de Configurações', () => {
    
    beforeEach(() => {
      cy.fixture('configuracoes_teste').as('config')
    })
    
    it('Usar URLs da configuração', function() {
      cy.visit(this.config.urls.cadastro)
      cy.url().should('include', 'cadastro')
      
      cy.visit(this.config.urls.login)
      cy.url().should('include', 'login')
    })
    
    it('Usar seletores da configuração', function() {
      cy.visit(this.config.urls.cadastro)
      
      // Usa os seletores da fixture
      cy.get(this.config.seletores.cadastro.nome).should('be.visible')
      cy.get(this.config.seletores.cadastro.email).should('be.visible')
      cy.get(this.config.seletores.cadastro.senha).should('be.visible')
    })
    
    it('Usar mensagens da configuração', function() {
      cy.visit(this.config.urls.cadastro)
      
      // Testa campo obrigatório usando mensagem da fixture
      cy.get(this.config.seletores.cadastro.email).type('teste@email.com')
      cy.get(this.config.seletores.cadastro.senha).type('123456')
      cy.contains(this.config.seletores.cadastro.botao_cadastrar).click()
      
      cy.contains(this.config.mensagens.erro.nome_obrigatorio).should('be.visible')
    })
    
    it('Usar timeouts da configuração', function() {
      cy.visit(this.config.urls.cadastro)
      
      // Usa timeout da configuração
      cy.get(this.config.seletores.cadastro.nome, { timeout: this.config.timeouts.padrao }).should('be.visible')
    })
  })
  
  describe('Combinação de Fixtures', () => {
    
    beforeEach(() => {
      cy.fixture('usuarios_validos').as('usuariosValidos')
      cy.fixture('credenciais_login').as('credenciais')
      cy.fixture('configuracoes_teste').as('config')
    })
    
    it('Fluxo completo usando múltiplas fixtures', function() {
      // 1. Cadastra um usuário usando fixture de usuários válidos
      const usuario = this.usuariosValidos[0]
      const emailUnico = cy.gerarEmailUnico('fluxo_completo')
      
      cy.visit(this.config.urls.cadastro)
      cy.get(this.config.seletores.cadastro.nome).type(usuario.nome)
      cy.get(this.config.seletores.cadastro.email).type(emailUnico)
      cy.get(this.config.seletores.cadastro.senha).type(usuario.senha)
      cy.contains(this.config.seletores.cadastro.botao_cadastrar).click()
      
      cy.contains(this.config.mensagens.sucesso.cadastro).should('be.visible')
      
      // 2. Faz login usando fixture de credenciais
      cy.visit(this.config.urls.login)
      cy.get(this.config.seletores.login.email).type(emailUnico)
      cy.get(this.config.seletores.login.senha).type(usuario.senha)
      cy.contains(this.config.seletores.login.botao_entrar).click()
      
      cy.contains(this.config.mensagens.sucesso.login).should('be.visible')
      
      // 3. Faz logout
      cy.contains(this.config.seletores.login.botao_sair).click()
      
      cy.log(`Fluxo completo executado para: ${usuario.descricao}`)
    })
  })
})
