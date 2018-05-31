/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import fetch from 'isomorphic-fetch';
import { routeActions } from 'redux-simple-router';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';

const MAKE_REQUEST = 'Login/MAKE_REQUEST';
const REQUEST_SUCCESS = 'Login/REQUEST_SUCCESS';
const REQUEST_ERROR = 'Login/REQUEST_ERROR';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


const defaultState = {ongoingRequest: false, lastError: null, lastSuccess: null, credentials: null };
const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: null, lastError: null};
    case REQUEST_SUCCESS:
      const priority = {'admin': 15, 'opadmin': 6, 'opdataadmin': 7, 'opdataentry': 8, 'customer_support': 9, 'product_team': 10, 'qa_team': 11, 'support_read_only': 3, 'user': 1, 'dataentry': 4, 'support_person': 12, 'support_admin': 13, 'support_master': 14, 'dataadmin': 5, 'support_person': 2 };
      let highestRole = 'user';
      if ( action.data.hasOwnProperty('hasura_roles')) {
        action.data.hasura_roles.forEach((indiv) => { highestRole = (priority[highestRole] <= priority[indiv]) ? indiv : highestRole; });
      }
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: null, credentials: action.data, highestRole: highestRole};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: action.data, lastSuccess: null};
    default: return state;
  }
};

const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

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

const makeRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, data });
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: globalCookiePolicy,
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(Endpoints.login, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 return Promise.all([
                   dispatch(requestSuccess(response.json())),
                   dispatch(loadCredentials()),
                   dispatch(routeActions.push('/hadmin'))
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
export {makeRequest, requestSuccess, requestFailed, loadCredentials};
