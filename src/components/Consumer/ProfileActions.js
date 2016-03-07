/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import fetch from 'isomorphic-fetch';
// import { routeActions } from 'redux-simple-router';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';

// const GET_CONSUMER = 'ViewProfile/GET_CONSUMER';
const MAKE_REQUEST = 'ViewProfile/MAKE_REQUEST';
const REQUEST_SUCCESS = 'ViewProfile/REQUEST_SUCCESS';
const REQUEST_ERROR = 'ViewProfile/REQUEST_ERROR';
const SECONDARY_VIEW = 'ViewProfile/SECONDARY_VIEW';
const RESET = 'ViewProfile/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


// Reducer
const defaultState = {ongoingRequest: false, lastError: null, lastSuccess: null, credentials: null, secondaryData: null};
const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: null, lastError: null, secondaryData: null};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: null, credentials: action.data, secondaryData: null};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: action.data, lastSuccess: null, secondaryData: null};
    case SECONDARY_VIEW:
      return {...state, ongoingRequest: false, lastSuccess: null, secondaryData: action.data};
    case RESET:
      return {...defaultState};
    default: return state;
  }
};

// Action Maker
const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});


const getSecondaryData = (data, key) => {
  return (dispatch) => {
    console.log(data);
    dispatch({type: SECONDARY_VIEW, data: data[0][key]});

  }
}

const getUserData = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    const payload = {'where': {'id': f}, 'columns': ['*']};
    const url = Endpoints.db + '/table/' + 'consumer' + '/select';
    // body: JSON.stringify(payload),
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch('http://localhost:3080/get_consumer_profile/' + f, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     dispatch({type: REQUEST_SUCCESS, data: d});
                   },
                   () => {
                     dispatch(requestFailed('Error. Try again!'));
                   }
                 );
               }
               return dispatch(requestFailed('Error. Try again!'));
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};


const loadCredentials = () => {
  return (dispatch) => {
    const p1 = new Promise((resolve, reject) => {
      fetch(Endpoints.getCredentials, {credentials: globalCookiePolicy}).then(
        (response) => {
          if (response.ok) {
            response.json().then(
              (creds) => {
                dispatch(requestSuccess(creds));
                resolve();
              },
              () => { reject(); }
            );
          } else {
            reject();
          }
        },
        () => { reject(); }
      );
    });
    return p1;
  };
};

export default profileReducer;
export {getUserData, requestSuccess, requestFailed, loadCredentials, RESET, getSecondaryData};
