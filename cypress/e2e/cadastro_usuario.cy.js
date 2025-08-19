/// <reference types="cypress" />

// Import da Page Object
const CadastroPage = require('../support/pagesObjects/CadastroPage.js');

describe('Cadastro Usuário - Validações e Fluxos', () => {
  beforeEach(() => {
    // Redefine a tela antes de cada teste
    CadastroPage.visit();
  });

  // Cadastro com dados válidos
  it('CT001 - Deve cadastrar com dados válidos', () => {
    const email = CadastroPage.gerarEmailUnico('sucesso');
    CadastroPage.cadastrarUsuario('Maria Teste', email, '123456');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Senha menor que 6 caracteres, Cenário não implementado no sistema
// it('CT002 - Não deve permitir senha menor que 6 caracteres', () => {
//   const email = CadastroPage.gerarEmailUnico('senha_curta');
  
//   // Preenche os campos e clica em cadastrar
//   CadastroPage.fillNome('Ana');
//   CadastroPage.fillEmail(email);
//   CadastroPage.fillSenha('123');
//   CadastroPage.clickCadastrar();
  
//   // Validação correta: Verifica se a mensagem de erro de senha curta é exibida
//   CadastroPage.shouldShowSenhaCurta(); 
// });

  // Email com espaços antes/depois (site remove os espaços)
it('CT003 - Deve cadastrar email com espaços antes/depois (trim)', () => {
  const emailComEspacos = ` espacos_${Date.now()}@email.com `;
  CadastroPage.cadastrarUsuario('Carlos', emailComEspacos, '123456');
  // O site remove os espaços e o cadastro é bem-sucedido.
  CadastroPage.shouldShowSuccessMessage();
  // A validação do valor do campo foi removida, pois o site limpa o campo após o sucesso.
});

  // Nome apenas com números (site aceita)
  it('CT004 - Deve permitir nome só com números', () => {
    const email = CadastroPage.gerarEmailUnico('num');
    CadastroPage.cadastrarUsuario('123456', email, 'Teste123');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Nome com letras e números (site aceita)
  it('CT005 - Deve permitir nome com letras e números', () => {
    const email = CadastroPage.gerarEmailUnico('lucas456');
    CadastroPage.cadastrarUsuario('Lucas456', email, 'Teste456');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Nome em branco
  it('CT006 - Não deve permitir nome em branco', () => {
    CadastroPage.testarCampoObrigatorio('nome');
  });

  // Email em branco
  it('CT007 - Não deve permitir email em branco', () => {
    CadastroPage.testarCampoObrigatorio('email');
  });

  // Senha em branco
  it('CT008 - Não deve permitir senha em branco', () => {
    CadastroPage.testarCampoObrigatorio('senha');
  });

  // Todos os campos em branco
  it('CT009 - Não deve permitir todos os campos em branco', () => {
    CadastroPage.testarCampoObrigatorio('todos');
  });

  // Todos os campos só com espaço em branco
it('CT010 - Deve permitir nome com um espaço e falhar com outros campos vazios', () => {
  // A aplicação Wcaquino aceita um espaço em branco para o campo Nome.
  // Portanto, este teste deve focar nos campos que realmente não aceitam o valor vazio.
  CadastroPage.fillNome(' ');
  CadastroPage.fillEmail(' ');
  CadastroPage.fillSenha(' ');
  CadastroPage.clickCadastrar();
  // O nome com espaço é aceito, então a validação de nome obrigatório não deve aparecer.
  CadastroPage.shouldShowEmailObrigatorio();
});

  // Email inválido (sem @)
  it('CT011 - Não deve permitir email sem "@"', () => {
    CadastroPage.cadastrarUsuario('João', 'joao.com', '123456');
    CadastroPage.shouldShowEmailSemArroba();
  });

  // Email com múltiplos "@"
  it('CT012 - Não deve permitir email com múltiplos "@"', () => {
    CadastroPage.cadastrarUsuario('Joana', 'joana@@teste.com', '123456');
    CadastroPage.shouldShowEmailMultiplosArrobas();
  });

  // Nome só com caracteres especiais (site aceita)
  it('CT013 - Deve permitir nome só com caracteres especiais', () => {
    CadastroPage.cadastrarUsuario('&@*!@', CadastroPage.gerarEmailUnico('caracteres_esp'), 'Teste123');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Email já cadastrado
  it('CT014 - Não deve permitir email já cadastrado', () => {
    const emailDuplicado = CadastroPage.gerarEmailUnico('duplicado');
    CadastroPage.testarEmailDuplicado('Usuário Original', emailDuplicado, '123456');
  });

  // Nome com letras acentuadas
  it('CT015 - Deve permitir nome com letras acentuadas', () => {
    const email = CadastroPage.gerarEmailUnico('acentuado');
    CadastroPage.cadastrarUsuario('José Ávila', email, 'Teste123');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Nome com espaço no meio
  it('CT016 - Deve permitir nome composto', () => {
    const email = CadastroPage.gerarEmailUnico('composto');
    CadastroPage.cadastrarUsuario('Maria Clara', email, 'Teste123');
    CadastroPage.shouldShowSuccessMessage();
  });

  // Email sem nome de usuário (ex: @teste.com)
  it('CT017 - Não deve permitir email sem nome de usuário', () => {
    CadastroPage.cadastrarUsuario('Gabriel', '@teste.com', '123456');
    CadastroPage.shouldShowEmailSemUsuario();
  });

  // Email mal formatado (ex: maria@)
  it('CT018 - Não deve permitir email sem domínio', () => {
    CadastroPage.cadastrarUsuario('Gabriela', 'maria@', '123456');
    CadastroPage.shouldShowEmailSemDominio();
  });

  // Nome com traço ou apóstrofo
  it('CT019 - Deve permitir nome com traço ou apóstrofo', () => {
    const email = CadastroPage.gerarEmailUnico('tracoapostrofo');
    CadastroPage.cadastrarUsuario("Ana-Clara D'Ávila", email, 'Teste123');
    CadastroPage.shouldShowSuccessMessage();
  });
});