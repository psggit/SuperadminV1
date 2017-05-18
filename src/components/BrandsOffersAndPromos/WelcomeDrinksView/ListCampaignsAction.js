/*
 * Will receive default state from Common
 * */

import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Action Creators for ListSku Management Listing */

const getCampaignsCount = ( filterObj, isSearched ) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };

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
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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
        'name': 'product',
        'columns': ['price',
          'is_active',
          'state_short_name', {
            'name': 'sku',
            'columns': ['volume',
              'is_active', {
                'name': 'brand',
                'columns': ['brand_name',
                  'is_active',
                ]
              }]
          }]
      }],
      limit: limit,
      offset: offset,
      order_by: '-created_at'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'welcome_drink' + '/select';
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
  return (dispatch, getState) => {
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

const toggleStatus = (campaignId, campaignStatus) => {
  return (dispatch, getState) => {
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const url = Endpoints.dataUrl + '/v1/query';
    let _status;
    if (campaignStatus === 'true') {
      _status = false;
    } else {
      _status = true;
    }
    const payload = {};
    payload.type = 'update';
    payload.args = {
      'table': 'welcome_drinks',
      '$set': {'is_active': _status },
      'where': {'id': parseInt(campaignId, 10) }
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    Promise.all([
      dispatch(requestAction(url, options)).then(() => {
        alert('Status changed');
        window.location.reload(); // better way to handle this
      }).catch( (err) => {
        alert('Error: ' + JSON.stringify(err));
      })
    ]);
  };
};

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

export {
  getCampaignData,
  getAllCampaignsData,
  toggleStatus,
  RESET
};
