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
  ViewConsumers,
  InsertItem,
  EditItem,
  FileUpload,
  ViewConsumerProfile,
  Kycfunctions,
  VerifyKycs,
  UploadKycs,
  /*
  ViewKyc,
  ViewKycProfile,
  */
  ViewStates,
  ViewState,
  KycViewUpload,
  KycViewVerify,
  ViewSkus, ViewSku, ViewCart, Reservations, ViewDevice, RechargeHistory, StateManagement, CustomerTransaction,
  CreateNotepadEntry, Notepad, EditAccountDetails, Skus, Toppicks, AddToppicks, CreateSku, SkuManagementViewSkus,
  SkuManagementToppicks,
  ConsumerRecharge,
  BrandCreate,
  BrandEdit,
  BrandManagement,
  ConsumerReservation,
  ManageState,
  GenreManagement,
  ManageGenre,
  CategoryManagement,
  ManageCategory,
  AddCredit,
  ConfirmCredit,
  ViewCredits,
  ListSku,
  HomepageManagementAds, HomepageManagementSelectAds, BrandManagerProfile, CreateBrandManager,
  CompaniesManagement, ManageCompanies, BrandAds, BrandPromos, PromosInstantCashback, RetailerManagementCreate
} from './components'; // eslint-disable-line no-unused-vars
import {AddTable} from './components';
import {loadCredentials} from './components/Login/Actions';
// import {loadSchema} from './components/Bills/DataActions';

import initSocket from './helpers/initSocket';
import reducer from './reducer';

/* ****************************************************************** */

// Create the store
const DevTools = require('./helpers/DevTools/DevTools');
console.log(DevTools);
const reduxSimpleRouterMiddleware = syncHistory(browserHistory);
const _finalCreateStore = compose(
  applyMiddleware(thunk, reduxSimpleRouterMiddleware, createLogger()),
  /* The following two lines are used for time travel and debug functionality
   * So how it works
   *  1. It connects to a store and sends the output to the dock monitor which is your chrome extension
  */
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
        <Route path="consumer/kycfunctions/verify_kyc" component={VerifyKycs} />
        <Route path="consumer/kycfunctions/upload_kyc" component={UploadKycs} />
        {/*
        */}
        <Route path="consumer/kycfunctions/upload_kyc/upload_kyc_profile/:Id" component={KycViewUpload} />
        <Route path="consumer/kycfunctions/verify_kyc/view_kyc_profile/:Id" component={KycViewVerify} />
        {/*
        <Route path="consumer/kycfunctions/verify_kyc/view_kyc_profile/:Id" component={ViewKycProfile} />
        */}
        <Route path="consumer/profile/:Id/reservation" component={Reservations} />
        <Route path="consumer/profile/:Id" component={ViewConsumerProfile} />
        <Route path="consumer/profile/:Id/cart" component={ViewCart} />
        <Route path="consumer/profile/:Id/device_history" component={ViewDevice} />
        <Route path="consumer/profile/:Id/recharge_history" component={RechargeHistory} />

        /* Editing Profile */

        <Route path="consumer/profile/:Id/edit_account_details" component={EditAccountDetails} />

        /* Creating and viewing notepads */
        <Route path="/hadmin/consumer/profile/:Id/create_notepad_entry" component={CreateNotepadEntry} />
        <Route path="consumer/profile/:Id/view_notepads" component={Notepad} />

        /* Customer Transactions */
        <Route path="consumer_transactions" component={CustomerTransaction} />
        <Route path="consumer_transactions/recharges" component={ConsumerRecharge} />
        <Route path="consumer_transactions/reservations" component={ConsumerReservation} />
        <Route path="consumer_transactions/add_credits" component={AddCredit} />
        <Route path="consumer_transactions/confirm_credits" component={ConfirmCredit} />
        <Route path="consumer_transactions/view_credits/:batchNumber" component={ViewCredits} />
        /* End of Customer Transactions */

        <Route path="consumer/:table/edit" component={EditItem} />
        <Route path="consumer/:table/insert" component={InsertItem} />
        <Route path="sku/states" component={ViewStates} />
        <Route path="sku/state/:Id" component={ViewState} />
        <Route path="sku/skus" component={ViewSkus} />
        <Route path="sku/sku/:Id" component={ViewSku} />

        /* SKU Management (State, Genre, Category) */
        <Route path="state_management" component={StateManagement} />
        <Route path="state_management/edit/:Id" component={ManageState} />
        <Route path="state_management/create" component={ManageState} />
        <Route path="genre_management" component={GenreManagement} />
        <Route path="genre_management/edit/:Id" component={ManageGenre} />
        <Route path="genre_management/create" component={ManageGenre} />
        <Route path="category_management" component={CategoryManagement} />
        <Route path="category_management/edit/:Id" component={ManageCategory} />
        <Route path="category_management/create" component={ManageCategory} />
        <Route path="brand_management" component={BrandManagement} />
        <Route path="brand_management/create" component={BrandCreate} />
        <Route path="brand_management/edit/:Id" component={BrandEdit} />
        <Route path="companies_management" component={CompaniesManagement} />
        <Route path="companies_management/create" component={ManageCompanies} />
        <Route path="companies_management/edit/:Id" component={ManageCompanies} />
        <Route path="skus" component={Skus} />
        <Route path="skus/list_sku" component={ListSku} />
        <Route path="skus/toppicks" component={Toppicks} />
        <Route path="skus/add_top_picks" component={AddToppicks} />
        <Route path="skus/create_sku" component={CreateSku} />
        <Route path="skus/view_sku" component={SkuManagementViewSkus} />
        <Route path="skus/top_picks" component={SkuManagementToppicks} />
        <Route path="homepage_management/ads" component={HomepageManagementAds} />
        <Route path="homepage_management/select_ads" component={HomepageManagementSelectAds} />
        <Route path="brands_offers_and_promos/brand_manager_profile" component={BrandManagerProfile} />
        <Route path="brands_offers_and_promos/create_brand_manager" component={CreateBrandManager} />
        <Route path="brands_offers_and_promos/ads" component={BrandAds} />
        <Route path="brands_offers_and_promos/promos" component={BrandPromos} />
        <Route path="brands_offers_and_promos/promos/instant_cashback" component={PromosInstantCashback} />
        <Route path="retailer_management/create_branch" component={RetailerManagementCreate} />
        /* End of SKU Management */
        {/*
        <Route path="notepad_entries" component={NotepadEntries} />
        */}
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
