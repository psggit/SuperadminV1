import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
import userReducer from './components/Users/Actions';
import homeReducer from './components/Home/Actions';

const reducer = combineReducers({
  loginState: loginReducer,
  homeState: homeReducer,
  userState: userReducer,
  routing: routeReducer
});

export default reducer;
