import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';

const reducer = combineReducers({
  loginState: loginReducer,
  routing: routeReducer
});

export default reducer;
