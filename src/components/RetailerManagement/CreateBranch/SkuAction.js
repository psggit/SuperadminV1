/* Default State */

// import { addDeviceState, uiState } from './State';

/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

/* Action Constant */

const INITIAL_DATA_FETCHED = '@retailersku/INITIAL_DATA_FETCHED';
const HANDLE_ERROR = '@retailersku/HANDLE_ERROR';

const RESET_BRAND = '@retailersku/RESET_BRAND';

const BRAND_SELECTED = '@retailersku/BRAND_SELECTED';
const SKU_SELECTED = '@retailersku/SKU_SELECTED';
const SKU_UNSELECTED = '@retailersku/SKU_UNSELECTED';

/* End of it */

/* Action Creators */

const fetchBrand = () => {
  return ( dispatch, getState ) => {
    const devUrl = Endpoints.db + '/table/brand/select';
    const currState = getState().branch_data;

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
        }
      }
    };

    if ( 'state_id' in currState.branchData.branchContact ) {
      devObj.where = {
        'skus': {
          'pricings': {
            'state_short_name': currState.genStateData.stateIdMap[currState.branchData.branchContact.state_id]
          }
        }
      };
    }

    const options = {
      ...genOptions,
      body: JSON.stringify(devObj)
    };

    return dispatch( requestAction( devUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

const defaultRetBrandState = {
  'brands': [],
  'skus': {
  },
  'selectedBrandId': 0
};

/* End of it */

/* Reducer */

const retailerBrandReducer = ( state = { ...defaultRetBrandState }, action ) => {
  switch ( action.type ) {
    case INITIAL_DATA_FETCHED:
      return { ...state, brands: action.data };
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
        return { ...state, skus: { ...state.skus, ...{ [action.data]: { ...skuData[0], brand_name: selectedBrand[0].brand_name } } }};
      }
      return { ...state, skus: { ...state.skus, ...{ [action.data]: action.data} }};
    case SKU_UNSELECTED:
      const skus = Object.assign({}, state.skus);
      delete skus[action.data];
      return { ...state, skus: { ...skus} };
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
  RESET_BRAND
};

export default retailerBrandReducer;
