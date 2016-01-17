import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/actions';

const reducer = combineReducers({
  loginState: loginReducer,
  routing: routeReducer
});

export default reducer;
