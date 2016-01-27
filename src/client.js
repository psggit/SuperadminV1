/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {Router, browserHistory, Route, IndexRedirect} from 'react-router';
import {syncHistory} from 'redux-simple-router';
import {compose, createStore, applyMiddleware} from 'redux';

import { Login, Home, Users, Bills} from './components';

import initSocket from './helpers/initSocket';
import reducer from './reducer';

/* ****************************************************************** */

// Create the store
const DevTools = require('./helpers/DevTools/DevTools');
const reduxSimpleRouterMiddleware = syncHistory(browserHistory);
const _finalCreateStore = compose(
  applyMiddleware(thunk, reduxSimpleRouterMiddleware, createLogger()),
  DevTools.instrument(),
  require('redux-devtools').persistState( window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = _finalCreateStore(reducer);


/* ****************************************************************** */

// Enable hot reloading
if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(require('./reducer'));
  });
}
// FIXME: Required for replaying actions from devtools to work
// reduxSimpleRouterMiddleware.listenForReplays(store);

global.socket = initSocket();


/* ****************************************************************** */

// Main routes and rendering
const main = (
    <Router history={browserHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home}>
        <IndexRedirect to="appusers" />
        <Route path="appusers" component={Users} />
        <Route path="bills" component={Bills} />
      </Route>
    </Router>
);

const dest = document.getElementById('content');
ReactDOM.render(
  <Provider store={store} key="provider">
    {main}
  </Provider>,
  dest
);

/* ****************************************************************** */

// FIXME: No idea what the hell seems to be going on here.

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
