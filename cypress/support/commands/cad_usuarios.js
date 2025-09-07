// Preenche o formulário de cadastro
Cypress.Commands.add("preencheCadastro", (nome, email, senha) => {
  cy.get("#nome").type(nome);
  cy.get("#email").type(email);
  cy.get('input[type="password"]').type(senha);
});

// Submete o cadastro
Cypress.Commands.add("submeteCadastro", () => {
  cy.contains("Cadastrar").click();
});

// Valida mensagem de sucesso
Cypress.Commands.add("validaMensagemSucesso", (mensagem) => {
  cy.contains(mensagem).should("be.visible");
});

// Valida mensagem de erro
Cypress.Commands.add("validaMensagemErro", () => {
cy.get("#email").then(($input) => {
        $input[0].reportValidity(); // força a mensagem nativa
        const msg = $input[0].validationMessage; // pega o texto real
        cy.log("validationMessage: " + msg); // aparece no Command Log do Cypress
        // também pode imprimir no console do browser
        console.log("validationMessage:", msg);
        expect(msg).to.include(msg);
      });
});
