/*
 * Will receive default state from Common
 * */

import { defaultBrandState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const BRAND_CATEGORY_FETCH = 'BRAND/BRAND_CATEGORY_FETCH';
const BRAND_GENRE_FETCH = 'BRAND/BRAND_GENRE_FETCH';
const BRAND_COMPANY_FETCH = 'BRAND/BRAND_COMPANY_FETCH';
const BRAND_STATE_FETCH = 'BRAND/BRAND_STATE_FETCH';


const VIEW_STATE = 'BRAND/VIEW_STATE';
const TOGGLE_REGION_VISIBILITY = 'BRAND/TOGGLE_REGION_VISIBILITY';
const REGION_INPUT_CHANGED = 'BRAND/REGION_INPUT_CHANGED';

/* Region Related */

const MARK_CITY_SELECTED = 'BRAND/MARK_CITY_SELECTED';
const UNMARK_CITY_SELECTED = 'BRAND/UNMARK_CITY_SELECTED';

/* End of it */

/* ****** Action Creators ******** */

const fetchCategory = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/category/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_CATEGORY_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchGenre = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/genre/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_GENRE_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const fetchCompany = () => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/company/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_COMPANY_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
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
          '*'
        ]
      }
    ];
    queryObj.where = {
      'cities': {
        'id': {
          '$gt': 0
        }
      }
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    /* Make a MAKE_REQUEST action */
    dispatch({type: MAKE_REQUEST});
    return Promise.all([
      dispatch(requestAction(url, options, BRAND_STATE_FETCH, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const viewState = (stateId) => {
  return { type: VIEW_STATE, data: stateId };
};

const insertBrand = (brandObj) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/brand/insert';
    const insertObj = {};

    insertObj.objects = [brandObj];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj)
    };

    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then((resp) => {
        if (resp.returning.length > 0) {
          console.log(resp);
          alert('Brand Entry Created');
          dispatch(routeActions.push('/hadmin/brand_management'));
        }
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a notepad entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* Action Creators for Brand Management Listing */

const getBrandCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'brand' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: COUNT_FETCHED, data: d});
                   },
                   () => {
                     return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
                   }
                 );
               } else {
                 return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
             });
  };
};

const getBrandData = (page, limit) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    offset = (page - 1) * limit;

    const payload = {
      columns: ['*',
        {
          'name': 'category',
          'columns': ['*']
        },
        {
          'name': 'company',
          'columns': ['*']
        },
        {
          'name': 'genre',
          'columns': ['*']
        }
      ],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'brand' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     return dispatch({type: REQUEST_SUCCESS, data: d});
                   },
                   () => {
                     return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
                   }
                 );
               } else {
                 return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
             });
  };
};

const getAllBrandData = (page, limit) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getBrandCount())
      .then(() => {
        return dispatch(getBrandData(gotPage, gotLimit));
      })
      .then(() => {
        console.log('Brand Data fetched');
      });
  };
};

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const brandReducer = (state = defaultBrandState, action) => {
  let selectedState;
  let modifiedState;
  switch (action.type) {
    case BRAND_CATEGORY_FETCH:
      return {...state, categoryList: action.data};
    case BRAND_GENRE_FETCH:
      return {...state, genreList: action.data};
    case BRAND_COMPANY_FETCH:
      return {...state, companyList: action.data};
    case BRAND_STATE_FETCH:
      let countState = 0;
      const stateCityMapping = {};
      while ( countState < action.data.length) {
        stateCityMapping[action.data[countState].id] = {
          is_selected: true,
          selected_cities: {},
          duty_free: 0,
          duty_paid: 0,
          cities: action.data[countState].cities,
          stateInfo: action.data[countState],
          updatedCities: {}
        };
        countState++;
      }
      return {...state, stateList: action.data, stateCityMapping: stateCityMapping};
    case VIEW_STATE:
      return {...state, viewedState: state.stateCityMapping[action.data], viewedCity: {}};
    case TOGGLE_REGION_VISIBILITY:
      return { ...state, showRegionState: !state.showRegionState };
    case REGION_INPUT_CHANGED:
      return { ...state, regionInput: action.data };
    case MARK_CITY_SELECTED:
      /* Get the selected State right now */
      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = {};
      modifiedState[selectedState.stateInfo.id] = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      modifiedState[selectedState.stateInfo.id].selected_cities[action.data] = {
        'id': action.data
      };


      if ( modifiedState[selectedState.stateInfo.id].updatedCities[action.data] ) {
        if (modifiedState[selectedState.stateInfo.id].updatedCities[action.data].location === 'server') {
          delete modifiedState[selectedState.stateInfo.id].updatedCities[action.data];
        } else {
          modifiedState[selectedState.stateInfo.id].updatedCities[action.data] = {
            'action': 'INSERTED',
            'location': 'local'
          };
        }
      } else {
        modifiedState[selectedState.stateInfo.id].updatedCities[action.data] = {
          'action': 'INSERTED',
          'location': 'local'
        };
      }
      return {...state, stateCityMapping: { ...state.stateCityMapping, ...modifiedState }};
    case UNMARK_CITY_SELECTED:
      selectedState = Object.assign( {}, state.viewedState);
      modifiedState = Object.assign({}, state.stateCityMapping[parseInt(selectedState.stateInfo.id, 10)]);
      modifiedState.updatedCities[action.data] = { ...modifiedState.updatedCities[action.data], action: 'DELETED'};
      delete modifiedState.selected_cities[action.data];

      return {...state, stateCityMapping: { ...state.stateCityMapping, ...modifiedState }};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCategory,
  fetchGenre,
  fetchCompany,
  insertBrand,
  getBrandData,
  getAllBrandData,
  fetchState,
  RESET,
  viewState,
  TOGGLE_REGION_VISIBILITY,
  REGION_INPUT_CHANGED,
  MARK_CITY_SELECTED,
  UNMARK_CITY_SELECTED
};
export default brandReducer;
