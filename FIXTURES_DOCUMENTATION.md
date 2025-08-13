# Documentação das Fixtures - Seu Barriga

Este documento descreve todas as fixtures criadas para os testes de cadastro e login da aplicação Seu Barriga.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Fixtures Criadas](#fixtures-criadas)
- [Como Usar](#como-usar)
- [Exemplos Práticos](#exemplos-práticos)
- [Boas Práticas](#boas-práticas)

---

## 🎯 Visão Geral

As fixtures são arquivos JSON que contêm dados de teste organizados e reutilizáveis. Elas permitem:

- **Separação de dados dos testes**
- **Reutilização de dados**
- **Manutenção centralizada**
- **Organização por contexto**

---

## 📁 Fixtures Criadas

### 1. **`usuarios_validos.json`**

Contém dados de usuários válidos para testes de cadastro.

**Estrutura:**
```json
[
  {
    "nome": "João Silva",
    "email": "joao.silva@teste.com",
    "senha": "123456",
    "descricao": "Usuário com dados básicos válidos"
  }
]
```

**Campos:**
- `nome`: Nome do usuário
- `email`: Email do usuário
- `senha`: Senha do usuário
- `descricao`: Descrição do tipo de usuário

**Uso:**
```javascript
cy.fixture('usuarios_validos').as('usuariosValidos')
```

---

### 2. **`usuarios_invalidos.json`**

Contém dados de usuários inválidos para testes de validação.

**Estrutura:**
```json
[
  {
    "nome": "",
    "email": "teste@email.com",
    "senha": "123456",
    "descricao": "Nome em branco",
    "erro_esperado": "Nome é um campo obrigatório"
  }
]
```

**Campos:**
- `nome`: Nome do usuário (pode ser inválido)
- `email`: Email do usuário (pode ser inválido)
- `senha`: Senha do usuário (pode ser inválida)
- `descricao`: Descrição do cenário de teste
- `erro_esperado`: Mensagem de erro esperada

**Uso:**
```javascript
cy.fixture('usuarios_invalidos').as('usuariosInvalidos')
```

---

### 3. **`credenciais_login.json`**

Contém credenciais para testes de login.

**Estrutura:**
```json
{
  "usuarios_validos": [...],
  "usuarios_invalidos": [...],
  "campos_obrigatorios": {...}
}
```

**Seções:**

#### `usuarios_validos`
```json
[
  {
    "email": "joao.silva@teste.com",
    "senha": "123456",
    "nome": "João Silva",
    "descricao": "Usuário válido básico"
  }
]
```

#### `usuarios_invalidos`
```json
[
  {
    "email": "inexistente@teste.com",
    "senha": "123456",
    "descricao": "Email inexistente",
    "erro_esperado": "Usuário não encontrado"
  }
]
```

#### `campos_obrigatorios`
```json
{
  "email_vazio": {
    "email": "",
    "senha": "123456",
    "erro_esperado": "Email é um campo obrigatório"
  }
}
```

**Uso:**
```javascript
cy.fixture('credenciais_login').as('credenciais')
```

---

### 4. **`configuracoes_teste.json`**

Contém configurações gerais para os testes.

**Estrutura:**
```json
{
  "urls": {...},
  "timeouts": {...},
  "mensagens": {...},
  "seletores": {...},
  "dados_padrao": {...}
}
```

**Seções:**

#### `urls`
```json
{
  "base": "https://seubarriga.wcaquino.me",
  "cadastro": "https://seubarriga.wcaquino.me/cadastro",
  "login": "https://seubarriga.wcaquino.me/login",
  "home": "https://seubarriga.wcaquino.me/home"
}
```

#### `timeouts`
```json
{
  "padrao": 10000,
  "curto": 3000,
  "longo": 30000
}
```

#### `mensagens`
```json
{
  "sucesso": {
    "cadastro": "Usuário inserido com sucesso",
    "login": "Bem vindo"
  },
  "erro": {
    "nome_obrigatorio": "Nome é um campo obrigatório",
    "email_obrigatorio": "Email é um campo obrigatório"
  }
}
```

#### `seletores`
```json
{
  "cadastro": {
    "nome": "#nome",
    "email": "#email",
    "senha": "input[type=\"password\"]",
    "botao_cadastrar": "Cadastrar"
  },
  "login": {
    "email": "#email",
    "senha": "#senha",
    "botao_entrar": "Entrar",
    "botao_sair": "Sair"
  }
}
```

#### `dados_padrao`
```json
{
  "senha_padrao": "123456",
  "dominio_email": "@teste.com",
  "prefixo_email_padrao": "usuario"
}
```

**Uso:**
```javascript
cy.fixture('configuracoes_teste').as('config')
```

---

## 💡 Como Usar

### Carregando Fixtures

```javascript
describe('Teste com Fixtures', () => {
  beforeEach(() => {
    // Carrega uma fixture
    cy.fixture('usuarios_validos').as('usuariosValidos')
    
    // Carrega múltiplas fixtures
    cy.fixture('configuracoes_teste').as('config')
    cy.fixture('credenciais_login').as('credenciais')
  })
  
  it('Teste usando fixture', function() {
    // Usa 'this' para acessar a fixture
    const usuario = this.usuariosValidos[0]
    cy.cadastrarUsuario(usuario.nome, usuario.email, usuario.senha)
  })
})
```

### Acessando Dados

```javascript
// Acesso direto
cy.fixture('usuarios_validos').then((usuarios) => {
  const usuario = usuarios[0]
  // usar usuario
})

// Acesso via alias
cy.fixture('usuarios_validos').as('usuariosValidos')
// No teste:
function() {
  const usuario = this.usuariosValidos[0]
}
```

### Iterando sobre Fixtures

```javascript
it('Testar múltiplos usuários', function() {
  this.usuariosValidos.forEach((usuario, index) => {
    const emailUnico = cy.gerarEmailUnico(`usuario_${index}`)
    cy.cadastrarUsuario(usuario.nome, emailUnico, usuario.senha)
  })
})
```

### Filtrando Dados

```javascript
it('Testar usuários específicos', function() {
  const usuariosComSenhasDiferentes = this.usuariosValidos.filter(
    usuario => usuario.senha !== '123456'
  )
  
  usuariosComSenhasDiferentes.forEach((usuario) => {
    // teste específico
  })
})
```

---

## 📝 Exemplos Práticos

### Exemplo 1: Teste de Cadastro com Fixture

```javascript
describe('Cadastro com Fixtures', () => {
  beforeEach(() => {
    cy.fixture('usuarios_validos').as('usuariosValidos')
    cy.fixture('configuracoes_teste').as('config')
  })
  
  it('Cadastrar usuário válido', function() {
    const usuario = this.usuariosValidos[0]
    const emailUnico = cy.gerarEmailUnico('teste')
    
    cy.visit(this.config.urls.cadastro)
    cy.get(this.config.seletores.cadastro.nome).type(usuario.nome)
    cy.get(this.config.seletores.cadastro.email).type(emailUnico)
    cy.get(this.config.seletores.cadastro.senha).type(usuario.senha)
    cy.contains(this.config.seletores.cadastro.botao_cadastrar).click()
    
    cy.contains(this.config.mensagens.sucesso.cadastro).should('be.visible')
  })
})
```

### Exemplo 2: Teste de Validação com Fixture

```javascript
describe('Validação com Fixtures', () => {
  beforeEach(() => {
    cy.fixture('usuarios_invalidos').as('usuariosInvalidos')
  })
  
  it('Testar campos obrigatórios', function() {
    const camposObrigatorios = this.usuariosInvalidos.filter(
      usuario => usuario.erro_esperado.includes('obrigatório')
    )
    
    camposObrigatorios.forEach((usuario) => {
      cy.log(`Testando: ${usuario.descricao}`)
      
      if (usuario.nome === '') {
        cy.testarCampoObrigatorio('nome')
      } else if (usuario.email === '') {
        cy.testarCampoObrigatorio('email')
      }
    })
  })
})
```

### Exemplo 3: Teste de Login com Fixture

```javascript
describe('Login com Fixtures', () => {
  beforeEach(() => {
    cy.fixture('credenciais_login').as('credenciais')
    cy.fixture('configuracoes_teste').as('config')
  })
  
  it('Login com usuário válido', function() {
    const usuario = this.credenciais.usuarios_validos[0]
    
    cy.visit(this.config.urls.login)
    cy.get(this.config.seletores.login.email).type(usuario.email)
    cy.get(this.config.seletores.login.senha).type(usuario.senha)
    cy.contains(this.config.seletores.login.botao_entrar).click()
    
    cy.contains(this.config.mensagens.sucesso.login).should('be.visible')
  })
})
```

### Exemplo 4: Combinação de Fixtures

```javascript
describe('Fluxo Completo', () => {
  beforeEach(() => {
    cy.fixture('usuarios_validos').as('usuariosValidos')
    cy.fixture('credenciais_login').as('credenciais')
    cy.fixture('configuracoes_teste').as('config')
  })
  
  it('Cadastro e login completo', function() {
    // 1. Cadastra usuário
    const usuario = this.usuariosValidos[0]
    const emailUnico = cy.gerarEmailUnico('fluxo')
    
    cy.cadastrarUsuario(usuario.nome, emailUnico, usuario.senha)
    
    // 2. Faz login
    cy.fazerLogin(emailUnico, usuario.senha)
    
    // 3. Verifica sucesso
    cy.contains(this.config.mensagens.sucesso.login).should('be.visible')
  })
})
```

---

## ✅ Boas Práticas

### 1. **Organização**
- Mantenha fixtures organizadas por contexto
- Use nomes descritivos
- Documente a estrutura das fixtures

### 2. **Reutilização**
- Crie fixtures genéricas que podem ser usadas em múltiplos testes
- Evite duplicação de dados

### 3. **Manutenção**
- Centralize dados que mudam frequentemente
- Use configurações para URLs e seletores

### 4. **Performance**
- Carregue fixtures no `beforeEach` quando possível
- Use aliases para melhor performance

### 5. **Flexibilidade**
- Use dados dinâmicos quando necessário (emails únicos)
- Combine fixtures estáticas com geração dinâmica

### 6. **Documentação**
- Mantenha a documentação atualizada
- Inclua exemplos de uso
- Documente mudanças nas estruturas

---

## 🔧 Manutenção

### Adicionando Novos Dados

1. **Edite a fixture apropriada**
2. **Mantenha a estrutura consistente**
3. **Atualize a documentação**
4. **Teste os novos dados**

### Modificando Estruturas

1. **Faça backup da estrutura atual**
2. **Modifique a fixture**
3. **Atualize todos os testes que usam a fixture**
4. **Atualize a documentação**

### Criando Novas Fixtures

1. **Identifique o contexto dos dados**
2. **Crie a estrutura JSON**
3. **Documente a nova fixture**
4. **Crie exemplos de uso**

---

## 📞 Suporte

Para dúvidas sobre as fixtures:

1. **Consulte esta documentação**
2. **Verifique os exemplos em `cypress/e2e/exemplo_fixtures.cy.js`**
3. **Analise a estrutura das fixtures existentes**
4. **Entre em contato com a equipe de desenvolvimento**
