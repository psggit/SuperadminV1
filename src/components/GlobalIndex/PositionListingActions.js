import { defaultpositionListingData} from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy, dataUrl } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';


const GENRES_FETCH = 'GLOBALINDEX/GENRES_FETCH';
const SKUS_FETCH = 'GLOBALINDEX/SKUS_FETCH';
const SKUINVENTORIES_FETCH = 'GLOBALINDEX/SKUINVENTORIES_FETCH';
const RETAILERS_FETCH = 'GLOBALINDEX/RETAILERS_FETCH';
const BRANDS_FETCH = 'GLOBALINDEX/BRANDS_FETCH';
const RESET = 'GLOBALINDEX/RESET';


/* ****** Action Creators ******** */
const fetchGenres = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/genre/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, GENRES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchBrands = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRANDS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchSkus = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/sku/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, SKUS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchSkuInventories = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/inventory/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, SKUINVENTORIES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchRetailers = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/retailer/select';
    const queryObj = {};
    queryObj.columns = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, RETAILERS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const globalIndexReducer = (state = defaultpositionListingData, action) => {
  switch (action.type) {
    case GENRES_FETCH:
      return {...state, allGenres: action.data };
    case SKUS_FETCH:
      return {...state, allSkus: action.data };
    case SKUINVENTORIES_FETCH:
      return {...state, allSkuInventories: action.data };
    case RETAILERS_FETCH:
      return {...state, allRetailers: action.data };
    case BRANDS_FETCH:
      return {...state, allBrands: action.data };
    case RESET:
      return defaultpositionListingData;
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchGenres,
  fetchSkus,
  fetchSkuInventories,
  fetchRetailers,
  fetchBrands,
  RESET
};

export default globalIndexReducer;
