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

/* Actions */

const MAKE_REQUEST = 'CTRecharge/MAKE_REQUEST';
const REQUEST_SUCCESS = 'CTRecharge/REQUEST_SUCCESS';
const REQUEST_ERROR = 'CTRecharge/REQUEST_ERROR';
const SECONDARY_VIEW = 'CTRecharge/SECONDARY_VIEW';
const RESET = 'CTRecharge/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders

const defaultState = {ongoingRequest: false, lastError: {}, lastSuccess: [], credentials: null, secondaryData: null};

const transactionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: [], lastError: {}, secondaryData: {}};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data, secondaryData: {}};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: {'error': action.data}, lastSuccess: [], secondaryData: {}};
    case SECONDARY_VIEW:
      return {...state, ongoingRequest: false, lastSuccess: [], secondaryData: action.data};
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

const getRechargeData = () => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [
        {
          'name': 'payment_detail',
          'columns': ['*']
        }, '*']
    };

    const url = Endpoints.db + '/table/' + 'recharge_wallet' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
                     return dispatch({type: REQUEST_SUCCESS, data: d});
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

const getReservationData = () => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [ '*']
    };

    const url = Endpoints.db + '/table/' + 'reservation' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
                     return dispatch({type: REQUEST_SUCCESS, data: d});
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

export default transactionReducer;
export {requestSuccess, requestFailed, loadCredentials, RESET, getSecondaryData, getRechargeData, getReservationData};