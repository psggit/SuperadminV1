/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import { genOptions } from '../../Common/Actions/commonFunctions';

import Endpoints from '../../../Endpoints';

import { routeActions } from 'redux-simple-router';

/* End of it */

/* Default State */

const defaultState = {
  retailers: [],
  transactionCode: [],
  retailerMap: {},
  codeMap: {},
  retailer_id: 0,
  retailer_credits_and_debit_codes_id: 0,
  amount: 0,
  comment: ''
};

/* End of it */

/* Action Constants */

const INPUT_CHANGED = '@retailerdebit/INPUT_CHANGED';
const RETAILER_FETCHED = '@retailerdebit/RETAILER_FETCHED';
const CODE_FETCHED = '@retailerdebit/CODE_FETCHED';
const RESET_TXN_INFO = '@retailerdebit/RESET_TXN_INFO';
const INITIALIZED = '@retailerdebit/INITIALIZED';

/* End of it */

const fetchData = ( Id ) => {
  return ( dispatch ) => {
    const txnUrl = Endpoints.db + '/table/' + 'retailer_debits_and_credits' + '/select';
    const payload = {
      columns: ['*',
        {
          'name': 'retailer_credits_and_debit_code',
          'columns': ['*']
        },
        {
          'name': 'retailer',
          'columns': ['*']
        }
      ]
    };
    payload.where = {
      'id': parseInt(Id, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch( requestAction(txnUrl, options, INITIALIZED ))
    .catch( ( resp ) => {
      alert('Couldn"t fetch txn data: ' + resp);
      return dispatch( routeActions.push('/hadmin/retailer_management/debits_credits_landing'));
    });
  };
};

const getInitData = ( Id ) => {
  return ( dispatch ) => {
    const branchUrl = Endpoints.db + '/table/retailer/select';
    const debitCodesUrl = Endpoints.db + '/table/retailer_credits_and_debit_codes/select';

    const branchSelectObj = {};
    branchSelectObj.columns = [ 'id', 'org_name', {
      'name': 'addresses',
      'columns': [ 'email', 'mobile_number' ]
    }];
    const codeSelectObj = {};
    codeSelectObj.columns = [ '*' ];

    const branchOptions = {
      ...genOptions,
      body: JSON.stringify(branchSelectObj)
    };
    const codeOptions = {
      ...genOptions,
      body: JSON.stringify(codeSelectObj)
    };

    return Promise.all([
      dispatch( requestAction(branchUrl, branchOptions, RETAILER_FETCHED )),
      dispatch( requestAction(debitCodesUrl, codeOptions, CODE_FETCHED)),
      ( Id ) ? dispatch( fetchData(Id) ) : Promise.resolve()
    ])
    .catch( ( error ) => {
      alert('Error: ' + error );
    });
  };
};

/* Emailer */

/* Nicked it */
const getDateInDDMMYY = ( dat ) => {
  let today = dat;
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;
  return today;
};

const sendEmail = ( getState, insertObj ) => {
  const currDate = new Date();

  const currState = getState().retailer_debit_credit;
  const emailerObj = {};
  const emailerUrl = Endpoints.blogicUrl + '/admin/trigger/email';
  emailerObj.to = [ currState.retailerMap[insertObj.retailer_id].email ];
  emailerObj.template_name = currState.codeMap[insertObj.retailer_credits_and_debit_codes_id] === 'debit' ? 'manual-debit-retailer' : 'manual-credit-retailer';
  emailerObj.content = {
    'retailer': {
      'name': currState.retailerMap[insertObj.retailer_id].org_name,
      'created_at': getDateInDDMMYY(currDate),
      'value': insertObj.amount
    }
  };

  if ( emailerObj.to[0].length === 0 ) {
    alert('Email not present to add the credit');
    return Promise.reject();
  }

  const emailerOptions = {
    ...genOptions,
    body: JSON.stringify(emailerObj)
  };

  return Promise.resolve(requestAction( emailerUrl, emailerOptions));
};

const sendSMS = ( getState, insertObj ) => {
  const currDate = new Date();

  const currState = getState().retailer_debit_credit;
  const smsObj = {};
  const smsUrl = Endpoints.blogicUrl + '/admin/trigger/sms';
  smsObj.to = [ currState.retailerMap[insertObj.retailer_id].mobile_number ];
  smsObj.template_name = currState.codeMap[insertObj.retailer_credits_and_debit_codes_id] === 'debit' ? 'manual-debit-retailer' : 'manual-credit-retailer';

  smsObj.content = {
    'retailer': {
      'name': currState.retailerMap[insertObj.retailer_id].org_name,
      'created_at': getDateInDDMMYY(currDate),
      'value': insertObj.amount
    }
  };

  if ( smsObj.to[0].length === 0 ) {
    alert('Mobile Number not present to add the credit');
    return Promise.reject();
  }

  const smsOptions = {
    ...genOptions,
    body: JSON.stringify(smsObj)
  };

  return Promise.resolve(requestAction( smsUrl, smsOptions));
};

/* End of it */

const saveTransaction = () => {
  return ( dispatch, getState ) => {
    const transactionUrl = Endpoints.db + '/table/retailer_debits_and_credits/insert';

    const currState = getState().retailer_debit_credit;

    const requiredKeys = ['amount', 'comment', 'retailer_id', 'retailer_credits_and_debit_codes_id'];
    const insertObj = {};

    try {
      requiredKeys.forEach( ( key ) => {
        if ( !currState[key] ) {
          throw Error('All keys not present');
        }
        insertObj[[key]] = currState[key];
      });
    } catch ( e ) {
      alert('Error: ' + e );
      return Promise.reject();
    }

    const insertTransaction = {};
    insertTransaction.objects = [ insertObj ];
    insertTransaction.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertTransaction)
    };

    return dispatch( requestAction(transactionUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Added');

        return Promise.all([
          sendEmail(getState, insertObj).then( ( asyncAction ) => { return dispatch( asyncAction ); }),
          sendSMS(getState, insertObj).then( ( asyncAction ) => { return dispatch( asyncAction ); }),
          dispatch( routeActions.push('/hadmin/retailer_management/debits_credits_landing'))
        ]);
      }
    })
    .catch( ( resp ) => {
      console.log(resp);
      alert('Error: ' + resp );
      return Promise.reject();
    });
  };
};
const updateTransaction = ( Id ) => {
  return ( dispatch, getState ) => {
    const transactionUrl = Endpoints.db + '/table/retailer_debits_and_credits/update';

    const currState = getState().retailer_debit_credit;

    const requiredKeys = ['amount', 'comment', 'retailer_id', 'retailer_credits_and_debit_codes_id'];
    const updateObj = {};

    try {
      requiredKeys.forEach( ( key ) => {
        if ( !currState[key] ) {
          throw Error('All keys not present');
        }
        updateObj[[key]] = currState[key];
      });
    } catch ( e ) {
      alert('Error: ' + e );
      return Promise.reject();
    }

    const updateAt = new Date().toISOString();
    updateObj.updated_at = updateAt;

    const updateTransactionObj = {};
    updateTransactionObj.values = updateObj;
    updateTransactionObj.where = {
      'id': parseInt(Id, 10)
    };
    updateTransactionObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(updateTransactionObj)
    };

    return dispatch( requestAction(transactionUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Updated');
        return dispatch( routeActions.push('/hadmin/retailer_management/debits_credits_landing'));
      }
    })
    .catch( ( resp ) => {
      alert('Error: ' + resp );
    });
  };
};

/* Reducer */

const retailerDebitCreditReducer = ( state = defaultState, action ) => {
  let map = {};
  switch ( action.type ) {
    case RETAILER_FETCHED:
      map = {};
      action.data.forEach( ( ret ) => {
        map[ ret.id ] = { 'org_name': ret.org_name, 'email': ( ret.addresses ).length > 0 ? ret.addresses[0].email : '', 'mobile_number': ( ret.addresses ).length > 0 ? ret.addresses[0].mobile_number : ''};
      });
      return { ...state, retailers: action.data, retailerMap: { ...map } };
    case CODE_FETCHED:
      map = {};
      action.data.forEach( ( code ) => {
        map[ code.id ] = code.code_type;
      });
      return { ...state, transactionCode: action.data, codeMap: { ...map }};
    case INPUT_CHANGED:
      const transactionDetail = {};
      transactionDetail[action.data.key] = action.data.value;
      return { ...state, ...transactionDetail };
    case RESET_TXN_INFO:
      return { ...defaultState };
    case INITIALIZED:
      return { ...state, retailer_id: action.data[0].retailer_id, retailer_credits_and_debit_codes_id: action.data[0].retailer_credits_and_debit_codes_id, amount: action.data[0].amount, comment: action.data[0].comment };
    default:
      return { ...state };
  }
};

export default retailerDebitCreditReducer;

export {
  getInitData,
  INPUT_CHANGED,
  saveTransaction,
  updateTransaction,
  RESET_TXN_INFO
};
