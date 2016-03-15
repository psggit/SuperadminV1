const defaultState = {
  schema: {
    name: 'bill',
    headings: [
      'id',
      {
        type: 'obj_rel',
        relname: 'customer_code',
        lcol: 'customer_code',
        rcol: 'code',
        rtable: 'customer',
        _expanded: true,
        headings: [
          'code',
          'name',
          'mobile'
        ]
      },
      {
        type: 'obj_rel',
        relname: 'item_name',
        lcol: 'item_name',
        rcol: 'name',
        rtable: 'item',
        _expanded: false
      },
      'total',
      {
        type: 'arr_rel',
        relname: 'items',
        lcol: 'id',
        rcol: 'bill_id',
        rtable: 'item_bill',
        _expanded: false
      }
    ],
  },
  query: {
    columns: '*',
    limit: 10,
    offset: 0
  },
  rows: [
    {
      id: 1,
      item_name: 'Brinjal',
      total: 150,
      customer_code: {
        code: '104ke5',
        name: 'Tanmai',
        mobile: '9123112'
      }
    },
    {
      id: 1,
      item_name: 'Brinjal',
      customer_code: {
        code: '104ke6',
        name: 'Gopal',
        mobile: '9123112'
      },
      total: 150
    }
  ]
};

export default defaultState;
