import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Fetch Cancel Products */

const getBranchCount = ( filterObj, isSearched ) => {
  return (dispatch, getState) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };
    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'retailer' + '/count';
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

const getBranchData = ( page, filterObj, isSearched) => {
  return (dispatch, getState) => {
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
        'name': 'addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }],
      limit: limit,
      offset: offset
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'retailer' + '/select';
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

const toggleRetailerStatus = ( id, isActive, currPage) => {
  return ( dispatch, getState ) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const invUrl = Endpoints.db + '/table/retailer/update';
    const insertObj = {};
    insertObj.values = { 'branch_status': ((isActive === 'true') ? 'false' : 'true')};

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
      dispatch(getBranchData(currPage, filterObj, filterData.isSearched));
      alert('Updated');
    }).catch( (err) => {
      console.log(err);
      alert('Failed');
    });
  };
};

const getAllBranchData = (page ) => {
  const gotPage = page;
  /* Dispatching first one */
  return ( dispatch, getState ) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };
    return Promise.all([
      dispatch(getBranchCount( filterObj, filterData.isSearched )),
      dispatch(getBranchData(gotPage, filterObj, filterData.isSearched))
    ]);
  };
};

export {
  toggleRetailerStatus,
  getAllBranchData
};
