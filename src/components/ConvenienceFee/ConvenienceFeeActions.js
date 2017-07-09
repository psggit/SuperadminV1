// TODO: Ensuring time span of two entries for the same state do not collide

import { defaultConvenienceFeeItem } from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
// import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';

/* ******* ACTION DEFINTION ******* */
const STATES_FETCHED = '@convenienceFee/STATES_FETCHED';
const CONVENIENCE_INFO = '@convenienceFee/CONVENIENCE_INFO';

/* ****** Action Creators ******** */

const fetchState = () => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {columns: ['state_name', 'short_name']};

    /* ******  Query Formation ****** */
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };

    /* ***** Send Request ***** */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATES_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const insertConvenienceFee = () => {
  return (dispatch, getState) => {
    const convState = getState().convenienceFeeState.detail;
    convState.valid_from = convState.valid_from + ':00.000000+05:30';
    convState.valid_to = convState.valid_to + ':00.000000+05:30';
    const url = Endpoints.db + '/table/consumer_service_charge/insert';
    const queryObj = {objects: [convState]};
    queryObj.returning = ['id'];

    /* ******  Query Formation ****** */
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };

    /* ***** Send Request ***** */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options)).then((response) => {
        console.log(response);
        // Reroute
      }).catch((err) => {
        console.log(err);
        alert('Please Try Again.');
      }),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};


const convenienceFeeReducer = (state = defaultConvenienceFeeItem, action) => {
  switch (action.type) {
    case STATES_FETCHED:
      return { ...state, statesAll: action.data};
    case CONVENIENCE_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, detail: { ...state.detail, ...camInfo}};
    default:
      return {...state};
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchState,
  insertConvenienceFee,
  CONVENIENCE_INFO
};

export default convenienceFeeReducer;
