Feature: insideStore home page

    As a customer, I want to be able to get to the store's homepage,
    so that I can look around.

    Scenario: All elements on the homepage must be visible
        When the user navigates to the "Home" page
        Then the user should be able to see these elements:
            | elements      |
            | Web Logo      |
            | Search Field  |
            | Customer Menu |
            | Main Menu     |
            | Cart Total    |
            | Promo         |
            | Carousel      |
            | Whats Hot     |
            | Title Layout  |
            | Footer        |

    Scenario Outline: <test_status> navigates to insideStore home page <login_status> login
        When the user navigates to the "Sign in / Create Account" page
        When the "<customer_type>" customer is logged in
        And the user navigates to the "Home" page
        Then the customer menu <isShould> contains the customer name

        Examples:
            | test_status | login_status | customer_type | isShould  |
            | Success     | after        | existing      | should    |
            | Success     | without      | guest         | shouldn't |

    Scenario: the user able to open product page from home page
        When the user navigates to the "Home" page
        And the user select product "WOL fur attached hood & pumpum duffle coat"
        Then the user should navigate to the "WOL fur attached hood & pumpum duffle coat" product page

    Scenario: the user can add hot's product to their cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        Then the user should navigate to the "Default Cart" page

    Scenario Outline: User able to select "<campaign>" campaign on the home page
        When the user navigates to the "Home" page
        And the user select category campaign "<campaign>"
        Then the user should navigate to the "<page>" page

        Examples:
            | campaign           | page                     |
            | summer is bright   | Product Category > Women |
            | grab a bargain     | Product Category > Sale  |
            | 1938 is here again | Product Category > Women |




