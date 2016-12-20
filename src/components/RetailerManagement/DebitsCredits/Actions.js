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
    branchSelectObj.columns = [ 'id', 'org_name' ];
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
        return dispatch( routeActions.push('/hadmin/retailer_management/debits_credits_landing'));
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
  switch ( action.type ) {
    case RETAILER_FETCHED:
      return { ...state, retailers: action.data };
    case CODE_FETCHED:
      return { ...state, transactionCode: action.data };
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
