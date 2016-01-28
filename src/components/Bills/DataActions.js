/* State

{
  ongoingRequest : false, //true if request is going on
  lastError : null OR <string>
  userColumns: []
  users: [ {} ]
}

*/

import defaultState, {defaultViewState} from './DataState';
// import {hasuradbEndpoint} from '../../config';
import requestAction from './requestAction';

const hasuradbEndpoint = 'http://130.211.255.73/db';
const SET_TABLE = 'Data/SET_TABLE';
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

/* ************ action creators ************************/
const setTable = (tableName) => ({type: SET_TABLE, tableName});
const vSetDefaults = () => ({type: V_SET_DEFAULTS});

const vMakeRequest = () => {
  return (dispatch, getState) => {
    const state = getState();
    const url = hasuradbEndpoint + '/table/' + state.tables.currentTable + '/select';
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

/* ************ helpers ************************/
const genHeadingsFromSchema = (tableName, schema) => {
  const table = schema.find((obj) => (obj.name === tableName));
  const cols = table.columns;
  const rels = Object.keys(table.relationships).sort().map((relName) => {
    return [relName, table.relationships[relName]];
  });

  const headings = [];
  Object.keys(cols).sort().map((colName) => {
    if (cols[colName].fk_cons.length === 0) {
      headings.push(colName);
    }
    // If the column is on an objRel
    const objRels = rels.filter((rel) => ((rel[1].type === 'obj_rel') && (rel[1].lcol === colName)));
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
  return Object.keys(table.columns);
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
    Object.keys(table.relationships).map((relname) => {
      const _curTable = table.relationships[relname];
      if (_curTable.lcol === lastColumn) {
        tablesToBeExpanded.push([_curTable.rtable, relname]);
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
  switch (action.type) {
    case SET_TABLE:
      return {...state, currentTable: action.tableName};
    default:
      return state;
  }
  return state;
};

export default dataReducer;
export {setTable, vSetDefaults, vMakeRequest, vExpandHeading};
