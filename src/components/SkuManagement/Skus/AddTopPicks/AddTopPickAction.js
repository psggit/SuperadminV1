/*
 * Will receive default state from Common
 * */

import { defaultAddTopPickData } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';

import indexBrand from '../../../Common/Actions/indexBrand';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const BRAND_DATA_FETCHED = '@addtoppick/BRAND_DATA_FETCHED';
const BRAND_CHANGED = '@addtoppick/BRAND_CHANGED';
const SKU_PRICING_CHANGED = '@addtoppick/SKU_PRICING_CHANGED';
const CLEAR_SELECTED_SKU_PRICING = '@addtoppick/CLEAR_SELECTED_SKU_PRICING';

const ERROR_WHILE_FETCHING = '@addtoppick/ERROR_WHILE_FETCHING';
const ERROR_MESSAGE = '@addtoppick/ERROR_MESSAGE';

const RESET = '@addtoppick/RESET';

/* End of it */
/* ****** Action Creators ******** */

const getBrandSKUData = (genreId, stateId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    const payload = {
      'columns': ['brand_name', 'id', {
        'name': 'skus',
        'columns': [
          'id', 'volume', {
            'name': 'pricings',
            'columns': ['id', 'state_id'],
            'where': {
              'state_id': parseInt(stateId, 10),
              'is_top': false
            }
          }
        ]
      }],
      'where': {
        'skus': {
          'pricings': {
            'state_id': {
              '$eq': parseInt(stateId, 10)
            },
            'is_top': false
          }
        },
        'genre_id': parseInt(genreId, 10)
      }
    };

    const url = Endpoints.db + '/table/' + 'brand' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, BRAND_DATA_FETCHED, ERROR_WHILE_FETCHING));
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
  };
};

const addTopPickBackend = () => {
  return (dispatch, getState) => {
    dispatch({ type: MAKE_REQUEST});
    const currentSelectedSKU = getState().add_top_picks_data.skuPricingId;
    const genreData = getState().sku_top_picks_state_genre_data;

    if (!currentSelectedSKU) {
      alert('Please select a valid SKU');
      dispatch({ type: REQUEST_COMPLETED});
      return dispatch({ type: ERROR_MESSAGE});
    }

    const brandId = getState().add_top_picks_data.selectedBrand.id;
    const updateObj = {};
    updateObj.values = {
      'is_top': true
    };
    updateObj.where = {
      'id': currentSelectedSKU
    };
    updateObj.returning = ['id'];

    let url = Endpoints.db + '/table/' + 'sku_pricing' + '/update';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj),
    };
    return dispatch(requestAction(url, options))
      .then( (resp) => {
        if (resp.returning.length > 0) {
          url = Endpoints.db + '/table/' + 'brand_listing' + '/update';
          const updateObjBrandListing = {};
          updateObjBrandListing.values = {
            'is_top_pick': true
          };
          updateObjBrandListing.where = {
            'brand_id': brandId,
            'state_id': genreData.stateId
          };
          updateObjBrandListing.returning = ['id'];
          options.body = JSON.stringify(updateObjBrandListing);
          return dispatch(requestAction(url, options));
        }
        throw Error('Sorry couldnt update top pick');
      })
      .then( ( resp ) => {
        if (resp.returning.length > 0) {
          alert('successfully added top pick');
          /* Will index the brand */
          dispatch(indexBrand(brandId));
          /* */
          return dispatch(routeActions.push('/hadmin/skus/top_picks/' + genreData.stateId + '/' + genreData.genreId));
        }
        throw Error('Sorry couldnt update top pick');
      })
      .catch( (message) => {
        alert('Error: ' + message);
      });
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
  };
};

const skuAddTopPicksReducer = (state = defaultAddTopPickData, action) => {
  switch (action.type) {
    case BRAND_DATA_FETCHED:
      return {...state, brandList: action.data };
    case BRAND_CHANGED:
      const selectedBrand = state.brandList.filter( ( brand ) => {
        return ( brand.id === action.data );
      });
      if ( selectedBrand.length === 0) {
        alert('Selected brand doesnt exist');
        return { ...state, selectedBrand: {}};
      }
      return {...state, selectedBrand: selectedBrand[0], skuPricingId: 0};
    case SKU_PRICING_CHANGED:
      return { ...state, skuPricingId: action.data };
    case CLEAR_SELECTED_SKU_PRICING:
      return { ...state, skuPricingId: 0};
    case ERROR_WHILE_FETCHING:
      alert('Error while fetching brand data, please contact the administrator');
      return { ...state };

    case ERROR_MESSAGE:
      return { ...state };
    case RESET:
      return { ...defaultAddTopPickData };
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getBrandSKUData,
  RESET,
  BRAND_CHANGED,
  SKU_PRICING_CHANGED,
  CLEAR_SELECTED_SKU_PRICING,
  addTopPickBackend
};

export default skuAddTopPicksReducer;
