import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import userReducer from './components/Users/Actions';

const reducer = combineReducers({
  loginState: loginReducer,
  userState: userReducer,
  routing: routeReducer
});

export default reducer;
