import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import dataReducer from './components/Bills/DataActions';

const reducer = combineReducers({
  loginState: loginReducer,
  tables: dataReducer,
  routing: routeReducer
});

export default reducer;
