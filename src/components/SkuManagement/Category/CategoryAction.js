/*
 * Will receive default state from Common
 * */

import { defaultCategoryState } from '../../Common/Actions/DefaultState';
import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

/* End of it */

/* Action Constants */

const GENRE_FETCHED = '@category/GENRE_FETCHED';
const CATEGORY_FETCHED = '@category/CATEGORY_FETCHED';
const RESET = '@category/RESET';

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
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options, CATEGORY_FETCHED, REQUEST_ERROR))
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
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return Promise.all([
      dispatch(requestAction(url, options, GENRE_FETCHED, REQUEST_ERROR))
    ]);
  };
};

const insertCategory = () => {
  return (dispatch, getState) => {
    const url = Endpoints.db + '/table/category/insert';
    const insertObj = {};
    const currState = getState().category_data;

    if ( !currState.genreShort || !currState.name ) {
      alert('Genre and Name of the category are important for category creation');
      return dispatch({type: REQUEST_COMPLETED});
    }

    const categoryObj = {
      'genre_short_name': currState.genreShort,
      'name': currState.name.toUpperCase(),
      'short_name': currState.name.replace(' ', '-').toLowerCase(),
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString(),
      'is_active': currState.categoryStatus
    };

    insertObj.objects = [categoryObj];
    insertObj.returning = ['id'];

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
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

    if ( !currState.genreShort || !currState.name ) {
      alert('Genre and Name of the category are important for category creation');
      return dispatch({type: REQUEST_COMPLETED});
    }

    const categoryObj = {
      'genre_short_name': currState.genreShort,
      'name': currState.name.toUpperCase(),
      'is_active': currState.categoryStatus
    };

    updateObj.values = categoryObj;
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': currState.categoryId
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
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
      return { ...state, name: action.data[0].name, genreShort: action.data[0].genre_short_name, categoryId: action.data[0].id, categoryStatus: action.data[0].is_active ? true : false };
    case RESET:
      return { ...defaultCategoryState };
    default:
      return { ...state };
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchCategory,
  fetchGenre,
  INPUT_VALUE_CHANGED,
  insertCategory,
  updateCategory,
  RESET,
  REQUEST_COMPLETED,
  MAKE_REQUEST
};
export default categoryReducer;
