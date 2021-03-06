import {defaultViewState} from './DataState';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import requestAction from './requestAction';
import filterReducer from './FilterActions';

/* ****************** View actions *************/
const V_SET_DEFAULTS = 'ViewTable/V_SET_DEFAULTS';
const V_REQUEST_SUCCESS = 'ViewTable/V_REQUEST_SUCCESS';
const V_REQUEST_ERROR = 'ViewTable/V_REQUEST_ERROR';
const V_EXPAND_REL = 'ViewTable/V_EXPAND_REL';
const V_CLOSE_REL = 'ViewTable/V_CLOSE_REL';
const V_SET_ACTIVE = 'ViewTable/V_SET_ACTIVE';
const V_SET_QUERY_OPTS = 'ViewTable/V_SET_QUERY_OPTS';
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
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));
  };
};

const deleteItem = (pkClause) => {
  return (dispatch, getState) => {
    const isOk = confirm('Permanently delete this row?');
    if (!(isOk)) {
      return;
    }
    const state = getState();
    const url = Endpoints.db + '/table/' + state.tables.currentTable + '/delete';
    const options = {
      method: 'POST',
      body: JSON.stringify({where: pkClause}),
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    dispatch(requestAction(url, options))
      .then(
        () => {
          dispatch(vMakeRequest());
        },
        (err) => {
          alert('Delete failed: ' + JSON.stringify(err));
        });
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
const vCloseRel = (path, relname) => {
  return (dispatch) => {
    // Modify the query (UI will automatically change)
    dispatch({type: V_CLOSE_REL, path, relname});
    // Make a request
    return dispatch(vMakeRequest());
  };
};
/* ************ helpers ************************/
const defaultSubQuery = (relname, tableSchema) => {
  return {
    name: relname,
    columns: tableSchema.columns.map(c => c.name)
  };
};

const expandQuery = (curQuery, curTable, pk, curPath, relname, schemas, isObjRel = false) => {
  if (curPath.length === 0) {
    const rel = curTable.relationships.find(r => r.name === relname);
    const childTableSchema = schemas.find(x => x.name === rel.rtable);
    const newColumns = [...curQuery.columns, defaultSubQuery(relname, childTableSchema)];
    if (isObjRel) {
      return {...curQuery, columns: newColumns};
    }
    // If there's already oldStuff then don't reset it
    if ('oldStuff' in curQuery) {
      return {...curQuery, where: pk, columns: newColumns};
    }

    // If there's no oldStuff then set it
    const oldStuff = {};
    ['where', 'limit', 'offset'].map((k) => {
      if (k in curQuery) {
        oldStuff[k] = curQuery[k];
      }
    });
    return {name: curQuery.name, where: pk, columns: newColumns, oldStuff};
  }

  const curRelName = curPath[0];
  const curRel = curTable.relationships.find(r => r.name === curRelName);
  const childTableSchema = schemas.find(x => x.name === curRel.rtable);
  const curRelColIndex = curQuery.columns.findIndex(c => c.name === curRelName);
  return {
    ...curQuery,
    columns: [
      ...curQuery.columns.slice(0, curRelColIndex),
      expandQuery(curQuery.columns[curRelColIndex], childTableSchema,
        pk, curPath.slice(1), relname,
        schemas, ((curRel.type === 'obj_rel') ? true : false)),
      ...curQuery.columns.slice(curRelColIndex + 1)
    ]
  };
};

const closeQuery = (curQuery, curTable, curPath, relname, schemas) => { // eslint-disable-line no-unused-vars
  if (curPath.length === 0) {
    const expandedIndex = curQuery.columns.findIndex(c => c.name === relname);
    const newColumns = [
      ...curQuery.columns.slice(0, expandedIndex),
      ...curQuery.columns.slice(expandedIndex + 1)
    ];
    const newStuff = {};
    newStuff.columns = newColumns;
    if ('name' in curQuery) {
      newStuff.name = curQuery.name;
    }
    // If no other expanded columns are left
    if (!(newColumns.find(c => typeof(c) === 'object'))) {
      if (curQuery.oldStuff) {
        ['where', 'limit', 'order_by', 'offset'].map((k) => {
          if (k in curQuery.oldStuff) {
            newStuff[k] = curQuery.oldStuff[k];
          }
        });
      }
      return {...newStuff};
    }
    return {...curQuery, ...newStuff};
  }

  const curRelName = curPath[0];
  const curRel = curTable.relationships.find(r => r.name === curRelName);
  const childTableSchema = schemas.find(x => x.name === curRel.rtable);
  const curRelColIndex = curQuery.columns.findIndex(c => c.name === curRelName);
  return {
    ...curQuery,
    columns: [
      ...curQuery.columns.slice(0, curRelColIndex),
      closeQuery(curQuery.columns[curRelColIndex], childTableSchema, curPath.slice(1), relname, schemas),
      ...curQuery.columns.slice(curRelColIndex + 1)
    ]
  };
};

const setActivePath = (activePath, curPath, relname, query) => {
  const basePath = relname ? [activePath[0], ...curPath, relname] : [activePath[0], ...curPath];

  // Now check if there are any more children on this path.
  // If there are, then we should expand them by default
  let subQuery = query;
  let subBase = basePath.slice(1);

  while (subBase.length > 0) {
    subQuery = subQuery.columns.find(c => c.name === subBase[0]); // eslint-disable-line no-loop-func
    subBase = subBase.slice(1);
  }

  subQuery = subQuery.columns.find(c => typeof(c) === 'object');
  while (subQuery) {
    basePath.push(subQuery.name);
    subQuery = subQuery.columns.find(c => typeof(c) === 'object');
  }

  return basePath;
};
const updateActivePathOnClose = (activePath, tableName, curPath, relname, query) => {
  const basePath = [tableName, ...curPath, relname];
  let subBase = [...basePath];
  let subActive = [...activePath];
  let matchingFound = false;
  let commonIndex = 0;
  subBase = subBase.slice(1);
  subActive = subActive.slice(1);

  while (subActive.length > 0) {
    if (subBase[0] === subActive[0]) {
      matchingFound = true;
      break;
    }
    subBase = subBase.slice(1);
    subActive = subActive.slice(1);
    commonIndex += 1;
  }

  if (matchingFound) {
    const newActivePath = activePath.slice(0, commonIndex + 1);
    return setActivePath(newActivePath, newActivePath.slice(1, -1), null, query);
  }
  return [...activePath];
};
const addQueryOptsActivePath = (query, queryStuff, activePath) => {
  let curPath = activePath.slice(1);
  const newQuery = {...query};
  let curQuery = newQuery;
  while (curPath.length > 0) {
    curQuery = curQuery.columns.find(c => c.name === curPath[0]); // eslint-disable-line no-loop-func
    curPath = curPath.slice(1);
  }

  ['where', 'order_by', 'limit', 'offset'].map(k => {
    delete curQuery[k];
  });

  for (const k in queryStuff) {
    if (queryStuff.hasOwnProperty(k)) {
      curQuery[k] = queryStuff[k];
    }
  }
  return newQuery;
};
/* ****************** reducer ******************/
const viewReducer = (tableName, schemas, viewState, action) => {
  if (action.type.indexOf('ViewTable/FilterQuery/') === 0) {
    return {
      ...viewState,
      curFilter: filterReducer(viewState.curFilter, action)
    };
  }
  const tableSchema = schemas.find(x => x.name === tableName);
  switch (action.type) {
    case V_SET_DEFAULTS:
      return {
        ...defaultViewState,
        query: {
          columns: schemas.find(t => t.name === tableName).columns.map(c => c.name)
        },
        activePath: [tableName],
        rows: []
      };
    case V_SET_QUERY_OPTS:
      return {
        ...viewState,
        query: addQueryOptsActivePath(viewState.query, action.queryStuff, viewState.activePath)
      };
    case V_EXPAND_REL:
      return {
        ...viewState,
        query: expandQuery(viewState.query, tableSchema, action.pk, action.path, action.relname, schemas),
        activePath: [...viewState.activePath, action.relname]
      };
    case V_CLOSE_REL:
      const _query = closeQuery(viewState.query, tableSchema, action.path, action.relname, schemas);
      return {
        ...viewState,
        query: _query,
        activePath: updateActivePathOnClose(viewState.activePath, tableName, action.path, action.relname, _query)
      };
    case V_SET_ACTIVE:
      return {
        ...viewState,
        activePath: setActivePath(viewState.activePath, action.path, action.relname, viewState.query)
      };
    case V_REQUEST_SUCCESS:
      return { ...viewState, rows: action.data};
    default:
      return viewState;
  }
  return viewState;
};

export default viewReducer;
export {
  vSetDefaults, vMakeRequest,
  vExpandRel, vCloseRel, V_SET_ACTIVE,
  deleteItem
};
