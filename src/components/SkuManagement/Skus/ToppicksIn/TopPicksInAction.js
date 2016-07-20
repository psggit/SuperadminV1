/*
 * Will receive default state from Common
 * */

import { defaultTopPicksState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';

import indexBrand from '../../../Common/Actions/indexBrand';

import {
  MAKE_REQUEST
  , REQUEST_SUCCESS
  , COUNT_FETCHED
  , REQUEST_ERROR
  , RESET
} from '../../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const STATE_FETCHED = '@toppicks/STATE_FETCHED';
const GENRE_FETCHED = '@toppicks/GENRE_FETCHED';

/* End of it */
/* ****** Action Creators ******** */

const getTopPicksCount = (genreId, stateId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*'],
      'where': {
        'state_id': parseInt(stateId, 10),
        'sku': {
          'brand': {
            'genre_id': parseInt(genreId, 10)
          }
        },
        'is_top': true
      }
    };

    const url = Endpoints.db + '/table/' + 'sku_pricing' + '/count';
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
const getTopPicksData = (genreId, stateId, page, limit) => {
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
      columns: ['*', {
        'name': 'state',
        'columns': ['state_name']
      }, {
        'name': 'sku',
        'columns': ['*', {
          'name': 'brand',
          'columns': ['*', {
            'name': 'genre',
            'columns': ['genre_name']
          }]
        }]
      }],
      where: {
        'state_id': parseInt(stateId, 10),
        'sku': {
          'brand': {
            'genre_id': parseInt(genreId, 10)
          }
        },
        'is_top': true
      },
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'sku_pricing' + '/select';
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

const getStateGenreData = (genreId, stateId ) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //

    const payload = {
      columns: [ 'state_name', 'id'],
      where: {
        'id': parseInt(stateId, 10)
      }
    };

    let url = Endpoints.db + '/table/' + 'state' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return dispatch(requestAction(url, options))
      .then( (stateObj) => {
        dispatch({ type: STATE_FETCHED, data: stateObj });
        const genreObj = {
          'columns': ['genre_name', 'id'],
          'where': {
            'id': genreId
          }
        };
        url = Endpoints.db + '/table/' + 'genre' + '/select';
        options.body = JSON.stringify(genreObj);
        return dispatch(requestAction(url, options));
      })
    .then( (genreObj) => {
      return dispatch({ type: GENRE_FETCHED, data: genreObj });
    })
    .catch( (errorObj) => {
      alert('error: ' + JSON.stringify(errorObj));
    });
  };
};

const getAllTopPicksData = (page, limit, genreId, stateId ) => {
  const gotPage = page;
  const gotLimit = limit;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getTopPicksCount(genreId, stateId))
      .then(() => {
        return dispatch(getTopPicksData(genreId, stateId, gotPage, gotLimit));
      })
      .then(() => {
        console.log('Brand Data fetched');
      });
  };
};

const deleteTopPick = ( skuPricingId, brandId ) => {
  return ( dispatch, getState ) => {
    const deleteUrl = Endpoints.db + '/table/sku_pricing/update';
    const currState = getState().sku_top_picks_state_genre_data;
    const deleteObj = {};
    deleteObj.where = {
      'id': skuPricingId
    };
    deleteObj.values = {
      'is_top': false
    };
    deleteObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(deleteObj),
    };

    return dispatch(requestAction(deleteUrl, options))
      .then( ( resp ) => {
        if ( !resp.returning.length ) {
          alert('Something went wrong while deleting the top pick, please contact the administrator');
          return dispatch({ type: REQUEST_ERROR });
        }

        /* Will index the brand */
        dispatch(indexBrand(brandId));
        /* */

        return dispatch(getAllTopPicksData( 1, 10, currState.genreId, currState.stateId ));
      })
      .catch( () => {
        alert('Something went wrong while deleting the top pick, please contact the administrator');
        return dispatch({ type: REQUEST_ERROR });
      });
  };
};

/* State of reducer */
console.log('defaultTopPicksState');
console.log(defaultTopPicksState);

const skuTopPicksReducer = (state = defaultTopPicksState, action) => {
  switch (action.type) {
    case STATE_FETCHED:
      return {...state, state: action.data[0].state_name, stateId: action.data[0].id};
    case GENRE_FETCHED:
      return {...state, genre: action.data[0].genre_name, genreId: action.data[0].id};
    case RESET:
      return { ...defaultTopPicksState };
    default:
      return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  getTopPicksCount,
  getAllTopPicksData,
  getTopPicksData,
  RESET,
  getStateGenreData,
  deleteTopPick
};

export default skuTopPicksReducer;
