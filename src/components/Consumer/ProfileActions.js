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

import requestAction from '../Common/Actions/requestAction';

// const GET_CONSUMER = 'ViewProfile/GET_CONSUMER';
const REQUEST_SUCCESS = 'ViewProfile/REQUEST_SUCCESS';
const UPGRADE_SUCCESS = 'ViewProfile/UPGRADE_SUCCESS';
const DOWNGRADE_SUCCESS = 'ViewProfile/DOWNGRADE_SUCCESS';
const REQUEST_ERROR = 'ViewProfile/REQUEST_ERROR';
const SECONDARY_VIEW = 'ViewProfile/SECONDARY_VIEW';
const FETCHED_USER_STATUS = 'ViewProfile/FETCHED_USER_STATUS';
const RESET = 'ViewProfile/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


// Reducer
const defaultState = {ongoingRequest: false, lastError: {}, lastSuccess: [], credentials: null, secondaryData: null, balance: {}, userProfile: {}};
const profileReducer = (state = defaultState, action) => {
  let ls;
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data, secondaryData: {}};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: {'error': action.data}, lastSuccess: [], secondaryData: {}};
    case SECONDARY_VIEW:
      return {...state, ongoingRequest: false, lastSuccess: [], secondaryData: action.data};
    case FETCHED_USER_STATUS:
      return { ...state, userProfile: { ...action.data }};
    case UPGRADE_SUCCESS:
      ls = state.lastSuccess.slice();
      ls[0][0].level_id = action.data.level_id;
      return { ...state, ongoingRequest: false, lastSuccess: ls};
    case DOWNGRADE_SUCCESS:
      ls = state.lastSuccess.slice();
      ls[0][0].level_id = action.data.level_id;
      return { ...state, ongoingRequest: false, lastSuccess: ls};
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


const getUserData = ( f ) => {
  return ( dispatch, getState ) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const bulkQueryObj = {
      'type': 'bulk',
      'args': [
        {
          'type': 'select',
          'args': {
            'table': 'consumer',
            'columns': ['*',
              {
                'name': 'old_devices',
                'columns': ['id']
              }],
            'where': {
              'id': f
            }
          }
        },
        {
          'type': 'select',
          'args': {
            'table': 'place_order',
            'columns': ['*'],
            'where': {
              'consumer_id': f
            }
          }
        },
        {
          'type': 'select',
          'args': {
            'table': 'transaction_history',
            'columns': ['*'],
            'where': {
              'consumer_id': f
            }
          }
        },
        {
          'type': 'select',
          'args': {
            'table': 'hipbar_credits',
            'columns': ['*'],
            'where': {
              'id': f
            }
          }
        },
        {
          'type': 'select',
          'args': {
            'table': 'notepad',
            'columns': ['*'],
            'where': {
              'consumer_id': f
            }
          }
        }
      ]
    };

    const url = Endpoints.baseUrl + '/v1/query';
    const options = {
      ...genOptions,
      body: JSON.stringify(bulkQueryObj)
    };
    return dispatch( requestAction( url, options, REQUEST_SUCCESS, REQUEST_ERROR ) );
  };
};

const getUserStatus = ( f ) => {
  return ( dispatch, getState ) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const authUrl = Endpoints.authUrl + '/admin/user/' + f;
    const options = {
      ...genOptions,
      method: 'GET'
    };
    return dispatch( requestAction( authUrl, options, FETCHED_USER_STATUS, REQUEST_ERROR ) );
  };
};

const getCartData = (f) => {
  return (dispatch, getState) => {
    //
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*'],
      'where': {
        'consumer_id': f
      }
    };
    const url = Endpoints.db + '/table/' + 'place_order' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};


const getDeviceData = (f) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [
        {
          'name': 'device',
          'columns': ['*']
        }
      ],
      'where': {
        'id': f
      }
    };
    const url = Endpoints.db + '/table/' + 'consumer' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getRechargeData = (f) => {
  return (dispatch) => {
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [{
        'name': 'payment_recharges',
        'columns': [{
          'name': 'payment_detail',
          'columns': ['*']
        }, '*']
      }, {
        'name': 'gift_recharges',
        'columns': [{
          'name': 'payment_detail',
          'columns': ['*']
        }, '*']
      }, '*'],
      'where': {
        'id': f
      }
    };

    const url = Endpoints.db + '/table/' + 'consumer' + '/select';
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
const downgradeK = (customerId) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const updateValues = {};
    updateValues.level_id = 1;
    const url = Endpoints.db + '/table/' + 'consumer' + '/update';
    const query = {
      'where': {
        'id': customerId
      },
      'returning': [
        'level_id',
        'email',
        'device_id',
        'gcm_token',
        'full_name',
        'referred_by',
        'dob',
        'mobile_number',
        'gender',
        'updated_at',
        'salt',
        'created_at',
        'id',
        'referral_code',
        'encrypted_pin'
      ],
      'values': updateValues
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };
    return fetch(url, options)
      .then(
             (response) => {
               if (response.ok) {
                 response.json().then(
                    (resp) => {
                      alert('Consumer Kyc Level Downgraded');
                      console.log(resp);
                      return dispatch({type: DOWNGRADE_SUCCESS, data: resp.returning[0] });
                      // return dispatch({type: REQUEST_SUCCESS, data: resp.returning[0] });
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
               return dispatch(requestFailed(error.text));
             }
           );
  };
};

const upgradeK = (customerId) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const updateValues = {};
    updateValues.level_id = 2;
    const url = Endpoints.db + '/table/' + 'consumer' + '/update';
    const query = {
      'where': {
        'id': customerId
      },
      'returning': [
        'level_id',
        'email',
        'device_id',
        'gcm_token',
        'full_name',
        'referred_by',
        'dob',
        'mobile_number',
        'gender',
        'updated_at',
        'salt',
        'created_at',
        'id',
        'referral_code',
        'encrypted_pin'
      ],
      'values': updateValues
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };
    return fetch(url, options)
      .then(
             (response) => {
               if (response.ok) {
                 response.json().then(
                    (resp) => {
                      alert('Consumer Kyc Level Upgraded');
                      console.log(resp);
                      return dispatch({type: UPGRADE_SUCCESS, data: resp.returning[0] });
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
               return dispatch(requestFailed(error.text));
             }
           );
  };
};

const resetPin = (customerId) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const updateValues = {};
    updateValues.encrypted_pin = null;
    updateValues.salt = null;
    const url = Endpoints.db + '/table/' + 'consumer' + '/update';
    const query = {
      'where': {
        'id': customerId
      },
      'returning': [
        'level_id',
        'email',
        'device_id',
        'gcm_token',
        'full_name',
        'referred_by',
        'dob',
        'mobile_number',
        'gender',
        'updated_at',
        'salt',
        'created_at',
        'id',
        'referral_code',
        'encrypted_pin'
      ],
      'values': updateValues
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };
    return fetch(url, options)
      .then(
             (response) => {
               if (response.ok) {
                 response.json().then(
                    (resp) => {
                      alert('Pin has been successfully cleared');
                      console.log(resp);
                      // return dispatch({type: REQUEST_SUCCESS, data: resp.returning });
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
               return dispatch(requestFailed(error.text));
             }
           );
  };
};

const resetPassword = (email, dob) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const updateValues = {};
    updateValues.encrypted_pin = null;
    updateValues.salt = null;
    const url = Endpoints.baseUrl + '/hauth/' + 'forgot_password';
    const query = {
      'email': email,
      'info': {
        'dob': dob
      }
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };
    return fetch(url, options)
      .then(
             (response) => {
               if (response.ok) {
                 response.json().then(
                    (resp) => {
                      alert('Password Reset Link has been successfully sent');
                      console.log(resp);
                      // return dispatch({type: REQUEST_SUCCESS, data: resp.returning });
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
               return dispatch(requestFailed(error.text));
             }
           );
  };
};


export default profileReducer;
export {getUserData, requestSuccess, requestFailed, RESET, upgradeK, downgradeK, getSecondaryData, resetPin, resetPassword, getCartData, getDeviceData, getRechargeData, getUserStatus};
