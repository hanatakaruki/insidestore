// cypress/e2e/duckduckgo.ts
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

const {
  defineParameterType,
} = require("@badeball/cypress-cucumber-preprocessor");

const _ = Cypress._;

// =============================================================================
//  Utilities
// =============================================================================

/**
 * Try to add "should" parameter type for type definition
 *
 * Accept string of "should", "shouldn't", or "should not".
 */
try {
  defineParameterType({
    name: "should",
    regexp: /shouldn't|should not|should/,
    transformer(input) {
      return input === "should";
    },
  });
} catch {}

/**
 * Parsing Path from the string
 */
const parsePath = (path) => {
  return path
    .replace(/\s?>\s?/g, ">") // Removes the extra spaces around ">"
    .split(">"); // Return it as array
};

/**
 * Convert text to slug
 */
const nameToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

/**
 * Set the product quantity
 *
 * @param {string} qty quantity of product
 *
 * @example
 *  When the user set quantity of product to "2"
 */
When("the user set quantity of product to {string}", (qty) => {
  cy.get("[id^=quantity]").clear().type(qty);
});

/**
 * Press add to basket button
 *
 * @example
 *  When the user press add to basket button
 */
When("the user press add to basket button", () => {
  cy.get("b > img").click();
});

/**
 * Adding product to the cart (if the product show add to basket button on the page, example: on the home page)
 *
 * @param {string} productName product name
 *
 * @example
 *  Then the user add "PSP 3000" product to the cart"
 */
When("the user add {string} product to the cart", (productName) => {
  cy.get('[id^="productShortDescription"] > a')
    .contains(productName)
    .parentsUntil('[class^=" productType"]')
    .find('[id^="ShowVariations"]')
    .click();
});

// =============================================================================
// Common Step
// =============================================================================

/**
 * navigate to the page
 *
 * @param {string} pageName page name / title
 *
 * @example
 *  When the user navigates to the "Home" page
 */
When("the user navigates to the {string} page", (pageName) => {
  //get data from fixture file
  cy.fixture("url").then((allPage) => {
    let page = Cypress._.find(allPage, {
      name: pageName,
    });
    switch (page.name) {
      case "Sign in / Create Account":
        cy.intercept("/admin/utilities/function-login.asp?*").as("util");
        cy.intercept("https://au-live.inside-graph.com/**").as("aulive");
        cy.intercept("https://au-live.inside-graph.com/signalr/**").as(
          "signal"
        );
        cy.visit(page.link);
        cy.get(".countdownLabel").then(($countdown) => {
          if ($countdown.is(":visible")) {
            cy.wait(4000);
          }
          cy.wait(["@aulive", "@util", "@signal"]);
        });
        break;

      default:
        cy.visit(page.link);
        break;
    }
  });
});

/**
 * Login step for guest and existing customer
 *
 * @param {string} userType is user type: guest or existing user
 *
 * @example
 *  When the "existing" customer is logged in
 */
When("the {string} customer is logged in", (userType) => {
  switch (userType) {
    case "existing":
      cy.get('input[name="login"]').type(
        Cypress.env("existingCustomer").username
      );
      cy.get('input[name="password"]').type(
        Cypress.env("existingCustomer").password
      );
      cy.get(".loginButton").click();
      break;
  }
});

/**
 * Assert the current page
 *
 * @param {should} shouldOperator
 * @param {string} pageName is page name / title
 *
 * @example
 *  Then the user should navigate to the "Cart" page
 */
Then(
  "the user {should} navigate to the {string} page",
  (shouldOperator, pageName) => {
    cy.fixture("url").then((allPage) => {
      let page = Cypress._.find(allPage, {
        name: pageName,
      });

      cy.url().should(`${shouldOperator ? "" : "not."}contain`, page.link);
    });
  }
);

/**
 * Select product
 *
 * @param {string} productName is product name
 *
 * @example
 *  When the user select product "PSP 3000"
 */
When("the user select product {string}", (productName) => {
  cy.get('[id^="productShortDescription"] > a').contains(productName).click();
});

// =============================================================================
// Common homepage Step
// =============================================================================

/**
 * Select product category from main menu
 *
 * @param {string} menuPath is menu path of product category
 *
 * @example
 *  When the user select "New Arrivals" category from main menu
 */
When("the user select {string} category from main menu", (menuPath) => {
  let isValid = menuPath.includes(">");
  cy.log(isValid);
  if (!isValid) {
    cy.get(".menutop").find("font").contains(menuPath).click();
  } else {
    menuPath = parsePath(menuPath);
    cy.get(".menutop").find("font").contains(menuPath[0]).trigger("mouseover");
    cy.get(".menuinnerbox").find("font").contains(menuPath[1]).click();
  }
});

// =============================================================================
// Common sign in / sign up Step
// =============================================================================

// store password form faker
const Pass = faker.internet.password();

/**
 * Update customer details field.
 *
 * @param {DataTable} dataTable Data table
 *
 * @example
        And the customer details were set by the user to:
            | data           | data_value |
            | First Name     |            |
            | Surname        |            |
            | Address        |            |
            | Surbub/City    |            |
            | State/Province |            |
            | Country        |            |
            | Post Code      |            |
            | Phone No       | Random     |
 */
When("the customer details were set by the user to:", (DataTable) => {
  DataTable.hashes().forEach((inputRow) => {
    const elementClass = {
      "First Name": '.inputbox[name="_72_0"]',
      Surname: '.inputbox[name="_73_0"]',
      Address: '.inputbox[name="_74_0"]',
      "Surbub/City": '.inputbox[name="_75_0"]',
      "State/Province": '.inputbox[name="_76_0"]',
      Country: '.inputbox[name="_77_0"]',
      "Post Code": '.inputbox[name="_78_0"]',
      "Phone No": '.inputbox[name="_79_0"]',
    }[inputRow.data];

    let phone = faker.phone.number();
    const dataValue = {
      "First Name": faker.name.firstName(),
      Surname: faker.name.lastName(),
      Address: faker.address.streetAddress(),
      "Surbub/City": faker.address.city(),
      "State/Province": faker.address.city(),
      Country: faker.address.country(),
      "Post Code": faker.address.zipCode(),
      "Phone No": phone,
    }[inputRow.data];

    switch (inputRow.data_value) {
      case "Random":
        cy.log(
          `${inputRow.data}:${elementClass} & ${inputRow.data_value}:${dataValue}`
        );
        cy.get(elementClass).type(dataValue);
        break;

      default:
        if (inputRow.data_value) {
          cy.get(elementClass).type(inputRow.data_value);
        }
        break;
    }
  });
});

/**
 * Update customer shipping address field.
 *
 * @param {DataTable} dataTable Data table
 *
 * @example
        And the shipping address was set by the user to:
            | data                 | data_value |
            | Contact Name         | Random     |
            | Company Name         | Random     |
            | Copy billing address |            |
            | Address              |            |
            | Suburb/City          |            |
            | State/Province       |            |
            | Country              |            |
            | Post Code            |            |
 */
When("the shipping address was set by the user to:", (DataTable) => {
  DataTable.hashes().forEach((inputRow) => {
    const elementClass = {
      "Contact Name": '.inputbox[name="_1838_0"]',
      "Company Name": '.inputbox[name="_1834_0"]',
      "Copy billing address": 'input[name="copyaddress"]',
      Address: '.inputbox[name="_81_0"]',
      "Suburb/City": '.inputbox[name="_82_0"]',
      "State/Province": '.inputbox[name="_83_0"]',
      Country: '.inputbox[name="_84_0"]',
      "Post Code": '.inputbox[name="_85_0"]',
    }[inputRow.data];

    const dataValue = {
      "Contact Name": faker.name.firstName(),
      "Company Name": faker.company.name(),
      Address: faker.address.streetAddress(),
      "Surbub/City": faker.address.city(),
      "State/Province": faker.address.city(),
      Country: faker.address.country(),
      "Post Code": faker.address.zipCode(),
    }[inputRow.data];

    switch (inputRow.data_value) {
      case "Random":
        cy.log(
          `${inputRow.data}:${elementClass} & ${inputRow.data_value}:${dataValue}`
        );
        cy.get(elementClass).type(dataValue);
        break;

      case "Yes":
        cy.get(elementClass).check();
        break;

      default:
        if (inputRow.data_value) {
          cy.get(elementClass).type(inputRow.data_value);
        }
        break;
    }
  });
});

/**
 * Update customer shipping address field.
 *
 * @param {DataTable} dataTable Data table
 *
 * @example
        And the user set the account details to:
            | data                    | data_value |
            | Email Address           |            |
            | Password                |            |
            | Confirm Password        |            |
            | Subscribe to Newsletter |            |
 */
When("the user set the account details to:", (DataTable) => {
  DataTable.hashes().forEach((inputRow) => {
    const elementClass = {
      "Email Address": '.inputbox[name="_89_0"]',
      Password: '.inputbox[name="_321_0"]',
      "Confirm Password": '.inputbox[name^="confirmpassword"]',
      "Subscribe to Newsletter": 'input[name="_1295_0"]',
    }[inputRow.data];

    const dataValue = {
      "Email Address": faker.internet.email(),
      Password: Pass,
      "Confirm Password": Pass,
    }[inputRow.data];

    switch (inputRow.data_value) {
      case "Random":
        cy.log(
          `${inputRow.data}:${elementClass} & ${inputRow.data_value}:${dataValue}`
        );
        cy.get(elementClass).type(dataValue);
        break;

      case "Yes":
        cy.get(elementClass).check();
        break;

      default:
        if (inputRow.data_value) {
          cy.get(elementClass).type(inputRow.data_value);
        }
        break;
    }
  });
});

/**
 * Press save and continue button
 *
 * @example
 *  When the user pressed the save and continue button"
 */
 When("the user pressed the save and continue button", () => {
  cy.get(':nth-child(8) > [width="60%"] > input').click();
});

/**
 * Check pop-up windows
 *
 * @param {should} shouldOperator
 *
 * @example
 *  Then he pop-up window should be visible
 */
Then("the pop-up window {should} be visible", (shouldOperator) => {
  cy.get("#PFPopUp_content").should(`${shouldOperator ? "" : "not."}exist`);
});

/**
 * Check pop-up windows text
 *
 * @param {string} popupContent is pop-up content
 *
 * @example
 *  Then the pop-up window should be visible
 */
Then(
  "the text {string} should appear in the pop-up content",
  (popupContent) => {
    cy.get("#PFPopUp_content").should("contain", popupContent);
  }
);

// =============================================================================
// Common product Step
// =============================================================================

/**
 * Assert the current page
 *
 * @param {should} shouldOperator
 * @param {string} productName is product name
 *
 * @example
 *  When the user select product "PSP 3000"
 */
Then(
  "the user {should} navigate to the {string} product page",
  (shouldOperator, productName) => {
    cy.url().should(
      `${shouldOperator ? "" : "not."}contain`,
      nameToSlug(productName)
    );
  }
);


// =============================================================================
// Common cart Step
// =============================================================================

/**
 * press button on the cart page
 *
 * @param {string} buttonText button text
 *
 * @example
 *  When the user press "recalculate" button
 */
 When("the user press {string} button", (buttonText) => {
  cy.get("#cartCellBody").should("be.visible");
  const elementClass = {
    recalculate: "#cartLinkRecalculate > b > img",
    "continue shopping": "#cartLinkContinueShopping > b > img",
    "remove all": "#cartLinkDeleteOrder > b > img",
    "next step":"#cartLinkCheckOut > b > img",
    "complete & pay":"#cartLinkCheckOut > b > img"
  }[buttonText];
  cy.get(elementClass).click();
});