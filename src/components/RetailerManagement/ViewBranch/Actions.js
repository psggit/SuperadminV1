import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Fetch Cancel Products */

const getBranchCount = ( filterObj, isSearched ) => {
  return (dispatch) => {
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
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getBranchData = ( page, filterObj, isSearched) => {
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
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
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
  getAllBranchData
};
