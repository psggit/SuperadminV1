import defaultState, {defaultViewState} from './DataState';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import requestAction from './requestAction';

/* ****************** View actions *************/
const V_SET_DEFAULTS = 'ViewTable/V_SET_DEFAULTS';
const V_REQUEST_SUCCESS = 'ViewTable/V_REQUEST_SUCCESS';
const V_REQUEST_ERROR = 'ViewTable/V_REQUEST_ERROR';
const V_EXPAND_REL = 'ViewTable/V_EXPAND_REL';
const V_CLOSE_REL = 'ViewTable/V_CLOSE_REL';

// const V_ADD_WHERE;
// const V_REMOVE_WHERE;
// const V_SET_LIMIT;
// const V_SET_OFFSET;
// const V_ADD_SORT;
// const V_REMOVE_SORT;

/* ****************** action creators *************/
const vSetDefaults = () => ({type: V_SET_DEFAULTS});
const vMakeRequest = () => {
  return (dispatch, getState) => {
    const state = getState();
    const url = Endpoints.db + '/table/' + state.tables.currentTable + '/select';
    const options = {
      method: 'POST',
      body: JSON.stringify(state.tables.view.query),
      headers: { 'Content-Type': 'application/json' }
    };
    return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
  };
};
const vExpandRel = (path, relname, pk) => {
  return (dispatch) => {
    // Modify the query (UI will automatically change)
    dispatch({type: V_EXPAND_REL, path, relname, pk});
    // Make a request
    return dispatch(vMakeRequest());
  };
};
const vCloseRel = (path) => {
  return (dispatch) => {
    // Modify the query (UI will automatically change)
    dispatch({type: V_CLOSE_REL, path});
    // Make a request
    return dispatch(vMakeRequest());
  };
};

/* ************ helpers ************************/
const expandQuery = (query, tableName, pk, path, relname, schemas) => {
  // Find the child
  const tableSchema = schemas.find(x => x.name === tableName);
  const childTable = parentSchema.relationships.find(r => r.name === relname).rtable;
  const childTableSchema = schemas.find(x => x.name === childTable);

  if (path.length === 0) {
    const newColumns = [...query.columns, {name: relname, columns: childTableSchema.columns.map(cl => cl.name)}];
    return {...query, where: pk, columns: newColumns};
  }
};
const closeQuery = (query, tableName, path, schemas) => { // eslint-disable-line no-unused-vars
  if (path.length === 1) {
    const arrRelName = path[0];
    const arrRelIndex = query.columns.findIndex((c) => (typeof(c) === 'object') && (c.name === arrRelName));
    const newColumns = [
      ...query.columns.slice(0, arrRelIndex),
      ...query.columns.slice(arrRelIndex + 1)
    ];
    return {columns: newColumns};
  }
  // FIXME: FOr path.length > 1. Default limit and size
};

/* ****************** reducer ******************/
const viewReducer = (tableName, schemas, viewState, action) => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case V_SET_DEFAULTS:
      return {
        ...defaultViewState,
        query: {
          columns: schemas.find(t => t.name === tableName).columns.map(c => c.name)
        },
        activePath: [tableName]
      };
    case V_EXPAND_REL:
      return {
        ...viewState,
        query: expandQuery(viewState.query, tableName, action.pk, action.path, action.relname, schemas)
      };
    case V_CLOSE_REL:
      return {
        ...viewState,
        query: closeQuery(state.view.query, tableName, action.path, schemas)
      };
    case V_REQUEST_SUCCESS:
      return { ...viewState, rows: action.data};
    default:
      return state;
  }
  return state;
};

export {
  vSetDefaults, vMakeRequest,
  vExpandHeading, vExpandArrRel,
  vCloseArrRel
};
