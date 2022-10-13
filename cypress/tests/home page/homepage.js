import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Open product campaign from the home page
 *
 * @param {string} campaign product campaign
 *
 * @example
 *  Then the user select category campaign "summer is bright"
 */
When("the user select category campaign {string}", (campaign) => {
  cy.get("p").contains(campaign).next().click();
});

/**
 * Assert elements should be visible
 *
 * @param {DataTable} dataTable Data table
 *
 * @example
        Then the user should be able to see these elements:
            | elements      |
            | Web Logo      |
            | Search Field  |
            | Customer Menu |
            | Main Menu     |
            | Cart Total    |
            | Promo         |
            | Carousel      |
            | Whats Hot     |
            | Title Layout  |
            | Footer        |
 */
Then("the user should be able to see these elements:", (DataTable) => {
  // hash the datatable first
  DataTable.hashes().forEach((inputRow) => {
    // get data from fixture file
    cy.fixture("elements").then((allElements) => {
      let ele = Cypress._.find(allElements, {
        name: inputRow.elements,
      });
      cy.get(ele.class).should("exist");
    });
  });
});

/**
 * Assert customer menu should contains the customer name
 *
 * @param {should} shouldOperator
 *
 * @example
        Then the customer menu should contains the customer name
 */
Then(
  "the customer menu {should} contains the customer name",
  (shouldOperator) => {
    cy.get(".theCustomerMenu")
      .find("strong")
      .should(`${shouldOperator ? "contain." : "not."}text`, "john");
  }
);
