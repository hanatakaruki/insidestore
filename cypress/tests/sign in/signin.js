import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Set the username
 *
 * @param {string} username
 *
 * @example
 *  When the user set the username to "johndoe"
 */
When ('the user set the username to {string}',(username)=>{
  cy.get('input[name="login"]').type(username)
})

/**
 * Set the password
 *
 * @param {string} password
 *
 * @example
 *  When the user set the password to "123johndoe"
 */
When ('the user set the password to {string}',(password)=>{
  cy.get('input[name="password"]').type(password)
})

/**
 * Press the login button
 *
 * @example
 *  When the user press the login button
 */
When ('the user press the login button',()=>{
  cy.get('.loginButton').click()
})

