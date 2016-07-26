/*
 * Will receive default state from Common
 * */

import { defaultTopPicksSelectState } from '../../../Common/Actions/DefaultState';
import requestAction from '../../../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../../../Endpoints';
import {
  REQUEST_ERROR
} from '../../../Common/Actions/Actions';

// import { routeActions } from 'redux-simple-router';
// import commonReducer from '../Common/Actions/CommonReducer';

const STATE_SELECTED = '@sku_top_picks/STATE_SELECTED';
const GENRE_SELECTED = '@sku_top_picks/GENRE_SELECTED';
const STATE_GENRE_FETCHED = '@sku_top_picks/STATE_GENRE_FETCHED';
const RESET = '@sku_top_picks/RESET';

/* End of it */
/* ****** Action Creators ******** */

const fetchStateGenre = () => {
  return (dispatch) => {
    /* Make a MAKE_REQUEST action */
    /* Url */
    const url = Endpoints.db + '/table/state_genre_count/select';
    const queryObj = {};
    queryObj.columns = [
      '*'
    ];
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy,
      body: JSON.stringify(queryObj),
    };
    return dispatch(requestAction(url, options, STATE_GENRE_FETCHED, REQUEST_ERROR));
  };
};

const skuTopPicksReducer = (state = defaultTopPicksSelectState, action) => {
  switch (action.type) {
    case STATE_GENRE_FETCHED:
      const fetchedObj = action.data;
      const stateMapping = {};
      // const genreMapping = {};
      fetchedObj.forEach( ( stateObj ) => {
        stateMapping[stateObj.state_id] = { ...stateObj };
      });
      return { ...state, stateList: [ ...fetchedObj ], stateMapping: { ...stateMapping } };
    case STATE_SELECTED:
      return { ...state, selectedState: state.stateMapping[action.data], showGenre: true};
    case GENRE_SELECTED:
      return { ...state };
    case RESET:
      return { ...defaultTopPicksSelectState };
    default: return state;
  }
};

/* ****************** END OF REDUCER ************************** */

export {
  fetchStateGenre,
  STATE_SELECTED,
  RESET
};
export default skuTopPicksReducer;
