/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}
*/

import fetch from 'isomorphic-fetch';
import { routeActions } from 'redux-simple-router';

const MAKE_REQUEST = 'MAKE_REQUEST';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

const loginReducer = (state = {ongoingRequest: false, lastError: null, lastSuccess: null}, action) => {
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

const makeRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, data });
    return fetch('//httpbin.org/ip')
           .then(
             (response) => {
               if (response.ok) {
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
