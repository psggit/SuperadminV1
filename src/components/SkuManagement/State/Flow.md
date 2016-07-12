Components
  State
  City
  Cities

Objects:
  City:
    {
      "name": <city_name>
    }
  Cities:
    Object from the Database
      Will be array
      [
        {
          "gps": "13.066252,80.211750",
            "name": "Chennai",
            "updated_at": "2016-04-21T08:52:31.490259+00:00",
            "created_at": "2016-04-21T08:52:31.490259+00:00",
            "id": 7,
            "state_id": 24
        },
        {
          "gps": "11.021811,76.953500",
          "name": "COIMBATORE",
          "updated_at": "2016-04-21T09:07:42.135429+00:00",
          "created_at": "2016-04-21T09:07:42.135429+00:00",
          "id": 9,
          "state_id": 24
        }
      ]
    Recently Added Cities

- Steps:
  - New State and City
    - State Creation
      - Entry in the input field with the state name (input field)
      - status of the state (boolean field with true or false)
    - City Operations
      - Click on the add new city button
        - Add new city component shows up on the right with empty text box (Maintains a UI state for show/hide)
        - Input values are captured @city_value field in the store
        - On Cancel or Save depending on what the action is input field @city_value is cleared or saved in the Locally Added Cities array/dict in the store respectively
        - Unique locally referenced id is used for the identification of the city
      - Editing locally created City
        - Save operation after edit will save the entry to the corresponding id in the store
        - Delete operation will delete the entry from the array/dict
    - Submit
      - On save ( Will create an entry in the state and create city entries with the state_id )

  - Old state and new city
    - State Editing
      - Change in the state name will be captured in the input field
      - Status of the state by the boolean field as in the State Creation step
    - City Operations
      - Editing locally created cities will be done in a similar way as in the #New State and City step
    - Submit
      - On Edit (Update the state with the new state value)
      - New cities will be created using the state_id of the State 

  - Old state and old city
    - State Editing
      - Change in the state name will be captured in the input field
      - Status of the state by the boolean field as in the State Creation step
    - City Operations
      - Editing city retrieved from the DB
        - Save operation will save the city name in the DB and refresh the thing
        - Delete operation will delete/disable the city

  - Old state, new city and old city
    - State Editing
      - Change in the state name will be captured in the input field
      - Status of the state by the boolean field as in the State Creation step
    - City Operations
      - Editing locally created cities will be done in a similar way as in the #New State and City step
      - Editing city retrieved from the DB
        - Save operation will save the city name in the DB and refresh the thing
        - Delete operation will delete/disable the city


