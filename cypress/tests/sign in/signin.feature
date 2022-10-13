Feature: insideStore log in

  As a customer,
  I'd like to be able to sign in to my account and check out products without having to enter a shipping address.

  Scenario Outline: <status> logging in to insideStore with the <credential_status> credentials
    When the user navigates to the "Sign in / Create Account" page
    And the user set the username to "<username>"
    And the user set the password to "<password>"
    And the user press the login button
    Then the user <url_status> navigate to the "Default Cart" page
    Then the pop-up window <popup_status> be visible

    Examples:
      | status  | credential_status | username       | password      | url_status | popup_status |
      | Failed  | incorrect         | john@gmail.com | wr0n9Password | shouldn't  | should       |
      | Success | correct           | john@doe.com   | 123johndoe    | should     | shouldn't    |
