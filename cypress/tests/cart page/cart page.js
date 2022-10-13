import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Change product quantity on the cart page
 *
 * @param {string} productName product name
 * @param {string} qty product quantity
 *
 * @example
 *  When the user change product quantity for "PSP 3000" product to "2"
 */
When(
  "the user change product quantity for {string} product to {string}",
  (productName, qty) => {
    cy.get("#cartCellBody").should("be.visible");
    cy.get("td")
      .contains(productName)
      .nextUntil(".inputnn4fix > .inputbox")
      .eq(0)
      .click()
      .clear()
      .type(qty);
  }
);


/**
 * Check quantity of product
 *
 * @param {string} productName product name
 * @param {string} qty product quantity
 *
 * @example
 *  Then the product quantity for "PSP 3000" product should be "3"
 */
Then(
  "the product quantity for {string} product should be {string}",
  (productName, qty) => {
    cy.contains(productName).should("be.visible");
    cy.contains(qty).should("be.visible");
  }
);

/**
 * Check product on the cart page
 *
 * @param {should} shouldOperator
 * @param {string} productName product name
 *
 * @example
 *  Then the "PSP 3000" product should show on the cart
 */
 Then(
    "the {string} product {should} show on the cart",
    (productName, shouldOperator) => {
      cy.get("#cartCellBody").should("be.visible");
      cy.contains(productName).should(`${shouldOperator ? "" : "not."}exist`);
    }
  );
  
  /**
   * Check product information on the cart page
   *
   * @param {string} productName product name
   * @param {DataTable} DataTable
   *
   * @example
   *       Then the "WOL fur attached hood & pumpum duffle coat" product on the cart should contain:
              | product_detail          |
              | Thumbnail of Product    |
              | Description of Product  |
              | Quantity of Product     |
              | Checkbox Delete Product |
              | Product Price           |
              | Total Product Price     |
              | Cart Subtotal           |
              | Cart Total              |
   */
  Then(
    "the {string} product on the cart should contain:",
    (productName, DataTable) => {
      DataTable.hashes().forEach((inputRow) => {
        const elementClass = {
          "Thumbnail of Product": ".imageborder",
          "Description of Product": ':nth-child(2) > [align="left"]',
          "Quantity of Product": ".inputnn4fix > .inputbox",
          "Checkbox Delete Product": ":nth-child(5) > input",
          "Product Price": "tbody > :nth-child(2) > :nth-child(6)",
          "Total Product Price": ":nth-child(2) > :nth-child(7)",
          "Cart Subtotal":
            ':nth-child(2) > [colspan="3"] > table > tbody > :nth-child(1) > :nth-child(2)',
          "Cart Total": ":nth-child(2) > b",
        }[inputRow.product_detail];
  
        cy.get(elementClass).should("be.visible");
      });
    }
  );