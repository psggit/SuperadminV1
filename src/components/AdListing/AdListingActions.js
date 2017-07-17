import { defaultadListingData} from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy, dataUrl } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';

const CITY_FETCH = 'ADLISTING/CITY_FETCH';
const BAR_FETCH = 'ADLISTING/BAR_FETCH';
const LISTING_FETCH = 'ADLISTING/LISTING_FETCH';
const AD_INFO = 'ADLISTING/UPDATE';
const UPDATE_LIST = 'ADLISTING/UPDATE_LIST';
const UPDATE_CITY = 'ADLISTING/UPDATE_CITY';
const UPDATE_AD_TYPE = 'ADLISTING/UPDATE_AD_TYPE';
const RESET = 'ADLISTING/RESET';


/* ****** Action Creators ******** */
// Fetch List of all Active(???) Cities
const fetchCities = () => {
  return (dispatch, getState) => {
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
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, CITY_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Fetch all bars
const fetchBars = (city) => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/bars/select';
    const queryObj = {};
    queryObj.columns = ['*'];
    queryObj.where = {'is_active': true};
    queryObj.where = {
      '$and': [
        {'bar_status': {'$eq': 'true'}},
        {'city_id': { '$eq': parseInt(city, 10)}}
      ]
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BAR_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Fetch All Listing Order
const fetchListing = (city, type, bar) => {
  return (dispatch, getState) => {
    let queryCity = city;
    let queryBar = bar;
    if (bar !== 'null') {
      queryCity = null;
    } else {
      queryBar = null;
    }
    dispatch({type: UPDATE_CITY, data: {cityId: queryCity ? parseInt(queryCity, 10) : null}});
    if ((city !== undefined) && (type !== undefined)) {
      const url = Endpoints.db + '/table/detailed_ad_listing/select';
      const queryObj = {};
      queryObj.columns = ['*'];
      queryObj.orderBy = '+listing_order';
      queryObj.where = {
        '$and': [
        {'city_id': {'$eq': queryCity ? parseInt(queryCity, 10) : null}},
        {'bar_id': {'$eq': queryBar ? parseInt(queryBar, 10) : null}},
        { 'table': { '$eq': type}}
        ]
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
        credentials: globalCookiePolicy,
        body: JSON.stringify(queryObj),
      };
      dispatch({type: MAKE_REQUEST});
      return Promise.all([
        dispatch(requestAction(url, options, LISTING_FETCH, REQUEST_ERROR)),
        dispatch({type: REQUEST_COMPLETED})
      ]);
    }
  };
};

// Update store updatedList with Passed Value (id, display_order)
const storeUpdatedList = (id, displayOrder) => {
  return (dispatch) => {
    dispatch({type: UPDATE_LIST, data: {id: displayOrder}});
  };
};

const finalUpdate = () => {
  return (dispatch, state) => {
    const lstate = state().adListingState;
    const city = state().adListingState.cityId;
    const table = state().adListingState.adType;
    const updateList = {...lstate.updateList};
    // const adUrl = Endpoints.db + '/table/brand_listing/update';
    // Make Bulk reqquest
    const bulkInsert = [];
    if (table === 'ad_bar') {
      Object.keys(updateList).forEach((key) => {
        bulkInsert.push({
          type: 'update',
          args: {
            table: table,
            returning: ['id'],
            'where': {'id': parseInt(key, 10)},
            $set: {
              listing_order: parseInt(updateList[key], 10),
            }
          },
        });
      });
    } else {
      Object.keys(updateList).forEach((key) => {
        bulkInsert.push({
          type: 'update',
          args: {
            table: table + '_city',
            returning: ['id'],
            'where': {
              'id': {
                '$eq': parseInt(key, 10)
              },
              'city_id': {
                '$eq': city
              }
            },
            $set: {
              listing_order: parseInt(updateList[key], 10),
            }
          }
        });
      });
    }
    const query = {
      url: dataUrl + '/v1/query',
      query: {
        type: 'bulk',
        args: bulkInsert
      }
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': state().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(query.query),
    };
    return dispatch(requestAction(query.url, options)).then(() => {
      alert('Success');
      return dispatch(routeActions.push('/hadmin'));
    }).catch((err) => {
      alert('Failure');
      return err;
    });
  };
};

const adListingReducer = (state = defaultadListingData, action) => {
  switch (action.type) {
    case BAR_FETCH:
      return {...state, allBar: action.data};
    case CITY_FETCH:
      return {...state, allCity: action.data};
    case LISTING_FETCH:
      return {...state, allList: action.data};
    case UPDATE_LIST:
      return {...state, updateList: {...state.updateList, ...action.data}};
    case UPDATE_CITY:
      return {...state, cityId: action.data.cityId};
    case UPDATE_AD_TYPE:
      return {...state, adType: action.data};
    case RESET:
      return {...state, updateList: {}, cityId: null, adType: null, allBar: null, allCity: null, allList: null};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchBars,
  fetchCities,
  fetchListing,
  RESET,
  finalUpdate,
  storeUpdatedList,
  UPDATE_LIST,
  UPDATE_AD_TYPE,
  AD_INFO
//  finalSave
};

export default adListingReducer;
