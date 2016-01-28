/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import fetch from 'isomorphic-fetch';
import { routeActions } from 'redux-simple-router';
import {setUsername} from '../Home/Actions';

const MAKE_REQUEST = 'Login/MAKE_REQUEST';
const REQUEST_SUCCESS = 'Login/REQUEST_SUCCESS';
const REQUEST_ERROR = 'Login/REQUEST_ERROR';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


const defaultState = {ongoingRequest: false, lastError: null, lastSuccess: null};
const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {ongoingRequest: true, lastSuccess: null, lastError: null};
    case REQUEST_SUCCESS:
      return {ongoingRequest: false, lastSuccess: action.data, lastError: null};
    case REQUEST_ERROR:
      return {ongoingRequest: false, lastError: action.data, lastSuccess: null};
    default: return state;
  }
};

const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const loginEndpoint = 'http://130.211.255.73/auth/login';
const makeRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, data });
    dispatch(setUsername(data.username));
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(loginEndpoint, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 return Promise.all([
                   dispatch(requestSuccess(response.json())),
                   dispatch(routeActions.push('/'))
                 ]);
               }
               return dispatch(requestFailed('Error. Try again!'));
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};

export default loginReducer;
export {makeRequest, requestSuccess, requestFailed};
