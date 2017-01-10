/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import { genOptions } from '../../Common/Actions/commonFunctions';

import Endpoints from '../../../Endpoints';

import { routeActions } from 'redux-simple-router';

/* End of it */

/* Default State */

const defaultState = {
  bars: [],
  transactionCode: [],
  bar_id: 0,
  bar_credits_and_debit_codes_id: 0,
  amount: 0,
  comment: ''
};

/* End of it */

/* Action Constants */

const INPUT_CHANGED = '@bardebit/INPUT_CHANGED';
const BAR_FETCHED = '@bardebit/BAR_FETCHED';
const CODE_FETCHED = '@bardebit/CODE_FETCHED';
const RESET_TXN_INFO = '@bardebit/RESET_TXN_INFO';
const INITIALIZED = '@bardebit/INITIALIZED';

/* End of it */

const fetchData = ( Id ) => {
  return ( dispatch ) => {
    const txnUrl = Endpoints.db + '/table/' + 'bar_debits_and_credits' + '/select';
    const payload = {
      columns: ['*',
        {
          'name': 'bar_credits_and_debit_codes',
          'columns': ['*']
        },
        {
          'name': 'bar',
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
      return dispatch( routeActions.push('/hadmin/bar_management/debits_credits_landing'));
    });
  };
};

const getInitData = ( Id ) => {
  return ( dispatch ) => {
    const branchUrl = Endpoints.db + '/table/bars/select';
    const debitCodesUrl = Endpoints.db + '/table/bar_credits_and_debit_codes/select';

    const branchSelectObj = {};
    branchSelectObj.columns = [ 'id', 'name' ];
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
      dispatch( requestAction(branchUrl, branchOptions, BAR_FETCHED)),
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
    const transactionUrl = Endpoints.db + '/table/bar_debits_and_credits/insert';

    const currState = getState().bar_debit_credit;

    const requiredKeys = ['amount', 'comment', 'bar_id', 'bar_credits_and_debit_codes_id'];
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
        return dispatch( routeActions.push('/hadmin/bar_management/debits_credits_landing'));
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
    const transactionUrl = Endpoints.db + '/table/bar_debits_and_credits/update';

    const currState = getState().bar_debit_credit;

    const requiredKeys = ['amount', 'comment', 'bar_id', 'bar_credits_and_debit_codes_id'];
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
        return dispatch( routeActions.push('/hadmin/bar_management/debits_credits_landing'));
      }
    })
    .catch( ( resp ) => {
      alert('Error: ' + resp );
    });
  };
};

/* Reducer */

const barDebitCreditReducer = ( state = defaultState, action ) => {
  switch ( action.type ) {
    case BAR_FETCHED:
      return { ...state, bars: action.data };
    case CODE_FETCHED:
      return { ...state, transactionCode: action.data };
    case INPUT_CHANGED:
      const transactionDetail = {};
      transactionDetail[action.data.key] = action.data.value;
      return { ...state, ...transactionDetail };
    case RESET_TXN_INFO:
      return { ...defaultState };
    case INITIALIZED:
      return { ...state, bar_id: action.data[0].bar_id, bar_credits_and_debit_codes_id: action.data[0].bar_credits_and_debit_codes_id, amount: action.data[0].amount, comment: action.data[0].comment };
    default:
      return { ...state };
  }
};

export default barDebitCreditReducer;

export {
  getInitData,
  INPUT_CHANGED,
  saveTransaction,
  updateTransaction,
  RESET_TXN_INFO
};
