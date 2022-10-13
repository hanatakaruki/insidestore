Feature: insideStore sign up

    As a customer,
    I'd like to be able to sign up,
    So that I can easily create an account from the sign up page

    Scenario: When the required field is left blank, the user cannot register.
        When the user navigates to the "Sign in / Create Account" page
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
        And the user set the account details to:
            | data                    | data_value |
            | Email Address           |            |
            | Password                |            |
            | Confirm Password        |            |
            | Subscribe to Newsletter |            |
        And the user pressed the save and continue button
        Then the pop-up window should be visible
        Then the text "Please complete the following mandatory fields :" should appear in the pop-up content


    Scenario Outline: When the user password is <condition>, registering is impossible.
        When the user navigates to the "Sign in / Create Account" page
        And the user enters "<password>" as the password
        Then "<alert_text>" should appear in the alert
        Examples:
            | condition                       | password                    | alert_text                                             |
            | less than eight characters      | 123                         | Your password must contain at least 8 characters       |
            | not contain a letter            | 12345678                    | Your password must contain at least one letter         |
            | contain more than 20 characters | onetwothreefourfivesixseven | Your password must not contain more than 20 characters |

    Scenario: When using existing data, the user is unable to register.
        When the user navigates to the "Sign in / Create Account" page
        And the customer details were set by the user to:
            | data           | data_value      |
            | First Name     | john            |
            | Surname        | doe             |
            | Address        | victoria        |
            | Surbub/City    | victoria        |
            | State/Province | New South Wales |
            | Country        |                 |
            | Post Code      | 2000            |
            | Phone No       | 092099389281    |
        And the shipping address was set by the user to:
            | data                 | data_value |
            | Contact Name         | john       |
            | Company Name         | john doe   |
            | Copy billing address | Yes        |
            | Address              |            |
            | Suburb/City          |            |
            | State/Province       |            |
            | Country              |            |
            | Post Code            |            |
        And the user set the account details to:
            | data                    | data_value   |
            | Email Address           | john@doe.com |
            | Password                | 123johndoe   |
            | Confirm Password        | 123johndoe   |
            | Subscribe to Newsletter |              |
        And the user pressed the save and continue button
        Then the pop-up window should be visible
        Then the text "already exist in the system:" should appear in the pop-up content

    Scenario: When a user enters the correct information, the user can register.
        When the user navigates to the "Sign in / Create Account" page
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
