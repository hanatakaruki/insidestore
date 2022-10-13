import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Enter user password
 *
 * @param {string} pass is user password
 *
 * @example
 *  When the user enters "1234" as the password
 */
When("the user enters {string} as the password", (pass) => {
  cy.get('.inputbox[name="_321_0"]').type(pass);
  cy.get('.inputbox[name="confirmpassword271720530"]').focus();
});


/**
 * Assert alert message should contain a text
 *
 * @param {string} alertMessage is message text
 *
 * @example
 *  Then "Your password must contain at least 8 characters " should appear in the alert
 */
Then("{string} should appear in the alert", (alertMessage) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(`${alertMessage}`);
  });
});
