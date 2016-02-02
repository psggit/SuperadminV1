/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  userColumns: []
  users: [ {} ]
}

*/

import defaultState, {defaultViewState} from './DataState';
import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import requestAction from './requestAction';


const SET_TABLE = 'Data/SET_TABLE';
const LOAD_SCHEMA = 'Data/LOAD_SCHEMA';

/* ****************** View actions *************/
const V_SET_DEFAULTS = 'ViewTable/V_SET_DEFAULTS';
const V_REQUEST_SUCCESS = 'ViewTable/V_REQUEST_SUCCESS';
const V_REQUEST_ERROR = 'ViewTable/V_REQUEST_ERROR';
const V_TOGGLE_EXPAND_HEADING = 'ViewTable/V_TOGGLE_EXPAND_HEADING';
const V_QUERY_EXPAND = 'ViewTable/V_QUERY_EXPAND';

// const V_ADD_WHERE;
// const V_REMOVE_WHERE;
// const V_SET_LIMIT;
// const V_SET_OFFSET;
// const V_ADD_SORT;
// const V_REMOVE_SORT;

/* ****************** Insert actions *************/
const I_ONGOING_REQ = 'InsertItem/I_ONGOING_REQ';
const I_REQUEST_SUCCESS = 'InsertItem/I_REQUEST_SUCCESS';
const I_REQUEST_ERROR = 'InsertItem/I_REQUEST_ERROR';

/* ************ action creators ************************/
const loadSchema = () => {
  return (dispatch) => {
    const p1 = new Promise((resolve, reject) => {
      fetch(Endpoints.getSchema, {credentials: globalCookiePolicy}).then(
        (response) => {
          if (response.ok) {
            response.json().then(
              (allSchemas) => {
                dispatch({type: LOAD_SCHEMA, allSchemas});
                resolve();
              },
              () => { reject(); }
            );
          } else {
            alert('Could not load schema! Try refreshing this page.');
            reject();
          }
        },
        (error) => {
          alert('Could not load schema! Try refreshing this page.');
          console.log(error);
          reject();
        });
    });
    return p1;
  };
};
const setTable = (tableName) => ({type: SET_TABLE, tableName});

/* ****************** view action creators *************/
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
const vToggleExpandHeading = (colName) => ({type: V_TOGGLE_EXPAND_HEADING, colName});
const vQueryExpand = (colName) => ({type: V_QUERY_EXPAND, colName});
const vExpandHeading = (colName) => {
  return (dispatch) => {
    dispatch(vQueryExpand(colName));
    return dispatch(vMakeRequest()).then(() => {
      dispatch(vToggleExpandHeading(colName));
    });
  };
};


/* ****************** insert action creators *************/
const insertItem = (tableName, colValues) => {
  return (dispatch, getState) => {
    /* Type all the values correctly */
    const insertObject = {};
    const state = getState();
    const columns = state.tables.allSchemas.find((x) => (x.name === tableName)).columns;
    Object.keys(colValues).map((colName) => {
      const colSchema = columns.find((x) => (x.name === colName));
      if (colSchema.type === 'integer') {
        insertObject[colName] = parseInt(colValues[colName], 10);
      } else if (colSchema.type === 'numeric') {
        insertObject[colName] = parseFloat(colValues[colName], 10);
      } else if (colSchema.type === 'boolean') {
        insertObject[colName] = (colValues[colName] === 'true' ? true : false);
      } else {
        insertObject[colName] = colValues[colName];
      }
    });
    const options = {
      method: 'POST',
      credentials: globalCookiePolicy,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ objects: [insertObject], returning: []})
    };
    const url = Endpoints.db + '/table/' + tableName + '/insert';
    return dispatch(requestAction(url, options, I_REQUEST_SUCCESS, I_REQUEST_ERROR));
  };
};


/* ************ helpers ************************/
const genHeadingsFromSchema = (tableName, schema) => {
  const table = schema.find((obj) => (obj.name === tableName));
  const cols = table.columns;
  const rels = table.relationships.map((rel) => {
    return [rel.name, rel];
  });

  const headings = [];
  cols.map((col) => {
    if (col.foreign_key_constraints.length === 0) {
      headings.push(col.name);
      return;
    }
    // If the column is on an objRel
    const objRels = rels.filter((rel) => ((rel[1].type === 'obj_rel') && (rel[1].lcol === col.name)));
    objRels.map( (objRel) => {
      headings.push({...objRel[1],
                     relname: objRel[0],
                     _expanded: false});
    });
  });
  // FIXME: Add arr_rels
  // rels.filter((rel) => (rel[1].type === 'arr_rel')).map((rel) => {
  // });

  return headings;
};
const expandChildHeading = (childColPath, parentHeadings, schema) => {
  // childColPath : city.country_id
  // parentHeadings: ["id", "x", "y", { lcol: city_id, type:obj_rel, _expanded: false}, "z"]
  // RETURNS: ["id", "x", "y", { lcol: city_id, type:obj_rel, _expanded: true, headings: []}, "z"]

  const lastColName = childColPath[0];
  const l = parentHeadings.findIndex((x) => ((x.type === 'obj_rel') && (x.lcol === lastColName || x.relname === lastColName)));
  if (l === -1) {
    return parentHeadings;
  }
  const lastColumn = parentHeadings[l];
  let newHeadings;
  if (childColPath.length === 1) {
    if (lastColumn._expanded) {
      return parentHeadings;
    }
    newHeadings = genHeadingsFromSchema(lastColumn.rtable, schema);
  } else {
    newHeadings = expandChildHeading(childColPath.slice(1), parentHeadings.headings, schema);
  }
  const newColumn = {...lastColumn, _expanded: true, headings: newHeadings};
  return [...parentHeadings.slice(0, l),
          newColumn,
          ...parentHeadings.slice(l + 1)];
};
const genColsFromSchema = (tableName, schema) => {
  const table = schema.find((obj) => (obj.name === tableName));
  return table.columns.map(x => x.name);
};
const expandChildQuery = (childColPath, tableName, parentColumns, schema) => {
  // childColPath : city.country_id
  // parentColumns: ["id", "x", "y", "city_id", "z"]
  // RETURNS: ["id", "x", "y", { name: city, columns: [...]}, "z"]

  const lastColName = childColPath[0];
  const l = parentColumns.findIndex((x) => (x === lastColName) || (x.name === lastColName));
  if (l === -1) {
    return parentColumns;
  }
  const lastColumn = parentColumns[l];
  let newColumns;
  if (childColPath.length === 1) {
    if (typeof(lastColumn) === 'object') {
      return parentColumns;
    }
    const table = schema.find((obj) => (obj.name === tableName));
    const tablesToBeExpanded = [];
    table.relationships.map((rel) => {
      const _curTable = rel;
      if (_curTable.lcol === lastColumn) {
        tablesToBeExpanded.push([_curTable.rtable, rel.name]);
      }
    });
    newColumns = tablesToBeExpanded.map(([_table, relname]) => {
      return { name: relname, columns: genColsFromSchema(_table, schema) };
    });
  } else {
    newColumns = {
      name: lastColumn.name,
      columns: expandChildQuery(childColPath.slice(1), lastColumn.name, lastColumn.columns, schema)
    };
  }
  return [...parentColumns.slice(0, l),
          ...newColumns,
          ...parentColumns.slice(l + 1)];
};

/* ************ reducers ************************/
const insertReducer = (tableName, state, action) => {
  switch (action.type) {
    case I_ONGOING_REQ:
      return {ongoingRequest: true, lastError: null, lastSuccess: null};
    case I_REQUEST_SUCCESS:
      return {ongoingRequest: false, lastError: null, lastSuccess: action.data};
    case I_REQUEST_ERROR:
      if (action.data) {
        return {ongoingRequest: false, lastError: action.data, lastSuccess: null};
      }
      return {ongoingRequest: false, lastError: 'server-failure', lastSuccess: null };
    default:
      return state;
  }
};

const viewReducer = (tableName, state, action) => { // eslint-disable-line no-unused-vars
  switch (action.type) {
    case V_SET_DEFAULTS:
      return {...state,
              view: {...defaultViewState,
                     headings: genHeadingsFromSchema(tableName, state.allSchemas),
                     query: { columns: genColsFromSchema(tableName, state.allSchemas),
                              limit: 10,
                              offset: 0}
                    },
             };
    case V_REQUEST_SUCCESS:
      return { ...state, view: {...state.view, rows: action.data}};
    case V_QUERY_EXPAND:
      const childColPathQ = action.colName.split('.').filter((x) => (x !== ''));
      return {
        ...state,
        view: {
          ...state.view,
          query: {
            ...state.view.query,
            columns: expandChildQuery(childColPathQ, tableName, state.view.query.columns, state.allSchemas)
          }
        }
      };
    case V_TOGGLE_EXPAND_HEADING:
      const childColPath = action.colName.split('.').filter((x) => (x !== ''));
      return {...state,
              view: {...state.view,
                     headings: expandChildHeading(childColPath, state.view.headings, state.allSchemas)}
             };
    default:
      return state;
  }
  return state;
};

const dataReducer = (state = defaultState, action) => { // eslint-disable-line no-unused-vars
  if (action.type.indexOf('ViewTable/') === 0) {
    return viewReducer(state.currentTable, state, action);
  }
  if (action.type.indexOf('InsertItem/') === 0) {
    return {
      ...state,
      insert: insertReducer(state.currentTable, state.insertItem, action)
    };
  }
  switch (action.type) {
    case LOAD_SCHEMA:
      return {...state, allSchemas: action.allSchemas};
    case SET_TABLE:
      return {...state, currentTable: action.tableName};
    default:
      return state;
  }
  return state;
};

export default dataReducer;
export {setTable, vSetDefaults, vMakeRequest, vExpandHeading, loadSchema, insertItem};
