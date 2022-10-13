Feature: insideStore product category page

    As a customer, I want to be able to select a product category from the main menu.
    So I can go to the product category page.

    Scenario Outline: navigate to the <product_category_path> from <page_name> page
        When the user navigates to the "<page_name>" page
        And the user select "<product_category>" category from main menu
        Then the user should navigate to the "<product_category_path>" page

        Examples:
            | product_category_path            | page_name                | product_category |
            | Product Category > New Arrivals  | Home                     | New Arrivals     |
            | Product Category > Women > Dress | Home                     | Women > Dress    |
            | Product Category > New Arrivals  | Cart                     | New Arrivals     |
            | Product Category > Women > Dress | Cart                     | Women > Dress    |
            | Product Category > New Arrivals  | Sign in / Create Account | New Arrivals     |
            | Product Category > Women > Dress | Sign in / Create Account | Women > Dress    |