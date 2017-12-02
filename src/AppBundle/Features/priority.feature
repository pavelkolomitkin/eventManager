Feature: User can get all priorities of events
  Background:
    Given there are Users with the following details:
      | id | username | email          | password |
      | 1  | peter    | peter@test.com | testpass |
      | 2  | john     | john@test.org  | johnpass |

    Given there are priorities of events:
      | id | title      | value     | code |
      | 1  | Secondary  | 0         | secondary |
      | 2  | Normal     | 5         | normal    |
      | 3  | Urgent     | 10        | urgent    |

  Scenario: Get priority list
    When I am successfully logged in with username: "peter@test.com", and password: "testpass"
    And I send a "GET" request to "/priority/list"
    Then the response code should be 200
    And the response should contain json:
      """
        [
            {
                "id": 1,
                "title": "Secondary",
                "value": 0,
                "code": "secondary"
            },
            {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            },
            {
                "id": 3,
                "title": "Urgent",
                "value": 10,
                "code": "urgent"
            }
        ]
      """

  Scenario: Anonymous user can not to get priorities:
    When I send a "GET" request to "/priority/list"
    Then the response code should be 401
    And the response should contain json:
      """
      {
          "code": 401,
          "message": "Bad credentials"
      }
      """