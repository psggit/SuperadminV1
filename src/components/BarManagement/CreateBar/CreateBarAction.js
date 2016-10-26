/* Actions Creator */

import {combineReducers} from 'redux';

// import requestAction from '../../Common/Actions/requestAction';
//
// import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
//
// import { routeActions } from 'redux-simple-router';

import defaultStateReducer from '../../Common/Actions/StateCityData';
import barReducer from './BarData';
import deviceReducer from './DeviceAction';

export default combineReducers({
  genStateData: defaultStateReducer,
  barData: barReducer,
  deviceData: deviceReducer,
});
