/*
 * Will receive default state from Common
 * */

import {defaultCustomerSupportState} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import {REQUEST_ERROR} from '../../Common/Actions/Actions';

const FETCH_ISSUES = 'CUSTOMER_SUPPORT/FETCH_ISSUES';

/* ****** Action Creators ******** */

const getIssueData = (iId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/request_callback/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'consumer', 'columns': ['*']}];
    queryObj.where = {'id': parseInt(iId, 10) };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj)
    };
    return dispatch(requestAction(url, options, FETCH_ISSUES, REQUEST_ERROR));
  };
};


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const customerSupportReducer = (state = defaultCustomerSupportState, action) => {
  switch (action.type) {
    case FETCH_ISSUES:
      return {...state, issueData: action.data[0]};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getIssueData
};

export default customerSupportReducer;
