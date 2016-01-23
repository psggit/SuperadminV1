/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  userColumns: []
  users: [ {} ]
}

*/

import fetch from 'isomorphic-fetch';
import { routeActions } from 'redux-simple-router';
import defaultState from './State';

const MAKE_REQUEST = 'MAKE_REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastError: null};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastError: null, users: action.data};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: action.data};
    default: return state;
  }
};

const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const makeRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, data });
    return fetch('//localhost:8080/users')
           .then(
             (response) => {
               if (response.ok) {
                 return dispatch(requestSuccess(response.json()))
               }
               return dispatch(requestFailed('Error. Try again!'));
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};

export default userReducer;
export {makeRequest, requestSuccess, requestFailed};
