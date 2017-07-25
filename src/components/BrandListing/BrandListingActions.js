import { defaultbrandListingData} from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy, dataUrl } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';
import {indexSku} from '../SkuManagement/Brand/BrandAction';


const STATE_FETCH = 'BRANDLISTING/STATES_FETCH';
const GENRE_FETCH = 'BRANDLISTING/GENRES_FETCH';
const LISTING_FETCH = 'BRANDLISTING/LISTING_FETCH';
const AD_INFO = 'BRANDLISTING/UPDATE';
const UPDATE_LIST = 'BRANDLISTING/UPDATE_LIST';
const UPDATE_INDEX = 'BRANDLISTING/UPDATE_INDEX';
const RESET = 'BRANDLISTING/RESET';


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

// Fetch all genres
const fetchGenres = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/genre/select';
    const queryObj = {};
    queryObj.columns = ['short_name', 'display_name'];
    queryObj.where = {'is_active': true};
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, GENRE_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Fetch All Listing Order
const fetchListing = (state, genre) => {
  return (dispatch, getState) => {
    if ((state !== undefined) && (genre !== undefined)) {
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
    const lstate = state().brandListingState;
    const updateList = {...lstate.updateList};
    // const adUrl = Endpoints.db + '/table/brand_listing/update';
    // Make Bulk reqquest
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

const brandListingReducer = (state = defaultbrandListingData, action) => {
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
      return defaultbrandListingData;
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchGenres,
  fetchListing,
  finalUpdate,
  storeUpdatedList,
  UPDATE_LIST,
  UPDATE_INDEX,
  RESET,
  AD_INFO
//  finalSave,
};

export default brandListingReducer;
