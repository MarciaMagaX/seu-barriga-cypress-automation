# Documentação dos Commands Personalizados - Seu Barriga

Este documento descreve todos os commands personalizados criados para automatizar os testes de cadastro e login da aplicação Seu Barriga.

## 📋 Índice

- [Commands de Cadastro](#commands-de-cadastro)
- [Commands de Login](#commands-de-login)
- [Commands Auxiliares](#commands-auxiliares)
- [Exemplos de Uso](#exemplos-de-uso)
- [Boas Práticas](#boas-práticas)

---

## 🆕 Commands de Cadastro

### `cy.cadastrarUsuario(nome, email, senha)`

Cadastra um usuário com dados válidos.

**Parâmetros:**
- `nome` (string, obrigatório): Nome do usuário
- `email` (string, opcional): Email do usuário. Se não fornecido, será gerado automaticamente
- `senha` (string, opcional): Senha do usuário. Padrão: '123456'

**Retorna:** Objeto com os dados do usuário cadastrado

**Exemplo:**
```javascript
// Email gerado automaticamente
cy.cadastrarUsuario('João Silva', null, '123456')

// Email específico
cy.cadastrarUsuario('Maria Santos', 'maria@teste.com', 'senha123')
```

---

### `cy.cadastrarUsuarioInvalido(nome, email, senha)`

Testa o cadastro com dados inválidos.

**Parâmetros:**
- `nome` (string): Nome do usuário (pode ser inválido)
- `email` (string): Email do usuário (pode ser inválido)
- `senha` (string): Senha do usuário (pode ser inválida)

**Exemplo:**
```javascript
cy.cadastrarUsuarioInvalido('     ', 'email_invalido', '     ')
```

---

### `cy.testarCampoObrigatorio(campo)`

Testa campos obrigatórios no formulário de cadastro.

**Parâmetros:**
- `campo` (string): Campo a ser testado
  - `'nome'`: Testa apenas o campo nome em branco
  - `'email'`: Testa apenas o campo email em branco
  - `'senha'`: Testa apenas o campo senha em branco
  - `'todos'`: Testa todos os campos em branco

**Exemplo:**
```javascript
cy.testarCampoObrigatorio('nome')
cy.testarCampoObrigatorio('todos')
```

---

### `cy.testarEmailDuplicado(nome, email, senha)`

Testa o comportamento quando tenta cadastrar um email já existente.

**Parâmetros:**
- `nome` (string): Nome do usuário
- `email` (string): Email que será duplicado
- `senha` (string, opcional): Senha do usuário. Padrão: '123456'

**Exemplo:**
```javascript
const email = cy.gerarEmailUnico('duplicado')
cy.testarEmailDuplicado('Usuário Original', email, '123456')
```

---

## 🔐 Commands de Login

### `cy.fazerLogin(email, senha)`

Faz login com dados válidos.

**Parâmetros:**
- `email` (string): Email do usuário
- `senha` (string): Senha do usuário

**Exemplo:**
```javascript
cy.fazerLogin('usuario@teste.com', '123456')
```

---

### `cy.testarLoginInvalido(email, senha)`

Testa login com dados inválidos.

**Parâmetros:**
- `email` (string): Email do usuário (pode ser inválido)
- `senha` (string): Senha do usuário (pode ser inválida)

**Exemplo:**
```javascript
cy.testarLoginInvalido('email_invalido@teste.com', 'senha_errada')
```

---

### `cy.testarCampoObrigatorioLogin(campo)`

Testa campos obrigatórios no formulário de login.

**Parâmetros:**
- `campo` (string): Campo a ser testado
  - `'email'`: Testa apenas o campo email em branco
  - `'senha'`: Testa apenas o campo senha em branco
  - `'ambos'`: Testa ambos os campos em branco

**Exemplo:**
```javascript
cy.testarCampoObrigatorioLogin('email')
cy.testarCampoObrigatorioLogin('ambos')
```

---

### `cy.fazerLogout()`

Faz logout do sistema.

**Exemplo:**
```javascript
cy.fazerLogout()
```

---

## 🛠️ Commands Auxiliares

### `cy.gerarEmailUnico(prefixo)`

Gera um email único para testes.

**Parâmetros:**
- `prefixo` (string, opcional): Prefixo para o email. Padrão: 'usuario'

**Retorna:** Email único

**Exemplo:**
```javascript
const email = cy.gerarEmailUnico('teste')
// Resultado: teste_1234567890@teste.com
```

---

### `cy.limparDadosTeste()`

Limpa dados de teste (placeholder para implementação futura).

**Exemplo:**
```javascript
cy.limparDadosTeste()
```

---

## 📝 Exemplos de Uso

### Fluxo Completo de Cadastro e Login

```javascript
describe('Fluxo Completo', () => {
  it('Cadastro e login completo', () => {
    // 1. Cadastra um usuário
    cy.cadastrarUsuario('Usuário Teste', null, '123456').then((usuario) => {
      
      // 2. Faz login
      cy.fazerLogin(usuario.email, usuario.senha)
      
      // 3. Verifica se está logado
      cy.contains('Bem vindo').should('be.visible')
      
      // 4. Faz logout
      cy.fazerLogout()
      
      // 5. Verifica se voltou para login
      cy.contains('Login').should('be.visible')
    })
  })
})
```

### Teste de Validações

```javascript
describe('Validações', () => {
  it('Testa todos os campos obrigatórios', () => {
    cy.testarCampoObrigatorio('todos')
  })
  
  it('Testa email duplicado', () => {
    const email = cy.gerarEmailUnico('duplicado')
    cy.testarEmailDuplicado('Usuário 1', email, '123456')
  })
  
  it('Testa login inválido', () => {
    cy.testarLoginInvalido('inexistente@teste.com', 'senha_errada')
  })
})
```

### Teste de Dados Inválidos

```javascript
describe('Dados Inválidos', () => {
  it('Testa cadastro com espaços em branco', () => {
    cy.cadastrarUsuarioInvalido('     ', '     ', '     ')
  })
  
  it('Testa email sem @', () => {
    cy.cadastrarUsuarioInvalido('João', 'joao.com', '123456')
  })
  
  it('Testa email com caracteres especiais', () => {
    cy.cadastrarUsuarioInvalido('Teste', 'teste@@teste.com', '123456')
  })
})
```

---

## ✅ Boas Práticas

### 1. **Geração de Emails Únicos**
Sempre use `cy.gerarEmailUnico()` para evitar conflitos entre testes:
```javascript
// ✅ Bom
const email = cy.gerarEmailUnico('teste')
cy.cadastrarUsuario('João', email, '123456')

// ❌ Evite
cy.cadastrarUsuario('João', 'joao@teste.com', '123456')
```

### 2. **Uso de Promises**
Quando precisar dos dados retornados por um command:
```javascript
cy.cadastrarUsuario('João', null, '123456').then((usuario) => {
  cy.fazerLogin(usuario.email, usuario.senha)
})
```

### 3. **Organização de Testes**
Agrupe testes relacionados:
```javascript
describe('Cadastro de Usuário', () => {
  describe('Dados Válidos', () => {
    // testes com dados válidos
  })
  
  describe('Dados Inválidos', () => {
    // testes com dados inválidos
  })
  
  describe('Validações', () => {
    // testes de validação
  })
})
```

### 4. **Limpeza de Dados**
Use o command de limpeza quando necessário:
```javascript
afterEach(() => {
  cy.limparDadosTeste()
})
```

---

## 🔧 Manutenção

### Adicionando Novos Commands

Para adicionar novos commands:

1. Edite o arquivo `cypress/support/commands.js`
2. Adicione o novo command seguindo o padrão:
```javascript
Cypress.Commands.add('nomeDoCommand', (parametros) => {
  // implementação
})
```
3. Documente o command neste arquivo
4. Crie testes de exemplo

### Modificando Commands Existentes

1. Faça backup do command atual
2. Modifique a implementação
3. Atualize a documentação
4. Teste todas as funcionalidades dependentes

---

## 📞 Suporte

Para dúvidas ou problemas com os commands:

1. Verifique a documentação
2. Execute os testes de exemplo em `cypress/e2e/exemplo_commands.cy.js`
3. Consulte os logs do Cypress para debug
4. Entre em contato com a equipe de desenvolvimento
