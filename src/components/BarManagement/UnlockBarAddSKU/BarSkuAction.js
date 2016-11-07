import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
// import { routeActions } from 'redux-simple-router';
// // //
import Endpoints from '../../../Endpoints';

/* Action constants */

const RESET_BAR_SKU = '@barSkuDataReducer/RESET_BAR_SKU';
// const INITIAL_DATA_FETCHED = '@barSkuDataReducer/INITIAL_DATA_FETCHED';
const BAR_INFO_FETCHED = '@barSkuDataReducer/BAR_INFO_FETCHED';
const SKU_FETCHED = '@barSkuDataReducer/SKU_FETCHED';

const TOGGLE_SKU_DIV = '@barSkuDataReducer/TOGGLE_SKU_DIV';

const INPUT_VALUE_CHANGED = '@barSkuDataReducer/INPUT_VALUE_CHANGED';

const VIEW_SKU = '@barSkuDataReducer/VIEW_SKU';

const CANCEL_SKU = '@barSkuDataReducer/CANCEL_SKU';

const CLEAR_SKU = '@barSkuDataReducer/CLEAR_SKU';


/* End of it */

/* Action creators */

const getSkus = ( cityId ) => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/sku_pricing/select';

    const selectObj = {};
    selectObj.columns = ['*', {
      'name': 'sku',
      'columns': ['*', {
        'name': 'brand',
        'columns': ['*']
      }]
    }];

    selectObj.where = {
      'state_short': {
        'cities': {
          'id': parseInt(cityId, 10)
        }
      },
      'is_active': true
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(selectObj)
    };

    return dispatch( requestAction( barUrl, options, SKU_FETCHED ) )
    .catch( () => {
      alert('Error While fetching organisation');
      return Promise.reject();
    });
    // return Promise.resolve();
  };
};

const getBar = ( barId ) => {
  return ( dispatch ) => {
    const barUrl = Endpoints.db + '/table/bars/select';

    const selectObj = {};
    selectObj.columns = ['*', {
      'name': 'inventories',
      'columns': ['*', {
        'name': 'sku_pricing',
        'columns': [{
          'name': 'sku',
          'columns': ['volume', {
            'name': 'brand',
            'columns': ['brand_name']
          }]
        }]
      }]
    }, {
      'name': 'addresses',
      'columns': ['*'],
      'order_by': '-created_at',
      'limit': 1
    }, {
      'name': 'city',
      'columns': ['*']
    }];

    selectObj.where = {
      'id': parseInt(barId, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(selectObj)
    };

    return dispatch( requestAction( barUrl, options, BAR_INFO_FETCHED) )
    .then( ( resp ) => {
      dispatch(getSkus( resp[0].city_id ));
    })
    .catch( () => {
      alert('Error While fetching organisation');
      return Promise.reject();
    });
    // return Promise.resolve();
  };
};

const fetchInitials = (barId) => {
  return ( dispatch ) => {
    return dispatch(getBar(barId));
    // return Promise.resolve();
  };
};

/* Saving */

const saveSku = ( barId ) => {
  return ( dispatch, getState ) => {
    const invUrl = Endpoints.db + '/table/bars_inventory/insert';

    const barState = getState().bar_sku_create_data;
    const barDataObj = {
      ...barState.newSkuData,
      bar_id: parseInt(barId, 10)
    };

    const brInsertCheck = [
      'listingOrder',
      'sku_pricing_id',
      'quantity',
      'hipbarPrice',
      'menuPrice'
    ];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar are mandatory');
      return Promise.reject({ stage: 0 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...barDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( invUrl, options ) )
    .then( ( ) => {
      return Promise.all([
        dispatch({ type: CLEAR_SKU }),
        dispatch({ type: TOGGLE_SKU_DIV }),
        dispatch(getBar( barId ))
      ]);
    });
    // return Promise.resolve();
  };
};
const updateSku = ( barId ) => {
  return ( dispatch, getState ) => {
    const invUrl = Endpoints.db + '/table/bars_inventory/update';

    const barState = getState().bar_sku_create_data;
    const barDataObj = {
      ...barState.newSkuData,
      bar_id: parseInt(barId, 10)
    };

    const brInsertCheck = [
      'listingOrder',
      'sku_pricing_id',
      'quantity',
      'hipbarPrice',
      'menuPrice'
    ];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar are mandatory');
      return Promise.reject({ stage: 0 });
    }

    const insertObj = {};
    insertObj.values = { ...barDataObj };

    /* removing excess info */
    delete insertObj.values.sku_pricing_id;
    delete insertObj.values.bar_id;
    delete insertObj.values.id;
    delete insertObj.values.sku_pricing;

    insertObj.returning = ['id'];
    insertObj.where = {
      'id': parseInt(barState.inventoryId, 10)
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
          dispatch({ type: CANCEL_SKU}),
          dispatch(getBar( barId ))
        ]);
      }
      alert('Updated Failed');
    });
    // return Promise.resolve();
  };
};

/* End of it */

/* Default State */

const defaultBarSkuState = {
  barData: [],
  skuData: [],
  showSku: false,
  barCityInfo: {},
  newSkuData: {
    sku_pricing_id: 0,
    hipbarPrice: 0,
    menuPrice: 0,
    is_active: 0,
    listingOrder: 0,
    quantity: 0,
  },
  addedInventory: [],
  inventoryMap: {},
  inventoryId: 0,
  isEdit: false
};

/* End of it */

/* Reducers */

const barSkuDataReducer = ( state = defaultBarSkuState, action ) => {
  switch ( action.type ) {
    case BAR_INFO_FETCHED:
      const pricingIds = [];

      const inventoryItems = {};

      action.data[0].inventories.forEach( ( sku ) => {
        pricingIds.push(sku.sku_pricing_id);
      });

      action.data[0].inventories.forEach( ( sku ) => {
        inventoryItems[sku.sku_pricing_id] = sku;
      });
      return { ...state, barData: action.data, barCity: action.data[0].city_id, barCityInfo: action.data[0].city, addedInventory: [ ...pricingIds ], inventoryMap: { ...inventoryItems }};
    case SKU_FETCHED:
      return { ...state, skuData: action.data };
    case VIEW_SKU:
      return { ...state, newSkuData: { ...state.inventoryMap[action.data] }, isEdit: true, inventoryId: state.inventoryMap[action.data].id, showSku: true };
    case TOGGLE_SKU_DIV:
      return { ...state, showSku: !state.showSku };
    case INPUT_VALUE_CHANGED:
      const brandSKUINFO = {};
      brandSKUINFO[action.data.key] = action.data.value;
      return { ...state, newSkuData: { ...state.newSkuData, ...brandSKUINFO}};
    case CLEAR_SKU:
      return { ...state, newSkuData: {} };
    case CANCEL_SKU:
      return { ...state, newSkuData: {}, showSku: false, inventoryId: 0, isEdit: false };
    case RESET_BAR_SKU:
      return { ...defaultBarSkuState };
    default:
      return { ...state };
  }
};

export default barSkuDataReducer;

export {
  RESET_BAR_SKU,
  fetchInitials,
  TOGGLE_SKU_DIV,
  INPUT_VALUE_CHANGED,
  saveSku,
  updateSku,
  VIEW_SKU,
  CANCEL_SKU
};