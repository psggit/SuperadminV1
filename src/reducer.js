import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Consumer/DataActions';
import addTableReducer from './components/Consumer/AddActions';
import fileReducer from './components/FileUpload/Actions';
import profileReducer from './components/Consumer/ProfileActions';
import reservationReducer from './components/Reservation/ProfileActions';
import stateReducer from './components/State/StateActions';
// import skuReducer from './components/Sku/SkuActions';
import kycReducer from './components/KycUpload/KycUploadViewActions';
import kycviewReducer from './components/Kyc/KycViewActions';
import kycuploadviewReducer from './components/KycUpload/KycUploadViewActions';
import transactionReducer from './components/CustomerTransaction/actions/Action';
import skuReducer from './components/SkuManagement/Action';
import brandReducer from './components/SkuManagement/Brand/BrandAction';

import defaultReducer from './components/Common/Actions/CommonReducer';
import notepadReducer from './components/NotepadEntries/NotepadAction';
import userDataReducer from './components/Consumer/components/EditProfile/EditAction';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  addTable: addTableReducer,
  routing: routeReducer,
  profile: profileReducer,
  files: fileReducer,
  stater: stateReducer,
  resprofile: reservationReducer,
  kyc: kycReducer,
  kycviewprofile: kycviewReducer,
  kycupload: kycuploadviewReducer,
  transaction_data: transactionReducer,
  sku_data: skuReducer,
  page_data: defaultReducer,
  notepad_data: notepadReducer,
  brand_data: brandReducer,
  user_data: userDataReducer
});

export default reducer;
