/*
 * Will receive default state from Common
 * */

import { defaultArticleState } from '../../Common/Actions/DefaultState';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  COUNT_FETCHED,
  REQUEST_ERROR } from '../../Common/Actions/Actions';

const BRAND_FETCHED = 'Brand/BRAND_FETCHED';
/* End of it */

/* ****** Action Creators ******** */

const getArticleCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'whats_new_article' + '/count';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
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

const getArticleData = (page, limit) => {
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
          'name': 'cities',
          'columns': ['*.*']
        }
      ],
      limit: limit,
      offset: offset,
      order_by: '-id'
    };

    const url = Endpoints.db + '/table/' + 'whats_new_article' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
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

const changeArticleStatus = (dataObject) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    const url = Endpoints.bulk;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(dataObject),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     // return dispatch({type: REQUEST_SUCCESS, data: d});
                     alert('Successfully updated');
                     console.log('Article is_active Flag changed' + d);
                     window.location.reload();
                   },
                   () => {
                     // return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
                     alert('Error occured. Please try later');
                   }
                 );
               } else {
                 alert('Error occured. Please try later');
                 // return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
               }
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error.Try again'});
             });
  };
};

const getAllArticleData = (page, limit) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getArticleCount())
      .then(() => {
        return dispatch(getArticleData(gotPage, gotLimit));
      })
      .then(() => {
        console.log('Article Data fetched');
      });
  };
};

/* End of it */


/* ****************** END OF ACTION CREATORS ****************** */

/* ****************** REDUCER ********************************* */

/* ======= Start of normal functions ======= */

/* ====== End of functions */

const articleReducer = (state = defaultArticleState, action) => {
  switch (action.type) {
    case BRAND_FETCHED:
      /* Create region objects */
      return { ...state, articles: action.data };
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getArticleData,
  getAllArticleData,
  changeArticleStatus
};
export default articleReducer;
