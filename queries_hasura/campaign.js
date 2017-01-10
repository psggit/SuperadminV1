const dataUrl = 'https://data.hipbar-stg.hasura-app.io';
const queries = [{
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'add_column',
    'args': {
      'table': 'campaign',
      'column': {
        'name': 'budgeted_amount',
        'type': 'numeric',
        'nullable': true
      }
    }
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'add_column',
    'args': {
      'table': 'campaign',
      'column': {
        'name': 'funds_credited',
        'type': 'numeric',
        'nullable': true
      }
    }
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'create_table',
    'args': {
      'name': 'campaign_status',
      'columns': [{
        'name': 'status',
        'type': 'text'
      }],
      'primary_key': ['status']
    }
  }
}, {
  url: dataUrl + '/api/1/table/campaign_status/insert',
  method: 'POST',
  query: {
    'objects': [{
      'status': 'active'
    }],
    'returning': []
  }
}, {
  url: dataUrl + '/api/1/table/campaign_status/insert',
  method: 'POST',
  query: {
    'objects': [{
      'status': 'inactive'
    }],
    'returning': []
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'create_foreign_key_constraint',
    'args': {
      'table': 'campaign',
      'constraint': {
        'ref_table': 'campaign_status',
        'mapping': {
          'status': 'status'
        },
        'on_update': 'cascade',
        'on_delete': 'set_null'
      }
    }
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'bulk',
    'args': [{
      'type': 'alter_column_type',
      'args': {
        'table': 'campaign',
        'column': 'funds_credited',
        'new_type': 'numeric'
      }
    }, {
      'type': 'alter_column_default',
      'args': {
        'table': 'campaign',
        'column': 'funds_credited',
        'new_default': {
          '__type': 'expression',
          'expression': '0'
        }
      }
    }, {
      'type': 'alter_column_nullable',
      'args': {
        'table': 'campaign',
        'column': 'funds_credited',
        'nullable': false
      }
    }]
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'bulk',
    'args': [{
      'type': 'alter_column_type',
      'args': {
        'table': 'campaign',
        'column': 'budgeted_amount',
        'new_type': 'numeric'
      }
    }, {
      'type': 'alter_column_default',
      'args': {
        'table': 'campaign',
        'column': 'budgeted_amount',
        'new_default': {
          '__type': 'expression',
          'expression': '0'
        }
      }
    }, {
      'type': 'alter_column_nullable',
      'args': {
        'table': 'campaign',
        'column': 'budgeted_amount',
        'nullable': false
      }
    }]
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'create_array_relationship',
    'args': {
      'name': 'campaigns',
      'table': 'brand_manager',
      'using': {
        'table': 'campaign',
        'column': 'brand_manager_id'
      }
    }
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'create_unique_constraint',
    'args': {
      'table': 'brand_manager',
      'constraint': {
        'name': 'unique_email',
        'columns': ['email']
      }
    }
  }
}, {
  'type': 'alter_column_nullable',
  'args': {
    'table': 'brand_manager',
    'column': 'name',
    'nullable': false
  }
}, {
  // NOTE: Added the query via adminer. Regex expression check to ensure
  // email is valid.
  query: 'ATLER TABLE brand_managers ADD CONSTRAINT proper_email CHECK (email ~* \'^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$\')'
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'add_column',
    'args': {
      'table': 'cash_back_offer_sku',
      'column': {
        'name': 'quantity',
        'type': 'integer',
        'nullable': false
      }
    }
  }
}, {
  url: dataUrl + '/v1/query',
  method: 'POST',
  query: {
    'type': 'bulk',
    'args': [{
      'type': 'alter_column_type',
      'args': {
        'table': 'cash_back_offer_sku',
        'column': 'quantity',
        'new_type': 'integer'
      }
    }, {
      'type': 'alter_column_default',
      'args': {
        'table': 'cash_back_offer_sku',
        'column': 'quantity',
        'new_default': {
          '__type': 'expression',
          'expression': '0'
        }
      }
    }, {
      'type': 'alter_column_nullable',
      'args': {
        'table': 'cash_back_offer_sku',
        'column': 'quantity',
        'nullable': false
      }
    }]
  }
}];

export default queries;
