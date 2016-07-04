import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Consumer/DataActions';
import addTableReducer from './components/Consumer/AddActions';
import fileReducer from './components/FileUpload/Actions';
import profileReducer from './components/Consumer/ProfileActions';
import reservationReducer from './components/Reservation/ProfileActions';
import stateReducer from './components/State/StateActions';
import skuReducer from './components/Sku/SkuActions';
import kycReducer from './components/Consumer/KycfunctionsActions';
import kycviewReducer from './components/Kyc/KycViewActions';
import kycuploadviewReducer from './components/KycUpload/KycUploadViewActions';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  addTable: addTableReducer,
  routing: routeReducer,
  profile: profileReducer,
  files: fileReducer,
  stater: stateReducer,
  sku: skuReducer,
  resprofile: reservationReducer,
  kyc: kycReducer,
  kycviewprofile: kycviewReducer,
  kycupload: kycuploadviewReducer
});

export default reducer;
