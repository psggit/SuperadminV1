/*
 * Will receive default state from Common
 * */

import requestAction from '../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';

/* End of it */

/* Action Constants */

const CONSTRAINTS_FETCHED = '@constraints/CONSTRAINTS_FETCHED';
const CITY_FETCHED = '@constraints/CITY_FETCHED';
const WORKTIMES_FETCHED = '@constraints/WORKTIMES_FETCHED';
const RESET = '@constraint/RESET';
const UPDATE_TIME = '@constraint/UPDATE_TIME';

const INPUT_VALUE_CHANGED = '@constraints/INPUT_VALUE_CHANGED';

/* ****** Action Creators ******** */

const fetchConstraints = ( cId ) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/delivery_constraints/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'city_id': cId
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options, CONSTRAINTS_FETCHED, REQUEST_ERROR))
    ]);
  };
};

const fetchWorkTimes = ( cId ) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/delivery_time/select';
    const queryObj = {};
    queryObj.columns = [
      '*', {name: 'weekday', columns: ['*']}
    ];
    queryObj.where = {
      'city_id': cId
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options, WORKTIMES_FETCHED, REQUEST_ERROR))
    ]);
  };
};

const fetchCityName = (cId) => {
  return (dispatch, getState) => {
    /* Url */
    const url = Endpoints.db + '/table/city/select';
    const queryObj = {};
    queryObj.columns = [
      'name'
    ];
    queryObj.where = {
      'id': cId
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options, CITY_FETCHED, REQUEST_ERROR))
    ]);
  };
};
const updateOperationTimes = () => {
  return (dispatch, getState) => {
    const url = Endpoints.dataUrl + '/v1/query';
    const updateObj = {};
    const currState = getState().deliveryConstraintsManagmentState.workTime;

    const indivBulkObjects = [];
    currState.forEach((indiv) => {
      indivBulkObjects.push({
        'type': 'update',
        'args': {
          'table': 'delivery_time',
          '$set': {'start_time': indiv.start_time, 'end_time': indiv.end_time},
          'where': {
            'id': indiv.id
          }
        }
      });
    });
    updateObj.type = 'bulk';
    updateObj.args = indivBulkObjects;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        alert('Updated');
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/configure_delivery_constraints'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while Updating. Try Again');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};


const updateConstraints = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/delivery_constraints/update';
    const updateObj = {};
    const currState = getState().deliveryConstraintsManagmentState;
    updateObj.values = currState.constraints;
    updateObj.where = {id: currState.constraints.id};
    updateObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        alert('Updated');
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/configure_delivery_constraints'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while Updating. Try Again');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* ====== End of functions */
const defaultState = {
  constraints: {},
  city: {}
};

const deliveryConstraintsManagementReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INPUT_VALUE_CHANGED:
      const cUnit = {};
      cUnit[action.data.key] = action.data.value;
      return { ...state, constraints: {...state.constraints, ...cUnit}};
    case UPDATE_TIME:
      const temp = Object.assign(state.workTime);
      temp[parseInt(action.data.index, 10)][action.data.type] = action.data.value;
      return { ...state, workTime: [...temp] };
    case CONSTRAINTS_FETCHED:
      return { ...state, constraints: action.data[0] };
    case CITY_FETCHED:
      return { ...state, city: action.data[0] };
    case WORKTIMES_FETCHED:
      return { ...state, workTime: action.data };
    case RESET:
      return { ...defaultState };
    default:
      return { ...state };
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchConstraints,
  updateConstraints,
  UPDATE_TIME,
  fetchWorkTimes,
  INPUT_VALUE_CHANGED,
  updateOperationTimes,
  RESET,
  fetchCityName,
  REQUEST_COMPLETED,
  MAKE_REQUEST
};
export default deliveryConstraintsManagementReducer;
