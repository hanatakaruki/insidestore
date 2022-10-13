Feature: insideStore log out

    As a customer, I want a logout button on every page,
    so that I can logout from anywhere.

    Scenario Outline: the user able to logout from <pageName> page
        When the user navigates to the "Sign in / Create Account" page
        And the "existing" customer is logged in
        And the user navigates to the "<pageName>" page
        And the user logout from insideStore
        Then the user should navigate to the "Default Home" page

        Examples:
            | pageName                        |
            | Home                            |
            | Product Category > New Arrivals |
            | Cart                            |