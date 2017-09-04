import { defaultfeaturedListingData} from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy, dataUrl } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';
import {indexSku} from '../SkuManagement/Brand/BrandAction';


const STATE_FETCH = 'FEATUREDLISTING/STATES_FETCH';
const GENRE_FETCH = 'FEATUREDLISTING/GENRES_FETCH';
const LISTING_FETCH = 'FEATUREDLISTING/LISTING_FETCH';
const AD_INFO = 'FEATUREDLISTING/UPDATE';
const UPDATE_LIST = 'FEATUREDLISTING/UPDATE_LIST';
const UPDATE_INDEX = 'FEATUREDLISTING/UPDATE_INDEX';
const RESET = 'FEATUREDLISTING/RESET';


/* ****** Action Creators ******** */
// Fetch List of all Active(???) States
const fetchStates = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/state/select';
    const queryObj = {};
    queryObj.columns = ['*'];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, STATE_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Fetch All Listing Order
const fetchListing = (state, genre) => {
  return (dispatch, getState) => {
    if (state !== undefined) {
      const url = Endpoints.db + '/table/detailed_brand_listing/select';
      const queryObj = {};
      queryObj.columns = ['*'];
      queryObj.orderBy = '+all_display_order';
      queryObj.where = {
        '$and': [
        {'genre_short': {'$eq': genre }},
         { 'state_short_name': { '$eq': state }}
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
    const lstate = state().featuredListingState;
    const updateList = {...lstate.updateList};
    const bulkInsert = [];
    Object.keys(updateList).forEach((key) => {
      bulkInsert.push({
        type: 'update',
        args: {
          table: 'brand_listing',
          returning: ['id'],
          'where': {'id': parseInt(key, 10)},
          $set: {
            all_display_order: parseInt(updateList[key], 10),
          }
        },
      });
    });
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
      return Promise.all([
        dispatch(indexSku(lstate.updateIndex)),
        dispatch(routeActions.push('/hadmin')),
      ]);
    }).catch((err) => {
      alert('Failure');
      return err;
    });
  };
};

const featuredListingReducer = (state = defaultfeaturedListingData, action) => {
  switch (action.type) {
    case GENRE_FETCH:
      return {...state, allGenre: action.data};
    case STATE_FETCH:
      return {...state, allState: action.data};
    case LISTING_FETCH:
      return {...state, allList: action.data };
    case UPDATE_LIST:
      return {...state, updateList: {...state.updateList, ...action.data}};
    case UPDATE_INDEX:
      state.updateIndex.push(action.indexData);
      state.updateIndex = state.updateIndex.filter((item, pos) => {
        return state.updateIndex.indexOf(item) === pos;
      });
      return {...state};
    case AD_INFO:
      const camInfo = {};
      camInfo[action.data.key] = action.data.value;
      return { ...state, campaignDetails: { ...state.campaignDetails, ...camInfo}};
    case RESET:
      return defaultfeaturedListingData;
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchListing,
  finalUpdate,
  storeUpdatedList,
  UPDATE_LIST,
  UPDATE_INDEX,
  RESET,
  AD_INFO
//  finalSave,
};

export default featuredListingReducer;
