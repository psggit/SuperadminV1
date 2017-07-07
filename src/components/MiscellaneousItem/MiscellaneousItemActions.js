/*
 * Will receive default state from Common
 */

import { defaultmiscItem } from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';

// import commonReducer from '../Common/Actions/CommonReducer';

const CITIES_FETCH = 'WELCOME_DRINKS/CITIES_FETCH';
const BRANDS_FETCH = 'WELCOME_DRINKS/BRANDS_FETCH';
const SKU_FETCH = 'WELCOME_DRINKS/SKU_FETCH';
const PRODUCTS_FETCH = 'WELCOME_DRINKS/PRODUCTS_FETCH';
const CITY_SELECT = 'WELCOME_DRINKS/CITY_SELECT';
const AD_INFO = 'WELCOME_DRINKS/AD_INFO';
const CITIES_VIEW = 'WELCOME_DRINKS/CITIES_VIEW';

const IMAGE_UPLOAD_SUCCESS = 'MISCELLANEOUS_ITEM/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'MISCELLANEOUS_ITEM/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'MISCELLANEOUS_ITEM/IMAGE_CANCEL';

const UPDATED_CITIES_SELECTION = 'WELCOME_DRINKS/UPDATED_CITIES_SELECTION';
const RESET = 'WELCOME_DRINKS/RESET';
const DEFINE_CREATE_PAGE = 'MISCELLANEOUS_ITEM/CREATE';
const DEFINE_UPDATE_PAGE = 'MISCELLANEOUS_ITEM/UPDATE';
const DEFINE_CREATE_PAGE_FOR_BAR = 'MISCELLANEOUS_ITEM/CREATE_PAGE_FOR_BAR';
const MISCELLANEOUS_INSERTED = 'MISCELLANEOUS_ITEM/INSERTED';
const MISCELLANEOUS_UPDATED = 'MISCELANEOUS_ITEM/UPDATED';
const MISCELLANEOUS_FETCH = 'MISCELLANEOUS_ITEM/FETCH';
const BARS_FETCH = 'MISCELLANEOUS_ITEM/BARS_FETCH';

/* ****** Action Creators ******** */

const fetchBar = (id) => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/bars/select';
    const queryObj = {columns: ['name']};
    queryObj.where = {'id': parseInt(id, 10)};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BARS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchMisc = (id) => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/miscellaneous_item/select';
    const queryObj = {columns: ['*']};
    queryObj.where = {'id': parseInt(id, 10)};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, MISCELLANEOUS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Define Page(Update, Create (or) Create For Bar)
const definePage = (barId, miscId) => {
  return (dispatch) => {
    if (barId === undefined && miscId === undefined) {
      // Create
      dispatch({type: DEFINE_CREATE_PAGE, data: {barId: barId, miscId: miscId}});
    }
    if (barId !== undefined && miscId === undefined) {
      // Create For Bar
      dispatch({type: DEFINE_CREATE_PAGE_FOR_BAR, data: {barId: barId, miscId: miscId}});
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(fetchBar(barId)),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
    if (barId === undefined && miscId !== undefined) {
      // Update
      dispatch({type: DEFINE_UPDATE_PAGE, data: {barId: barId, miscId: miscId}});
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(fetchMisc(miscId)),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
  };
};

// Reacts to how to divert page on success
const proceed = () => {
  return (dispatch, getState) => {
    const state = getState().miscellaneousItemState.page;
    const mid = getState().miscellaneousItemState.id;
    const proceedVal = getState().miscellaneousItemState.proceed;
    if (proceedVal && (state === 'create')) {
    //  return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update'));
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/list'));
    }
    if (proceedVal && (state === 'update')) {
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update'));
    }
    if (proceedVal && (state === 'create for bar')) {
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update/bar'));
    }
  };
};


const insertMiscellaneous = () => {
  return (dispatch, getState) => {
    const miscState = getState().miscellaneousItemState.detail;
    miscState.is_deleted = false;
    const url = Endpoints.db + '/table/miscellaneous_item/insert';
    const queryObj = {objects: [miscState]};
    queryObj.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, MISCELLANEOUS_INSERTED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]).then([
      alert('Miscellaneous Item Inserted'),
      dispatch(proceed())
    ]);
  };
};

const updateMiscellaneous = () => {
  return (dispatch, getState) => {
    const miscState = getState().miscellaneousItemState.detail;
    const url = Endpoints.db + '/table/miscellaneous_item/update';
    const queryObj = {'$set': miscState};
    queryObj.where = {'id': parseInt(miscState.id, 10)};
    queryObj.returning = ['id'];
    delete queryObj.$set.id;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, MISCELLANEOUS_UPDATED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]).then([
      alert('Miscellaneous Item Updated'),
      dispatch(proceed())
    ]);
  };
};

const fetchBrands = (state) => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/sku_pricing_detail/select';
    const queryObj = {};
    queryObj.columns = ['brand_name', 'brand_id'];
    queryObj.where = {'state': state};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRANDS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchSKU = (id) => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/sku/select';
    const queryObj = {};
    queryObj.columns = ['volume', 'is_active', 'id'];
    queryObj.where = {'brand_id': parseInt(id, 10)};
    queryObj.order_by = '+volume';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, SKU_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchProducts = (id) => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/sku_pricing/select';
    const queryObj = {};
    queryObj.columns = ['id', 'price', 'state_short_name', 'is_active'];
    queryObj.where = {'$and': [{'sku_id': {'$eq': parseInt(id, 10)}}, {'state_short_name': {'$eq': getState().welcomeDrinksState.campaignDetails.state_short_name }}]};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, PRODUCTS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const citiesViewHandler = (stateObj) => {
  return (dispatch) => {
    return Promise.all([
      dispatch({type: CITIES_VIEW, data: stateObj})
    ]);
  };
};

const checkState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().welcomeDrinksState;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      lCities[c.id] = c;
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckState = (stateObj) => {
  return (dispatch, state) => {
    const lstate = state().welcomeDrinksState;
    const lCities = {...lstate.selectedCities};
    stateObj.cities.forEach((c) => {
      delete lCities[c.id];
    });
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const checkCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().welcomeDrinksState;
    const lCities = {...lstate.selectedCities};
    lCities[cityObj.id] = cityObj;
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const unCheckCity = (cityObj) => {
  return (dispatch, state) => {
    const lstate = state().welcomeDrinksState;
    const lCities = {...lstate.selectedCities};
    delete lCities[cityObj.id];
    return Promise.all([
      dispatch({type: UPDATED_CITIES_SELECTION, data: {...lCities}})
    ]);
  };
};

const finalSave = () => {
  return (dispatch, state) => {
    const lstate = state().miscellaneousItemState;
    if (lstate.page === 'create') {
      return Promise.all([
        dispatch(insertMiscellaneous())
      ]);
    } else if (lstate.page === 'update') {
      return Promise.all([
        dispatch(updateMiscellaneous())
      ]);
    } else if (lstate.page === 'create for bar') {
      return Promise.all([
        dispatch(insertMiscellaneous())
      ]);
    }
//    lCamDetails.active_from = lCamDetails.active_from + ':00.000000+05:30';
//    lCamDetails.active_to = lCamDetails.active_to + ':00.000000+05:30';
  };
};

const welcomeDrinksReducer = (state = defaultmiscItem, action) => {
  switch (action.type) {
    case DEFINE_CREATE_PAGE:
      return {...state, page: 'create', miscId: action.data.miscId, barId: action.data.barId};
    case DEFINE_UPDATE_PAGE:
      return {...state, page: 'update', miscId: action.data.miscId, barId: action.data.barId};
    case DEFINE_CREATE_PAGE_FOR_BAR:
      return {...state, page: 'create for bar', miscId: action.data.miscId, barId: action.data.barId};
    case MISCELLANEOUS_INSERTED:
      return {...state, proceed: true, id: action.data.returning[0].id};
    case MISCELLANEOUS_UPDATED:
      return {...state, proceed: true, id: action.data.returning[0].id};
    case MISCELLANEOUS_FETCH:
      return {...state, detail: action.data[0]};
    case CITIES_FETCH:
      return {...state, citiesAll: action.data};
    case BRANDS_FETCH:
      return {...state, brandsAll: action.data};
    case CITY_SELECT:
      return {...state, selectedCity: { ...state.citiesAll[parseInt(action.data, 10)]} };
    case SKU_FETCH:
      return {...state, availableSkus: action.data };
    case PRODUCTS_FETCH:
      return {...state, availableProducts: action.data };
    case IMAGE_UPLOAD_SUCCESS:
      return {...state, detail: { ...state.detail, listing_image: Endpoints.file_get + action.data[0]}};
    case IMAGE_UPLOAD_ERROR:
      return {...state, detail: { ...state.detail, listing_image: ''}};
    case IMAGE_CANCEL:
      return {...state, detail: { ...state.detail, listing_image: ''}};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, detail: { ...state.detail, ...camInfo}};
    case RESET:
      return {...defaultmiscItem};
    default:
      return {...state};
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchBar,
  fetchMisc,
  fetchBrands,
  fetchSKU,
  insertMiscellaneous,
  updateMiscellaneous,
  fetchProducts,
  AD_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
  definePage,
  IMAGE_UPLOAD_ERROR,
  IMAGE_CANCEL,
  checkState,
  unCheckState,
  checkCity,
  unCheckCity,
  CITY_SELECT,
  finalSave,
  RESET
};

export default welcomeDrinksReducer;
