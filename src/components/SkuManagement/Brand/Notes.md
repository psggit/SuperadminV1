- Brand
  - Brand Create
    - Regions
      - Cities

- Cases for Brand and Regions
  - Each new region added
    - Create a region entry
      - Map it with its corresponding cities/state
  - Each old region
    - Create a region entry with the provided values
      - Create a map with the existing values


- Objects
  - New Region
    region: {
      "#id": <Region Name >
    }
    region_cities: {
      "#id": {
        "cities": {
          "id": {
            "name": "Chennai",
            "state_id": 1
          }
        }
      }
    }
  - Old City
    region: {
      "id": "Region Name"
    }
    region_cities: {
      "id": {
        "cities": {
          "id": {
            "name": "Chennai",
            "state_id": 1
        }
      }
    }
  - Edited old City
    region: {
      "id": "Region Name"
      "updatedRegion": "#id"
    }
    region_city_updated : {
      "#id": {
        "deletedCities": {
          "id": {
          }
        },
        "newCities": {
          "id": {
          }
        }
      }
    }
    region_cities: {
      "id": {
        "cities": {
          "id": {
            "name": "Chennai",
            "state_id": 1
        }
      }
    }

- Region Objs
  - 
