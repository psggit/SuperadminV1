/*
 * Will receive default state from Common
 * */

// import requestAction from '../../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const genOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
  credentials: globalCookiePolicy
};

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Action Creators for ListSku Management Listing */

const getCampaignsCount = ( filterObj, isSearched ) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'campaign' + '/count';
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

const getCampaignData = (page, limit, filterObj, isSearched ) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    offset = (page - 1) * limit;

    const payload = {
      'columns': ['*', {
        'name': 'cashback_promos',
        'columns': ['*', {
          'name': 'skus',
          'columns': ['*', {
            'name': 'sku_pricing',
            'columns': [{
              'name': 'sku',
              'columns': ['volume', {
                'name': 'brand',
                'columns': ['*']
              }]
            }]
          }]
        }]
      }, {
        'name': 'brand_manager',
        'columns': ['email', 'name']
      }],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'campaign' + '/select';
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

const getAllCampaignsData = (page, limit) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch, getState ) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };
    dispatch(getCampaignsCount( filterObj, filterData.isSearched ))
      .then(() => {
        return dispatch(getCampaignData(gotPage, gotLimit, filterObj, filterData.isSearched ));
      })
      .then(() => {
        console.log('ListSku Data fetched');
      });
  };
};

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

export {
  getCampaignData,
  getAllCampaignsData,
  RESET
};