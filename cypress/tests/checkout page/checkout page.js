import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the user fill credit cart form", () => {
    cy.get("#cartCellBody").should("be.visible");
  //name on card
  cy.get(":nth-child(1) > :nth-child(2) > .inputbox").type(
    Cypress.env("creditcardData").name_on_credit_card
  );
  //card type
  cy.get(":nth-child(2) > :nth-child(2) > .inputbox").select(
    Cypress.env("creditcardData").credit_card_type
  );
  //card number
  cy.get(":nth-child(3) > :nth-child(2) > .inputbox").type(
    Cypress.env("creditcardData").card_number
  );
  //expiry date
  cy.get('[name="exdate1"]').type(Cypress.env("creditcardData").month_expiry_date);
  cy.get('[name="exdate2"]').type(Cypress.env("creditcardData").year_expiry_date);
  //cvv
  cy.get(":nth-child(6) > :nth-child(2) > .inputbox").type(
    Cypress.env("creditcardData").vcc
  );
});
