Feature: User can get all priorities of events
  Background:
    Given there are Users with the following details:
      | id | username | email          | password |
      | 1  | peter    | peter@test.com | testpass |
      | 2  | john     | john@test.org  | johnpass |

    Given there are statuses of events:
      | id | code      | title     |
      | 1  | new       | New       |
      | 2  | fulfilled | Fulfilled |
      | 3  | canceled  | Canceled  |

  Scenario: Get status list
    When I am successfully logged in with username: "peter@test.com", and password: "testpass"
    And I send a "GET" request to "/status/list"
    Then the response code should be 200
    And the response should contain json:
      """
        {
            "statuses": [
                {
                    "id": 1,
                    "code": "new",
                    "title": "New"
                },
                {
                    "id": 2,
                    "code": "fulfilled",
                    "title": "Fulfilled"
                },
                {
                    "id": 3,
                    "code": "canceled",
                    "title": "Canceled"
                }
            ]
        }
      """

  Scenario: Anonymous user can not to get statuses:
    When I send a "GET" request to "/status/list"
    Then the response code should be 401
    And the response should contain json:
      """
      {
          "code": 401,
          "message": "Bad credentials"
      }
      """