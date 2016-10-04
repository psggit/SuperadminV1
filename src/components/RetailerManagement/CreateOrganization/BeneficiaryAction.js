/* Default State */

import { addBeneficiaryState, serverState, uiState } from './State';

/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

/* Action Constant */

const INITIAL_DATA_FETCHED = '@beneficiary/INITIAL_DATA_FETCHED';
const HANDLE_ERROR = '@beneficiary/HANDLE_ERROR';

const TOGGLE_BENEFICIARY_DETAIL = '@beneficiary/TOGGLE_BENEFICIARY_DETAIL';

/* End of it */

/* Action Creators */

const fetchInitial = () => {
  return ( dispatch ) => {
    const cityUrl = Endpoints.db + '/table/city/select';

    const cityObj = {
      'columns': ['id', 'name']
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(cityObj),
    };

    return dispatch( requestAction( cityUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

/* End of it */

/* Reducer */

const beneficiaryReducer = ( state = { ...addBeneficiaryState, ...serverState, ...uiState }, action ) => {
  switch ( action.type ) {
    case INITIAL_DATA_FETCHED:
      return { ...state };
    case HANDLE_ERROR:
      return { ...state };
    case TOGGLE_BENEFICIARY_DETAIL:
      return { ...state, showDetail: !state.showDetail };
    default:
      return { ...state };
  }
};

/* End of it */

export {
  fetchInitial,
  TOGGLE_BENEFICIARY_DETAIL
};

export default beneficiaryReducer;
