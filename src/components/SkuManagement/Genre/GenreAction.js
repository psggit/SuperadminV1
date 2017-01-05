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

/* End of it */

/* Gets a state object with keys as genre_name, created_at and updated_at and inserts it into genre table
* Post insert loads the GenreManagement .js
* */
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
    payload.returning = ['id'];

    const url = Endpoints.db + '/table/' + 'genre' + '/insert';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };

    return dispatch(requestAction(url, options))
      .then(( resp ) => {
        if ( resp.returning.length > 0 ) {
          return dispatch(routeActions.push('/hadmin/genre_management'));
        }
      })
      .catch(() => {
        alert('Sorry error occured while inserting');
      });
  };
};

const fetchGenre = (genreId) => {
  return (dispatch) => {
    //
    const payload = {
      'where': {'id': genreId},
      'columns': ['*']
    };

    const url = Endpoints.db + '/table/' + 'genre' + '/select';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
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
      'image': currState.image
    };
    payload.where = {
      'id': currState.genreId
    };
    payload.returning = ['id'];

    const url = Endpoints.db + '/table/' + 'genre' + '/update';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options))
      .then( ( resp ) => {
        if ( resp.returning.length > 0 ) {
          return dispatch(routeActions.push('/hadmin/genre_management'));
        }
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
  MAKE_REQUEST
};
