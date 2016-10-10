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

import { routeActions } from 'redux-simple-router';

import { genOptions } from '../../Common/Actions/commonFunctions';

import requestAction from '../../Common/Actions/requestAction';

/* Actions */

const MAKE_REQUEST = 'CTRecharge/MAKE_REQUEST';
const REQUEST_SUCCESS = 'CTRecharge/REQUEST_SUCCESS';
const COUNT_FETCHED = 'CTRecharge/COUNT_FETCHED';
const CREDIT_DATA = 'CTRecharge/CREDIT_DATA';
const REQUEST_ERROR = 'CTRecharge/REQUEST_ERROR';
const SECONDARY_VIEW = 'CTRecharge/SECONDARY_VIEW';
const RESET = 'CTRecharge/RESET';

/* Actions for Confirm Credit */
const UPDATE_CURRENT_COUNT = 'CTRecharge/UPDATE_CURRENT_COUNT';
const UPDATE_CURRENT_PAGE_DATA = 'CTRecharge/UPDATE_CURRENT_PAGE_DATA';
const DELETE_CREDIT_AND_UPDATE_DATA = 'CTRecharge/DELETE_CREDIT_AND_UPDATE_DATA';
const SET_VALID_EMAILS = 'CTRecharge/SET_VALID_EMAILS';
const UPDATE_VALID_DATA = 'CTRecharge/UPDATE_VALID_DATA';
const UPDATE_CREDIT_DATA = 'CTRecharge/UPDATE_CREDIT_DATA';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders

const defaultState = {ongoingRequest: false, lastError: {}, lastSuccess: [], credentials: null, secondaryData: null, count: 1, creditData: {}, pageData: [], pagesCount: 1, validEmails: []};

const transactionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: [], lastError: {}, secondaryData: {}};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data, secondaryData: {}};
    case COUNT_FETCHED:
      return {...state, count: action.data.count };
    case CREDIT_DATA:
      return {...state, creditData: Object.assign({}, action.data)};
    case UPDATE_CURRENT_COUNT:
      return {...state, pagesCount: action.data};
    case UPDATE_CURRENT_PAGE_DATA:
      return {...state, pageData: action.data};
    case DELETE_CREDIT_AND_UPDATE_DATA:
      const expr = (action.data) ? [...state.creditData.data.slice(0, action.data.dataIndex), ...state.creditData.data.slice(action.data.dataIndex + 1) ] : [state.creditData.data.slice(action.data.dataIndex + 1)];
      const pageD = expr.slice(action.data.pageOffset, action.data.limit);
      const newCount = expr.length;
      return {...state, creditData: {...state.creditData, data: expr }, pageData: pageD, pagesCount: newCount};
    case UPDATE_CREDIT_DATA:
      const expr1 = (action.data) ? [...state.creditData.data.slice(0, action.data.dataIndex), {...state.creditData.data[action.data.dataIndex], amount: action.data.value}, ...state.creditData.data.slice(action.data.dataIndex + 1) ] : [{...state.creditData.data[action.data.dataIndex], amount: action.data.value}, ...state.creditData.data.slice(action.data.dataIndex + 1)];
      const pageD1 = expr1.slice(action.data.pageOffset, action.data.limit);
      const newCount1 = expr1.length;
      return {...state, creditData: {...state.creditData, data: expr1 }, pageData: pageD1, pagesCount: newCount1};
    case SET_VALID_EMAILS:
      return {...state, validEmails: action.data};
    case UPDATE_VALID_DATA:
      return {...state, creditData: action.data};
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

/* Fetch Cancel Products */

const getCancellationCount = ( consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    payload.where = {};

    payload.where.type = 'cancellation';

    const url = Endpoints.db + '/table/' + 'transaction_history' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getCancellationData = ( page, consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      'columns': [ '*'],
      limit: limit,
      offset: offset
    };

    payload.where = {};

    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    payload.where.type = 'cancellation';

    const url = Endpoints.db + '/table/' + 'transaction_history' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getAllCancellationData = (page, consumerId = '' ) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    return Promise.all([
      dispatch(getCancellationCount( consumerId )),
      dispatch(getCancellationData(gotPage, consumerId))
    ]);
  };
};

/* */

const getRechargeCount = ( consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    const url = Endpoints.db + '/table/' + 'recharge_wallet' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getRechargeData = ( page, consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      'columns': [
        {
          'name': 'payment_detail',
          'columns': ['*']
        }, '*'],
      limit: limit,
      offset: offset
    };

    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    const url = Endpoints.db + '/table/' + 'recharge_wallet' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getAllRechargeData = (page, consumerId = '' ) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    return Promise.all([
      dispatch(getRechargeCount( consumerId )),
      dispatch(getRechargeData(gotPage, consumerId))
    ]);
  };
};

const getReservationCount = ( consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    const url = Endpoints.db + '/table/' + 'reservation' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getReservationData = ( page, consumerId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      'columns': [ '*', {
        'name': 'cart', 'columns': ['*', {
          'name': 'normal_items',
          'columns': ['*', {
            'name': 'product',
            'columns': ['*', {
              'name': 'sku',
              'columns': ['*', {
                'name': 'brand',
                'columns': ['*']
              }]
            }]
          }]
        }, {
          'name': 'bar_items',
          'columns': ['*']
        }, {
          'name': 'cashback_items',
          'columns': ['*']
        }]
      }],
      'limit': limit,
      'offset': offset
    };
    if ( consumerId.length > 0 ) {
      payload.where = {
        'consumer_id': parseInt(consumerId, 10)
      };
    }

    const url = Endpoints.db + '/table/' + 'reservation' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getReservedItems = ( cartId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);

    const payload = {
      'columns': ['*', {
        'name': 'normal_items',
        'columns': ['*', {
          'name': 'product',
          'columns': ['*', {
            'name': 'sku',
            'columns': ['*', {
              'name': 'brand',
              'columns': ['*']
            }]
          }]
        }]
      }, {
        'name': 'cashback_items',
        'columns': ['*', {
          'name': 'product',
          'columns': ['*', {
            'name': 'sku_pricing',
            'columns': [{
              'name': 'sku',
              'columns': ['*', {
                'name': 'brand',
                'columns': ['*']
              }]
            }]
          }]
        }]
      }, {
        'name': 'bar_items',
        'columns': ['*', {
          'name': 'product',
          'columns': ['*', {
            'name': 'sku_pricing',
            'columns': [{
              'name': 'sku',
              'columns': ['*', {
                'name': 'brand',
                'columns': ['*']
              }]
            }]
          }]
        }]
      }],
      'where': {
        'id': parseInt(cartId, 10)
      }
    };

    const url = Endpoints.db + '/table/' + 'cart' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getTransactionCode = () => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'transaction_code/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
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

const checkValidity = (emailIds, data) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const orQuery = [];
    const currentData = Object.assign({}, data);

    emailIds.forEach((email) => {
      const orQ = {};
      orQ.email = email;
      orQuery.push(orQ);
    });
    const payload = {
      'columns': ['id', 'full_name', 'email'],
      'where': {
        '$or': orQuery
      }
    };

    const url = Endpoints.db + '/table/' + 'consumer/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     d.forEach((email, i) => {
                       currentData.data[currentData[email.email]].is_valid = true;
                       currentData.data[currentData[email.email]].full_name = email.full_name;
                       currentData.data[currentData[email.email]].actual_id = email.id;
                       /* Emit once all are done */
                       if (i === (d.length - 1)) {
                         return Promise.all([
                           dispatch({type: SET_VALID_EMAILS, data: d}),
                           dispatch({type: CREDIT_DATA, data: currentData}),
                           dispatch(routeActions.push('/hadmin/consumer_transactions/confirm_credits'))
                         ]);
                       }
                     });
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

/*
const setCreditState = (data, emailIds) => {
  return (dispatch) => {
    dispatch(checkValidity(emailIds, data))
      .then(() => {
        return Promise.all([

        ]);
      });
  };
};
*/

const insertCredits = (creditObjs, batchNumber) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {};
    const currentBatchNumber = batchNumber;
    payload.objects = creditObjs;
    payload.returning = ['id'];


    const url = Endpoints.db + '/table/' + 'recharge_hipbar' + '/insert';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     alert('Credits Successfully Inserted');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/consumer_transactions/view_credits/' + currentBatchNumber))
                     ]);
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

const getTransactionByBatch = (page, batchId) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;

    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;
    const payload = {
      'columns': ['*', { 'name': 'consumer', 'columns': ['full_name', 'email']}],
      'where': {
        batch_number: batchId
      },
      limit: limit,
      offset: offset,
    };

    const url = Endpoints.db + '/table/' + 'recharge_hipbar/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
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

const getTransactionCount = (batchId) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*'],
      'where': {
        'batch_number': batchId
      }
    };

    const url = Endpoints.db + '/table/' + 'recharge_hipbar' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: COUNT_FETCHED, data: d});
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

const getAllTransactionByBatch = (page, batchId) => {
  const gotPage = page;
  const currentBatch = batchId;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getTransactionCount(batchId))
      .then(() => {
        return dispatch(getTransactionByBatch(gotPage, currentBatch));
      })
      .then(() => {
        console.log('Reservation Data fetched');
      });
  };
};

const initialState = (data) => {
  return (dispatch) => {
    if (Object.keys(data).length ) {
      const pageLimit = 10;
      let pageData;
      let pageCount;
      // Give the first 10 data
      pageData = data.data.slice(0, pageLimit);
      pageCount = data.data.length;
      return Promise.all([
        dispatch({type: UPDATE_CURRENT_COUNT, data: pageCount}),
        dispatch({type: UPDATE_CURRENT_PAGE_DATA, data: pageData})
      ]);
    }
  };
};

const updatePageData = (page, data) => {
  return (dispatch) => {
    if ( Object.keys(data).length ) {
      const pageLimit = 10;
      let pageData;
      let pageOffset;
      pageOffset = ((page - 1) * pageLimit);
      // Give the first 10 data
      pageData = data.data.slice(pageOffset, (pageOffset) + pageLimit);
      return dispatch({type: UPDATE_CURRENT_PAGE_DATA, data: pageData});
    }
  };
};

const getAllReservationData = (page, consumerId = '') => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    return Promise.all([
      dispatch(getReservationCount( consumerId )),
      dispatch(getReservationData(gotPage, consumerId ))
    ]);
  };
};

export default transactionReducer;
export {requestSuccess,
  requestFailed,
  loadCredentials,
  RESET,
  getSecondaryData,
  getReservationData,
  getAllRechargeData,
  getAllReservationData,
  getTransactionCode,
  initialState,
  updatePageData,
  DELETE_CREDIT_AND_UPDATE_DATA,
  UPDATE_CURRENT_PAGE_DATA,
  UPDATE_CURRENT_COUNT,
  UPDATE_CREDIT_DATA,
  checkValidity,
  insertCredits,
  getTransactionByBatch,
  getAllTransactionByBatch,
  getReservedItems,
  getAllCancellationData
};
