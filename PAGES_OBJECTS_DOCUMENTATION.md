# Documentação - Pages Objects e Commands Organizados

## Visão Geral

O projeto foi reorganizado seguindo o padrão Page Object Model (POM) com uma estrutura simplificada de apenas 2 pages principais para melhorar a manutenibilidade, reutilização e organização do código de testes.

## Estrutura de Pages Objects

### 1. CadastroPage.js
**Localização:** `cypress/support/pagesObjects/CadastroPage.js`

**Responsabilidades:**
- Navegação para página de cadastro
- Preenchimento de formulários de cadastro
- Validações específicas do cadastro
- Testes de campos obrigatórios
- Testes de email duplicado
- Geração de dados únicos
- Utilitários para cadastro

**Métodos Principais:**
- `visit()` - Navega para página de cadastro
- `cadastrarUsuario(nome, email, senha)` - Cadastra usuário completo
- `testarCampoObrigatorio(campo)` - Testa campos obrigatórios
- `testarEmailDuplicado(nome, email, senha)` - Testa email duplicado
- `gerarEmailUnico(prefixo)` - Gera email único
- `gerarNomeUnico(prefixo)` - Gera nome único
- Métodos de validação: `shouldShowSuccessMessage()`, `shouldShowNomeObrigatorio()`, etc.

### 2. LoginPage.js
**Localização:** `cypress/support/pagesObjects/LoginPage.js`

**Responsabilidades:**
- Navegação para página de login
- Preenchimento de formulários de login
- Validações específicas do login
- Testes de campos obrigatórios
- Logout
- Testes de múltiplas tentativas
- Verificações de home/dashboard
- Geração de dados únicos
- Utilitários para login

**Métodos Principais:**
- `visit()` - Navega para página de login
- `fazerLogin(email, senha)` - Realiza login
- `testarCampoObrigatorio(campo)` - Testa campos obrigatórios
- `fazerLogout()` - Realiza logout
- `testarMultiplasTentativas(email, senhaErrada, tentativas)` - Testa múltiplas tentativas
- `shouldBeLoggedIn()` - Verifica se está logado
- `shouldBeOnHomePage()` - Verifica se está na home
- `gerarEmailUnico(prefixo)` - Gera email único
- `gerarNomeUnico(prefixo)` - Gera nome único
- Métodos de validação: `shouldShowWelcomeMessage()`, `shouldShowProblemasLogin()`, etc.

## Commands Organizados

### 1. Commands para Cadastro
- `cy.cadastrarUsuario(nome, email, senha)` - Cadastra usuário válido
- `cy.cadastrarUsuarioInvalido(nome, email, senha)` - Testa cadastro inválido
- `cy.testarCampoObrigatorio(campo)` - Testa campos obrigatórios
- `cy.testarEmailDuplicado(nome, email, senha)` - Testa email duplicado
- `cy.testarValidacaoEmail(nome, email, senha)` - Testa validações de email
- `cy.testarValidacaoNome(nome, email, senha)` - Testa validações de nome

### 2. Commands para Login
- `cy.fazerLogin(email, senha)` - Realiza login
- `cy.testarLoginInvalido(email, senha)` - Testa login inválido
- `cy.testarCampoObrigatorioLogin(campo)` - Testa campos obrigatórios
- `cy.fazerLogout()` - Realiza logout

### 3. Commands Auxiliares
- `cy.gerarEmailUnico(prefixo)` - Gera email único
- `cy.gerarNomeUnico(prefixo)` - Gera nome único
- `cy.shouldBeOnLoginPage()` - Verifica se está na página de login
- `cy.shouldBeOnCadastroPage()` - Verifica se está na página de cadastro
- `cy.shouldBeOnHomePage()` - Verifica se está na página home

### 4. Commands para Fluxos Completos
- `cy.fluxoCompletoCadastroLogin(nome, email, senha)` - Fluxo completo: cadastro + login + logout

## Benefícios da Nova Estrutura

### 1. Simplicidade
- Apenas 2 pages principais
- Estrutura mais fácil de entender e manter
- Menos arquivos para gerenciar

### 2. Manutenibilidade
- Mudanças nos seletores afetam apenas as pages objects
- Código centralizado e organizado
- Fácil localização de funcionalidades

### 3. Reutilização
- Pages objects podem ser usadas em múltiplos testes
- Commands reutilizáveis para cenários comuns
- Redução de código duplicado

### 4. Legibilidade
- Código mais limpo e expressivo
- Nomes de métodos descritivos
- Separação clara de responsabilidades

## Como Usar

### 1. Importar Pages Objects
```javascript
const CadastroPage = require('../support/pagesObjects/CadastroPage.js');
const LoginPage = require('../support/pagesObjects/LoginPage.js');
```

### 2. Usar Pages Objects
```javascript
// Navegar para página
CadastroPage.visit();

// Preencher formulário
CadastroPage.cadastrarUsuario('Nome', 'email@teste.com', '123456');

// Validar resultado
CadastroPage.shouldShowSuccessMessage();
```

### 3. Usar Commands
```javascript
// Cadastro completo
cy.cadastrarUsuario('Nome', 'email@teste.com', '123456');

// Login
cy.fazerLogin('email@teste.com', '123456');

// Fluxo completo
cy.fluxoCompletoCadastroLogin('Nome');
```

## Exemplos de Testes

### Teste Simples com Page Object
```javascript
it('Deve cadastrar usuário válido', () => {
  const email = CadastroPage.gerarEmailUnico('teste');
  CadastroPage.cadastrarUsuario('João Silva', email, '123456');
  CadastroPage.shouldShowSuccessMessage();
});
```

### Teste com Commands
```javascript
it('Fluxo completo de cadastro e login', () => {
  cy.fluxoCompletoCadastroLogin('Maria Silva');
});
```

### Teste de Validações
```javascript
it('Deve validar campos obrigatórios', () => {
  cy.testarCampoObrigatorio('nome');
  cy.testarCampoObrigatorio('email');
  cy.testarCampoObrigatorio('senha');
});
```

## Estrutura de Arquivos

```
cypress/
├── e2e/                    # Testes E2E
│   ├── cadastro_usua.cy.js
│   ├── login.cy.js
│   ├── fluxo_completo.cy.js
│   └── exemplo_pages_objects.cy.js
├── support/
│   ├── commands.js         # Commands customizados
│   └── pagesObjects/       # Pages Objects
│       ├── CadastroPage.js
│       └── LoginPage.js
└── fixtures/               # Dados de teste
```

## Próximos Passos

1. **Adicionar novas funcionalidades**: Criar métodos nas pages existentes para outras funcionalidades
2. **Melhorar validações**: Adicionar mais métodos de validação específicos
3. **Implementar relatórios**: Integrar com ferramentas de relatório
4. **Adicionar testes de API**: Complementar testes E2E com testes de API
5. **Implementar CI/CD**: Configurar pipeline de integração contínua
