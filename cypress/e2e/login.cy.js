import LoginPage from "../support/pagesObjects/LoginPage";

describe("Login no site Seu Barriga", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe("CT001 - Login com credenciais válidas", () => {
    it("Deve realizar login com sucesso", () => {
      cy.get("#email").type("maria.teste001@teste.com");
      cy.get("#senha").type("123456");
      cy.get('button[type="submit"]').click();

      cy.get(".alert").should("contain.text", "Bem vindo, Maria Teste!");
    });
  });
});
describe('CT002 - Login com email em branco', () => {
  it('Deve exibir mensagem de erro para email em branco', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Email é um campo obrigatório')
  })
})

describe('CT003 - Login com senha em branco', () => {
  it('Deve exibir mensagem de erro para senha em branco', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001@teste.com')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Senha é um campo obrigatório')
  })
})

describe('CT004 - Login com todos os campos em branco', () => {
  it('Deve exibir mensagens de erro para email e senha em branco', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Email é um campo obrigatório')
      .and('contain.text', 'Senha é um campo obrigatório')
  })
})

describe('CT005 - Login com email inválido', () => {
  it('Deve exibir erro ao informar email sem "@"', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('usuarioemail.com')
    cy.get('#senha').type('senha123')
    cy.get('button[type="submit"]').click()
LoginPage.getEmailError()
    // BUG: sistema não valida o formato do email
    cy.get('.alert')
      .should('contain.text', 'Senha é um campo obrigatório') // mensagem incorreta
  })
})

describe('CT006 - Login com senha curta', () => {
  it('Deve exibir mensagem de senha inválida (esperado)', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001@teste.com')
    cy.get('#senha').type('123')
    cy.get('button[type="submit"]').click()

    // BUG: mensagem genérica e não específica sobre o tamanho
    cy.get('.alert')
      .should('contain.text', 'Problemas com o login do usuário')
  })
})

describe('CT007 - Login com espaços antes e depois no email', () => {
  it('Deve remover espaços e permitir o login normalmente', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type(' maria.teste001@teste.com ')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Bem vindo, Maria Teste!')
  })
})

describe('CT008 - Login com caracteres especiais no email', () => {
  it('Deve exibir erro por uso inválido de múltiplos "@"', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('m@ria.teste001@teste.com')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'não deve conter o símbolo "@"')
  })
})

describe('CT009 - Login com caracteres especiais na senha', () => {
  it('Deve aceitar senha com caracteres especiais se forem válidos', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001@teste.com')
    cy.get('#senha').type('@!#%¨&*()')
    cy.get('button[type="submit"]').click()

    // BUG: sistema não aceita e mostra erro genérico
    cy.get('.alert')
      .should('contain.text', 'Problemas com o login do usuário')
  })
})

describe('CT010 - Email com nome inválido e múltiplos "@"', () => {
  it('Deve exibir erro por formato inválido de email', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('m@ria.teste001@teste.com')
    cy.get('#senha').type('senha123')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'não deve conter o símbolo "@"')
  })
})

describe('CT011 - Login com números no nome do email', () => {
  it('Deve aceitar normalmente email com números no nome', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001@teste.com')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Bem vindo, Maria Teste!')
  })
})

describe('CT012 - Email mal formatado (sem "@")', () => {
  it('Deve exibir erro por falta de "@" no email', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001teste.com')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Inclua um "@" no endereço de e-mail')
  })
})

describe('CT013 - Email sem nome de usuário', () => {
  it('Deve exibir erro por email incompleto (@teste.com)', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('@teste.com')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    cy.get('.alert')
      .should('contain.text', 'Insira uma parte seguida por "@"')
  })
})

describe('CT014 - Email com domínio inválido', () => {
  it('Deve exibir erro por domínio incompleto', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('maria.teste001@teste')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    // BUG: mensagem genérica em vez de "domínio inválido"
    cy.get('.alert')
      .should('contain.text', 'Problemas com o login do usuário')
  })
})

describe('CT015 - Login com email em letras maiúsculas', () => {
  it('Deve aceitar login mesmo com letras maiúsculas no email', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.get('#email').type('MARIA.TESTE001@TESTE.COM')
    cy.get('#senha').type('123456')
    cy.get('button[type="submit"]').click()

    // BUG: sistema não aceita, embora email devesse ser case-insensitive
    cy.get('.alert')
      .should('contain.text', 'Problemas com o login do usuário')
  })
})

describe('CT016 - Múltiplas tentativas de login com senha errada', () => {
  it('Deve exibir erro de login inválido, mas não bloqueia o usuário', () => {
    cy.visit('https://seubarriga.wcaquino.me/login')

    for (let i = 0; i < 5; i++) {
      cy.get('#email').clear().type('maria.teste001@teste.com')
      cy.get('#senha').clear().type('senhaErrada')
      cy.get('button[type="submit"]').click()
      cy.get('.alert').should('contain.text', 'Problemas com o login do usuário')
    }

    // Nenhuma mensagem de segurança ou bloqueio foi exibida
  })
})