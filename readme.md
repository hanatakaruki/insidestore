# Inside Store Automated Test #

Automation tests for [Inside Store](http://training.inside.tm/homepage/w4/i2/).

## Getting Started ##

Things to do before running or updating this automation.

### A. Create your test environment ###

Of course, the first thing you need to do first is to setup your environtment:

1. Take a note on the site [URL](http://training.inside.tm)
2. Take a note on the exisiting customer / registered user credentials
3. Generate VCC online [here](https://www.vccgenerator.org/), and take a note about the VCC data

### B. Set cypress.env.json file ###

The cypress.env.json file stores important information specific to your environment such as the base URL and the exisiting customer / registered user credentials. Please create this file **in the root of the project folder** (together with cypress.config.json file) and put the following as the content:

```
{
    "baseUrl": "your_url",
    "existingCustomer": {
      "username": "your_username",
      "password": "your_password"
    },
    "creditcardData": {
      "name_on_credit_card": "your_name_on_credit_card",
      "credit_card_type": "your_credit_card_type",
      "card_number": "your_card_number",
      "month_expiry_date":"your_month_expiry_date",
      "year_expiry_date":"youryear_expiry_date",
      "vcc":"your_vcc"
    }
  }
```

or you can just copy my cypress.env.json

```
{
    "baseUrl": "http://training.inside.tm",
    "existingCustomer": {
      "username": "john@doe.com",
      "password": "123johndoe"
    },
    "creditcardData": {
      "name_on_credit_card": "john doe",
      "credit_card_type": "Mastercard",
      "card_number": "5432483972576909",
      "month_expiry_date":"05",
      "year_expiry_date":"25",
      "vcc":"669"
    }
  }
```


PS: for credit_card_type, you should choose Visa or Mastercard

### C. Install NPM dependencies ###

To install the dependencies, just run in the root folder of the project:

```
npm install
```

## Running The Tests ##

There are two method to run the test:
- Selecting via GUI
- Run specific test via terminal/command prompt

### GUI ###

To open the GUI, you just need to run this command:

```
npx cypress open
```

After that you can select the test you want to run.

### Terminal/Command Prompt ###

To run all tests, use this command:

```
npx cypress run
```
Or

```
npm run test:all
```
To run all tests, without recording (might speed your test)

```
npm run test:allnorecord
```
## Open the report ##

After test is completed, you can open the report on the report folder,
you can choose, HTML , JSON, MESSAGE report.