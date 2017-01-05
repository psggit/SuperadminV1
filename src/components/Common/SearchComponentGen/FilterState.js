/* Default State */

const defaultState = {
  'isSearched': false,
  'selectedFields': [],
  'filters': {
    '1': {
      'field': '',
      'operator': '',
      'value': ''
    }
  },
  'currentFilter': 1
};

/* Action constants */

const ADD_DELETE_FILTER = '@genSearch/ADD_DELETE_FILTER';
const TOGGLE_SEARCH = '@genSearch/TOGGLE_SEARCH';
const RESET_FILTER = '@genSearch/RESET_FILTER';
const INPUT_CHANGED = '@genSearch/INPUT_CHANGED';
const INCREMENT_FILTER = '@genSearch/INCREMENT_FILTER';
const CLEAR_FILTER = '@genSearch/CLEAR_FILTER';

/* End of it */

const genSearchReducer = ( state = defaultState, action ) => {
  switch ( action.type ) {
    case ADD_DELETE_FILTER:
      return { ...state, [action.data.filter]: { ...action.data.data }};
    case TOGGLE_SEARCH:
      return { ...state, isSearched: true };
    case INCREMENT_FILTER:
      const fields = [ state.filters[action.data].field ];
      return { ...state, selectedFields: [ ...state.selectedFields, ...fields ], currentFilter: action.data + 1, filters: { ...state.filters, [action.data]: { ...state.filters[action.data], isValid: true}, [ action.data + 1 ]: { 'field': '', 'operator': '', 'value': '' } } };
    case INPUT_CHANGED:
      return { ...state, filters: { ...state.filters, [action.data.id]: { ...state.filters[action.data.id], ...action.data.values } } };
    case CLEAR_FILTER:
      const filters = { ...state.filters };
      const selectedFields = [ ...state.selectedFields ];
      selectedFields.splice(( selectedFields.indexOf(state.filters[action.data].field)), 1);
      delete filters[action.data];
      return { ...state, filters: { ...filters }, selectedFields: [ ...selectedFields ]};
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
  RESET_FILTER,
  INPUT_CHANGED,
  INCREMENT_FILTER,
  CLEAR_FILTER
};
