Feature: insideStore cart page

    As a customer, I want the store to be able to help me quickly whenever I'm browsing their website.
    So I won't be confused when I have questions about their shop.

    Scenario: Test offline chat bot UI menu
        When the user open the store website
        And the user click floating chat icon
        Then the user should see these options:
            | options                         |
            | Cancel Order                    |
            | Change to Existing Order        |
            | Help Placing an Order           |
            | Help with a Coupon              |
            | Order Charges/Credit            |
            | Question About Product/Services |
            | Reset Password                  |
            | Return An Item/Order            |
            | Something Else                  |
            | Store Information               |
            | Track My Order                  |

    Scenario: Test offline chat UX
        When the user open the store website
        And the user click floating chat icon
        And the user choose "Something Else" option
        Then the user can interact with offline chat bot with these scenario:
            | chatbot                         | type  | me                        |
            | Please enter your email address | email | test@test.cc              |
            | Please enter your mobile number | text  | 8563434343                |
            | Leave a message here:           | text  | this is a test message #1 |
    Then the "Start a new chat" button should be visible after your chat has ended by chatbot