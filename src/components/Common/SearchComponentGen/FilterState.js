/* Default State */

const defaultState = {
  'isSearched': false
};

/* Action constants */

const ADD_DELETE_FILTER = '@genSearch/ADD_DELETE_FILTER';
const TOGGLE_SEARCH = '@genSearch/TOGGLE_SEARCH';
const RESET_FILTER = '@genSearch/RESET_FILTER';

/* End of it */

const genSearchReducer = ( state = defaultState, action ) => {
  switch ( action.type ) {
    case ADD_DELETE_FILTER:
      return { ...state, [action.data.filter]: { ...action.data.data }};
    case TOGGLE_SEARCH:
      return { ...state, isSearched: true };
    case RESET_FILTER:
      return { ...defaultState };
    default:
      return { ...state };
  }
};

export default genSearchReducer;
export {
  ADD_DELETE_FILTER,
  TOGGLE_SEARCH,
  RESET_FILTER
};
