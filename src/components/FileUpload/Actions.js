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

const MAKE_REQUEST = 'FileUpload/MAKE_REQUEST';
const REQUEST_SUCCESS = 'FileUpload/REQUEST_SUCCESS';
const REQUEST_ERROR = 'FileUpload/REQUEST_ERROR';
const RESET = 'FileUpload/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


const defaultState = {fileUrl: null, ongoingRequest: false, lastError: null, lastSuccess: null, credentials: null };
const fileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: null, lastError: null};
    case REQUEST_SUCCESS:
      return {...state, fileUrl: action.data, ongoingRequest: false, lastSuccess: action.data, lastError: null, credentials: action.data};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: action.data, lastSuccess: null};
    case RESET:
      return {...defaultState};
    default: return state;
  }
};

const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const makeRequest = (f) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, f});

    const data = new FormData();
    data.append('file', f.file);

    const options = {
      method: 'POST',
      body: data,
      credentials: globalCookiePolicy,
      headers: {'x-hasura-role': 'admin', 'x-hasura-user-id': 1}
    };
    return fetch(Endpoints.file_upload, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     dispatch({type: REQUEST_SUCCESS, data: d[0]});
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

export default fileReducer;
export {makeRequest, requestSuccess, requestFailed, loadCredentials, RESET};
