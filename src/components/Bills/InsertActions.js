import Endpoints, {globalCookiePolicy} from '../../Endpoints';
import requestAction from './requestAction';

const I_ONGOING_REQ = 'InsertItem/I_ONGOING_REQ';
const I_REQUEST_SUCCESS = 'InsertItem/I_REQUEST_SUCCESS';
const I_REQUEST_ERROR = 'InsertItem/I_REQUEST_ERROR';

/* ****************** insert action creators ************ */
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

/* ************ reducers *********************** */
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

export default insertReducer;
export {insertItem };
