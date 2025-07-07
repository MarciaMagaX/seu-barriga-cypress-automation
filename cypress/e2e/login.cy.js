/// <reference types="cypress" />

describe("Funcionalidade de Login - Seu Barriga", () => {
  beforeEach(() => {
    cy.visit("https://seubarriga.wcaquino.me/login");
  });

  it("CT001 - Deve fazer login com credenciais válidas", () => {
    cy.get("#email")
      .should("be.visible")
      .type("maria.teste001@teste.com")
      .should("have.value", "maria.teste001@teste.com");
    cy.get("#senha")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Bem vindo, Maria Teste!");
  });

  it("CT002 - Deve exibir erro ao tentar login com email em branco", () => {
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Email é um campo obrigatório");
  });

  it("CT003 - Deve exibir erro ao tentar login com senha em branco", () => {
    cy.get("#email").should("be.visible").type("maria.teste001@teste.com");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Senha é um campo obrigatório");
  });

  it("CT004 - Deve exibir erro ao tentar login com todos os campos em branco", () => {
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Email é um campo obrigatório")
      .and("contain.text", "Senha é um campo obrigatório");
  });

  it('CT005 - Deve exibir erro ao informar email sem "@"', () => {
    cy.get("#email").should("be.visible").type("usuarioemail.com");
    cy.get("#senha").should("be.visible").type("senha123");
    cy.get('button[type="submit"]').should("be.visible").click();

    cy.get("#email").then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      expect(message).to.include('Inclua um "@" no endereço de e-mail');
    });
  });

  it("CT006 - Deve exibir mensagem genérica ao tentar login com senha curta", () => {
    cy.get("#email").should("be.visible").type("maria.teste001@teste.com");
    cy.get("#senha").should("be.visible").type("123");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Problemas com o login do usuário");
  });

  it("CT007 - Deve permitir login mesmo com espaços antes/depois no email", () => {
    cy.get("#email").should("be.visible").type(" maria.teste001@teste.com ");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Bem vindo, Maria Teste!");
  });

  it('CT008 - Deve exibir erro para múltiplos "@" no email', () => {
    cy.get("#email").should("be.visible").type("m@ria.teste001@teste.com");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();

    cy.get("#email").then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      console.log("Mensagem retornada:", message); // Debug
      expect(message).to.include('A parte depois de "@" não deve conter o símbolo "@".'//a mensagem retornada pelo navegador possui um símbbolo invisível antes do ultimo @
      );
    });
  });

  it("CT009 - Deve exibir erro genérico para senha com caracteres especiais", () => {
    cy.get("#email").should("be.visible").type("maria.teste001@teste.com");
    cy.get("#senha").should("be.visible").type("@!#%¨&*()");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Problemas com o login do usuário");
  });

  it('CT010 - Deve exibir erro para email com nome inválido e múltiplos "@"', () => {
    cy.get("#email").should("be.visible").type("m@ria.teste001@teste.com");
    cy.get("#senha").should("be.visible").type("senha123");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get("#email").then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      console.log("Mensagem retornada:", message); // Debug
      expect(message).to.include(
        'A parte depois de "@" não deve conter o símbolo "@".' //a mensagem retornada pelo navegador possui um símbbolo invisível antes do ultimo @
      );
    });
  });

  it("CT011 - Deve permitir login com números no nome do email", () => {
    cy.get("#email").should("be.visible").type("maria.teste001@teste.com");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Bem vindo, Maria Teste!");
  });

  it('CT012 - Deve exibir erro para email sem "@"', () => {
    cy.get("#email").should("be.visible").type("maria.teste001teste.com");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get("#email").then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      console.log("Mensagem retornada:", message); // Debug
      expect(message).to.eq('Inclua um "@" no endereço de e-mail. "maria.teste001teste.com" está com um "@" faltando.') //a mensagem retornada pelo navegador possui um símbbolo invisível
    });
  });

  it("CT013 - Deve exibir erro para email sem nome de usuário", () => {
    cy.get("#email").should("be.visible").type("@teste.com");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    
    cy.get("#email").then(($input) => {
      $input[0].reportValidity();
      const message = $input[0].validationMessage;
      console.log("Mensagem retornada:", message); // Debug
      expect(message).to.eq('Insira uma parte seguida por "@". "@teste.com" está incompleto.'); //a mensagem retornada pelo navegador possui símbbolos invisíveis
    });
  });
    //Sugestão de melhoria para a mensagem exibida: 'Insira uma parte seguida por "@". "@teste.com" está incompleto.'

  it("CT014 - Deve exibir erro genérico para domínio incompleto", () => {
    cy.get("#email").should("be.visible").type("maria.teste001@teste");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Problemas com o login do usuário");
  });

  it("CT015 - Deve exibir erro se email em maiúsculas não for tratado", () => {
    cy.get("#email").should("be.visible").type("MARIA.TESTE001@TESTE.COM");
    cy.get("#senha").should("be.visible").type("123456");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Problemas com o login do usuário");
  });

  it("CT016 - Deve exibir erro de login inválido após múltiplas tentativas", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("#email")
        .should("be.visible")
        .clear()
        .type("maria.teste001@teste.com");
      cy.get("#senha").should("be.visible").clear().type("senhaErrada");
      cy.get('button[type="submit"]').should("be.visible").click();
      cy.get(".alert")
        .should("be.visible")
        .and("contain.text", "Problemas com o login do usuário");
    }
  });
});