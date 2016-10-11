/* Actions Creator */

import {combineReducers} from 'redux';

// import requestAction from '../../Common/Actions/requestAction';
//
// import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
//
// import { routeActions } from 'redux-simple-router';

import beneficiaryReducer from './BeneficiaryAction';
import defaultStateReducer from '../../Common/Actions/StateCityData';
import organizationReducer from './OrganizationData';

export default combineReducers({
  beneficiaryData: beneficiaryReducer,
  genStateData: defaultStateReducer,
  organizationData: organizationReducer
});
