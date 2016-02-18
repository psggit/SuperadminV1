import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Bills/DataActions';
import addTableReducer from './components/Bills/AddActions';
import fileReducer from './components/FileUpload/Actions';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  addTable: addTableReducer,
  routing: routeReducer,
  files: fileReducer
});

export default reducer;
