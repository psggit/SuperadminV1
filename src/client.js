/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Router, browserHistory, Route} from 'react-router';
import {syncHistory, routeReducer} from 'redux-simple-router';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';

import { Login } from './components';
import loginReducer from './components/Login/actions';

import initSocket from './helpers/initSocket';

/* ****************************************************************** */

// Create the store
const DevTools = require('./containers/DevTools/DevTools');
const reduxSimpleRouterMiddleware = syncHistory(browserHistory);
const _finalCreateStore = compose(
    applyMiddleware(reduxSimpleRouterMiddleware, createLogger()),
    DevTools.instrument(),
    require('redux-devtools').persistState( window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

const reducer = combineReducers({loginState: loginReducer, routing: routeReducer});
const store = _finalCreateStore(reducer);

// FIXME: Required for replaying actions from devtools to work
// reduxSimpleRouterMiddleware.listenForReplays(store);

global.socket = initSocket();

const component = (
    <Router history={browserHistory}>
      <Route path="/login" component={Login} />
    </Router>
);

const dest = document.getElementById('content');
ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  // FIXME:
  // if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
  //   console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  // }
}

// if (__DEVTOOLS__ && !window.devToolsExtension) {
//   ReactDOM.render(
//     <Provider store={store} key="provider">
//       <div>
//         {component}
//         <DevTools />
//       </div>
//     </Provider>,
//     dest
//   );
// }
