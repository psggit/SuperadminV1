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
const BALANCE_FETCHED = 'ViewProfile/BALANCE_FETCHED';
const REQUEST_ERROR = 'ViewProfile/REQUEST_ERROR';
const SECONDARY_VIEW = 'ViewProfile/SECONDARY_VIEW';
const RESET = 'ViewProfile/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders


// Reducer
const defaultState = {ongoingRequest: false, lastError: {}, lastSuccess: [], credentials: null, secondaryData: null, balance: {}};
const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: [], lastError: {}, secondaryData: {}};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data, secondaryData: {}};
    case BALANCE_FETCHED:
      return {...state, balance: action.data };
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

const getUserData = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [
        {
          'name': 'old_consumer_device_history',
          'columns': ['*']
        },
        {
          'name': 'device',
          'columns': ['*']
        },
        {
          'name': 'carts',
          'columns': [
            {
              'name': 'normal_items',
              'columns': ['*']
            },
            {
              'name': 'cashback_items',
              'columns': ['*']
            },
            {
              'name': 'discount_items',
              'columns': ['*']
            },
            {
              'name': 'onpack_items',
              'columns': ['*']
            },
            {
              'name': 'crosspromo_items',
              'columns': ['*']
            },
            {
              'name': 'merchandise_items',
              'columns': ['*']
            }
          ],
          'order_by': '-created_at',
          'limit': 1
        },
        {
          'name': 'gifts',
          'columns': [
            '*'
          ]
        },
        {
          'name': 'payment_recharges',
          'columns': ['*']
        },
        {
          'name': 'reservations',
          'columns': ['*']
        },
        {
          'name': 'orders',
          'columns': ['*']
        },
        '*'
      ],
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

const getBalance = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const url = Endpoints.baseUrl + '/consumer/balance/normal/' + parseInt(f, 10);
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: BALANCE_FETCHED, data: d});
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

const getCartData = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [{
        'name': 'carts',
        'columns': ['id', 'consumer_id', {
          'name': 'normal_items',
          'columns': [{
            'name': 'sku_pricing',
            'columns': [{
              'name': 'sku',
              'columns': ['*', {'name': 'brand', 'columns': ['*']}]
            }, '*']
          }, '*']
        }, {
          'name': 'cashback_items',
          'columns': [{
            'name': 'cash_back_offer_sku',
            'columns': [{
              'name': 'sku_pricing',
              'columns': [{
                'name': 'sku',
                'columns': ['*', {'name': 'brand', 'columns': ['*']} ]
              }, '*']
            }, '*']
          }, '*']
        }, {
          'name': 'discount_items',
          'columns': [{
            'name': 'discount_offer_sku',
            'columns': [{
              'name': 'sku_pricing',
              'columns': [{
                'name': 'sku',
                'columns': ['*', {'name': 'brand', 'columns': ['*']} ]
              }, '*']
            }, '*']
          }, '*']
        }, {
          'name': 'onpack_items',
          'columns': [{
            'name': 'on_pack_offer_sku',
            'columns': [{
              'name': 'sku_pricing',
              'columns': [{
                'name': 'sku',
                'columns': ['*', {'name': 'brand', 'columns': ['*']}]
              }, '*']
            }, '*']
          }, '*']
        }, {
          'name': 'crosspromo_items',
          'columns': [{
            'name': 'cross_promo_offer_sku',
            'columns': [{
              'name': 'sku_pricing',
              'columns': [{
                'name': 'sku',
                'columns': ['*', {'name': 'brand', 'columns': ['*']}]
              }, '*']
            }, '*']
          }, '*']
        }, {
          'name': 'merchandise_items',
          'columns': [{
            'name': 'merchandise_offer_sku',
            'columns': [{
              'name': 'sku_pricing',
              'columns': [{
                'name': 'sku',
                'columns': ['*', {'name': 'brand', 'columns': ['*']}]
              }, '*']
            }, '*']
          }, '*']
        }],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'gifts',
        'columns': ['*']
      },
        '*'
      ],
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


const getDeviceData = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': [{
        'name': 'gifts',
        'columns': ['*']
      }, {
        'name': 'old_consumer_device_history',
        'columns': ['*', {'name': 'device', 'columns': ['*']}]
      },
      '*'
      ],
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

const getRechargeData = (f) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
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

const resetPin = (customerId) => {
  return (dispatch) => {
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
        'tm_id',
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
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: globalCookiePolicy,
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
  return (dispatch) => {
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
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: globalCookiePolicy,
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
export {getUserData, requestSuccess, requestFailed, loadCredentials, RESET, getSecondaryData, resetPin, resetPassword, getCartData, getDeviceData, getRechargeData, getBalance};
