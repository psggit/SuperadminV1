/* Actions Creator */

import {combineReducers} from 'redux';

// import requestAction from '../../Common/Actions/requestAction';
//
// import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
//
// import { routeActions } from 'redux-simple-router';

import defaultStateReducer from '../../Common/Actions/StateCityData';
import branchReducer from './BranchData';
import deviceReducer from './DeviceAction';
import retailerBrandReducer from './SkuAction';

export default combineReducers({
  genStateData: defaultStateReducer,
  branchData: branchReducer,
  deviceData: deviceReducer,
  brandData: retailerBrandReducer
});
