Feature: insideStore checkout page

    As a customer, I want to be able to checkout product,
    so that I can purchase the product

    Scenario: the user able to login during the checkout process
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user press "next step" button
        And the "existing" customer is logged in
        Then the user should navigate to the "Default Cart" page

    Scenario: the user able to signup during the checkout process
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user press "next step" button
                And the customer details were set by the user to:
            | data           | data_value |
            | First Name     | Random     |
            | Surname        | Random     |
            | Address        | Random     |
            | Surbub/City    | Random     |
            | State/Province | Random     |
            | Country        |            |
            | Post Code      | Random     |
            | Phone No       | Random     |
        And the shipping address was set by the user to:
            | data                 | data_value |
            | Contact Name         | Random     |
            | Company Name         | Random     |
            | Copy billing address | Yes        |
            | Address              |            |
            | Suburb/City          |            |
            | State/Province       |            |
            | Country              |            |
            | Post Code            |            |
        And the user set the account details to:
            | data                    | data_value |
            | Email Address           | Random     |
            | Password                | Random     |
            | Confirm Password        | Random     |
            | Subscribe to Newsletter | Yes        |
        And the user pressed the save and continue button
        Then the user should navigate to the "Default Cart" page

    Scenario: the user able to login, add product to the card, and checkout the product
        When the user navigates to the "Sign in / Create Account" page
        When the "existing" customer is logged in
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user fill credit cart form
        And the user press "complete & pay" button
        Then the pop-up window should be visible
        Then the text "There was an error trying to process your Order with the supplied Credit Card info." should appear in the pop-up content

