Feature: insideStore product page

    I want to be able to view product details by opening the product page as a customer.
    So I can learn more about the product before deciding to add it to my cart.


    Scenario: All elements on the homepage must be visible
        When the user navigates to the "Home" page
        And the user select product "WOL fur attached hood & pumpum duffle coat"
        Then the user should be able to see these elements:
            | elements             |
            | Product Title        |
            | Style Number         |
            | Product Quantity     |
            | Add to Basket Button |
            | Product Description  |
            | Product Images       |


    Scenario Outline: navigate to the <product_name> page from <product_category> page
        When the user navigates to the "Home" page
        And the user select "<product_category>" category from main menu
        And the user select product "<product_name>"
        Then the user should navigate to the "<product_name>" product page

        Examples:
            | product_name                               | product_category |
            | WOL fur attached hood & pumpum duffle coat | New Arrivals     |
            | Capstone Slim Shirt                        | Mens > Shirts    |

    Scenario Outline: user can add <qty> of <product_name> to cart
        When the user navigates to the "Home" page
        And the user select "<product_category>" category from main menu
        And the user select product "<product_name>"
        And the user set quantity of product to "<qty>"
        And the user press add to basket button
        Then the user should navigate to the "Default Cart" page
        Examples:
            | qty | product_name                               | product_category |
            | 2   | WOL fur attached hood & pumpum duffle coat | New Arrivals     |
            | 3   | Capstone Slim Shirt                        | Mens > Shirts    |


