const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const _ = require("lodash");
const fs = require("fs");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

// Set the default values for the settings
let baseUrl = "http://training.inside.tm";
let environmentVars = {
  existingCustomer: {
    username: "john@doe.com",
    password: "123johndoe",
  },
  creditcardData: {
    name_on_credit_card: "john doe",
    credit_card_type: "Mastercard",
    card_number: "5432483972576909",
    month_expiry_date: "05",
    year_expiry_date: "25",
    vcc: "669",
  },
};

// Check if we have the custom environment setting. Replace the default value if it exist.
if (fs.existsSync("cypress.env.json")) {
  const devEnv = require("./cypress.env.json");
  baseUrl = devEnv.baseUrl;
  environmentVars = _.merge(environmentVars, devEnv);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: baseUrl,
    specPattern: "cypress/tests/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    env: environmentVars,
    setupNodeEvents,
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "report/junit/report-junit-[hash].xml",
    toConsole: true,
  },

  pageLoadTimeout: 990000,
});
