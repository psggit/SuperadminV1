/*
 * Will receive default state from Common
 * */

import { defaultCategoryState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR, RESET } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

/* End of it */

/* Action Constants */

const GENRE_FETCHED = '@category/GENRE_FETCHED';
const CATEGORY_FETCHED = '@category/CATEGORY_FETCHED';

const INPUT_VALUE_CHANGED = '@category/INPUT_VALUE_CHANGED';

/* ****** Action Creators ******** */

const fetchCategory = ( categoryId ) => {
  return (dispatch) => {
    /* Url */
    const url = Endpoints.db + '/table/category/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    queryObj.where = {
      'id': parseInt(categoryId, 10)
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
      dispatch(requestAction(url, options, CATEGORY_FETCHED, REQUEST_ERROR)),
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
      dispatch(requestAction(url, options, GENRE_FETCHED, REQUEST_ERROR)),
      dispatch({type: REQUEST_COMPLETED})
    ]);
  };
};

const insertCategory = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/category/insert';
    const insertObj = {};
    const currState = getState().category_data;

    if ( !currState.genreId || !currState.name ) {
      alert('Genre and Name of the category are important for category creation');
      return dispatch({type: REQUEST_COMPLETED});
    }

    const categoryObj = {
      'genre_id': parseInt(currState.genreId, 10),
      'name': currState.name.toUpperCase(),
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
    };

    insertObj.objects = [categoryObj];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(insertObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/category_management'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a category entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

const updateCategory = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/category/update';
    const updateObj = {};
    const currState = getState().category_data;

    if ( !currState.genreId || !currState.name ) {
      alert('Genre and Name of the category are important for category creation');
      return dispatch({type: REQUEST_COMPLETED});
    }

    const categoryObj = {
      'genre_id': parseInt(currState.genreId, 10),
      'name': currState.name.toUpperCase()
    };

    updateObj.values = categoryObj;
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': currState.categoryId
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(updateObj)
    };
    dispatch({type: MAKE_REQUEST});
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0) {
          return dispatch(routeActions.push('/hadmin/category_management'));
        }
        return dispatch({type: REQUEST_COMPLETED});
      })
      .catch((resp) => {
        console.log(resp);
        alert('Something wrong happened while creating a category entry');
        return dispatch({type: REQUEST_COMPLETED});
      });
  };
};

/* ====== End of functions */

const categoryReducer = (state = defaultCategoryState, action) => {
  switch (action.type) {
    case GENRE_FETCHED:
      return { ...state, genreList: action.data};
    case INPUT_VALUE_CHANGED:
      const categoryInfo = {};
      categoryInfo[action.data.key] = action.data.value;
      return { ...state, ...categoryInfo };
    case CATEGORY_FETCHED:
      return { ...state, name: action.data[0].name, genreId: action.data[0].genre_id, categoryId: action.data[0].id};
    default:
      return { ...state };
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCategory,
  fetchGenre,
  RESET,
  INPUT_VALUE_CHANGED,
  insertCategory,
  updateCategory
};
export default categoryReducer;