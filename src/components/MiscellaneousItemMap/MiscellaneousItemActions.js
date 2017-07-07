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
const MISC_INFO = 'MISCELLANEOUS_ITEM_MAP/MISC_INFO';
const CITIES_VIEW = 'WELCOME_DRINKS/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'WELCOME_DRINKS/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'WELCOME_DRINKS/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'WELCOME_DRINKS/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'WELCOME_DRINKS/UPDATED_CITIES_SELECTION';
const RESET = 'WELCOME_DRINKS/RESET';
const DEFINE_CREATE_PAGE = 'MISCELLANEOUS_ITEM_MAP/CREATE';
const DEFINE_MAP_BAR_PAGE = 'MAP_MISCELLANEOUS_ITEM_TO_BAR/UPDATE';
const DEFINE_PURE_MAP_PAGE = 'MISCELLANEOUS_ITEM_MAP/PURE_MAP_PAGE';
const DEFINE_CREATE_PAGE_FOR_BAR = 'MISCELLANEOUS_ITEM_MAP/CREATE_PAGE_FOR_BAR';
const MISCELLANEOUS_INVENTORY_FETCHED = 'MISCELLANEOUS_MAP_ITEM/FETCH';
const MISCELLANEOUS_INSERTED = 'MISCELLANEOUS_ITEM_MAP/INSERT';
const MISCELLANEOUS_UPDATED = 'MISCELLANEOUS_ITEM_MAP/UPDATE';
const MISCELLANEOUS_FETCH = 'MISCELLANEOUS_INFO_ITEM/FETCH';
const MISCELLANEOUS_ITEM_FETCH = 'MISCELLANEOUS_ITEM_MAP/FETCH';
const ALL_MISCELLANEOUS_ITEM_FETCH = 'ALL_MISCELLANEOUS_ITEM_MAP/FETCH';
const BARS_FETCH = 'MISCELLANEOUS_ITEM_MAP/BARS_FETCH';
const CITY_SPECIFIC_BARS_FETCH = 'MISCELLANEOUS_ITEM_MAP/BARS_FETCH';

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

const fetchStates = () => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/city/select';
    const queryObj = {};
    queryObj.columns = ['*'];
    queryObj.where = {'is_available': true};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CITIES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};


const fetchAllMisc = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/miscellaneous_item/select';
    const queryObj = {'columns': ['name', 'id']};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj)
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, ALL_MISCELLANEOUS_ITEM_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const selectCitySpecificBar = (id) => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/bars/select';
    const queryObj = {columns: ['*']};
    queryObj.where = {'city_id': parseInt(id, 10)};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CITY_SPECIFIC_BARS_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchMiscItem = (id) => {
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
      dispatch(requestAction(url, options, MISCELLANEOUS_ITEM_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};


const fetchMisc = (id, page) => {
  return (dispatch, getState) => {
    /* Bar */
    /* Bar */
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;
    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;
    const url = Endpoints.db + '/table/miscellaneous_information/select';
    const queryObj = {
      'columns': ['*'],
      'limit': limit,
      'offset': offset
    };
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
    console.log('Page Definition');
    // Able to map any misc to any bar
    if (barId === undefined && miscId === undefined) {
      dispatch({type: DEFINE_PURE_MAP_PAGE, data: {barId: barId, miscId: miscId}});
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(fetchAllMisc()),
        dispatch(fetchStates()),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
    if (barId !== undefined && miscId === undefined) {
      // Create For Bar
      dispatch({type: DEFINE_CREATE_PAGE_FOR_BAR, data: {barId: barId, miscId: miscId}});
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(fetchAllMisc()),
        dispatch(fetchBar(parseInt(barId, 10))),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
    // Define The Mapping Misc to Bar Page.
    if (barId === undefined && miscId !== undefined) {
      // Define Page as 'map misc to bar'
      // Fetch Misc info from table 'Miscellaneous_item'
      dispatch({type: DEFINE_MAP_BAR_PAGE, data: {barId: barId, miscId: miscId}});
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(fetchMiscItem(parseInt(miscId, 10))),
        dispatch(fetchStates()),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
  };
};

// Reacts to how to divert page on success
const proceed = () => {
  return (dispatch, getState) => {
    const state = getState().miscellaneousItemMapState.page;
    const mid = getState().miscellaneousItemMapState.id;
    const proceedVal = getState().miscellaneousItemMapState.proceed;
    if (proceedVal && (state === 'create')) {
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update'));
    }
    if (proceedVal && (state === 'update')) {
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update'));
    }
    if (proceedVal && (state === 'create for bar')) {
      return dispatch(routeActions.push('/hadmin/miscellaneous_item/' + mid + '/update/bar'));
    }
  };
};

const fetchMiscellaneousInventory = (id) => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/miscellaneous_inventory/select';
    const queryObj = {where: {'miscellaneous_id': parseInt(id, 10)}};
    queryObj.columns = ['*'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, MISCELLANEOUS_INVENTORY_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]).then([
      dispatch(proceed())
    ]);
  };
};

const insertMiscellaneousInventory = () => {
  return (dispatch, getState) => {
    console.log('Insert into Miscellaneous Inventory');
    const miscState = getState().miscellaneousItemMapState.detail;
    const reportState = {};
    // UGLY
    reportState.base_sku_price = miscState.base_sku_price;
    reportState.charges_and_tax_percentage = miscState.charges_and_tax_percentage;
    reportState.negotiated_sku_price = miscState.negotiated_sku_price;
    miscState.id = 6;
    delete(miscState.base_sku_price);
    delete(miscState.city);
    delete(miscState.charges_and_tax_percentage);
    delete(miscState.negotiated_sku_price);
    reportState.hipbarPrice = miscState.hipbarPrice;
    reportState.menuPrice = miscState.menuPrice;
    const url = Endpoints.db + '/table/miscellaneous_inventory/insert';
    const reportUrl = Endpoints.db + '/table/miscellaneous_item_report/insert';
    const queryObj = {objects: [miscState]};
    const reportQueryObj = {objects: [reportState]};
    queryObj.returning = ['id', 'hipbarPrice', 'menuPrice'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    const reportOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(reportQueryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    dispatch(requestAction(url, options, MISCELLANEOUS_INSERTED, REQUEST_ERROR)).then(() => {
      dispatch(requestAction(reportUrl, reportOptions)).then((response) => {
        console.log(response);
      }).catch( (error) => {
        console.log(error);
      });
    }).catch( (error) => {
      alert('Error: Check Logs');
      console.log(error);
    });
    return Promise.all([
    // dispatch(requestAction(url, options, MISCELLANEOUS_INSERTED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]).then([
      dispatch(proceed())
    ]);
  };
};


const updateMiscellaneous = () => {
  return (dispatch, getState) => {
    const miscState = getState().miscellaneousItemMapState.detail;
    const url = Endpoints.db + '/table/miscellaneous_inventory/update';
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
    const lstate = state().miscellaneousItemMapState;
    console.log('Making request to DB');
    if (lstate.page === 'create') {
      console.log('create');
      return Promise.all([
        dispatch(insertMiscellaneousInventory())
      ]);
    } else if (lstate.page === 'update') {
      console.log('update');
      return Promise.all([
        dispatch(updateMiscellaneous())
      ]);
    } else if (lstate.page === 'create for bar') {
      console.log('create for bar');
      return Promise.all([
        dispatch(insertMiscellaneousInventory())
      ]);
    } else if (lstate.page === 'map misc to bar') {
      return Promise.all([
        dispatch(insertMiscellaneousInventory())
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
    case DEFINE_MAP_BAR_PAGE:
      return {...state, page: 'map misc to bar', miscId: action.data.miscId, barId: action.data.barId};
    case DEFINE_CREATE_PAGE_FOR_BAR:
      return {...state, page: 'update', miscId: action.data.miscId, barId: action.data.barId};
    case MISCELLANEOUS_INSERTED:
      return {...state, proceed: true, id: action.data.returning[0].id};
    case MISCELLANEOUS_UPDATED:
      return {...state, proceed: true, id: action.data.returning[0].id};
    case MISCELLANEOUS_FETCH:
      return {...state, misc_info_detail: action.data[0]};
    case MISCELLANEOUS_INVENTORY_FETCHED:
      return {...state, miscellaneousInformation: action.data};
    case MISCELLANEOUS_ITEM_FETCH:
      return {...state, misc_detail: action.data[0]};
    case ALL_MISCELLANEOUS_ITEM_FETCH:
      return {...state, miscAll: action.data};
    case CITIES_FETCH:
      return {...state, citiesAll: action.data};
    case CITY_SPECIFIC_BARS_FETCH:
      return {...state, barsAll: action.data};
    case BRANDS_FETCH:
      return {...state, brandsAll: action.data};
    case CITY_SELECT:
      return {...state, selectedCity: { ...state.citiesAll[parseInt(action.data, 10)]} };
    case SKU_FETCH:
      return {...state, availableSkus: action.data };
    case PRODUCTS_FETCH:
      return {...state, availableProducts: action.data };
    case IMAGE_UPLOAD_SUCCESS:
      return {...state, imageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return {...state, imageUrl: ''};
    case IMAGE_CANCEL:
      return {...state, imageUrl: ''};
    case MISC_INFO:
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
  fetchAllMisc,
  fetchBrands,
  selectCitySpecificBar,
  fetchSKU,
  insertMiscellaneousInventory,
  updateMiscellaneous,
  fetchProducts,
  MISC_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
  fetchMiscellaneousInventory,
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
