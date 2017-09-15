/* Action, Action Creators, Reducer for State Management */
/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST, REQUEST_COMPLETED, REQUEST_ERROR } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';

import beginFilter from '../../Common/SearchComponentGen/GenerateFilter';

/* Action Constants */
// Action Maker
const REQUEST_SUCCESS = '@dp_mgt/REQUEST_SUCCESS';

const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const TOGGLE_CITY_COMPONENT = '@dp_mgt/TOGGLE_CITY_COMPONENT';
const CITY_INPUT_CHANGED = '@dp_mgt/CITY_INPUT_CHANGED';
const STATE_INPUT_CHANGED = '@dp_mgt/STATE_INPUT_CHANGED';
const STORE_CITY_LOCAL = '@dp_mgt/STORE_CITY_LOCAL';
const EDIT_CITY = '@dp_mgt/EDIT_CITY';
const EDIT_SERVER_CITY = '@dp_mgt/EDIT_SERVER_CITY';
const UPDATE_CITY_LOCAL = '@dp_mgt/UPDATE_CITY_LOCAL';
const DELETE_CITY_LOCAL = '@dp_mgt/DELETE_CITY_LOCAL';
const FETCH_CITY = '@dp_mgt/FETCH_CITY';
const CLEAR_CITY = '@dp_mgt/CLEAR_CITY';
const RESET = '@dp_mgt/RESET';
const DP_INSERTED = '@dp_mgt/DP_INSERTED';
const ADD_RETAILER_MAPPING = '@dp_mgt/ADD_RETAILER_MAPPING';
const REMOVE_RETAILER_MAPPING = '@dp_mgt/REMOVE_RETAILER_MAPPING';
const DELETE_RETAILER_MAPPING = '@dp_mgt/DELETE_RETAILER_MAPPING';
const REMOVE_RETAILER_MAPPING_DELETE = '@dp_mgt/REMOVE_RETAILER_MAPPING_DELETE';
const COUNT_FETCHED = '@dp_mgt/COUNT';
const FETCH_ORGANISATION = '@dp_mgt/FETCH_ORGANISATION';
const FETCH_DP = '@dp_mgt/FETCH_DP';
const FETCH_DP_MAP = '@dp_mgt/FETCH_DP_MAP';
const FETCH_RETAILERS = '@dp_mgt/FETCH_RETAILERS';
const FETCH_ALL_RETAILERS = '@dp_mgt/FETCH_ALL_RETAILERS';
const LICENSE_COPY_UPLOADED = '@dp_mgt/LICENSE_UPLOADED';
const LICENSE_COPY_CANCELLED = '@dp_mgt/LICENSE_CANCELLED';
const LICENSE_COPY_ERROR = '@dp_mgt/LICENSE_ERROR';
const PROOF_COPY_UPLOADED = '@dp_mgt/PROOF_UPLOADED';
const PROOF_COPY_CANCELLED = '@dp_mgt/PROOF_CANCELLED';
const PROOF_COPY_ERROR = '@dp_mgt/PROOF_ERROR';

/* Action creators */

const getDPData = ( page, filterObj, isSearched ) => {
  return (dispatch, getState) => {
    let offset = 0;
    let limit = 0;
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'dp_details' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch( requestAction(url, options, REQUEST_SUCCESS, REQUEST_ERROR));
  };
};

const getDPCount = ( filterObj, isSearched ) => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['*']
    };
    if ( isSearched ) {
      payload.where = { ...payload.where, ...filterObj };
    }

    const url = Endpoints.db + '/table/' + 'dp_details' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: COUNT_FETCHED, data: d});
                   },
                   () => {
                     return dispatch(requestFailed('Error. Try again!'));
                   }
                 );
               } else {
                 return dispatch(requestFailed('Error. Try again!'));
               }
             },
             (error) => {
               console.log(error);
               return dispatch(requestFailed(error.text));
             });
  };
};

const getAllDPData = (page) => {
  return ( dispatch, getState ) => {
    const gotPage = page;

    const filterData = getState().gen_filter_data;
    const filterObj = { ...beginFilter(getState) };
    /* Dispatching first one */
    return Promise.all([
      dispatch(getDPCount( filterObj, filterData.isSearched )),
      dispatch(getDPData(gotPage, filterObj, filterData.isSearched ))
    ]);
  };
};

const fetchCities = () => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['name', 'id']
    };

    const url = Endpoints.db + '/table/' + 'city' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_CITY, REQUEST_ERROR));
  };
};

const fetchOrganisations = () => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['organisation_name', 'id'],
      'where': {'status': 'true'}
    };

    const url = Endpoints.db + '/table/' + 'organisation' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_ORGANISATION, REQUEST_ERROR));
  };
};

const fetchRetailer = (orgId) => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['org_name', 'id', 'city_id'],
      'where': {'organisation_id': orgId}
    };

    const url = Endpoints.db + '/table/' + 'retailer' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_RETAILERS, REQUEST_ERROR));
  };
};

const fetchDP = (Id) => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['*'],
      'where': {'id': Id}
    };

    const url = Endpoints.db + '/table/' + 'dp_details_complete_info' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_DP, REQUEST_ERROR));
  };
};

const fetchDPMap = (Id) => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['retailer_id'],
      'where': {'dp_id': Id}
    };

    const url = Endpoints.db + '/table/' + 'dp_retailer_map' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_DP_MAP, REQUEST_ERROR));
  };
};


const fetchAllRetailer = () => {
  return (dispatch, getState) => {
    const payload = {
      'columns': ['org_name', 'id']
    };

    const url = Endpoints.db + '/table/' + 'retailer' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, FETCH_ALL_RETAILERS, REQUEST_ERROR));
  };
};

export const createDeliveryPerson = () => {
  return (dispatch, getState) => {
    const url = Endpoints.gremlinUrl + '/deliveryAgent/createDeliveryAgent';
    const payload = getState().deliveryPersonState.attrs;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return Promise.all([
      dispatch(requestAction(url, options, DP_INSERTED, REQUEST_ERROR)).then((response) => {
        console.log(response);
        return dispatch(routeActions.push('/hadmin/delivery_persons_list'));
        // Reroute
      }).catch((err) => {
        console.log(err);
        alert('Please Try Again.');
      }),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

export const updateDeliveryPerson = () => {
  return (dispatch, getState) => {
    const url = Endpoints.gremlinUrl + '/deliveryAgent/updateDeliveryAgent';
    const payload = getState().deliveryPersonState.attrs;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return Promise.all([
      dispatch(requestAction(url, options, DP_INSERTED, REQUEST_ERROR)).then((response) => {
        console.log(response);
        return dispatch(routeActions.push('/hadmin/delivery_persons_list'));
        // Reroute
      }).catch((err) => {
        console.log(err);
        alert('Please Try Again.');
      }),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};


/* End of Action creators */

/* Reducer for State Management */

const defaultState = {
  cities: [],
  retailers: [],
  allRetailers: [],
  attrs: {is_active: false, is_freelancer: false, mapped_retailers: [], added_retailers: [], deleted_retailers: []},
  organisations: [],
  mapCity: 1,
  lastSuccess: []
};

const deliveryPersonReducer = ( state = defaultState, action) => {
  switch ( action.type ) {
    case FETCH_CITY:
      return { ...state, cities: action.data};
    case FETCH_RETAILERS:
      return { ...state, retailers: action.data};
    case FETCH_ALL_RETAILERS:
      return { ...state, allRetailers: action.data};
    case REQUEST_SUCCESS:
      return { ...state, lastSuccess: action.data};
    case ADD_RETAILER_MAPPING:
      let addRetailers = state.attrs.added_retailers;
      addRetailers.push(action.data);
      const uniqueItems = Array.from(new Set(addRetailers));
      return { ...state, attrs: {...state.attrs, added_retailers: [...uniqueItems]}};
    case REMOVE_RETAILER_MAPPING:
      const addedRetailers = state.attrs.added_retailers;
      addedRetailers.splice(addedRetailers.indexOf(action.data), 1);
      return { ...state, attrs: {...state.attrs, added_retailers: [...addedRetailers]}};
    case DELETE_RETAILER_MAPPING:
      const deletedRetailers = state.attrs.deleted_retailers;
      deletedRetailers.push(action.data);
      const mappedRetailers = state.attrs.mapped_retailers;
      mappedRetailers.splice(mappedRetailers.indexOf(action.data), 1);
      return { ...state, attrs: {...state.attrs, deleted_retailers: [...deletedRetailers], mapped_retailers: [...mappedRetailers]}};
    case REMOVE_RETAILER_MAPPING_DELETE:
      const currmappedRetailers = state.attrs.mapped_retailers;
      currmappedRetailers.push(action.data);
      addRetailers = state.attrs.deleted_retailers;
      addRetailers.splice(addRetailers.indexOf(action.data), 1);
      return { ...state, attrs: {...state.attrs, mapped_retailers: [...currmappedRetailers], deleted_retailers: [...addRetailers]}};
    case COUNT_FETCHED:
      return { ...state, count: action.data.count};
    case STATE_INPUT_CHANGED:
      const obj = {};
      obj[action.data.key] = action.data.value;
      return { ...state, attrs: {...state.attrs, ...obj}};
    case FETCH_ORGANISATION:
      return { ...state, organisations: action.data};
    case FETCH_DP_MAP:
      const rId = [];
      action.data.map((indiv) => {rId.push(indiv.retailer_id);});
      return { ...state, attrs: {...state.attrs, mapped_retailers: [...rId]}};
    case FETCH_DP:
      action.data[0].mapped_retailers = [];
      action.data[0].added_retailers = [];
      action.data[0].deleted_retailers = [];
      return { ...state, attrs: action.data[0], image: Endpoints.file_get + action.data[0].driving_license_image, proofimage: Endpoints.file_get + action.data[0].proof_image};
    case LICENSE_COPY_UPLOADED:
      const temp = {};
      temp.driving_license_image = action.data[0];
      return { ...state, image: Endpoints.file_get + action.data[0], attrs: {...state.attrs, ...temp}};
    case LICENSE_COPY_CANCELLED:
      const removeObj = {};
      removeObj.driving_license_image = '';
      return { ...state, image: '', attrs: {...state.attrs, ...removeObj}};
    case PROOF_COPY_UPLOADED:
      const tmp = {};
      tmp.proof_image = action.data[0];
      return { ...state, proofimage: Endpoints.file_get + action.data[0], attrs: {...state.attrs, ...tmp}};
    case PROOF_COPY_CANCELLED:
      const rmObj = {};
      rmObj.proof_image = '';
      return { ...state, proofimage: '', attrs: {...state.attrs, ...rmObj}};
    case CLEAR_CITY:
      return { ...state, cities: {}};
    case RESET:
      return { ...defaultState};
    default:
      return { ...state };
  }
};

/* End of reducer */

export {
  TOGGLE_CITY_COMPONENT,
  CITY_INPUT_CHANGED,
  STATE_INPUT_CHANGED,
  STORE_CITY_LOCAL,
  EDIT_CITY,
  EDIT_SERVER_CITY,
  UPDATE_CITY_LOCAL,
  DELETE_CITY_LOCAL,
  getDPData,
  getAllDPData,
  RESET,
  fetchCities,
  ADD_RETAILER_MAPPING,
  fetchOrganisations,
  fetchRetailer,
  fetchDP,
  fetchDPMap,
  fetchAllRetailer,
  PROOF_COPY_UPLOADED,
  REMOVE_RETAILER_MAPPING,
  REMOVE_RETAILER_MAPPING_DELETE,
  DELETE_RETAILER_MAPPING,
  PROOF_COPY_CANCELLED,
  PROOF_COPY_ERROR,
  LICENSE_COPY_UPLOADED,
  LICENSE_COPY_CANCELLED,
  LICENSE_COPY_ERROR,
  MAKE_REQUEST,
  REQUEST_COMPLETED
};

export default deliveryPersonReducer;
