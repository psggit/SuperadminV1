// TODO: Alerting user when deactivating convenience fee is availed on Reserved Products
import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import requestAction from '../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../Common/Actions/Actions';

/* Action constants */

const CONVENIENCE_FEE_FETCHED = '@convenience_fee_list/CONVENIENCE_FEE_FETCHED';

import beginFilter from '../Common/SearchComponentGen/GenerateFilter';

/* */

const getConvenienceFeeCount = ( filterObj, isSearched ) => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['*']
    };
    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'consumer_service_charge' + '/count';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getConvenienceFee = ( page, filterObj, isSearched) => {
  return (dispatch, getState) => {
    let offset = 0;
    let limit = 0;
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      imit: limit,
      offset: offset,
      order_by: '-valid_from'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'consumer_service_charge' + '/select';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getAllConvenienceFeeData = (page) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch, getState) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };

    return Promise.all([
      dispatch(getConvenienceFeeCount( filterObj, filterData.isSearched )),
      dispatch(getConvenienceFee(gotPage, filterObj, filterData.isSearched))
    ]);
  };
};


const toggleConvenienceStatus = ( id, isActive, currPage) => {
  return ( dispatch, getState ) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };

    const invUrl = Endpoints.db + '/table/consumer_service_charge/update';

    const insertObj = {};
    insertObj.values = { 'is_active': !isActive };

    insertObj.returning = ['id'];
    insertObj.where = {
      'id': parseInt(id, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( invUrl, options ) )
    .then( ( resp ) => {
      console.log(resp);
      const filterData = getState().gen_filter_data;
      const filterObj = { ...beginFilter(getState) };
      dispatch(getConvenienceFee(currPage, filterObj, filterData.isSearched));
      alert('Updated');
    }).catch( (err) => {
      console.log(err);
      alert('Failed');
    });
  };
};

/* Default State */

const defaultConvenienceFeeList = {
  convenienceFees: {}
};

/* */

const convenienceFeeReducer = ( state = defaultConvenienceFeeList, action ) => {
  switch ( action.type ) {
    case CONVENIENCE_FEE_FETCHED:
      return { ...state, convenienceFees: action.data};
    default:
      return { ...state };
  }
};

export default convenienceFeeReducer;

export {
  getAllConvenienceFeeData,
  getConvenienceFee,
  toggleConvenienceStatus
};
