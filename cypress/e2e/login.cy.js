/// <reference types="cypress" />

// Import das Pages Objects
const LoginPage = require('../support/pagesObjects/LoginPage.js');

describe('Funcionalidade de Login - Seu Barriga', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  it('CT001 - Deve fazer login com credenciais válidas', () => {
    LoginPage.fazerLogin('maria.teste001@teste.com', '123456');
    LoginPage.shouldShowWelcomeMessage();
  });

  it('CT002 - Deve exibir erro ao tentar login com email em branco', () => {
    LoginPage.testarCampoObrigatorio('email');
  });

  it('CT003 - Deve exibir erro ao tentar login com senha em branco', () => {
    LoginPage.testarCampoObrigatorio('senha');
  });

  it('CT004 - Deve exibir erro ao tentar login com todos os campos em branco', () => {
    LoginPage.testarCampoObrigatorio('ambos');
  });

  it('CT005 - Deve exibir erro ao informar email sem "@"', () => {
    LoginPage.fillEmail('usuarioemail.com');
    LoginPage.fillPassword('senha123');
    LoginPage.clickEntrar();
    LoginPage.shouldShowEmailSemArroba();
  });

  it('CT006 - Deve exibir mensagem genérica ao tentar login com senha curta', () => {
    LoginPage.fazerLogin('maria.teste001@teste.com', '123');
    LoginPage.shouldShowProblemasLogin();
  });

  it('CT007 - Deve permitir login mesmo com espaços antes/depois no email', () => {
    LoginPage.fillEmail(' maria.teste001@teste.com ');
    LoginPage.fillPassword('123456');
    LoginPage.clickEntrar();
    LoginPage.shouldShowWelcomeMessage();
  });

it('CT008 - Deve exibir erro para múltiplos "@" no email', () => {
  LoginPage.fazerLogin('m@ria.teste001@teste.com', '123456');
  LoginPage.shouldShowEmailMultiplosArrobas();
});

  it('CT009 - Deve exibir erro genérico para senha com caracteres especiais', () => {
    LoginPage.fazerLogin('maria.teste001@teste.com', '@!#%¨&*()');
    LoginPage.shouldShowProblemasLogin();
  });

  it('CT010 - Deve exibir erro para email com nome inválido e múltiplos "@"', () => {
    LoginPage.fazerLogin('m@ria.teste001@teste.com', 'senha123');
    LoginPage.shouldShowEmailMultiplosArrobas();
  });

  it('CT011 - Deve permitir login com números no nome do email', () => {
    LoginPage.fazerLogin('maria.teste001@teste.com', '123456');
    LoginPage.shouldShowWelcomeMessage();
  });

  it('CT012 - Deve exibir erro para email sem "@"', () => {
    LoginPage.fazerLogin('maria.teste001teste.com', '123456');
    LoginPage.shouldShowEmailError();
  });

  it('CT013 - Deve exibir erro para email sem nome de usuário', () => {
    LoginPage.fazerLogin('@teste.com', '123456');
    LoginPage.shouldShowEmailSemUsuario();
  });

  it('CT014 - Deve exibir erro genérico para domínio incompleto', () => {
    LoginPage.fazerLogin('maria.teste001@teste', '123456');
    LoginPage.shouldShowProblemasLogin();
  });

  it('CT015 - Deve exibir erro se email em maiúsculas não for tratado', () => {
    LoginPage.fazerLogin('MARIA.TESTE001@TESTE.COM', '123456');
    LoginPage.shouldShowProblemasLogin();
  });

  it('CT016 - Deve exibir erro de login inválido após múltiplas tentativas', () => {
    LoginPage.testarMultiplasTentativas('maria.teste001@teste.com', 'senhaErrada', 3);
  });

});
