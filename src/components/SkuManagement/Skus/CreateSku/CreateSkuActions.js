/*
 * Will receive default state from Common
 * */

import { defaultCreateSkuState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';

import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import {
  REQUEST_ERROR, RESET } from '../../../Common/Actions/Actions';

const BRAND_FETCH = 'SKU/BRAND_FETCH';
const STATE_FETCH_AND_COMPUTE_MAPPINGS = 'SKU/STATE_FETCH_AND_COMPUTE_MAPPINGS';
const MARK_STATE_SELECTED = 'SKU/MARK_STATE_SELECTED';
const UNMARK_STATE_SELECTED = 'SKU/UNMARK_STATE_SELECTED';

const MARK_CITY_SELECTED = 'SKU/MARK_CITY_SELECTED';
const UNMARK_CITY_SELECTED = 'SKU/UNMARK_CITY_SELECTED';

const MARK_RETAILER_SELECTED = 'SKU/MARK_RETAILER_SELECTED';
const UNMARK_RETAILER_SELECTED = 'SKU/UNMARK_RETAILER_SELECTED';

const VIEW_STATE = 'SKU/VIEW_STATE';
const VIEW_CITY = 'SKU/VIEW_CITY';

const IMAGE_UPLOAD_SUCCESS = 'SKU/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = 'SKU/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = 'SKU/CANCEL_IMAGE';

const SKU_INFORMATION_CHANGE = 'SKU/SKU_INFORMATION_CHANGE';

const STATE_MRP_INFORMATION = 'SKU/STATE_MRP_INFORMATION';

const fetchBrand = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/brand/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.order_by = '+brand_name';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_FETCH, REQUEST_ERROR))
    ]);
  };
};

const fetchState = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = [
      '*',
      {
        'name': 'cities',
        'columns': [
          '*',
          {
            'name': 'retailers',
            'columns': [
              '*'
            ]
          }
        ]
      }
    ];
    queryObj.order_by = '-state_name';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    // dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATE_FETCH_AND_COMPUTE_MAPPINGS, REQUEST_ERROR))
    ]);
  };
};

/* Marking / UnMarking the checkboxes */
const markStateSelected = (stateId) => {
  return { type: MARK_STATE_SELECTED, data: stateId };
};

const unMarkStateSelected = (stateId) => {
  return { type: UNMARK_STATE_SELECTED, data: stateId };
};

const markCitySelected = (cityId) => {
  return { type: MARK_CITY_SELECTED, data: cityId};
};

const unMarkCitySelected = (cityId) => {
  return { type: UNMARK_CITY_SELECTED, data: cityId};
};

const markRetailerSelected = (cityId) => {
  return { type: MARK_RETAILER_SELECTED, data: cityId};
};

const unMarkRetailerSelected = (cityId) => {
  return { type: UNMARK_RETAILER_SELECTED, data: cityId};
};

/* End of it */

/* Viewing Action creators */
const viewState = (stateId) => {
  return { type: VIEW_STATE, data: stateId };
};

const viewCity = (cityId) => {
  return { type: VIEW_CITY, data: cityId};
};
/* End of it */

/* Reducer Definition */

const createSKUReducer = (state = defaultCreateSkuState, action) => {
  let modifiedState;
  let selectedState;
  let selectedCity;
  let modifiedCity;
  let currRetailer;
  switch (action.type) {
    case BRAND_FETCH:
      return {...state, brandList: action.data};
    case MARK_STATE_SELECTED:
      const currState = {};
      currState[action.data] = Object.assign({}, state.stateCityMapping[parseInt(action.data, 10)]);
      currState[action.data].is_selected = true;
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState }};
    case MARK_RETAILER_SELECTED:
      /* Get the selected State right now */
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer.is_selected = true;
      selectedCity = Object.assign( {}, state.viewedCity);
      modifiedCity = {};

      modifiedCity[selectedCity.cityInfo.id] = Object.assign({}, state.cityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)]);
      modifiedCity[selectedCity.cityInfo.id].selected_retailers[action.data] = currRetailer[action.data];
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...modifiedCity}, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case UNMARK_RETAILER_SELECTED:
      currRetailer = {};
      currRetailer[action.data] = Object.assign({}, state.retailerMapping[action.data]);
      currRetailer.is_selected = false;
      selectedCity = Object.assign( {}, state.viewedCity);
      modifiedCity = Object.assign({}, state.cityRetailerMapping[parseInt(selectedCity.cityInfo.id, 10)]);
      delete modifiedCity.selected_retailers[action.data];
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...modifiedCity}, retailerMapping: {...state.retailerMapping, ...currRetailer }};
    case MARK_CITY_SELECTED:
      const currCity2 = {};
      currCity2[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity2[action.data].is_selected = true;
      /* Get the selected State right now */
      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = {};
      modifiedState[selectedState.stateInfo.id] = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      modifiedState[selectedState.stateInfo.id].selected_cities[action.data] = currCity2[action.data];
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity2}, stateCityMapping: { ...state.stateCityMapping, ...modifiedState }};
    case UNMARK_CITY_SELECTED:
      const currCity1 = {};
      currCity1[action.data] = Object.assign({}, state.cityRetailerMapping[parseInt(action.data, 10)]);
      currCity1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */
      currCity1[action.data].selected_retailers = {};

      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      delete modifiedState.selected_cities[action.data];

      /* If the city is being viewed and it is unmarked just remove the retailers also NOT LITERALLY */
      let viewedCity = Object.assign({}, state.viewedCity );
      if ( Object.keys(viewedCity).length > 0) {
        viewedCity = ( viewedCity.cityInfo.id === action.data ) ? {} : viewedCity;
      } else {
        viewedCity = {};
      }
      return {...state, cityRetailerMapping: { ...state.cityRetailerMapping, ...currCity1}, viewedCity: viewedCity};
    case VIEW_STATE:
      return {...state, viewedState: state.stateCityMapping[action.data]};
    case VIEW_CITY:
      return {...state, viewedCity: state.cityRetailerMapping[action.data]};
    case UNMARK_STATE_SELECTED:
      const currState1 = {};
      currState1[action.data] = Object.assign({}, state.stateCityMapping[parseInt(action.data, 10)]);
      currState1[action.data].is_selected = false;
      /* Added if the state is selected and cities are selected and the state is being unmarked selected cities should also get disabled */
      /* TODO: 1 Unselect all cities if this guy is unmarked and marked again */
      /* TODO: 2 Unselect all the retailers as this is the chain reaction (State is unselect -> unselect the cities -> unselect the retailers */
      currState1[action.data].selected_cities = {};
      let viewedState = Object.assign({}, state.viewedState);
      if (Object.keys(viewedState).length > 0) {
        viewedState = ( viewedState.stateInfo.id === action.data ) ? {} : viewedState;
      } else {
        viewedState = {};
      }
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...currState1 }, viewedState: viewedState};
    case STATE_FETCH_AND_COMPUTE_MAPPINGS:
      /* Map states to cities */
      /* State with zero cities are considered now can be removed later */
      let countState = 0;
      let countCity = 0;
      let countRetailer = 0;
      const stateCityMapping = {};
      const cityRetailerMapping = {};
      const retailerMapping = {};
      while ( countState < action.data.length) {
        countCity = 0;
        stateCityMapping[action.data[countState].id] = {
          is_selected: false,
          selected_cities: {},
          duty_free: 0,
          duty_paid: 0,
          cities: action.data[countState].cities,
          stateInfo: action.data[countState]
        };

        while (countCity < action.data[countState].cities.length) {
          const currCity = action.data[countState].cities;
          const retailers = currCity[countCity].retailers;
          countRetailer = 0;
          cityRetailerMapping[currCity[countCity].id] = {
            retailers: currCity[countCity].retailers,
            is_selected: false,
            selected_retailers: {},
            cityInfo: currCity[countCity]
          };
          while ( countRetailer < retailers.length) {
            retailerMapping[retailers[countRetailer].id] = {
              is_selected: false,
              retailerInfo: retailers[countRetailer]
            };
            countRetailer++;
          }
          countCity++;
        }
        countState++;
      }
      return {...state, stateList: action.data, stateCityMapping: stateCityMapping, cityRetailerMapping: cityRetailerMapping, retailerMapping: retailerMapping};
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, skuImageUrl: action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, skuImageUrl: ''};
    case CANCEL_IMAGE:
      return { ...state, skuImageUrl: ''};
    case SKU_INFORMATION_CHANGE:
      const skuInfo = {};
      skuInfo[action.data.key] = action.data.value;
      return { ...state, skuReqObj: { ...state.skuReqObj, ...skuInfo }};
    case STATE_MRP_INFORMATION:
      console.log('Something S');
      console.log(action);
      return { ...state };
    default: return state;
  }
};

/* End of it */

export {
  fetchBrand,
  fetchState,
  RESET,
  markStateSelected,
  unMarkStateSelected,
  markCitySelected,
  unMarkCitySelected,
  markRetailerSelected,
  unMarkRetailerSelected,
  viewState,
  viewCity,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  SKU_INFORMATION_CHANGE,
  STATE_MRP_INFORMATION
};

export default createSKUReducer;
