/*
 * Will receive default state from Common
 * */

import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import {
  REQUEST_ERROR
} from '../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const BAR_SKU_COMPANY_FETCH = 'BAR_SKU/BAR_SKU_COMPANY_FETCH';
const BAR_SKU_BRAND_FETCH = 'BAR_SKU/BAR_SKU_BRAND_FETCH';
const BAR_SKU_SKU_FETCH = 'BAR_SKU/BAR_SKU_SKU_FETCH';

const INPUT_VALUE_CHANGED = 'BAR_SKU/INPUT_VALUE_CHANGED';
const RESET_BAR_SKU = 'BAR_SKU/RESET_BAR_SKU';

/* End of it */

/* ****** Action Creators ******** */

const fetchCompany = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/company/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch(requestAction(url, options, BAR_SKU_COMPANY_FETCH, REQUEST_ERROR));
  };
};

const fetchBrand = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'is_active': true
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch(requestAction(url, options, BAR_SKU_BRAND_FETCH, REQUEST_ERROR));
  };
};

const fetchSkus = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/sku/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    dispatch(requestAction(url, options, BAR_SKU_SKU_FETCH, REQUEST_ERROR));
  };
};

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const defaultBarSkuState = {
  companyList: [],
  brandList: [],
  skuList: [],
  companyId: 0,
  brandId: 0,
  skuId: 0
};

const barSkuReducer = (state = defaultBarSkuState, action) => {
  switch (action.type) {
    case BAR_SKU_COMPANY_FETCH:
      return {...state, companyList: action.data};
    case BAR_SKU_BRAND_FETCH:
      return {...state, brandList: action.data};
    case BAR_SKU_SKU_FETCH:
      return {...state, skuList: action.data};
    case INPUT_VALUE_CHANGED:
      const brandSKUINFO = {};
      brandSKUINFO[action.data.key] = action.data.value;
      return { ...state, ...brandSKUINFO};
    case RESET_BAR_SKU:
      return { ...defaultBarSkuState };
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCompany,
  fetchBrand,
  fetchSkus,
  RESET_BAR_SKU,
  INPUT_VALUE_CHANGED
};
export default barSkuReducer;
