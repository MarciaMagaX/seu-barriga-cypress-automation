/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
let dados;

describe("Cadastro com dados válidos - Seu Barriga", () => {
  beforeEach(() => {
    cy.visit("/cadastro");
    dados = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
    };
  });

  it("CT001 - Cadastro com dados válidos", () => {
    cy.preencheCadastro(dados.nome, dados.email, dados.senha);
    cy.submeteCadastro();
    cy.validaMensagemSucesso("Usuário inserido com sucesso");
  });

  it("CT002 - Senha curta", () => {
    cy.preencheCadastro(dados.nome, dados.email, "123");
    cy.submeteCadastro();
    cy.validaMensagemSucesso("Usuário inserido com sucesso");
  });

  it("CT003 - Email com espaços antes e depois", () => {
    cy.preencheCadastro(dados.nome, dados.email, dados.senha);
    cy.submeteCadastro();
    cy.validaMensagemSucesso("Usuário inserido com sucesso");
  });

  it("CT004 - Nome contendo números", () => {
    cy.preencheCadastro(dados.nome, dados.email, "Teste123");
    cy.submeteCadastro();
    cy.validaMensagemSucesso("Usuário inserido com sucesso");
  });

  it("CT005 - Nome com letras e números", () => {
    cy.preencheCadastro(dados.nome, dados.email, "Teste456");
    cy.submeteCadastro();
    cy.validaMensagemSucesso("Usuário inserido com sucesso");
  });

  context("Validação de campos obrigatórios e erros - Seu Barriga", () => {
    it("CT006 - Nome em branco", () => {
      cy.preencheCadastro(" ", dados.email, dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro("Nome é um campo obrigatório");
    });

    it("CT007 - Email em branco", () => {
      cy.preencheCadastro(dados.nome, " ", dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro("Email é um campo obrigatório");
    });

    it("CT008 - Senha em branco", () => {
      cy.preencheCadastro(dados.nome, dados.email, dados.senha, " ");
      cy.submeteCadastro();
      cy.validaMensagemErro("Senha é um campo obrigatório");
    });

    it("CT009 - Todos os campos em branco", () => {
      cy.preencheCadastro(" ", " ", " ");
      cy.submeteCadastro();
      cy.validaMensagemErro("Nome é um campo obrigatório");
    });

    it("CT010 - Campos com espaços em branco", () => {
      cy.preencheCadastro("   ", "   ", "   ");
      cy.submeteCadastro();
      cy.validaMensagemErro("Nome é um campo obrigatório");
      cy.validaMensagemErro("Email é um campo obrigatório");
      cy.validaMensagemErro("Senha é um campo obrigatório");
    });

    it("CT011 - Email inválido (sem @)", () => {
      cy.preencheCadastro(dados.nome, "joao.com", dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro("nclua um “@” no endereço de e-mail");
    });

    it("CT012 - Caracteres especiais no email", () => {
      cy.preencheCadastro(dados.nome, "teste@@teste.com", dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro(
        "A parte depois de “@” não deve conter o símbolo “@”."
      );
    });

    it("CT013 - Nome com caracteres especiais e email inválido", () => {
      cy.preencheCadastro("&@*!@", "mariaemail.com", dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro("Inclua um “@” no endereço de e-mail");
    });

    it("CT014 - Email já cadastrado", () => {
      cy.preencheCadastro(dados.nome, "teste@email.com", dados.senha);
      cy.submeteCadastro();
      cy.validaMensagemErro("Endereço de email já utilizado");
    });
  });
});