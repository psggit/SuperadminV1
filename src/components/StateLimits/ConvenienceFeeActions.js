// TODO: Ensuring time span of two entries for the same state do not collide

import { defaultConvenienceFeeItem } from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
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

const fetchTypes = () => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/brand_types/select';
    const queryObj = {columns: ['*']};

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
      dispatch(requestAction(url, options, TYPES_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchLimits = () => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/state_position_limits/select';
    const queryObj = {columns: ['*']};

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
      dispatch(requestAction(url, options, LIMITS_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const ifAvailable = (state_short, type_id) => {
  return (dispatch, getState) => {
    const limits = getState().LimitsState;
    const check = false;
    limits.forEach((indiv) => {
      check = ((indiv.state_short_name === state_short) && (indiv.type_id === type_id) ? true : check)
    });
    return check
  };
};


const insertLimits = () => {
  return (dispatch, getState) => {
    const volume = getState().LimitsState.volume;
    const state_short_name = getState().LimitsState.state_short_name;
    const type = getState().LimitsState.type;
    const url = Endpoints.db + '/table/state_postion_limits/insert';
    const queryObj = {objects: [{state_short_name: state_short_name, volume: volume, type: type}]};
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
        return dispatch(routeActions.push('/hadmin/convenience_fee/list'));
        // Reroute
      }).catch((err) => {
        console.log(err);
        alert('Please Try Again.');
      }),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const updateLimits = () => {
  return (dispatch, getState) => {
    const volume = getState().LimitsState.volume;
    const state_short_name = getState().LimitsState.state_short_name;
    const type = getState().LimitsState.type;
    const url = Endpoints.db + '/table/state_postion_limits/update';
    const queryObj = {values: {volume: volume}};
    queryObj.returning = ['id'];
    queryObj.where = {
      'state_short_name': { '$eq': state_short_name},
      'type': { '$eq': type}
    };

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
        return dispatch(routeActions.push('/hadmin/convenience_fee/list'));
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
    case LIMITS_FETCHED:
      return { ...state, limitsAll: action.data};
    case TYPES_FETCHED:
      return { ...state, typesAll: action.data};
    case CONVENIENCE_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, ...camInfo};
    default:
      return {...state};
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchState,
  insertConvenienceFee,
  MAKE_REQUEST,
  CONVENIENCE_INFO
};

export default convenienceFeeReducer;
