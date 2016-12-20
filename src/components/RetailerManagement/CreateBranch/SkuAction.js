/* Default State */

// import { addDeviceState, uiState } from './State';

/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

/* Action Constant */

const INITIAL_DATA_FETCHED = '@retailersku/INITIAL_DATA_FETCHED';
const INVENTORY_FETCHED = '@retailersku/INVENTORY_FETCHED';

const HANDLE_ERROR = '@retailersku/HANDLE_ERROR';

const RESET_BRAND = '@retailersku/RESET_BRAND';

const BRAND_SELECTED = '@retailersku/BRAND_SELECTED';
const SKU_SELECTED = '@retailersku/SKU_SELECTED';
const SKU_UNSELECTED = '@retailersku/SKU_UNSELECTED';

const TOGGLE_SKU_VISIBILITY = '@retailersku/TOGGLE_SKU_VISIBILITY';

const SKU_SAVE_LOCAL = '@retailersku/SKU_SAVE_LOCAL';
const SKU_DELETE_LOCAL = '@retailersku/SKU_DELETE_LOCAL';
const SKU_CLEAR_LOCAL = '@retailersku/SKU_CLEAR_LOCAL';

/* End of it */

/* Action Creators */

const fetchBrand = ( skuPricingIds ) => {
  return ( dispatch ) => {
    console.log('ello');
    const devUrl = Endpoints.db + '/table/brand/select';

    const devObj = {
      'columns': ['id', 'brand_name', {
        'name': 'skus',
        'columns': [
          'volume', 'id', {
            'name': 'pricings',
            'columns': ['*']
          }
        ]
      }]
    };

    devObj.where = {
      'skus': {
        'id': {
          '$gt': 0
        },
        'pricings': {
          'id': {
            '$gt': 0
          }
        }
      }
    };

    console.log('skuPricingIds');
    console.log(skuPricingIds);
    /*
    if ( skuPricingIds ) {
      devObj.where.skus = {
        ...devObj.where.skus,
        pricings: {
          $and: [
            {
              id: {
                $nin: skuPricingIds
              }
            },
            {
              ...devObj.where.skus.pricings,
            }
          ]
        }
      };

      // devObj.where.skus.pricings.id.$nin = [ ...skuPricingIds ];
      console.log('i am getting executed');
    }
    */

    const options = {
      ...genOptions,
      body: JSON.stringify(devObj)
    };

    return dispatch( requestAction( devUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

const fetchSKUs = ( retailerId ) => {
  return ( dispatch ) => {
    const devUrl = Endpoints.db + '/table/inventory/select';

    const devObj = {
      'columns': ['*', {
        'name': 'sku_pricing',
        'columns': [ {
          'name': 'sku',
          'columns': [
            '*.*'
          ]}
        ]
      }]
    };

    devObj.where = {
      'retailer_id': parseInt(retailerId, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(devObj)
    };

    return dispatch( requestAction( devUrl, options, INVENTORY_FETCHED, HANDLE_ERROR ) )
    .then( ( resp ) => {
      const skuPricingIds = [];
      resp.forEach( ( r ) => {
        skuPricingIds.push(r.sku_pricing_id);
      });
      console.log('skuPricingIds Inside Reduc');
      console.log(skuPricingIds);
      return dispatch( fetchBrand(skuPricingIds));
    });
  };
};

const disableSKUs = ( skuId ) => {
  return ( dispatch, getState ) => {
    const devUrl = Endpoints.db + '/table/inventory/update';

    const branchState = getState().branch_data.branchData;

    const brId = branchState.branchData.id;

    const insertObj = {};

    insertObj.where = {
      'retailer_id': parseInt(brId, 10),
      'sku_pricing': {
        'sku_id': {
          '$eq': skuId
        }
      }
    };

    insertObj.values = { is_active: false };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify( insertObj )
    };

    return dispatch( requestAction( devUrl, options ) )
    .then( () => {
      alert('Sku Deleted');
      return dispatch( fetchSKUs(brId) );
    });
  };
};

const enableSKUs = ( skuId ) => {
  return ( dispatch, getState ) => {
    const devUrl = Endpoints.db + '/table/inventory/update';

    const branchState = getState().branch_data.branchData;

    const brId = branchState.branchData.id;

    const insertObj = {};

    insertObj.where = {
      'retailer_id': parseInt(brId, 10),
      'sku_pricing': {
        'sku_id': {
          '$eq': skuId
        }
      }
    };

    insertObj.values = { is_active: true };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify( insertObj )
    };

    return dispatch( requestAction( devUrl, options ) )
    .then( () => {
      alert('Sku Activated');
      return dispatch( fetchSKUs(brId) );
    });
  };
};

const defaultRetBrandState = {
  'brands': [],
  'unsavedSkus': {
  },
  'skus': {
  },
  'isSkuActive': false,
  'serverSkus': {
  },
  'inactiveSkus': {
  },
  'selectedBrandId': 0
};

/* End of it */

/* Reducer */

const retailerBrandReducer = ( state = { ...defaultRetBrandState }, action ) => {
  let serverSKUs = {};
  let skuObj = {};
  let unsavedSkus = {};
  let inactiveSkus = {};
  switch ( action.type ) {
    case INITIAL_DATA_FETCHED:
      return { ...state, brands: action.data };
    case INVENTORY_FETCHED:
      serverSKUs = {};
      inactiveSkus = {};
      action.data.forEach( ( dat ) => {
        if ( dat.is_active ) {
          serverSKUs[dat.sku_pricing.sku.id] = dat.sku_pricing.sku;
          serverSKUs[dat.sku_pricing.sku.id].brand_name = dat.sku_pricing.sku.brand.brand_name;
          serverSKUs[dat.sku_pricing.sku.id].inventory_status_name = dat.inventory_status_name;
        } else {
          inactiveSkus[dat.sku_pricing.sku.id] = dat.sku_pricing.sku;
          inactiveSkus[dat.sku_pricing.sku.id].brand_name = dat.sku_pricing.sku.brand.brand_name;
          inactiveSkus[dat.sku_pricing.sku.id].inventory_status_name = dat.inventory_status_name;
        }
      });
      return { ...state, serverSkus: { ...serverSKUs }, inactiveSkus: { ...inactiveSkus }};
    case HANDLE_ERROR:
      return { ...state };
    case RESET_BRAND:
      return { ...defaultRetBrandState };
    case BRAND_SELECTED:
      return { ...state, selectedBrandId: action.data };
    case SKU_SELECTED:
      const selectedBrand = state.brands.filter( ( brand ) => {
        return ( brand.id === state.selectedBrandId );
      });
      let skuData = {};
      if ( selectedBrand.length > 0 ) {
        skuData = selectedBrand[0].skus.filter( ( sku ) => {
          return ( sku.id === action.data );
        });
        return { ...state, unsavedSkus: { ...state.unsavedSkus, ...{ [action.data]: { ...skuData[0], brand_name: selectedBrand[0].brand_name } } }};
      }
      return { ...state, unsavedSkus: { ...state.unsavedSkus, ...{ [action.data]: action.data} }};

    case SKU_UNSELECTED:
      unsavedSkus = Object.assign({}, state.unsavedSkus);
      delete unsavedSkus[action.data];
      return { ...state, unsavedSkus: { ...unsavedSkus } };

    case SKU_DELETE_LOCAL:
      skuObj = Object.assign({}, state.skus);
      delete skuObj[action.data];
      unsavedSkus = Object.assign({}, state.unsavedSkus);
      delete unsavedSkus[action.data];
      return { ...state, skus: { ...skuObj }, unsavedSkus: { ...unsavedSkus }};

    case SKU_SAVE_LOCAL:
      skuObj = Object.assign({}, state.unsavedSkus );
      return { ...state, skus: { ...skuObj }, isSkuActive: false, selectedBrandId: 0};

    case SKU_CLEAR_LOCAL:
      return { ...state, unsavedSkus: {}, isSkuActive: false, selectedBrandId: 0};

    case TOGGLE_SKU_VISIBILITY:
      return { ...state, isSkuActive: !state.isSkuActive };
    default:
      return { ...state };
  }
};

/* End of it */

export {
  fetchBrand,
  BRAND_SELECTED,
  SKU_SELECTED,
  SKU_UNSELECTED,
  RESET_BRAND,
  TOGGLE_SKU_VISIBILITY,
  SKU_DELETE_LOCAL,
  SKU_SAVE_LOCAL,
  SKU_CLEAR_LOCAL,
  fetchSKUs,
  disableSKUs,
  enableSKUs
};

export default retailerBrandReducer;
