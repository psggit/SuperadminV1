/* Action, Action Creators, Reducer for State Management */
/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import { defaultStateManagementState } from '../../Common/Actions/DefaultState';
import { validation } from '../../Common/Actions/Validator';
import { deliveryConstraints } from './fetchQueries';
import crypto from 'crypto';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST, REQUEST_COMPLETED, REQUEST_ERROR } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
import beginFilter from '../Common/SearchComponentGen/GenerateFilter';

/* Action Constants */

const RESET = '@delivery_mgt/RESET';

const getAllStateData = (page) => {
  return ( dispatch, getState ) => {
    const gotPage = page;

    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };
    /* Dispatching first one */
    return Promise.all([
      dispatch(getStateCount( filterObj, filterData.isSearched )),
      dispatch(getStateData(gotPage, filterObj, filterData.isSearched ))
    ]);
  };
};

const getStateData = ( page, filterObj, isSearched ) => {
  return (dispatch, getState) => {
    let offset = 0;
    let limit = 0;
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'state' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
    return dispatch( requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getStateCount = ( filterObj, isSearched ) => {
  return (dispatch, getState) => {
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };
    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'state' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
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



const dpReducer = ( state = defaultDpManagementState, action) => {
  let hash = '';
  const listOfValidation = [];
  const valueObj = {};
  switch ( action.type ) {
    case REQUEST_SUCCESS:
      return {...state, results: action.data};
    case RESET:
      return { ...defaultStateManagementState };
    default:
      return { ...state };
  }
};

/* End of reducer */

export {
};

export default dpReducer;
