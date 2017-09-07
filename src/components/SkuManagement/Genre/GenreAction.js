/* Imports */

import { defaultGenreState } from '../../Common/Actions/DefaultState';

import requestAction from '../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

import { MAKE_REQUEST,
  REQUEST_COMPLETED,
  REQUEST_ERROR } from '../../Common/Actions/Actions';

import { routeActions } from 'redux-simple-router';

/* End of it */

/* Action constants */

const GENRE_FETCHED = '@genre/GENRE_FETCHED';
const RESET = '@genre/RESET';

const INPUT_VALUE_CHANGED = '@genre/INPUT_VALUE_CHANGED';
const IMAGE_UPLOAD_SUCCESS = '@genre/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = '@genre/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = '@genre/CANCEL_IMAGE';

/* End of it */

/* Gets a state object with keys as genre_name, created_at and updated_at and inserts it into genre table
* Post insert loads the GenreManagement .js
* */

const indexGenre = (genreShort) => {
  return ( dispatch, getState ) => {
    const url = Endpoints.backendUrl + '/retailer/profile/updateGenre';
    const insertObj = {'genreShort': genreShort};
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };
    return dispatch( requestAction( url, options ) );
  };
};

const insertGenre = () => {
  return ( dispatch, getState ) => {
    const currState = getState().genre_data;
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    if ( currState.genreName.length === 0 || currState.displayName.length === 0 || currState.displayOrder === 0 ) {
      alert('Genre name, display name cannot be empty');
      return false;
    }

    const payload = {};
    payload.objects = [{
      'genre_name': currState.genreName,
      'display_name': currState.displayName,
      'ordinal_position': currState.displayOrder,
      'is_active': currState.genreStatus,
      'image': currState.image,
      'short_name': currState.genreName.replace(' ', '-').toLowerCase()
    }];
    payload.returning = ['id', 'short_name'];

    const url = Endpoints.db + '/table/' + 'genre' + '/insert';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };

    return dispatch(requestAction(url, options))
      .then( (resp) => {
        alert('Indexing');
        return dispatch(indexGenre(resp.returning[0].short_name));
      })
      .then(( ) => {
        return dispatch(routeActions.push('/hadmin/genre_management'));
      })
      .catch(() => {
        alert('Sorry error occured while inserting');
      });
  };
};

const fetchGenre = (genreId) => {
  return (dispatch, getState) => {
    //
    const payload = {
      'where': {'id': genreId},
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction( url, options, GENRE_FETCHED, REQUEST_ERROR ));
  };
};

const resetGenre = () => {
  return (dispatch) => {
    dispatch({type: RESET});
  };
};

const updateGenre = () => {
  return (dispatch, getState ) => {
    const currState = getState().genre_data;
    //
    if ( currState.genreName.length === 0 || currState.displayName.length === 0 || currState.displayOrder === 0 ) {
      alert('Genre name, display name cannot be empty');
      return false;
    }
    const payload = {};
    payload.values = {
      'genre_name': currState.genreName,
      'display_name': currState.displayName,
      'ordinal_position': currState.displayOrder,
      'is_active': currState.genreStatus,
      'image': currState.image,
      'updated_at': new Date().toISOString()
    };
    payload.where = {
      'id': currState.genreId
    };
    payload.returning = ['id', 'short_name'];

    const url = Endpoints.db + '/table/' + 'genre' + '/update';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options))
      .then( (resp) => {
        return dispatch(indexGenre(resp.returning[0].short_name));
      })
      .then( ( ) => {
        return dispatch(routeActions.push('/hadmin/genre_management'));
      })
      .catch( () => {
        alert('Sorry error occured while updating');
      });
  };
};
/* Reducer */

const genreReducer = (state = defaultGenreState, action) => {
  switch (action.type) {
    case GENRE_FETCHED:
      return { ...state, genreId: action.data[0].id, genreName: action.data[0].genre_name, displayName: action.data[0].display_name, displayOrder: action.data[0].ordinal_position, image: action.data[0].image, genreStatus: action.data[0].is_active };
    case INPUT_VALUE_CHANGED:
      const categoryInfo = {};
      categoryInfo[action.data.key] = action.data.value;
      return { ...state, ...categoryInfo };
    case IMAGE_UPLOAD_SUCCESS:
      console.log(Endpoints);
      return { ...state, image: Endpoints.file_get + action.data[0]};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, image: ''};
    case CANCEL_IMAGE:
      return { ...state, image: ''};
    case RESET:
      return { ...defaultGenreState };
    default:
      return { ...state };
  }
};

/* End of it */

export default genreReducer;

export {
  insertGenre,
  fetchGenre,
  resetGenre,
  updateGenre,
  INPUT_VALUE_CHANGED,
  REQUEST_COMPLETED,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  MAKE_REQUEST
};
