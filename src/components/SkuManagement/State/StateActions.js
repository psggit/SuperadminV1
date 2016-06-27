/* Action, Action Creators, Reducer for State Management */
/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import { defaultStateManagementState } from '../../Common/Actions/DefaultState';
import crypto from 'crypto';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { REQUEST_ERROR } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';

/* Action Constants */

const TOGGLE_CITY_COMPONENT = '@state_mgt/TOGGLE_CITY_COMPONENT';
const CITY_INPUT_CHANGED = '@state_mgt/CITY_INPUT_CHANGED';
const STATE_INPUT_CHANGED = '@state_mgt/STATE_INPUT_CHANGED';
const STORE_CITY_LOCAL = '@state_mgt/STORE_CITY_LOCAL';
const EDIT_CITY = '@state_mgt/EDIT_CITY';
const EDIT_SERVER_CITY = '@state_mgt/EDIT_SERVER_CITY';
const UPDATE_CITY_LOCAL = '@state_mgt/UPDATE_CITY_LOCAL';
const DELETE_CITY_LOCAL = '@state_mgt/DELETE_CITY_LOCAL';
const FETCH_STATE = '@state_mgt/FETCH_STATE';
const CLEAR_CITY = '@state_mgt/CLEAR_CITY';
const RESET = '@state_mgt/RESET';

/* Action creators */

const saveState = (props) => {
  return (dispatch) => {
    console.log(dispatch);
    const stateUrl = Endpoints.db + '/table/state/insert';
    const insertObj = {
    };
    insertObj.objects = [
      {
        'state_name': props.stateInput,
        'state_billing_id': 3,
        'created_at': new Date().toISOString(),
        'updated_at': new Date().toISOString()
      }
    ];
    insertObj.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj),
    };
    return dispatch(requestAction(stateUrl, options))
      .then((stateResponse) => {
        const cityUrl = Endpoints.db + '/table/city/insert';
        const cityObjs = [];
        /* Check for empty cities */
        const cities = Object.keys(props.cities);
        if ( cities.length > 0) {
          let i = 0;
          while ( i < cities.length) {
            const returnObj = {};
            returnObj.name = props.cities[cities[i]];
            returnObj.state_id = stateResponse.returning[0].id;
            returnObj.gps = '26.450767,74.640304';
            returnObj.created_at = new Date().toISOString();
            returnObj.updated_at = new Date().toISOString();
            cityObjs.push(returnObj);
            i += 1;
          }
          // console.log(cityObjs);
          insertObj.objects = cityObjs;
          insertObj.returning = ['id'];
          options.body = JSON.stringify(insertObj);
          return dispatch(requestAction(cityUrl, options));
        }
        // console.log('return empty');
        return [];
      })
      .then((cityResp) => {
        console.log('cityResp');
        console.log(cityResp);
        alert('state successfully created');
        return dispatch(routeActions.push('/hadmin/state_management'));
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
};

const fetchState = (stateId) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST});
    //
    const payload = {
      'where': {'id': stateId},
      'columns': ['*', { 'name': 'cities', 'columns': ['id', 'name', 'gps'] }]
    };

    const url = Endpoints.db + '/table/' + 'state' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_STATE, REQUEST_ERROR));
  };
};

const saveCity = (id, name, stateId) => {
  return (dispatch) => {
    const currStateId = stateId;
    const dataObj = {};
    const updateObj = {};
    const url = Endpoints.db + '/table/city/update';
    dataObj.name = name;
    updateObj.values = dataObj;
    updateObj.where = {
      'id': parseInt(id, 10)
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj),
    };
    return dispatch(requestAction(url, options))
      .then((cityResp) => {
        console.log(cityResp);
        alert('city updated');
        return dispatch(fetchState(currStateId));
      });
  };
};

const updateStateSaveCity = (props) => {
  return (dispatch) => {
    const currProps = props;
    const dataObj = {};
    const updateObj = {};
    const url = Endpoints.db + '/table/state/update';
    const insertObj = {};
    dataObj.state_name = props.stateInput;
    updateObj.values = dataObj;
    updateObj.where = {
      'id': parseInt(props.fromDB[0].id, 10)
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj),
    };
    return dispatch(requestAction(url, options))
      .then(() => {
        const cityUrl = Endpoints.db + '/table/city/insert';
        const cityObjs = [];
        /* Check for empty cities */
        const cities = Object.keys(props.cities);
        if ( cities.length > 0) {
          let i = 0;
          while ( i < cities.length) {
            const returnObj = {};
            returnObj.name = props.cities[cities[i]];
            returnObj.state_id = currProps.fromDB[0].id;
            returnObj.gps = '26.450767,74.640304';
            returnObj.created_at = new Date().toISOString();
            returnObj.updated_at = new Date().toISOString();
            cityObjs.push(returnObj);
            i += 1;
          }
          // console.log(cityObjs);
          insertObj.objects = cityObjs;
          insertObj.returning = ['id'];
          options.body = JSON.stringify(insertObj);
          return dispatch(requestAction(cityUrl, options));
        }
        // console.log('return empty');
        return [];
      })
      .then((cityResp) => {
        console.log('cityResp');
        alert('stateupdated ');
        console.log(cityResp);
        return Promise.all([
          dispatch(fetchState(currProps.fromDB[0].id)),
          dispatch({ type: CLEAR_CITY})
        ]);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
};

const deleteCity = (cityId, name, stateId) => {
  return (dispatch) => {
    const currState = stateId;
    const deleteObj = {};
    const url = Endpoints.db + '/table/city/delete';
    deleteObj.where = {
      'id': parseInt(cityId, 10)
    };
    deleteObj.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(deleteObj),
    };
    return dispatch(requestAction(url, options))
      .then((cityResponse) => {
        if ( cityResponse.returning.length > 0 ) {
          alert( 'city successfully deleted');
          return Promise.all([
            dispatch(fetchState(currState)),
            dispatch({ type: TOGGLE_CITY_COMPONENT})
          ]);
        }
        alert('sorry something went wrong while deleting city');
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
};

/* End of Action creators */

/* Reducer for State Management */

const stateReducer = ( state = defaultStateManagementState, action) => {
  let hash = '';
  switch ( action.type ) {
    case TOGGLE_CITY_COMPONENT:
      return { ...state, hideCityComponent: !state.hideCityComponent, cityInput: '', isCityEdit: false, isCityLocal: false, cityId: '0'};
    case CITY_INPUT_CHANGED:
      return { ...state, cityInput: action.data };
    case STATE_INPUT_CHANGED:
      return { ...state, stateInput: action.data };
    case STORE_CITY_LOCAL:
      const cityObj = {};
      hash = crypto.createHash('sha1').update(state.cityInput.toLowerCase()).digest('hex');
      cityObj[hash] = state.cityInput;
      return { ...state, cities: Object.assign({}, state.cities, cityObj), hideCityComponent: true, cityInput: '' };
    case UPDATE_CITY_LOCAL:
      hash = crypto.createHash('sha1').update(state.cityInput.toLowerCase()).digest('hex');
      const updateCityObj = {};
      updateCityObj[hash] = state.cityInput;
      const prevCityObj = Object.assign({}, state.cities, updateCityObj);
      delete prevCityObj[state.cityId];
      return { ...state, cities: Object.assign({}, prevCityObj), isCityLocal: false, isCityEdit: false, cityId: 0, hideCityComponent: true};
    case DELETE_CITY_LOCAL:
      const deleteObj = Object.assign({}, state.cities);
      delete deleteObj[state.cityId];
      return { ...state, cities: Object.assign({}, deleteObj), isCityLocal: false, isCityEdit: false, cityId: 0, hideCityComponent: true};
    case EDIT_CITY:
      return { ...state, cityId: action.data.id, isCityLocal: (action.data.type === 'local' ? true : false ), isCityEdit: true, cityInput: state.cities[action.data.id], hideCityComponent: false };
    case EDIT_SERVER_CITY:
      return { ...state, cityId: action.data.id, isCityLocal: (action.data.type === 'local' ? true : false ), isCityEdit: true, cityInput: action.data.name, hideCityComponent: false };
    case FETCH_STATE:
      return { ...state, fromDB: action.data, stateInput: action.data[0].state_name};
    case CLEAR_CITY:
      return { ...state, cities: {}};
    case RESET:
      return { ...defaultStateManagementState };
    default:
      return { ...state };
  }
};

/* End of reducer */

export {
  TOGGLE_CITY_COMPONENT,
  CITY_INPUT_CHANGED,
  STATE_INPUT_CHANGED,
  STORE_CITY_LOCAL,
  EDIT_CITY,
  EDIT_SERVER_CITY,
  UPDATE_CITY_LOCAL,
  DELETE_CITY_LOCAL,
  saveState,
  saveCity,
  fetchState,
  updateStateSaveCity,
  RESET,
  deleteCity
};

export default stateReducer;
