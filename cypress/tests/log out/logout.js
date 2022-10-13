import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Click logout text
 *
 * @example
 *  When the user logout from insideStore
 */
When('the user logout from insideStore', ()=>{
    cy.get('.theCustomerMenu > table > tbody > tr > td > a').click()
})