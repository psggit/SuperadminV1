import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Bills/DataActions';
import addTableReducer from './components/Bills/AddActions';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  addTable: addTableReducer,
  routing: routeReducer
});

export default reducer;
