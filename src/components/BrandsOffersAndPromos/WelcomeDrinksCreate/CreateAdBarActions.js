/*
 * Will receive default state from Common
 */

import { defaultwelcomeCreateData} from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../../Common/Actions/Actions';

// import commonReducer from '../Common/Actions/CommonReducer';

const CITIES_FETCH = 'WELCOME_DRINKS/CITIES_FETCH';
const BRANDS_FETCH = 'WELCOME_DRINKS/BRANDS_FETCH';
const SKU_FETCH = 'WELCOME_DRINKS/SKU_FETCH';
const PRODUCTS_FETCH = 'WELCOME_DRINKS/PRODUCTS_FETCH';
const CITY_SELECT = 'WELCOME_DRINKS/CITY_SELECT';
const AD_INFO = 'WELCOME_DRINKS/AD_INFO';
const CITIES_VIEW = 'WELCOME_DRINKS/CITIES_VIEW';
const IMAGE_UPLOAD_SUCCESS = 'WELCOME_DRINKS/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'WELCOME_DRINKS/IMAGE_UPLOAD_SUCCESS';
const IMAGE_CANCEL = 'WELCOME_DRINKS/IMAGE_CANCEL';
const UPDATED_CITIES_SELECTION = 'WELCOME_DRINKS/UPDATED_CITIES_SELECTION';
const RESET = 'WELCOME_DRINKS/RESET';

/* ****** Action Creators ******** */

const fetchStates = () => {
  return (dispatch, getState) => {
    /* Bar */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
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
      dispatch(requestAction(url, options, CITIES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
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
    const lstate = state().welcomeDrinksState;
    const lCamDetails = {...lstate.campaignDetails};
    const adUrl = Endpoints.db + '/table/welcome_drink/insert';
    lCamDetails.active_from = lCamDetails.active_from + ':00.000000+05:30';
    lCamDetails.active_to = lCamDetails.active_to + ':00.000000+05:30';
    lCamDetails.is_active = (parseInt(lCamDetails.is_active, 10) === 0) ? true : false;
    delete lCamDetails.state_short_name;
    const adData = {};
    adData.objects = [lCamDetails];
    adData.returning = ['id'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': state().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(adData),
    };
    return dispatch(requestAction(adUrl, options)).then(() => {
      alert('Success');
      return dispatch(routeActions.push('/hadmin/brands_offers_and_promos/welcome_drinks_view'));
    }).catch((err) => {
      alert('Failed');
      return err;
    });
  };
};

const welcomeDrinksReducer = (state = defaultwelcomeCreateData, action) => {
  switch (action.type) {
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
      return {...state, imageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return {...state, imageUrl: ''};
    case IMAGE_CANCEL:
      return {...state, imageUrl: ''};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    case RESET:
      return {...defaultwelcomeCreateData};
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchBrands,
  fetchSKU,
  fetchProducts,
  AD_INFO,
  citiesViewHandler,
  IMAGE_UPLOAD_SUCCESS,
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
