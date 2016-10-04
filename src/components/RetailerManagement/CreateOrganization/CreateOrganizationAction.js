/* Actions Creator */

import {combineReducers} from 'redux';

// import requestAction from '../../Common/Actions/requestAction';
//
// import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
//
// import { routeActions } from 'redux-simple-router';

import beneficiaryReducer from './BeneficiaryAction';

export default combineReducers({
  beneficiary_data: beneficiaryReducer
});
