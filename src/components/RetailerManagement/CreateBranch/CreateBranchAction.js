/* Actions Creator */

import {combineReducers} from 'redux';

// import requestAction from '../../Common/Actions/requestAction';
//
// import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
//
// import { routeActions } from 'redux-simple-router';

import defaultStateReducer from '../../Common/Actions/StateCityData';
import branchReducer from './BranchData';

export default combineReducers({
  genStateData: defaultStateReducer,
  branchData: branchReducer
});
