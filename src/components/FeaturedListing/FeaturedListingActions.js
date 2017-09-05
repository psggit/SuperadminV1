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
const FEATURED_INFO = 'FEATUREDLISTING/UPDATE';
const ADD_TO_FEATURED = 'FEATUREDLISTING/ADDTOFEATURED';
const REMOVE_FROM_FEATURED = 'FEATUREDLISTING/REMOVEFROMFEATURED';
const UPDATE_LIST = 'FEATUREDLISTING/UPDATE_LIST';
const UPDATE_INDEX = 'FEATUREDLISTING/UPDATE_INDEX';
const SEARCH_ITEMS = 'FEATUREDLISTING/SEARCH_ITEMS';
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
    const featuredList = lstate.featuredList;
    const allList = lstate.allList;
    const bulkInsert = [];
    featuredList.forEach((indiv) => {
      bulkInsert.push({
        type: 'update',
        args: {
          table: 'brand_listing',
          returning: ['id'],
          'where': {'id': indiv.id},
          $set: {
            featured_order: indiv.featured_order,
            is_featured: indiv.is_featured
          }
        },
      });
    });
    allList.forEach((indiv) => {
      bulkInsert.push({
        type: 'update',
        args: {
          table: 'brand_listing',
          returning: ['id'],
          'where': {'id': indiv.id},
          $set: {
            featured_order: indiv.featured_order,
            is_featured: indiv.is_featured
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

const findProduct = (list, attribute, value) => {
  const finalProd = list.find((indiv) => {
    if (indiv[attribute] === value) {
      return indiv;
    }
  });
  finalProd.is_featured = !(finalProd.is_featured);
  return finalProd;
};

const searchProduct = (list, searchTerm, attribute) => {
  const searchedProduct = list.map((indiv) => {
    if (indiv[attribute].toLowerCase().search(searchTerm) === -1) {
      indiv.is_invisible = true;
    } else {
      indiv.is_invisible = false;
    }
    return indiv;
  });
  return searchedProduct;
};


const updateProduct = (list, attribute, id, value) => {
  const finalProd = list.map((indiv) => {
    if (indiv[attribute] === id) {
      indiv.featured_order = value;
    }
    return indiv;
  });
  return finalProd;
};

const featuredListingReducer = (state = defaultfeaturedListingData, action) => {
  switch (action.type) {
    case GENRE_FETCH:
      return {...state, allGenre: action.data};
    case STATE_FETCH:
      return {...state, allState: action.data};
    case LISTING_FETCH:
      const featuredList = action.data.filter((indiv) => {
        if (indiv.is_featured === true) {
          return indiv;
        }
      });
      const allList = action.data.filter((indiv) => {
        if (indiv.is_featured === false) {
          return indiv;
        }
      });
      return {...state, featuredList: featuredList, allList: allList };
    case ADD_TO_FEATURED:
      const addedItem = findProduct(state.allList, 'id', parseInt(action.data, 10));
      return {...state, featuredList: [...state.featuredList, addedItem]};
    case SEARCH_ITEMS:
      const searchedItem = searchProduct(state.allList, action.data, 'brand_name');
      return {...state, featuredList: [...state.featuredList, searchedItem]};
    case REMOVE_FROM_FEATURED:
      const removedItem = findProduct(state.featuredList, 'id', parseInt(action.data, 10));
      return {...state, allList: [...state.allList, removedItem]};
    case UPDATE_LIST:
      const list = updateProduct(state.featuredList, 'id', action.data.id, action.data.value );
      return {...state, featuredList: [...list]};
    case UPDATE_INDEX:
      return {...state, updateIndex: [...state.updateIndex, action.value]};
    case FEATURED_INFO:
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
  ADD_TO_FEATURED,
  REMOVE_FROM_FEATURED,
  SEARCH_ITEMS,
  RESET,
  FEATURED_INFO
//  finalSave,
};

export default featuredListingReducer;
