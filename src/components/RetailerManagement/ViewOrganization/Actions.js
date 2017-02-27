import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';


import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Fetch Cancel Products */

const getOrganizationCount = ( filterObj, isSearched ) => {
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

    const url = Endpoints.db + '/table/' + 'organisation' + '/count';
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

const getOrganizationData = ( page, filterObj, isSearched) => {
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
        'name': 'contact_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'registered_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'retailers',
        'columns': ['id']
      }, {
        'name': 'bars',
        'columns': ['id']
      }],
      limit: limit,
      offset: offset
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'organisation' + '/select';

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

const getAllOrganizationData = (page ) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch, getState ) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };

    return Promise.all([
      dispatch(getOrganizationCount( filterObj, filterData.isSearched )),
      dispatch(getOrganizationData(gotPage, filterObj, filterData.isSearched))
    ]);
  };
};

export {
  getAllOrganizationData
};
