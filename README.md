# Seu Barriga - Automação de Testes E2E

## 📋 Descrição

Projeto de automação de testes E2E para o sistema Seu Barriga utilizando Cypress com Page Object Model (POM). O projeto foi reorganizado seguindo boas práticas de automação para melhorar a manutenibilidade, reutilização e organização do código.

## 🏗️ Arquitetura

O projeto segue o padrão **Page Object Model (POM)** com uma estrutura simplificada de apenas 2 pages principais:

```
seu-barriga-cypress-automation/
├── cypress/
│   ├── e2e/                    # Testes E2E
│   │   ├── cadastro_usua.cy.js
│   │   ├── login.cy.js
│   │   ├── fluxo_completo.cy.js
│   │   └── exemplo_pages_objects.cy.js
│   ├── fixtures/               # Dados de teste
│   │   ├── configuracoes_teste.json
│   │   ├── credenciais_login.json
│   │   ├── usuarios_invalidos.json
│   │   └── usuarios_validos.json
│   ├── support/
│   │   ├── commands.js         # Commands customizados
│   │   ├── e2e.js             # Configuração do Cypress
│   │   └── pagesObjects/       # Pages Objects
│   │       ├── CadastroPage.js
│   │       └── LoginPage.js
│   ├── screenshots/            # Screenshots de falhas
│   └── videos/                 # Vídeos dos testes
├── cypress.config.js           # Configuração do Cypress
├── package.json
└── README.md
```

## 🚀 Funcionalidades Testadas

### 1. Cadastro de Usuário
- ✅ Cadastro com dados válidos
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Validação de nome (apenas letras)
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Prevenção de email duplicado
- ✅ Validação de espaços em email

### 2. Login
- ✅ Login com credenciais válidas
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de credenciais inválidas
- ✅ Validação de formato de email
- ✅ Múltiplas tentativas de login
- ✅ Logout

### 3. Fluxos Completos
- ✅ Cadastro → Login → Verificação → Logout
- ✅ Validações de navegação
- ✅ Geração de dados únicos

## 🛠️ Tecnologias Utilizadas

- **Cypress**: Framework de automação E2E
- **JavaScript**: Linguagem de programação
- **Page Object Model**: Padrão de design
- **Node.js**: Runtime JavaScript

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd seu-barriga-cypress-automation
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Verifique a instalação**
   ```bash
   npx cypress verify
   ```

## 🎯 Como Executar os Testes

### Abrir Cypress em modo interativo
```bash
npm run cypress:open
```

### Executar todos os testes
```bash
npm run test:all
```

### Executar testes específicos
```bash
# Testes de cadastro
npm run test:cadastro

# Testes de login
npm run test:login

# Testes de fluxo completo
npm run test:fluxo
```

### Executar em navegadores específicos
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

### Executar com interface gráfica
```bash
npm run test:headed
```

## 📚 Pages Objects

### CadastroPage.js
Responsável por todas as operações relacionadas ao cadastro de usuários, incluindo geração de dados únicos e utilitários.

```javascript
const CadastroPage = require('../support/pagesObjects/CadastroPage.js');

// Exemplo de uso
const email = CadastroPage.gerarEmailUnico('teste');
CadastroPage.visit();
CadastroPage.cadastrarUsuario('João Silva', email, '123456');
CadastroPage.shouldShowSuccessMessage();
```

### LoginPage.js
Gerencia operações de login, logout e verificações da home/dashboard.

```javascript
const LoginPage = require('../support/pagesObjects/LoginPage.js');

// Exemplo de uso
LoginPage.visit();
LoginPage.fazerLogin('joao@teste.com', '123456');
LoginPage.shouldShowWelcomeMessage();
LoginPage.shouldBeLoggedIn();
```



## 🔧 Commands Customizados

### Commands para Cadastro
```javascript
cy.cadastrarUsuario('Nome', 'email@teste.com', '123456');
cy.testarCampoObrigatorio('nome');
cy.testarEmailDuplicado('Nome', 'email@teste.com', '123456');
```

### Commands para Login
```javascript
cy.fazerLogin('email@teste.com', '123456');
cy.testarLoginInvalido('email@teste.com', 'senha_errada');
cy.fazerLogout();
```

### Commands para Fluxos Completos
```javascript
cy.fluxoCompletoCadastroLogin('Nome');
```

### Commands Auxiliares
```javascript
cy.gerarEmailUnico('prefixo');
cy.gerarNomeUnico('prefixo');
cy.shouldBeOnLoginPage();
```

## 📊 Relatórios e Evidências

- **Screenshots**: Capturados automaticamente em caso de falha
- **Vídeos**: Gravados durante a execução dos testes
- **Logs**: Console logs detalhados

## 🔍 Configurações

### cypress.config.js
```javascript
{
  baseUrl: 'https://seubarriga.wcaquino.me',
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  // ... outras configurações
}
```

### package.json
Scripts úteis para diferentes cenários de execução.

## 📝 Documentação Adicional

- [PAGES_OBJECTS_DOCUMENTATION.md](./PAGES_OBJECTS_DOCUMENTATION.md) - Documentação detalhada das Pages Objects
- [COMMANDS_DOCUMENTATION.md](./COMMANDS_DOCUMENTATION.md) - Documentação dos Commands
- [FIXTURES_DOCUMENTATION.md](./FIXTURES_DOCUMENTATION.md) - Documentação das Fixtures

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Checklist de Qualidade

- [x] Implementação do Page Object Model
- [x] Commands customizados organizados
- [x] Testes de validação completos
- [x] Geração de dados únicos
- [x] Documentação atualizada
- [x] Scripts de execução configurados
- [x] Configurações otimizadas

## 🚀 Próximos Passos

1. **Adicionar novas funcionalidades**: Criar pages objects para outras funcionalidades
2. **Implementar relatórios**: Integrar com ferramentas como Allure ou Mochawesome
3. **Adicionar testes de API**: Complementar testes E2E
4. **Implementar CI/CD**: Configurar pipeline de integração contínua
5. **Adicionar testes de performance**: Implementar testes de carga

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de QA Automation.

---

**Desenvolvido com ❤️ pela Equipe de QA Automation**
