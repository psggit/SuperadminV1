/*
 * Will receive default state from Common
 * */

import { defaultBrandManagerProfileState} from '../../Common/Actions/DefaultState';
// import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

/* ****** Action Creators ******** */

const getBrandManagerData = (page, limit) => {
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
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'common_ads_listing_sa' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
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
                     console.log(d);
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

const getBrandManagerCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'common_ads_listing_sa' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
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

const getAllBrandManagerData = (page, limit) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getBrandManagerCount())
      .then(() => {
        return dispatch(getBrandManagerData(gotPage, gotLimit));
      })
      .then(() => {
        console.log('BrandManager Data fetched');
      });
  };
};

// CAUTION : Taking ad type from view field which is of format 'type_ad' and requesting to table 'ad_type'
export const toggleActivation = (id, type, status) => {
  return (dispatch) => {
    let activeTag;
    dispatch({ type: MAKE_REQUEST});
    if (status === 'Active') {
      activeTag = 'Inactive';
    } else {
      activeTag = 'Active';
    }
    const payLoad = {
      status: activeTag
    };
    let table = type.slice(0, -3);
    table = 'ad_' + table;
    const updateObj = {};
    updateObj.values = { ...payLoad };
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': parseInt(id, 10),
    };
    const url = Endpoints.db + '/table/' + table + '/update';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   () => {
                     return dispatch(getBrandManagerData(1, 10));
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


/* Figureout this part */

/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

const adsListReducer = (state = defaultBrandManagerProfileState, action) => {
  console.log(action.type);
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {...state, lastSuccess: action.data};
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getAllBrandManagerData,
  getBrandManagerData,
  RESET
};
export default adsListReducer;
