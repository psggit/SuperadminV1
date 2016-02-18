import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Bills/DataActions';
import addTableReducer from './components/Bills/AddActions';
import uploadFileReducer from './components/Bills/UploadActions';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  addTable: addTableReducer,
  uploadFile: uploadFileReducer,
  routing: routeReducer
});

export default reducer;
