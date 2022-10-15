import { When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
let idata
    
// open the site
When(
  "the user open the store website",
  () => {
    cy.intercept('https://us-sandbox-live.inside-graph.com/signalr/start?transport=webSockets&clientProtocol=2.1&**').as('process')
    cy.intercept('https://us-sandbox-live.inside-graph.com/**').as('backgroundProcess')
    cy.intercept('https://us-sandbox-live.inside-graph.com/signalr/**').as('signalProcess')
    cy.visit('https://us-sandbox.insideyourbusiness.com/?automation-test')
    cy.wait(['@backgroundProcess', '@signalProcess', '@process'])

  }
);

// click floating chat icon
When('the user click floating chat icon',()=>{
  cy.intercept('https://us-sandbox-live.inside-graph.com/api/chat/GetSessionChat').as('botPreparation')
  cy.get('circle').click({force: true})
  cy.wait('@botPreparation')
  cy.get('#insideChatFrame').invoke('attr', 'style', 'visibility: show')
})
Then ('the user should see these options:',(DataTable)=>{
    DataTable.hashes().forEach((inputRow) => {
      cy.getIframe('#insideChatFrame').find('div > .picklistOption').contains(inputRow.options).scrollIntoView().should('be.visible')
    })
})

// select option from chatbot menu
When('the user choose {string} option',(option)=>{
  cy.getIframe('#insideChatFrame').find('div > .picklistOption').contains(option).click()
})

// Chat with chatbot
Then ('the user can interact with offline chat bot with these scenario:',(DataTable)=>{
  DataTable.hashes().forEach((inputRow) => {
    cy.getIframe('#insideChatFrame').find('.content').should('contain.text',inputRow.chatbot)
    cy.getIframe('#insideChatFrame').find(`[class^="inside-field"] > input[type="${inputRow.type}"]`).click({force: true}).type(inputRow.me, {force: true})
    cy.getIframe('#insideChatFrame').find('#chatSendButton').click({force: true})
    //adding delay to makesure we can assert the message content
    cy.wait(2500)
  })
})

// Assert the button to visible after chat is ended by chatbot
Then ('the {string} button {should} be visible after your chat has ended by chatbot',(btnText,shouldOperator)=>{
  //#startANewChatButton
  cy.getIframe('#insideChatFrame').find('#startANewChatButton').contains(btnText).should(`${shouldOperator ? "be." : "not."}visible`);
})