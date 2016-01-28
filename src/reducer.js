import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import userReducer from './components/Users/Actions';
import homeReducer from './components/Home/Actions';
// import billsReducer from './components/Bills/Actions';
import dataReducer from './components/Bills/DataActions';

const reducer = combineReducers({
  loginState: loginReducer,
  homeState: homeReducer,
  userState: userReducer,
  tables: dataReducer,
  routing: routeReducer
});

export default reducer;
