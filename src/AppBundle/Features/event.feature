Feature: User can manage his own events

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
    Given there are priorities of events:
      | id | title      | value     | code |
      | 1  | Secondary  | 0         | secondary |
      | 2  | Normal     | 5         | normal    |
      | 3  | Urgent     | 10        | urgent    |
    Given there are users have events:
      |id | title                     | description                        | timeStart           | timeEnd             | user_id | status_id | priority_id | created_at           | updated_at          |
      |1  | Shopping                  | To buy an bread, butter and milk   | 2017-12-05 15:00:00 | 2017-12-05 15:30:00 | 1       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |2  | Have rest                 | Go to the park                     | 2017-12-05 15:40:00 | 2017-12-05 17:00:00 | 1       | 1         | 3           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |3  | Visit gym                 | Make my health better              | 2017-12-05 16:45:00 | 2017-12-05 18:30:00 | 1       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |4  | Job meeting               | Discuss project tasks for next day | 2017-12-05 19:00:00 | 2017-12-05 20:00:00 | 1       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |5  | Watch video of new course | Watch video                        | 2017-12-05 20:30:00 | 2017-12-05 22:00:00 | 1       | 1         | 1           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |6  | Wake up and breakfast     | Wake up and breakfast              | 2017-12-06 07:00:00 | 2017-12-06 08:00:00 | 1       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |7  | Days off                  | No business!                       | 2017-12-12 00:00:00 | 2017-12-15 06:00:00 | 1       | 1         | 3           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |8  | Some things               | Some things                        | 2017-12-05 19:00:00 | 2017-12-06 08:00:00 | 1       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |9  | Watch video of new course | Watch video                        | 2017-12-05 20:30:00 | 2017-12-05 22:00:00 | 2       | 1         | 1           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |10 | Wake up and breakfast     | Wake up and breakfast              | 2017-12-06 07:00:00 | 2017-12-06 08:00:00 | 2       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |11 | Days off                  | No business!                       | 2017-12-12 00:00:00 | 2017-12-15 06:00:00 | 2       | 1         | 3           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |12 | Some things               | Some things                        | 2017-12-05 19:00:00 | 2017-12-06 08:00:00 | 2       | 1         | 2           | 2017-11-26 20:50:47  | 2017-11-26 20:50:47 |
      |13 | New event                 | Test creation a new event          | 2017-01-01 00:00:00 | 2017-01-01 00:00:00 | 1       | 1         | 2           | 2017-11-26 23:08:13  | 2017-11-26 23:08:13 |
      |15 | new task                  |Tetetewtwetwe                       | 2017-01-01 00:00:00 | 2017-01-01 00:00:00 | 1       | 3         | 2           | 2017-11-26 23:09:41  | 2017-11-26 23:09:41 |
      |16 | new task23423423          |Tetetewtwetwe                       | 2017-01-01 00:00:00 | 2017-01-01 00:00:00 | 1       | 3         | 2           | 2017-11-26 23:36:41  | 2017-11-26 23:36:41 |
      |17 | new task23423423          |Tetetewtwetwe                       | 2017-01-01 00:00:00 | 2017-01-01 00:00:00 | 1       | 3         | 2           | 2017-11-26 23:36:55  | 2017-11-26 23:36:55 |

  Scenario: User login and get his events all and by selected date
    When I am successfully logged in with username: "peter@test.com", and password: "testpass"
    And I send a "GET" request to "/event/list"
    And the response should contain json:
      """
      {
    "events": [
        {
            "id": 1,
            "title": "Shopping",
            "description": "To buy an bread, butter and milk",
            "timeStart": 1512475200,
            "timeEnd": 1512477000,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 2,
            "title": "Have rest",
            "description": "Go to the park",
            "timeStart": 1512477600,
            "timeEnd": 1512482400,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 3,
                "title": "Urgent",
                "value": 10,
                "code": "urgent"
            }
        },
        {
            "id": 3,
            "title": "Visit gym",
            "description": "Make my health better",
            "timeStart": 1512481500,
            "timeEnd": 1512487800,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 4,
            "title": "Job meeting",
            "description": "Discuss project tasks for next day",
            "timeStart": 1512489600,
            "timeEnd": 1512493200,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 5,
            "title": "Watch video of new course",
            "description": "Watch video",
            "timeStart": 1512495000,
            "timeEnd": 1512500400,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 1,
                "title": "Secondary",
                "value": 0,
                "code": "secondary"
            }
        },
        {
            "id": 6,
            "title": "Wake up and breakfast",
            "description": "Wake up and breakfast",
            "timeStart": 1512532800,
            "timeEnd": 1512536400,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 7,
            "title": "Days off",
            "description": "No business!",
            "timeStart": 1513026000,
            "timeEnd": 1513306800,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 3,
                "title": "Urgent",
                "value": 10,
                "code": "urgent"
            }
        },
        {
            "id": 8,
            "title": "Some things",
            "description": "Some things",
            "timeStart": 1512489600,
            "timeEnd": 1512536400,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 13,
            "title": "New event",
            "description": "Test creation a new event",
            "timeStart": 1483218000,
            "timeEnd": 1483218000,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        },
        {
            "id": 14,
            "title": "new task",
            "description": "Tetetewtwetwe",
            "timeStart": 1483218000,
            "timeEnd": 1483218000,
            "status": {
                "id": 3,
                "code": "canceled",
                "title": "Canceled"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        }
    ],
    "total": 12
}
      """
    And I send a "GET" request to "/event/list?date=2017-12-06"
    And the response should contain json:
      """
        {
          "events": [
              {
                  "id": 6,
                  "title": "Wake up and breakfast",
                  "description": "Wake up and breakfast",
                  "timeStart": 1512532800,
                  "timeEnd": 1512536400,
                  "status": {
                      "id": 1,
                      "code": "new",
                      "title": "New"
                  },
                  "priority": {
                      "id": 2,
                      "title": "Normal",
                      "value": 5,
                      "code": "normal"
                  }
              },
              {
                  "id": 8,
                  "title": "Some things",
                  "description": "Some things",
                  "timeStart": 1512489600,
                  "timeEnd": 1512536400,
                  "status": {
                      "id": 1,
                      "code": "new",
                      "title": "New"
                  },
                  "priority": {
                      "id": 2,
                      "title": "Normal",
                      "value": 5,
                      "code": "normal"
                  }
              }
          ],
          "total": 2
        }
      """

    Scenario: User can get info about some one event
      When I am successfully logged in with username: "peter@test.com", and password: "testpass"
      And I send a "GET" request to "/event/1"
      And the response should contain json:
      """
        {
            "id": 1,
            "title": "Shopping",
            "description": "To buy an bread, butter and milk",
            "timeStart": 1512475200,
            "timeEnd": 1512477000,
            "status": {
                "id": 1,
                "code": "new",
                "title": "New"
            },
            "priority": {
                "id": 2,
                "title": "Normal",
                "value": 5,
                "code": "normal"
            }
        }
      """

    Scenario: User can not to see not own event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      And I send a "GET" request to "/event/1"
      Then the response code should be 403
      And the response should contain json:
      """
      {
          "code": 403,
          "message": "Access Denied."
      }
      """

    Scenario: User can create new event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      Then the response code should be 200
      When I send a "POST" request to "/event" with body:
      """
        {
          "title": "new task",
          "description": "Description of new tesk",
          "timeStart": "2017-01-02 00:00",
          "timeEnd": "2017-01-03 00:00",
          "status": 1,
          "priority": 2
        }
      """
      Then the response code should be 201
      And the response should contain json:
      """
      {
          "event": {
              "id": 17,
              "title": "new task",
              "description": "Description of new tesk",
              "timeStart": 1483304400,
              "timeEnd": 1483390800,
              "status": {
                  "id": 1,
                  "code": "new",
                  "title": "New"
              },
              "priority": {
                  "id": 2,
                  "title": "Normal",
                  "value": 5,
                  "code": "normal"
              }
          },
          "message": "Event was created"
      }
      """
@this
  Scenario: User can create new event without status:
    When I am successfully logged in with username: "john@test.org", and password: "johnpass"
    Then the response code should be 200
    When I send a "POST" request to "/event" with body:
      """
        {
          "title": "new task",
          "description": "Description of new tesk",
          "timeStart": "2017-01-02 00:00",
          "timeEnd": "2017-01-03 00:00",
          "priority": 2
        }
      """
    Then the response code should be 201
    And the response should contain json:
      """
      {
          "event": {
              "id": 17,
              "title": "new task",
              "description": "Description of new tesk",
              "timeStart": 1483304400,
              "timeEnd": 1483390800,
              "status": {
                  "id": 1,
                  "code": "new",
                  "title": "New"
              },
              "priority": {
                  "id": 2,
                  "title": "Normal",
                  "value": 5,
                  "code": "normal"
              }
          },
          "message": "Event was created"
      }
      """

    Scenario: Anonymous user can not create event:
      When I send a "POST" request to "/event" with body:
      """
        {
          "title": "new task",
          "description": "Description of new tesk",
          "timeStart": "2017-01-02 00:00",
          "timeEnd": "2017-01-03 00:00",
          "status": 1,
          "priority": 2
        }
      """
      Then the response code should be 401
      And the response should contain json:
      """
        {
            "code": 401,
            "message": "Bad credentials"
        }
      """

    Scenario: User can edit his event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      Then the response code should be 200
      When I send a "PUT" request to "/event/9" with body:
      """
        {
          "title": "Edit not my task",
          "description": "Edited",
          "timeStart": "2017-01-02 00:00",
          "timeEnd": "2017-01-03 00:00",
          "status": 1,
          "priority": 2
        }
      """
      Then the response code should be 200
      And the response should contain json:
      """
        {
            "event": {
                "id": 9,
                "title": "Edit not my task",
                "description": "Edited",
                "timeStart": 1483304400,
                "timeEnd": 1483390800,
                "status": {
                    "id": 1,
                    "code": "new",
                    "title": "New"
                },
                "priority": {
                    "id": 2,
                    "title": "Normal",
                    "value": 5,
                    "code": "normal"
                }
            },
            "message": "Event was updated"
        }
      """

    Scenario: User can not edit not own event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      Then the response code should be 200
      When I send a "PUT" request to "/event/1" with body:
      """
        {
          "title": "Edit not my task",
          "description": "Edited",
          "timeStart": "2017-01-02 00:00",
          "timeEnd": "2017-01-03 00:00",
          "status": 1,
          "priority": 2
        }
      """
      Then the response code should be 403
      And the response should contain json:
      """
        {
            "code": 403,
            "message": "Access Denied."
        }
      """


    Scenario: User can delete his event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      Then the response code should be 200
      When I send a "DELETE" request to "/event/9" with body:
        """
        """
      Then the response code should be 200
      And the response should contain json:
        """
          {
              "message": "Event was deleted"
          }
        """

    Scenario: User can not delete not own event:
      When I am successfully logged in with username: "john@test.org", and password: "johnpass"
      Then the response code should be 200
      When I send a "DELETE" request to "/event/1" with body:
        """
        """
      Then the response code should be 403
      And the response should contain json:
        """
          {
              "code": 403,
              "message": "Access Denied."
          }
        """