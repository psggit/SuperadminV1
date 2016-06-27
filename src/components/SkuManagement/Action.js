/* State
{
ongoingRequest: false // true if request is going on
lastError: {} or <string>
lastSuccess: {} or <object>
}
*/

/* Fetch module for API requests */
import fetch from 'isomorphic-fetch';

import Endpoints, {globalCookiePolicy} from '../../Endpoints';

import { routeActions } from 'redux-simple-router';

/* Actions */

const MAKE_REQUEST = 'CTSKU/MAKE_REQUEST';
const REQUEST_SUCCESS = 'CTSKU/REQUEST_SUCCESS';
const UPDATE_STATE = 'CTSKU/UPDATE_STATE';
const UPDATE_GENRE = 'CTSKU/UPDATE_GENRE';
const UPDATE_CATEGORY = 'CTSKU/UPDATE_CATEGORY';
const COUNT_FETCHED = 'CTSKU/COUNT_FETCHED';
const REQUEST_ERROR = 'CTSKU/REQUEST_ERROR';
const SECONDARY_VIEW = 'CTSKU/SECONDARY_VIEW';
const RESET = 'CTSKU/RESET';

// HTML Component defines what state it needs
// HTML Component should be able to emit actions
// When an action happens, the state is modified (using the reducer function)
// When the state is modified, anybody dependent on the state is asked to update
// HTML Component is listening to state, hence re-renders

const defaultState = {ongoingRequest: false, lastError: {}, lastSuccess: [], credentials: null, secondaryData: null, count: 1};

const skuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {...state, ongoingRequest: true, lastSuccess: [], lastError: {}, secondaryData: {}};
    case REQUEST_SUCCESS:
      return {...state, ongoingRequest: false, lastSuccess: action.data, lastError: {}, credentials: action.data, secondaryData: {}};
    case UPDATE_STATE:
      return Object.assign({}, state, { lastSuccess: [{...state.lastSuccess[0], state_name: action.data}]});
    case UPDATE_GENRE:
      return Object.assign({}, state, { lastSuccess: [{...state.lastSuccess[0], genre_name: action.data}]});
    case UPDATE_CATEGORY:
      return Object.assign({}, state, { lastSuccess: [{...state.lastSuccess[0], name: action.data}]});
    case COUNT_FETCHED:
      return {...state, count: action.data.count};
    case REQUEST_ERROR:
      return {...state, ongoingRequest: false, lastError: {'error': action.data}, lastSuccess: [], secondaryData: {}};
    case SECONDARY_VIEW:
      return {...state, ongoingRequest: false, lastSuccess: [], secondaryData: action.data};
    case RESET:
      return {...defaultState};
    default: return state;
  }
};

// Action Maker
const requestSuccess = (data) => ({type: REQUEST_SUCCESS, data: data});
const requestFailed = (data) => ({type: REQUEST_ERROR, data: data});

const getSecondaryData = (data, key) => {
  return (dispatch) => {
    console.log(data);
    dispatch({type: SECONDARY_VIEW, data: data[0][key]});
  };
};

const loadCredentials = () => {
  return (dispatch) => {
    const p1 = new Promise((resolve, reject) => {
      fetch(Endpoints.getCredentials, {credentials: globalCookiePolicy}).then(
        (response) => {
          if (response.ok) {
            response.json().then(
              (creds) => {
                dispatch(requestSuccess(creds));
                resolve();
              },
              () => { reject(); }
            );
          } else {
            reject();
          }
        },
        () => { reject(); }
      );
    });
    return p1;
  };
};

const getStateCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'state' + '/count';
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

const getStateData = (page) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'state' + '/select';
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

/* Gets a state object with keys as state_name, state_billing_id, created_at and updated_at and inserts it into state table
* Post insert loads the StateManagement.js
* */
const insertState = (stateObj) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {};
    payload.objects = [stateObj];
    payload.returning = ['id'];


    const url = Endpoints.db + '/table/' + 'state' + '/insert';
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
                     alert('State Successfully Inserted');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/state_management'))
                     ]);
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

const fetchState = (stateId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = {
      'where': {'id': stateId},
      'columns': ['*', { 'name': 'cities', 'columns': ['id', 'name', 'gps'] }]
    };

    const url = Endpoints.db + '/table/' + 'state' + '/select';
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
                     dispatch({type: REQUEST_SUCCESS, data: d});
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

const updateStateText = (stateText) => {
  return (dispatch) => {
    dispatch({type: UPDATE_STATE, data: stateText});
  };
};

const resetState = () => {
  return (dispatch) => {
    dispatch({type: RESET});
  };
};

const updateState = (updateObj, stateId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = updateObj;
    payload.where = {
      'id': stateId
    };

    const url = Endpoints.db + '/table/' + 'state' + '/update';
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
                     alert('State Successfully Updated');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/state_management'))
                     ]);
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

const getAllStateData = (page) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getStateCount())
      .then(() => {
        return dispatch(getStateData(gotPage));
      })
      .then(() => {
        console.log('Recharge Data fetched');
      });
  };
};

/* Genre Actions */

const getGenreCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/count';
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

const getGenreData = (page) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/select';
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

/* Gets a state object with keys as genre_name, created_at and updated_at and inserts it into genre table
* Post insert loads the GenreManagement .js
* */
const insertGenre = (genreObj) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {};
    payload.objects = [genreObj];
    payload.returning = ['id'];


    const url = Endpoints.db + '/table/' + 'genre' + '/insert';
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
                     alert('Genre Successfully Inserted');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/genre_management'))
                     ]);
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

const fetchGenre = (genreId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = {
      'where': {'id': genreId},
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/select';
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
                     dispatch({type: REQUEST_SUCCESS, data: d});
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

const updateGenreText = (genreText) => {
  return (dispatch) => {
    dispatch({type: UPDATE_GENRE, data: genreText});
  };
};

const resetGenre = () => {
  return (dispatch) => {
    dispatch({type: RESET});
  };
};

const updateGenre = (updateObj, genreId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = updateObj;
    payload.where = {
      'id': genreId
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/update';
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
                     alert('Genre Successfully Updated');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/genre_management'))
                     ]);
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

const getAllGenreData = (page) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getGenreCount())
      .then(() => {
        return dispatch(getGenreData(gotPage));
      })
      .then(() => {
        console.log('Recharge Data fetched');
      });
  };
};


/* End of it */

/* Category Actions */

const getCategoryCount = () => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    const payload = {
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'category' + '/count';
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

const getCategoryData = (page) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;

    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;

    const payload = {
      columns: ['*'],
      limit: limit,
      offset: offset,
      order_by: '+id'
    };

    const url = Endpoints.db + '/table/' + 'category' + '/select';
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

/* Gets a state object with keys as name, created_at and updated_at and inserts it into category table
* Post insert loads the CategoryManagement.js
* */
const insertCategory = (categoryObj) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {};
    payload.objects = [categoryObj];
    payload.returning = ['id'];


    const url = Endpoints.db + '/table/' + 'category' + '/insert';
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
                     alert('Category Successfully Inserted');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/category_management'))
                     ]);
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

const fetchCategory = (categoryId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = {
      'where': {'id': categoryId},
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'category' + '/select';
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
                     dispatch({type: REQUEST_SUCCESS, data: d});
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

const updateCategoryText = (categoryText) => {
  return (dispatch) => {
    dispatch({type: UPDATE_CATEGORY, data: categoryText});
  };
};

const resetCategory = () => {
  return (dispatch) => {
    dispatch({type: RESET});
  };
};

const updateCategory = (updateObj, categoryId) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    const payload = updateObj;
    payload.where = {
      'id': categoryId
    };

    const url = Endpoints.db + '/table/' + 'category' + '/update';
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
                     alert('Category Successfully Updated');
                     return Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d.returning}),
                       dispatch(routeActions.push('/hadmin/category_management'))
                     ]);
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

const getAllCategoryData = (page) => {
  const gotPage = page;
  /* Dispatching first one */
  return (dispatch) => {
    dispatch(getCategoryCount())
      .then(() => {
        return dispatch(getCategoryData(gotPage));
      })
      .then(() => {
        console.log('Recharge Data fetched');
      });
  };
};


/* End of it */

export default skuReducer;
export {requestSuccess,
  requestFailed,
  loadCredentials,
  RESET,
  getSecondaryData,
  getAllStateData,
  getStateData,
  insertState,
  fetchState,
  updateState,
  updateStateText,
  getAllGenreData,
  getGenreData,
  insertGenre,
  fetchGenre,
  updateGenre,
  updateGenreText,
  resetState,
  resetGenre,
  getAllCategoryData,
  getCategoryData,
  insertCategory,
  fetchCategory,
  updateCategory,
  updateCategoryText,
  resetCategory,
};
