Feature: insideStore cart page

    As a customer, I want to be able to add a product to the cart,
    so that I can see the products I have added to my cart

    Scenario: the user can directly add the product to their cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        Then the user should navigate to the "Default Cart" page
        Then the "WOL fur attached hood & pumpum duffle coat" product should show on the cart

    Scenario: the user can see detail of added product on the cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        Then the user should navigate to the "Default Cart" page
        Then the "WOL fur attached hood & pumpum duffle coat" product on the cart should contain:
            | product_detail          |
            | Thumbnail of Product    |
            | Description of Product  |
            | Quantity of Product     |
            | Checkbox Delete Product |
            | Product Price           |
            | Total Product Price     |
            | Cart Subtotal           |
            | Cart Total              |

    Scenario: the user able to change quantity of product on the cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user change product quantity for "WOL fur attached hood & pumpum duffle coat" product to "19"
        And the user press "recalculate" button
        Then the product quantity for "WOL fur attached hood & pumpum duffle coat" product should be "19"

    Scenario: the user able to add more product on the cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user press "continue shopping" button
        And the user select product "Land Army Lady Jacket"
        And the user set quantity of product to "2"
        And the user press add to basket button
        Then the "WOL fur attached hood & pumpum duffle coat" product should show on the cart
        Then the "Land Army Lady Jacket" product should show on the cart

    Scenario: the user remove all products on the cart
        When the user navigates to the "Home" page
        And the user add "WOL fur attached hood & pumpum duffle coat" product to the cart
        And the user press "continue shopping" button
        And the user select product "Land Army Lady Jacket"
        And the user set quantity of product to "2"
        And the user press add to basket button
        And the user press "remove all" button
        Then the "WOL fur attached hood & pumpum duffle coat" product shouldn't show on the cart
        Then the "Land Army Lady Jacket" product shouldn't show on the cart