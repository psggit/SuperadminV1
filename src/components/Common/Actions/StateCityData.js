import requestAction from '../../Common/Actions/requestAction';

import { genOptions } from '../../Common/Actions/commonFunctions';

import Endpoints from '../../../Endpoints';

/* Action constants */

const STATE_FETCHED = '@commonStateReducer/STATE_FETCHED';
const CITY_FETCHED = '@commonStateReducer/CITY_FETCHED';
const REQUEST_ERROR = '@commonStateReducer/REQUEST_ERROR';

/* End of it */

const fetchState = () => {
  return ( dispatch ) => {
    const url = Endpoints.db + '/table/state/select';
    const query = {};
    query.columns = ['*'];
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };

    return dispatch( requestAction( url, options, STATE_FETCHED, REQUEST_ERROR ) );
  };
};

const fetchCity = () => {
  return ( dispatch ) => {
    const url = Endpoints.db + '/table/city/select';
    const query = {};
    query.columns = ['*'];
    const options = {
      ...genOptions,
      body: JSON.stringify(query)
    };
    return dispatch( requestAction( url, options, CITY_FETCHED, REQUEST_ERROR ) );
  };
};

const fetchStateCity = () => {
  return ( dispatch ) => {
    return Promise.all([
      dispatch(fetchState()),
      dispatch(fetchCity())
    ]);
  };
};

const defaultStateReducer = ( state = { 'states': [], 'cities': [] }, action ) => {
  switch ( action.type ) {
    case STATE_FETCHED:
      const stateIdMap = {};
      action.data.forEach( ( s ) => {
        stateIdMap[s.id] = s.short_name;
      });
      return { ...state, states: action.data, stateIdMap: { ...stateIdMap }};
    case CITY_FETCHED:
      return { ...state, cities: action.data };
    case REQUEST_ERROR:
      return { ...state, cities: action.data };
    default:
      return { ...state };
  }
};

export default defaultStateReducer;

export {
  fetchStateCity
};
