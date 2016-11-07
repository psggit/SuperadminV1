- To come up
  - Insert and Update pattern

- Brand Entries
  - Pretty straight forward (Capture the input fields) and when data is available just store it
  - Inputs fields are captured
  - How about capturing updated fields? (How is it possible)

  - Eg
    - A Component captures a model
      -- Sample Model for a component brand
        {
          "brand_name": "Chivas Regal",
          "company_name": 1,
          "category": 2,
          "genre": 3
        }
      --
      {
        "component": {
          "db": {
            "identity": < id in the database >
          },
          "local": {}
        }
      }
      -- Sample component state
      {
        "BrandComponent": {
          "is_updated": true,
          "db": {
            "identity": 1,
            "brand_name": "Chivas Regal",
            "company_name": 1,
            "category": 2,
            "genre": 3
          },
          "local": {
            "brand_name": "Chivas Regal1",
            "company_name": 2
          }
        }
      }
      - Actions
        onChangeListeners for the form fields
          Check for duplicate (Two keys in both objects shouldn't have same values (name, name))
        Save the data
      --
      - Steps
        - Specify the actual model which needs to be captured
        - onSave
          - Magically finds out the new updated object and updates in the database and refetches and shows the component with the updated state (Clear the local and show the updated values in the db)

- Brand Creation Flows
  - Create region
    
  - Create brand
  - Edit brand
  - Edit regions
