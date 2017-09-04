import { defaultpositionListingData} from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import { routeActions } from 'redux-simple-router';
import Endpoints, { globalCookiePolicy, dataUrl } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR} from '../Common/Actions/Actions';


const STATE_FETCH = 'POSITIONLISTING/STATES_FETCH';
const TYPES_FETCH = 'POSITIONLISTING/TYPES_FETCH';
const GENRE_FETCH = 'POSITIONLISTING/GENRES_FETCH';
const LISTING_FETCH = 'POSITIONLISTING/LISTING_FETCH';
const AD_INFO = 'POSITIONLISTING/UPDATE';
const UPDATE_LIST = 'POSITIONLISTING/UPDATE_LIST';
const STATE_CHANGE = 'POSITIONLISTING/STATE_CHANGE';
const CREATE_LIST = 'POSITIONLISTING/CREATE_LIST';
const UPDATE_INDEX = 'POSITIONLISTING/UPDATE_INDEX';
const RESET = 'POSITIONLISTING/RESET';


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

const fetchTypes = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/brand_type/select';
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
      dispatch(requestAction(url, options, TYPES_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

// Fetch All Listing Order
const fetchListing = (state) => {
  return (dispatch, getState) => {
    if (state !== undefined) {
      const url = Endpoints.db + '/table/state_position_limits/select';
      const queryObj = {};
      queryObj.columns = ['*'];
      queryObj.where = {
        '$and': [
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
    const lstate = state().positionLimitsState;
    const updateList = {...lstate.updateList};
    const createList = {...lstate.createList};
    const stateShort = lstate.state;
    const bulkInsert = [];
    Object.keys(updateList).forEach((key) => {
      bulkInsert.push({
        type: 'update',
        args: {
          table: 'state_position_limits',
          returning: ['id'],
          'where': {'id': parseInt(key, 10)},
          $set: {
            volume: parseInt(updateList[key], 10),
          }
        },
      });
    });
    Object.keys(createList).forEach((key) => {
      if (!isNaN(parseInt(createList[key], 10))) {
        bulkInsert.push({
          type: 'insert',
          args: {
            table: 'state_position_limits',
            returning: ['id'],
            objects: [{
              state_short_name: stateShort,
              type_id: parseInt(key, 10),
              volume: parseInt(createList[key], 10)
            }]
          },
        });
      }
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
        dispatch(routeActions.push('/hadmin'))
      ]);
    }).catch((err) => {
      alert('Failure');
      return err;
    });
  };
};

const positionListingReducer = (state = defaultpositionListingData, action) => {
  switch (action.type) {
    case GENRE_FETCH:
      return {...state, allGenre: action.data};
    case STATE_FETCH:
      return {...state, allState: action.data};
    case STATE_CHANGE:
      return {...state, state: action.data, updateList: {}, createList: {}};
    case TYPES_FETCH:
      return {...state, allTypes: action.data};
    case LISTING_FETCH:
      return {...state, allList: action.data };
    case UPDATE_LIST:
      state.allList.forEach((indiv) => {
        if (indiv.id === parseInt(Object.keys(action.data)[0], 10)) {
          indiv.volume = action.data[indiv.id];
        }
      });
      return {...state, allList: [...state.allList], updateList: {...state.updateList, ...action.data}};
    case CREATE_LIST:
      return {...state, createList: {...state.createList, ...action.data}};
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
      return defaultpositionListingData;
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStates,
  fetchTypes,
  fetchListing,
  finalUpdate,
  storeUpdatedList,
  STATE_CHANGE,
  UPDATE_LIST,
  CREATE_LIST,
  UPDATE_INDEX,
  RESET,
  AD_INFO
//  finalSave,
};

export default positionListingReducer;
