// import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import {defaultCurFilter} from './DataState';
import {vMakeRequest} from './ViewActions';
import {Integers, Reals} from './Types';

const SET_DEFQUERY = 'ViewTable/FilterQuery/SET_DEFQUERY';
const SET_FILTERCOL = 'ViewTable/FilterQuery/SET_FILTERCOL';
const SET_FILTEROP = 'ViewTable/FilterQuery/SET_FILTEROP';
const SET_FILTERVAL = 'ViewTable/FilterQuery/SET_FILTERVAL';
const ADD_FILTER = 'ViewTable/FilterQuery/ADD_FILTER';
const REMOVE_FILTER = 'ViewTable/FilterQuery/REMOVE_FILTER';
// const MAKING_REQUEST = 'ViewTable/FilterQuery/MAKING_REQUEST';
// const REQUEST_SUCCESS = 'ViewTable/FilterQuery/REQUEST_SUCCESS';
// const REQUEST_ERROR = 'ViewTable/FilterQuery/REQUEST_ERROR';

const setDefaultQuery = (curQuery) => ({type: SET_DEFQUERY, curQuery});
const setFilterCol = (name, index) => ({type: SET_FILTERCOL, name, index});
const setFilterOp = (opName, index) => ({type: SET_FILTEROP, opName, index});
const setFilterVal = (val, index) => ({type: SET_FILTERVAL, val, index});
const addFilter = () => ({type: ADD_FILTER});
const removeFilter = (index) => ({type: REMOVE_FILTER, index});
const runQuery = (tableSchema) => {
  return (dispatch, getState) => {
    const state = getState().tables.view.curFilter;
    let finalWhereClauses = state.where.$and.filter(w => {
      const colName = Object.keys(w)[0].trim();
      if (colName === '') {
        return false;
      }
      const opName = Object.keys(w[colName])[0].trim();
      if (opName === '') {
        return false;
      }
      return true;
    });
    finalWhereClauses = finalWhereClauses.map(w => {
      const colName = Object.keys(w)[0];
      const opName = Object.keys(w[colName])[0];
      const val = w[colName][opName];
      const colType = tableSchema.columns.find(c => c.name === colName).type;
      if (Integers.indexOf(colType) > 0) {
        w[colName][opName] = parseInt(val, 10);
        return w;
      }
      if (Reals.indexOf(colType) > 0) {
        w[colName][opName] = parseFloat(val);
        return w;
      }
      if (colType === 'boolean') {
        w[colName][opName] = (val === 'true' ? true : false);
      }
      return w;
    });
    const newQuery = {
      where: {$and: finalWhereClauses},
      limit: state.limit,
      offset: state.offset,
      order_by: state.order_by.filter(w => (w.column.trim() !== ''))
    };
    if (newQuery.where.$and.length === 0) { delete newQuery.where; }
    if (newQuery.order_by.length === 0) { delete newQuery.order_by; }
    dispatch({type: 'ViewTable/V_SET_QUERY_OPTS', queryStuff: newQuery});
    dispatch(vMakeRequest());
  };
};

const filterReducer = (state = defaultCurFilter, action) => {
  const i = action.index;
  const newFilter = {};
  switch (action.type) {
    case SET_DEFQUERY:
      const q = action.curQuery;
      if ('order_by' in q || 'limit' in q || 'offset' in q || ('where' in q && '$and' in q.where)) {
        const newCurFilterQ = {};
        newCurFilterQ.where = ('where' in q && '$and' in q.where) ? {$and: [...q.where.$and, {'': {'': ''}}]} : {...defaultCurFilter.where};
        newCurFilterQ.order_by = ('order_by' in q) ? [...q.order_by, ...defaultCurFilter.order_by] : [...defaultCurFilter.order_by];
        newCurFilterQ.limit = ('limit' in q) ? q.limit : {...defaultCurFilter.limit};
        newCurFilterQ.offset = ('offset' in q) ? q.offset : {...defaultCurFilter.offset};
        return newCurFilterQ;
      }
      return defaultCurFilter;
    case SET_FILTERCOL:
      const oldColName = Object.keys(state.where.$and[i])[0];
      newFilter[action.name] = {...state.where.$and[i][oldColName]};
      return {
        ...state,
        where: { $and: [
          ...state.where.$and.slice(0, i),
          newFilter,
          ...state.where.$and.slice(i + 1)
        ]}
      };
    case SET_FILTEROP:
      const colName = Object.keys(state.where.$and[i])[0];
      const oldOp = Object.keys(state.where.$and[i][colName])[0];
      newFilter[colName] = {};
      newFilter[colName][action.opName] = state.where.$and[i][colName][oldOp];
      return {
        ...state,
        where: { $and: [
          ...state.where.$and.slice(0, i),
          newFilter,
          ...state.where.$and.slice(i + 1)
        ]}
      };
    case SET_FILTERVAL:
      const colName1 = Object.keys(state.where.$and[i])[0];
      const opName = Object.keys(state.where.$and[i][colName1])[0];
      newFilter[colName1] = {};
      newFilter[colName1][opName] = action.val;
      return {
        ...state,
        where: { $and: [
          ...state.where.$and.slice(0, i),
          newFilter,
          ...state.where.$and.slice(i + 1)
        ]}
      };
    case ADD_FILTER:
      return {
        ...state,
        where: { $and: [
          ...state.where.$and,
          {'': {'': ''}}
        ]}
      };
    case REMOVE_FILTER:
      const newFilters = [
        ...state.where.$and.slice(0, i),
        ...state.where.$and.slice(i + 1)
      ];
      return {
        ...state,
        where: { $and: newFilters }
      };
    default:
      return state;
  }
};

export default filterReducer;
export {setFilterCol, setFilterOp, setFilterVal, addFilter, removeFilter, setDefaultQuery, runQuery};
