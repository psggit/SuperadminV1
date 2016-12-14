/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import { genOptions } from '../../Common/Actions/commonFunctions';

import Endpoints from '../../../Endpoints';

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

/* End of it */

const getInitData = () => {
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
      dispatch( requestAction(debitCodesUrl, codeOptions, CODE_FETCHED))
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

    requiredKeys.forEach( ( key ) => {
      if ( !currState[key] ) {
        alert('All the fields are mandatory');
        return Promise.resolve();
      }
      insertObj[[key]] = currState[key];
    });

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
    default:
      return { ...state };
  }
};

export default retailerDebitCreditReducer;

export {
  getInitData,
  INPUT_CHANGED,
  saveTransaction
};
