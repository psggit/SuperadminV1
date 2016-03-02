/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  userColumns: []
  users: [ {} ]
}

*/

import fetch from 'isomorphic-fetch';
import defaultState from './State';

const MAKE_REQUEST = 'Bills/MAKE_REQUEST';
const REQUEST_SUCCESS = 'Bills/REQUEST_SUCCESS';
const REQUEST_ERROR = 'Bills/REQUEST_ERROR';

const billsReducer = (state = defaultState, action) => {
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
    return fetch('//localhost:9999/users')
           .then(
             (response) => {
               if (response.ok) {
                 response.json().then( (userData) => {
                   return dispatch(requestSuccess(userData));
                 });
               }
               return dispatch(requestFailed('Error. Try again!'));
             },
             (error) => {
               return dispatch(requestFailed(error.message));
             });
  };
};

export default billsReducer;
export {makeRequest, requestSuccess, requestFailed};
