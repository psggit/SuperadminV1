/* Action, Action Creators, Reducer for State Management */
/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import { defaultStateManagementState } from '../../Common/Actions/DefaultState';
import { validation } from '../../Common/Actions/Validator';
import crypto from 'crypto';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST, REQUEST_COMPLETED, REQUEST_ERROR } from '../../Common/Actions/Actions';

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

const saveState = () => {
  const listOfValidation = [];
  return (dispatch, getState) => {
    listOfValidation.push(validation(getState().state_data.stateInput, 'non_empty_text'));
    listOfValidation.push(validation(getState().state_data.shortName, 'non_empty_text'));
    Promise.all(listOfValidation
    ).then(() => {
      console.log(dispatch);
      const currState = getState().state_data;
      const stateUrl = Endpoints.db + '/table/state/insert';
      if ( currState.stateInput.length === 0 || currState.shortName.length === 0 ) {
        alert('Kindly check start name or short name');
        return Promise.reject();
      }
      const insertObj = {
      };
      insertObj.objects = [
        {
          'state_name': currState.stateInput,
          'short_name': currState.shortName,
          'created_at': new Date().toISOString(),
          'updated_at': new Date().toISOString()
        }
      ];
      insertObj.returning = ['id', 'short_name'];
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
        credentials: globalCookiePolicy,
        body: JSON.stringify(insertObj),
      };
      return dispatch(requestAction(stateUrl, options))
        .then((stateResponse) => {
          const cityUrl = Endpoints.db + '/table/city/insert';
          const cityObjs = [];
          /* Check for empty cities */
          const cities = Object.keys(currState.cities);
          if ( cities.length > 0) {
            let i = 0;
            while ( i < cities.length) {
              const returnObj = {};
              returnObj.name = currState.cities[cities[i]].cityInput;
              returnObj.state_short_name = stateResponse.returning[0].short_name;
              returnObj.gps = currState.cities[cities[i]].cityGPS;
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
        .then(() => {
          return dispatch(routeActions.push('/hadmin/state_management'));
        })
        .catch(() => {
          alert('Update Unsuccessful!!!');
        });
    })
    .catch((error) => {
      console.log('Error Occured');
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
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_STATE, REQUEST_ERROR));
  };
};

const saveCity = (id, name, gps, stateId) => {
  const listOfValidation = [];
  return (dispatch) => {
    listOfValidation.push(validation(name, 'non_empty_text'));
    listOfValidation.push(validation(gps, 'gps'));
    Promise.all(listOfValidation
    ).then(() => {
      const currStateId = stateId;
      const dataObj = {};
      const updateObj = {};
      const url = Endpoints.db + '/table/city/update';
      dataObj.name = name;
      dataObj.gps = gps;
      updateObj.values = dataObj;
      updateObj.where = {
        'id': parseInt(id, 10)
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
        credentials: globalCookiePolicy,
        body: JSON.stringify(updateObj),
      };
      return dispatch(requestAction(url, options))
        .then((cityResp) => {
          console.log(cityResp);
          return Promise.all([
            dispatch({ type: TOGGLE_CITY_COMPONENT}),
            dispatch(fetchState(currStateId))
          ]);
        });
    })
    .catch((error) => {
      console.log('Error Occured');
      console.log(error);
    });
  };
};

const updateStateSaveCity = () => {
  const listOfValidation = [];
  return (dispatch, getState) => {
    listOfValidation.push(validation(getState().state_data.stateInput, 'non_empty_text'));
    listOfValidation.push(validation(getState().state_data.shortName, 'non_empty_text'));
    Promise.all(listOfValidation
    ).then(() => {
      const currProps = getState().state_data;
      const dataObj = {};
      const updateObj = {};
      const url = Endpoints.db + '/table/state/update';
      const insertObj = {};
      dataObj.state_name = currProps.stateInput;
      dataObj.short_name = currProps.shortName;
      updateObj.values = dataObj;
      updateObj.where = {
        'id': parseInt(currProps.fromDB[0].id, 10)
      };
      updateObj.returning = ['id', 'short_name'];
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
        credentials: globalCookiePolicy,
        body: JSON.stringify(updateObj),
      };
      return dispatch(requestAction(url, options))
        .then(( resp ) => {
          const cityUrl = Endpoints.db + '/table/city/insert';
          const cityObjs = [];
          /* Check for empty cities */
          const cities = Object.keys(currProps.cities);
          if ( cities.length > 0) {
            let i = 0;
            while ( i < cities.length) {
              const returnObj = {};
              returnObj.name = currProps.cities[cities[i]].cityInput;
              returnObj.state_short_name = resp.returning[0].short_name;
              returnObj.gps = currProps.cities[cities[i]].cityGPS;
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
        .then(() => {
          return Promise.all([
            dispatch(fetchState(currProps.fromDB[0].id)),
            dispatch({ type: CLEAR_CITY})
          ]);
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
        });
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
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(deleteObj),
    };
    return dispatch(requestAction(url, options))
      .then((cityResponse) => {
        if ( cityResponse.returning.length > 0 ) {
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
  const listOfValidation = [];
  const valueObj = {};
  switch ( action.type ) {
    case TOGGLE_CITY_COMPONENT:
      return { ...state, hideCityComponent: !state.hideCityComponent, cityInput: '', isCityEdit: false, isCityLocal: false, cityId: '0', cityGPS: ''};
    case CITY_INPUT_CHANGED:
      valueObj[action.data.key] = action.data.value;
      return { ...state, ...valueObj };
    case STATE_INPUT_CHANGED:
      valueObj[action.data.key] = action.data.value;
      return { ...state, ...valueObj };
    case STORE_CITY_LOCAL:
      listOfValidation.push(validation(state.cityInput, 'non_empty_text'));
      listOfValidation.push(validation(state.cityGPS, 'gps'));
      Promise.all(listOfValidation
      ).then(() => {
        const cityObj = {};
        hash = crypto.createHash('sha1').update(state.cityInput.toLowerCase()).digest('hex');
        cityObj[hash] = {};
        cityObj[hash].cityInput = state.cityInput;
        cityObj[hash].cityGPS = state.cityGPS;
        return { ...state, cities: Object.assign({}, state.cities, cityObj), hideCityComponent: true, cityInput: '' };
      });
      /* falls through */
    case UPDATE_CITY_LOCAL:
      listOfValidation.push(validation(state.cityInput, 'non_empty_text'));
      listOfValidation.push(validation(state.cityGPS, 'gps'));
      Promise.all(listOfValidation
      ).then(() => {
        hash = crypto.createHash('sha1').update(state.cityInput.toLowerCase()).digest('hex');
        const updateCityObj = {};
        updateCityObj[hash] = {};
        updateCityObj[hash].cityInput = state.cityInput;
        updateCityObj[hash].cityGPS = state.cityGPS;
        const prevCityObj = Object.assign({}, state.cities);
        delete prevCityObj[state.cityId];
        return { ...state, cities: Object.assign({}, prevCityObj, updateCityObj), isCityLocal: false, isCityEdit: false, cityId: '0', hideCityComponent: true};
      })
      .catch(() => {
        console.log('Error Occured');
      });
      /* falls through */
    case DELETE_CITY_LOCAL:
      const deleteObj = Object.assign({}, state.cities);
      delete deleteObj[state.cityId];
      return { ...state, cities: Object.assign({}, deleteObj), isCityLocal: false, isCityEdit: false, cityId: '0', hideCityComponent: true};
    case EDIT_CITY:
      return { ...state, cityId: action.data.id, isCityLocal: (action.data.type === 'local' ? true : false ), isCityEdit: true, cityInput: state.cities[action.data.id].cityInput, cityGPS: state.cities[action.data.id].cityGPS, hideCityComponent: false };
    case EDIT_SERVER_CITY:
      return { ...state, cityId: action.data.id, isCityLocal: (action.data.type === 'local' ? true : false ), isCityEdit: true, cityInput: action.data.name, hideCityComponent: false, cityGPS: action.data.gps };
    case FETCH_STATE:
      return { ...state, fromDB: action.data, stateInput: action.data[0].state_name, shortName: action.data[0].short_name };
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
  deleteCity,
  MAKE_REQUEST,
  REQUEST_COMPLETED
};

export default stateReducer;
