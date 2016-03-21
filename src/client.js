/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {syncHistory} from 'redux-simple-router';
import {compose, createStore, applyMiddleware} from 'redux';

import {Login, Home, PageContainer,
  ViewConsumers, InsertItem, EditItem, FileUpload, ViewConsumerProfile, Kycfunctions,
  ViewStates, ViewState, ViewKyc,
  ViewKycs, ViewKycProfile, KycViewUpload,
  ViewSkus, ViewSku, ViewCart, Reservations, ViewDevice, RechargeHistory, StateManagement, CustomerTransaction,
  CreateNotepadEntry, NotepadEntries, EditAccountDetails,
  ConsumerRecharge,
  ConsumerReservation,
  ManageState,
  GenreManagement,
  ManageGenre,
  CategoryManagement,
  ManageCategory
} from './components'; // eslint-disable-line no-unused-vars
import {AddTable} from './components';
import {loadCredentials} from './components/Login/Actions';
// import {loadSchema} from './components/Bills/DataActions';

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
const requireLoginAndSchema = (nextState, replaceState, cb) => {
  const {loginState: {credentials}, tables: {allSchemas} } = store.getState();
  if (credentials && allSchemas) {
    cb();
    return;
  }
  Promise.all([
    store.dispatch(loadCredentials()),
    // store.dispatch(loadSchema())
  ]).then(
    () => {
      cb();
    },
    () => {
      replaceState(null, '/hadmin/login'); cb();
    }
  );
};
const main = (
    <Router history={browserHistory}>
      <Route path="/hadmin/login" component={Login} />
      <Route path="/hadmin" component={PageContainer} onEnter={requireLoginAndSchema}>
        <IndexRoute component={Home} />
        <Route path="tables/add" component={AddTable} />
        <Route path="upload_file" component={FileUpload} />
        <Route path="consumer/profiles" component={ViewConsumers} />
        <Route path="consumer/kycfunctions" component={Kycfunctions} />
        <Route path="consumer/kycfunctions/verify_kyc" component={ViewKycs} />
        <Route path="consumer/kycfunctions/upload_kyc" component={ViewKyc} />
        <Route path="consumer/kycfunctions/upload_kyc/upload_kyc_profile/:Id" component={KycViewUpload} />
        <Route path="consumer/kycfunctions/verify_kyc/view_kyc_profile/:Id" component={ViewKycProfile} />
        <Route path="consumer/profile/:Id/reservation" component={Reservations} />
        <Route path="consumer/profile/:Id" component={ViewConsumerProfile} />
        <Route path="consumer/profile/:Id/cart" component={ViewCart} />
        <Route path="consumer/profile/:Id/device_history" component={ViewDevice} />
        <Route path="consumer/profile/:Id/recharge_history" component={RechargeHistory} />
        <Route path="consumer_transactions" component={CustomerTransaction} />
        <Route path="consumer_transactions/recharges" component={ConsumerRecharge} />
        <Route path="consumer_transactions/reservations" component={ConsumerReservation} />
        <Route path="consumer/:table/edit" component={EditItem} />
        <Route path="consumer/:table/insert" component={InsertItem} />
        <Route path="sku/states" component={ViewStates} />
        <Route path="sku/state/:Id" component={ViewState} />
        <Route path="sku/skus" component={ViewSkus} />
        <Route path="sku/sku/:Id" component={ViewSku} />
        <Route path="state_management" component={StateManagement} />
        <Route path="state_management/edit/:Id" component={ManageState} />
        <Route path="state_management/create" component={ManageState} />
        <Route path="genre_management" component={GenreManagement} />
        <Route path="genre_management/edit/:Id" component={ManageGenre} />
        <Route path="genre_management/create" component={ManageGenre} />
        <Route path="category_management" component={CategoryManagement} />
        <Route path="category_management/edit/:Id" component={ManageCategory} />
        <Route path="category_management/create" component={ManageCategory} />
        <Route path="create_notepad_entry" component={CreateNotepadEntry} />
        <Route path="notepad_entries" component={NotepadEntries} />
        <Route path="edit_account_details" component={EditAccountDetails} />
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
