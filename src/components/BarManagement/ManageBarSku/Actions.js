import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

import requestAction from '../../Common/Actions/requestAction';

import {
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR,
} from '../../Common/Actions/Actions';

/* Fetch Cancel Products */

const getBarSkusCount = ( ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'bars_inventory' + '/count';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    return dispatch(requestAction(url, options, COUNT_FETCHED, REQUEST_ERROR));
  };
};

const getBarSkusData = ( page ) => {
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
  return (dispatch) => {
    return Promise.all([
      dispatch(getBarSkusCount( )),
      dispatch(getBarSkusData(gotPage))
    ]);
  };
};

const toggleBarSkuStatus = ( id, isActive, currPage ) => {
  return ( dispatch ) => {
    console.log(id);
    console.log(dispatch);

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
          dispatch(getAllBarSkusData( currPage ))
        ]);
      }
      alert('Updated Failed');
    });
    // return Promise.resolve();
  };
};

export {
  getAllBarSkusData,
  toggleBarSkuStatus
};
