const defaultCurFilter = {
  where: { $and: [{'': {'': ''}}] },
  limit: 10,
  offset: 0,
  order_by: [{column: '', type: 'asc', nulls: 'last'}]
};

const defaultViewState = {
  query: {
    columns: []
  },
  rows: [],
  curFilter: defaultCurFilter,
  activePath: [],
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
    clone: null,
    ongoingRequest: false,
    lastError: null,
    lastSuccess: null
  },
  udpate: {
    ongoingRequest: false,
    oldItem: null,
    pkClause: null,
    lastError: null,
    lastSuccess: null
  },
  allSchemas: null
};

export default defaultState;
export {defaultViewState, defaultCurFilter};

/*
    {
      'name': 'new_table_5',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table_5__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table_5__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table_5__admin__delete'
          },
          'update': {
            'view': 'new_table_5__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    },
    {
      'name': 'user_interest',
      'relationships': [
        {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'name': 'user',
          'type': 'obj_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'user'
            }
          ],
          'ordinal_position': 1,
          'name': 'user_id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'name',
              'table': 'interest'
            }
          ],
          'ordinal_position': 2,
          'name': 'interest',
          'type': 'text'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'user_interest__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'user_interest__admin__select',
            'columns': [
              'user_id',
              'interest'
            ]
          },
          'delete': {
            'view': 'user_interest__admin__delete'
          },
          'update': {
            'view': 'user_interest__admin__update',
            'columns': [
              'user_id',
              'interest'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'user_interest__anonymous__select',
            'columns': [
              'user_id',
              'interest'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'flight',
      'relationships': [
        {
          'rcol': 'id',
          'lcol': 'end_city_id',
          'rtable': 'city',
          'name': 'end_city',
          'type': 'obj_rel'
        },
        {
          'rcol': 'flight_no',
          'lcol': 'number',
          'rtable': 'user_flight',
          'name': 'users',
          'type': 'arr_rel'
        },
        {
          'rcol': 'id',
          'lcol': 'start_city_id',
          'rtable': 'city',
          'name': 'start_city',
          'type': 'obj_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 2,
          'name': 'departure',
          'type': 'timestamptz'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 4,
          'name': 'number',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 5,
          'name': 'arrival',
          'type': 'timestamptz'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'city'
            }
          ],
          'ordinal_position': 6,
          'name': 'start_city_id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'city'
            }
          ],
          'ordinal_position': 7,
          'name': 'end_city_id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'flight__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'flight__admin__select',
            'columns': [
              'start_city_id',
              'departure',
              'end_city_id',
              'number',
              'arrival'
            ]
          },
          'delete': {
            'view': 'flight__admin__delete'
          },
          'update': {
            'view': 'flight__admin__update',
            'columns': [
              'start_city_id',
              'departure',
              'end_city_id',
              'number',
              'arrival'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'flight__anonymous__select',
            'columns': [
              'start_city_id',
              'departure',
              'end_city_id',
              'number',
              'arrival'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'connection',
      'relationships': [
        {
          'rcol': 'id',
          'lcol': 'to_id',
          'rtable': 'user',
          'name': 'to',
          'type': 'obj_rel'
        },
        {
          'rcol': 'id',
          'lcol': 'from_id',
          'rtable': 'user',
          'name': 'from',
          'type': 'obj_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'user'
            }
          ],
          'ordinal_position': 1,
          'name': 'from_id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 2,
          'name': 'source',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'user'
            }
          ],
          'ordinal_position': 3,
          'name': 'to_id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'connection__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'connection__admin__select',
            'columns': [
              'from_id',
              'source',
              'to_id'
            ]
          },
          'delete': {
            'view': 'connection__admin__delete'
          },
          'update': {
            'view': 'connection__admin__update',
            'columns': [
              'from_id',
              'source',
              'to_id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'connection__anonymous__select',
            'columns': [
              'from_id',
              'source',
              'to_id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'new_table_3',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table_3__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table_3__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table_3__admin__delete'
          },
          'update': {
            'view': 'new_table_3__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    },
    {
      'name': 'user',
      'relationships': [
        {
          'rcol': 'from_id',
          'lcol': 'id',
          'rtable': 'connection',
          'name': 'connections',
          'type': 'arr_rel'
        },
        {
          'rcol': 'to_id',
          'lcol': 'id',
          'rtable': 'connection',
          'name': 'connections_from',
          'type': 'arr_rel'
        },
        {
          'rcol': 'id',
          'lcol': 'city_id',
          'rtable': 'city',
          'name': 'city',
          'type': 'obj_rel'
        },
        {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'experience',
          'name': 'experiences',
          'type': 'arr_rel'
        },
        {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'user_interest',
          'name': 'interests',
          'type': 'arr_rel'
        },
        {
          'rcol': 'user_id',
          'lcol': 'id',
          'rtable': 'user_flight',
          'name': 'flights',
          'type': 'arr_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'designation',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'city'
            }
          ],
          'ordinal_position': 2,
          'name': 'city_id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 3,
          'name': 'age',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 4,
          'name': 'intent',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 5,
          'name': 'name',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 6,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'user__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'user__admin__select',
            'columns': [
              'designation',
              'city_id',
              'age',
              'intent',
              'name',
              'id'
            ]
          },
          'delete': {
            'view': 'user__admin__delete'
          },
          'update': {
            'view': 'user__admin__update',
            'columns': [
              'designation',
              'city_id',
              'age',
              'intent',
              'name',
              'id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'user__anonymous__select',
            'columns': [
              'designation',
              'city_id',
              'age',
              'intent',
              'name',
              'id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'new_table_6',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table_6__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table_6__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table_6__admin__delete'
          },
          'update': {
            'view': 'new_table_6__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    },
    {
      'name': 'company',
      'relationships': [
        {
          'rcol': 'company_id',
          'lcol': 'id',
          'rtable': 'experience',
          'name': 'experiences',
          'type': 'arr_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'name',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 2,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'company__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'company__admin__select',
            'columns': [
              'name',
              'id'
            ]
          },
          'delete': {
            'view': 'company__admin__delete'
          },
          'update': {
            'view': 'company__admin__update',
            'columns': [
              'name',
              'id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'company__anonymous__select',
            'columns': [
              'name',
              'id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'new_table2',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table2__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table2__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table2__admin__delete'
          },
          'update': {
            'view': 'new_table2__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    },
    {
      'name': 'city',
      'relationships': [
        {
          'rcol': 'city_id',
          'lcol': 'id',
          'rtable': 'user',
          'name': 'users',
          'type': 'arr_rel'
        },
        {
          'rcol': 'start_city_id',
          'lcol': 'id',
          'rtable': 'flight',
          'name': 'starting_flights',
          'type': 'arr_rel'
        },
        {
          'rcol': 'end_city_id',
          'lcol': 'id',
          'rtable': 'flight',
          'name': 'ending_flights',
          'type': 'arr_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'name',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 2,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'city__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'city__admin__select',
            'columns': [
              'name',
              'id'
            ]
          },
          'delete': {
            'view': 'city__admin__delete'
          },
          'update': {
            'view': 'city__admin__update',
            'columns': [
              'name',
              'id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'city__anonymous__select',
            'columns': [
              'name',
              'id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'new_table',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table__admin__delete'
          },
          'update': {
            'view': 'new_table__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    },
    {
      'name': 'nwtable7',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'name',
          'type': 'text'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'nwtable7__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'nwtable7__admin__select',
            'columns': [
              'name'
            ]
          },
          'delete': {
            'view': 'nwtable7__admin__delete'
          },
          'update': {
            'view': 'nwtable7__admin__update',
            'columns': [
              'name'
            ]
          }
        }
      ]
    },
    {
      'name': 'experience',
      'relationships': [
        {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'name': 'user',
          'type': 'obj_rel'
        },
        {
          'rcol': 'id',
          'lcol': 'company_id',
          'rtable': 'company',
          'name': 'company',
          'type': 'obj_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'designation',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'company'
            }
          ],
          'ordinal_position': 2,
          'name': 'company_id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 3,
          'name': 'id',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 4,
          'name': 'type',
          'type': 'integer'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'user'
            }
          ],
          'ordinal_position': 5,
          'name': 'user_id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'experience__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'experience__admin__select',
            'columns': [
              'designation',
              'company_id',
              'id',
              'type',
              'user_id'
            ]
          },
          'delete': {
            'view': 'experience__admin__delete'
          },
          'update': {
            'view': 'experience__admin__update',
            'columns': [
              'designation',
              'company_id',
              'id',
              'type',
              'user_id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'experience__anonymous__select',
            'columns': [
              'designation',
              'company_id',
              'id',
              'type',
              'user_id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'user_flight',
      'relationships': [
        {
          'rcol': 'number',
          'lcol': 'flight_no',
          'rtable': 'flight',
          'name': 'fight',
          'type': 'obj_rel'
        },
        {
          'rcol': 'id',
          'lcol': 'user_id',
          'rtable': 'user',
          'name': 'user',
          'type': 'obj_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'pnr',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'number',
              'table': 'flight'
            }
          ],
          'ordinal_position': 2,
          'name': 'flight_no',
          'type': 'text'
        },
        {
          'foreign_key_constraints': [],
          'ordinal_position': 3,
          'name': 'date',
          'type': 'date'
        },
        {
          'foreign_key_constraints': [
            {
              'column': 'id',
              'table': 'user'
            }
          ],
          'ordinal_position': 4,
          'name': 'user_id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'user_flight__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'user_flight__admin__select',
            'columns': [
              'pnr',
              'flight_no',
              'date',
              'user_id'
            ]
          },
          'delete': {
            'view': 'user_flight__admin__delete'
          },
          'update': {
            'view': 'user_flight__admin__update',
            'columns': [
              'pnr',
              'flight_no',
              'date',
              'user_id'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'user_flight__anonymous__select',
            'columns': [
              'pnr',
              'flight_no',
              'date',
              'user_id'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'interest',
      'relationships': [
        {
          'rcol': 'interest',
          'lcol': 'name',
          'rtable': 'user_interest',
          'name': 'users',
          'type': 'arr_rel'
        }
      ],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'name',
          'type': 'text'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'interest__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'interest__admin__select',
            'columns': [
              'name'
            ]
          },
          'delete': {
            'view': 'interest__admin__delete'
          },
          'update': {
            'view': 'interest__admin__update',
            'columns': [
              'name'
            ]
          }
        },
        {
          'insert': null,
          'select': {
            'relationships': {},
            'view': 'interest__anonymous__select',
            'columns': [
              'name'
            ]
          },
          'delete': null,
          'update': null
        }
      ]
    },
    {
      'name': 'new_table_4',
      'relationships': [],
      'columns': [
        {
          'foreign_key_constraints': [],
          'ordinal_position': 1,
          'name': 'id',
          'type': 'integer'
        }
      ],
      'permissions': [
        {
          'insert': {
            'view': 'new_table_4__admin__insert'
          },
          'select': {
            'relationships': {},
            'view': 'new_table_4__admin__select',
            'columns': [
              'id'
            ]
          },
          'delete': {
            'view': 'new_table_4__admin__delete'
          },
          'update': {
            'view': 'new_table_4__admin__update',
            'columns': [
              'id'
            ]
          }
        }
      ]
    }
*/
