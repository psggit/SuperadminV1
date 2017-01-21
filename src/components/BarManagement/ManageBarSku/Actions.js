import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';

/* Fetch Cancel Products */

/* Action constants */

const BAR_SKU_FETCHED = '@barAllSku/BAR_SKU_FETCHED';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* */

const getBarSkusCount = ( filterObj, isSearched ) => {
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

    const url = Endpoints.db + '/table/' + 'bars_inventory' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getBarSkusData = ( page, filterObj, isSearched) => {
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
      columns: [ '*', {
        'name': 'sku_pricing',
        'columns': [ {
          'name': 'sku',
          'columns': ['volume', {
            'name': 'brand',
            'columns': [
              'brand_name'
            ]
          }]
        }]
      }, {
        'name': 'bar',
        'columns': ['*']
      }],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'bars_inventory' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getAllBarSkusData = (page ) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch, getState) => {
    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };

    return Promise.all([
      dispatch(getBarSkusCount( filterObj, filterData.isSearched )),
      dispatch(getBarSkusData(gotPage, filterObj, filterData.isSearched))
    ]);
  };
};


const getBarSkuReservations = () => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/bar_reserved_items/select';
    const filterObj = {
      'columns': ['*']
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(filterObj)
    };
    return dispatch( requestAction( barUrl, options, BAR_SKU_FETCHED ) )
    .catch( () => {
      alert('Error While fetching BAR SKU');
      return Promise.reject();
    });
  };
};

const toggleBarSkuStatus = ( id, isActive, currPage, pricingId, barId ) => {
  return ( dispatch, getState ) => {
    const currState = getState().all_bar_skus;

    const uniqueIdentifier = pricingId + '@' + barId;

    if ( uniqueIdentifier in currState.barSKUs ) {
      const resp = confirm('It will cancel ' + currState.barSKUs[uniqueIdentifier].length + ' open reservations');
      if ( ! resp ) {
        return Promise.reject();
      }
    }

    const cancelReservations = ( items ) => {
      const cancelUrl = Endpoints.blogicUrl + '/admin/cancel/bar';
      const reservationObjs = {};
      reservationObjs.itemId = items;
      const options = {
        ...genOptions,
        body: JSON.stringify(reservationObjs),
        method: 'PUT'
      };
      return (requestAction(cancelUrl, options ));
    };

    const invUrl = Endpoints.db + '/table/bars_inventory/update';

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
      if ( resp.returning.length > 0 ) {
        alert('Updated');
        return Promise.all([
          ( !isActive === false && currState.barSKUs[uniqueIdentifier] ) ?
          dispatch(cancelReservations(currState.barSKUs[uniqueIdentifier])) : Promise.resolve(1),
          dispatch(getAllBarSkusData( currPage ))
        ]);
      }
      alert('Updated Failed');
    });
    // return Promise.resolve();
  };
};

/* Default State */

const defaultAllBarSku = {
  barSKUs: {}
};

/* */

const barAllSkuReducer = ( state = defaultAllBarSku, action ) => {
  switch ( action.type ) {
    case BAR_SKU_FETCHED:
      const barSKUs = {};
      action.data.forEach( ( data ) => {
        if ( ( data.sku_pricing_id + '@' + data.bar_id ) in barSKUs ) {
          barSKUs[ data.sku_pricing_id + '@' + data.bar_id ].push(data.item_id);
        } else {
          barSKUs[data.sku_pricing_id + '@' + data.bar_id] = [];
          barSKUs[data.sku_pricing_id + '@' + data.bar_id].push(data.item_id);
        }
      });
      return { ...state, barSKUs: { ...barSKUs }};
    default:
      return { ...state };
  }
};

export default barAllSkuReducer;

export {
  getAllBarSkusData,
  toggleBarSkuStatus,
  getBarSkuReservations
};
