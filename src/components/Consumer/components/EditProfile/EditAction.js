/*
 * Will receive default state from Common
 * */

import { defaultConsumerState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../../../Common/Actions/Actions';

// ,
import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const USER_DATA_FETCH = 'CONSUMER/USER_DATA_FETCH';
const UPDATE_USER_NAME = 'CONSUMER/UPDATE_USER_NAME';
const UPDATE_DOB = 'CONSUMER/UPDATE_DOB';

const genOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
  credentials: globalCookiePolicy
};

/* ****** Action Creators ******** */

const getConsumerData = (userId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //

    const payload = {};
    payload.columns = ['full_name', 'dob', 'gender'];
    payload.where = {
      'id': userId
    };

    const url = Endpoints.db + '/table/' + 'consumer' + '/select';

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
                     return dispatch({type: USER_DATA_FETCH, data: d});
                   },
                   () => {
                     return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
                   }
                 );
               } else {
                 return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
             });
  };
};

const updateName = (data) => {
  return (dispatch) => {
    return dispatch({type: UPDATE_USER_NAME, data: data});
  };
};

const updateDob = (data) => {
  return (dispatch) => {
    return dispatch({type: UPDATE_DOB, data: data});
  };
};

const updateUser = (userObj, userId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/consumer/update';

    const options = {
      ...genOptions,
      body: JSON.stringify(userObj)
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.returning.length > 0) {
          console.log(resp);
          alert('User Entry Updated');
          dispatch(routeActions.push('/hadmin/consumer/profile/' + userId));
        }
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a notepad entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* End of it */

/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const consumerReducer = (state = defaultConsumerState, action) => {
  switch (action.type) {
    case USER_DATA_FETCH:
      return {...state, userData: action.data};
    case UPDATE_USER_NAME:
      return {...state, userData: [{...state.userData[0], 'full_name': action.data}]};
    case UPDATE_DOB:
      return {...state, userData: [{...state.userData[0], 'dob': action.data}]};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getConsumerData,
  updateName,
  updateDob,
  updateUser
};
export default consumerReducer;
