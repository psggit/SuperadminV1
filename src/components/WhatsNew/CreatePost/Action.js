/* State
{
ongoingRequest: false // true if request is going on
lastError: {} or <string>
lastSuccess: {} or <object>
}
*/

/* Fetch module for API requests */
import fetch from 'isomorphic-fetch';

import Endpoints, {globalCookiePolicy} from '../../../Endpoints';

import requestAction from '../../Common/Actions/requestAction';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

import {defaultWhatsNew} from '../../Common/Actions/DefaultState';

/* Actions */

const REQUEST_SUCCESS = 'CTSKU/REQUEST_SUCCESS';
// const REQUEST_ERROR = 'CTSKU/REQUEST_ERROR';
const STATES_FETCH = 'CTSKU/STATES_FETCH';
const CITIES_VIEW = 'CTSKU/CITIES_VIEW';
const UPDATED_CITIES_SELECTION = 'CTSKU/UPDATED_CITIES_SELECTION';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


const whatsNewReducer = (state = defaultWhatsNew, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {...state, cities: action.data};
    case REQUEST_ERROR:
      return {...state, cities: []};
    case STATES_FETCH:
      return {...state, statesAll: action.data};
    case CITIES_VIEW:
      console.log('CITIES VIEW SETTING STATE');
      return {...state, citiesView: action.data, hideCities: ''};
    case UPDATED_CITIES_SELECTION:
      return { ...state, selectedCities: {...action.data}};
    default: return state;
  }
};

// Action Maker
const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});


const fetchStates = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = ['*', {'name': 'cities', 'columns': ['*']}];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const citiesViewHandler = (stateObj) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: CITIES_VIEW, data: stateObj})
    ]);
  };
};

const checkState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      lCities[c.id] = c;
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      delete lCities[c.id];
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const checkCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().createImageAd_data;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};


const fetchCities = () => {
  return (dispatch) => {
    const payload = {
      'type': 'select',
      'args': {
        'table': 'city',
        'columns': ['*'],
        'order_by': '+name'
      }
    };

    const url = Endpoints.bulk;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch( requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     alert('Cities fetched');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d}),
                     ]);
                   },
                   () => {
                     return dispatch(requestFailed('Error. Try again!'));
                   }
                 );
               } else {
                 return dispatch(requestFailed('Error. Try again!'));
               }
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};

const createNewArticle = (dataObject) => {
  return (dispatch) => {
    console.log(dataObject);

    const insertArticleObj = {'type': 'insert', 'args': {'table': 'whats_new_article', 'objects': [{'is_featured': dataObject.is_featured, 'title': dataObject.title, 'description': dataObject.description, 'content': dataObject.content, 'image': dataObject.image, 'is_active': true}]}};

    const payload = {'type': 'bulk', 'args': [insertArticleObj]};

    console.log(payload);

    const url = Endpoints.bulk;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     alert('Article Successfully Inserted');
                     console.log(d);
                     /*
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       // dispatch(routeActions.push('/hadmin/state_management'))
                     ]);
                     */
                   },
                   () => {
                     return dispatch(requestFailed('Error. Try again!'));
                   }
                 );
               } else {
                 return dispatch(requestFailed('Error. Try again!'));
               }
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};

/* End of it */

export default whatsNewReducer;
export {requestSuccess,
  requestFailed,
  createNewArticle,
  fetchCities,
  fetchStates,
  citiesViewHandler,
  checkState,
  unCheckState,
  checkCity,
  unCheckCity
};
