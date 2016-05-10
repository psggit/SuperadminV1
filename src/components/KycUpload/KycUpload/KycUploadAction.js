/*
 * Will receive default state from Common
 * */

// import { defaultNotepadState } from '../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR } from '../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

// const NOTEPAD_FETCH_ISSUE_SUCCESS = 'NOTEPAD/NOTEPAD_FETCH_ISSUE_SUCCESS';

/* ****** Action Creators ******** */

const fetchConsumerCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['id']
    };
    payload.where = {
      'status': 'open'
    };
    const url = Endpoints.db + '/table/' + 'consumer_kyc' + '/count';
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
                     return dispatch({type: COUNT_FETCHED, data: d});
                   },
                   () => {
                     return dispatch({type: REQUEST_ERROR, data: ('Error. Try again!')});
                   }
                 );
               } else {
                 return dispatch({type: REQUEST_ERROR, data: ('Error. Try again!')});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: ('Error. Try again!')});
             });
  };
};

const fetchConsumer = (page) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/consumer_kyc/select';
    const queryObj = {};

    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    queryObj.columns = [
      {
        'name': 'consumer',
        'columns': ['*']
      }
    ];
    queryObj.where = {
      'status': 'open'
    };
    queryObj.limit = limit;
    queryObj.offset = offset;
    queryObj.order_by = '+consumer.id';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

/* No Reducer Here */

/* ****************** END OF REDUCER ************************** */

export {
  fetchConsumer,
  fetchConsumerCount
};
// export default notepadReducer;
