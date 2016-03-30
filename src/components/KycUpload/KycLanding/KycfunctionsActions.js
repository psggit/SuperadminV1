/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import fetch from 'isomorphic-fetch';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';

const MAKE_REQUEST = 'Kycfunctions/MAKE_REQUEST';
const REQUEST_SUCCESS = 'Kycfunctions/REQUEST_SUCCESS';
const REQUEST_ERROR = 'Kycfunctions/REQUEST_ERROR';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


const defaultState = {ongoingRequest: false, lastError: null, lastSuccess: null, credentials: null };
const kycReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: null, lastError: null};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: null, credentials: action.data};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: action.data, lastSuccess: null};
    default: return state;
  }
};

const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const makeRequest = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST });
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

export default kycReducer;
export { makeRequest, requestSuccess, requestFailed, loadCredentials };
