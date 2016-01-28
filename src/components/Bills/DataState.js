const defaultViewState = {
  headings: [],
  query: {},
  rows: [],
  ongoingRequest: false,
  lastError: {},
  lastSuccess: {}
};

const defaultState = {
  currentTable: null,
  view: {...defaultViewState},
  schema: {
    operations: {
      table: {},
      column: {},
      relationship: {},
      permission: {}
    },
    ongoingRequest: false,
    lastError: {},
    lastSuccess: {}
  },
  insert: {
  },
  udpate: {
  },
  allSchemas: [
    {
      'name': 'user_interest',
      'relationships': {
        'user': {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'type': 'obj_rel'
        }
      },
      'columns': {
        'user_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'user'
            }
          ]
        },
        'interest': {
          'type': 'text',
          'fk_cons': [
            {
              'column': 'name',
              'table': 'interest'
            }
          ]
        }
      }
    },
    {
      'name': 'flight',
      'relationships': {
        'end_city': {
          'rcol': 'id',
          'lcol': 'end_city_id',
          'rtable': 'city',
          'type': 'obj_rel'
        },
        'users': {
          'rcol': 'flight_no',
          'lcol': 'number',
          'rtable': 'user_flight',
          'type': 'arr_rel'
        },
        'start_city': {
          'rcol': 'id',
          'lcol': 'start_city_id',
          'rtable': 'city',
          'type': 'obj_rel'
        }
      },
      'columns': {
        'start_city_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'city'
            }
          ]
        },
        'departure': {
          'type': 'timestamptz',
          'fk_cons': []
        },
        'end_city_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'city'
            }
          ]
        },
        'number': {
          'type': 'text',
          'fk_cons': []
        },
        'arrival': {
          'type': 'timestamptz',
          'fk_cons': []
        }
      }
    },
    {
      'name': 'connection',
      'relationships': {
        'to': {
          'rcol': 'id',
          'lcol': 'to_id',
          'rtable': 'user',
          'type': 'obj_rel'
        },
        'from': {
          'rcol': 'id',
          'lcol': 'from_id',
          'rtable': 'user',
          'type': 'obj_rel'
        }
      },
      'columns': {
        'from_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'user'
            }
          ]
        },
        'source': {
          'type': 'text',
          'fk_cons': []
        },
        'to_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'user'
            }
          ]
        }
      }
    },
    {
      'name': 'user',
      'relationships': {
        'connections': {
          'rcol': 'from_id',
          'lcol': 'id',
          'rtable': 'connection',
          'type': 'arr_rel'
        },
        'connections_from': {
          'rcol': 'to_id',
          'lcol': 'id',
          'rtable': 'connection',
          'type': 'arr_rel'
        },
        'city': {
          'rcol': 'id',
          'lcol': 'city_id',
          'rtable': 'city',
          'type': 'obj_rel'
        },
        'experiences': {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'experience',
          'type': 'arr_rel'
        },
        'interests': {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'user_interest',
          'type': 'arr_rel'
        },
        'flights': {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'user_flight',
          'type': 'arr_rel'
        }
      },
      'columns': {
        'designation': {
          'type': 'text',
          'fk_cons': []
        },
        'city_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'city'
            }
          ]
        },
        'age': {
          'type': 'integer',
          'fk_cons': []
        },
        'intent': {
          'type': 'integer',
          'fk_cons': []
        },
        'name': {
          'type': 'text',
          'fk_cons': []
        },
        'id': {
          'type': 'integer',
          'fk_cons': []
        }
      }
    },
    {
      'name': 'company',
      'relationships': {
        'experiences': {
          'rcol': 'company_id',
          'lcol': 'id',
          'rtable': 'experience',
          'type': 'arr_rel'
        }
      },
      'columns': {
        'name': {
          'type': 'text',
          'fk_cons': []
        },
        'id': {
          'type': 'integer',
          'fk_cons': []
        }
      }
    },
    {
      'name': 'city',
      'relationships': {
        'users': {
          'rcol': 'city_id',
          'lcol': 'id',
          'rtable': 'user',
          'type': 'arr_rel'
        },
        'starting_flights': {
          'rcol': 'start_city_id',
          'lcol': 'id',
          'rtable': 'flight',
          'type': 'arr_rel'
        },
        'ending_flights': {
          'rcol': 'end_city_id',
          'lcol': 'id',
          'rtable': 'flight',
          'type': 'arr_rel'
        }
      },
      'columns': {
        'name': {
          'type': 'text',
          'fk_cons': []
        },
        'id': {
          'type': 'integer',
          'fk_cons': []
        }
      }
    },
    {
      'name': 'experience',
      'relationships': {
        'user': {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'type': 'obj_rel'
        },
        'company': {
          'rcol': 'id',
          'lcol': 'company_id',
          'rtable': 'company',
          'type': 'obj_rel'
        }
      },
      'columns': {
        'designation': {
          'type': 'text',
          'fk_cons': []
        },
        'company_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'company'
            }
          ]
        },
        'id': {
          'type': 'integer',
          'fk_cons': []
        },
        'type': {
          'type': 'integer',
          'fk_cons': []
        },
        'user_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'user'
            }
          ]
        }
      }
    },
    {
      'name': 'user_flight',
      'relationships': {
        'fight': {
          'rcol': 'number',
          'lcol': 'flight_no',
          'rtable': 'flight',
          'type': 'obj_rel'
        },
        'user': {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'type': 'obj_rel'
        }
      },
      'columns': {
        'pnr': {
          'type': 'text',
          'fk_cons': []
        },
        'flight_no': {
          'type': 'text',
          'fk_cons': [
            {
              'column': 'number',
              'table': 'flight'
            }
          ]
        },
        'date': {
          'type': 'date',
          'fk_cons': []
        },
        'user_id': {
          'type': 'integer',
          'fk_cons': [
            {
              'column': 'id',
              'table': 'user'
            }
          ]
        }
      }
    },
    {
      'name': 'interest',
      'relationships': {
        'users': {
          'rcol': 'interest',
          'lcol': 'name',
          'rtable': 'user_interest',
          'type': 'arr_rel'
        }
      },
      'columns': {
        'name': {
          'type': 'text',
          'fk_cons': []
        }
      }
    }
  ]
};

export default defaultState;
export {defaultViewState};
