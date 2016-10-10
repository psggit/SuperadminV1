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
  FileUpload,
  ViewConsumerProfile,
  Kycfunctions,
  VerifyKycs,
  UploadKycs,
  KycViewUpload,
  KycViewVerify,
  ViewCart, ViewDevice, RechargeHistory, StateManagement, CustomerTransaction,
  CreateNotepadEntry, Notepad, EditAccountDetails, Skus, Toppicks, AddTopPicks, CreateSku, SkuManagementViewSkus,
  TopPicksInWrapper,
  ConsumerRecharge,
  BrandCreate,
  BrandEdit,
  BrandManagement,
  ConsumerReservation,
  ConsumerReservationItems,
  ManageState,
  GenreManagement,
  ManageGenre,
  CategoryManagement,
  ManageCategory,
  AddCredit,
  ConfirmCredit,
  ViewCredits,
  ListSku,
  HomepageManagementAds,
  HomepageManagementSelectAds,
  BrandManagerProfile,
  CreateBrandManager,
  CompaniesManagement,
  ManageCompanies, BrandAds, BrandPromos, PromosInstantCashback, RetailerManagementCreate,
  RetailerManagementSettlementDetails, RetailerManagementDeviceDetail, RetailerManagementDisableDevice,
  RetailerManagementTransactions, RetailerManagementCreateOrganization, CustomerSupportCustomerProfile,
  CustomerSupportFreshdeskTicket, CustomerSupportIssueHistory, CustomerSupportSupport, CustomerSupportFreshdeskTicketList,
  CustomerSupportInstantCallbackHistory, ParameterManagementConsumerIssueCreateCode, ParameterManagementCreateCode,
  ParameterManagementConsumerIssueCodes, ParameterManagementConsumerManualCodes, ParameterManagementConsumerNotepadCodes,
  ParameterManagementNotepadCreateCode, ParameterManagementRetailerManualDebitCreditCodes, ParameterManagementRetailerManualCreateCode,
  ParameterManagementConsumerDisableAccountCode, ParameterManagementConsumerDisableAccountCreateCode, ParameterManagementConsumerDeviceAccountCodes,
  ParameterManagementConsumerDeviceAccountCreateCode, AccountingEODReport, AccountingSettlementReport, AccountingUploadPayUReport,
  AccountingUploadSettlementReport,
  ViewBrandManager,
  EditBrandManager,
  ProfileKyc
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
  const {loginState: {credentials}} = store.getState();
  if (credentials) {
    cb();
    return;
  }
  Promise.all([
    store.dispatch(loadCredentials()),
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
    <Router history={browserHistory} >
      <Route path="/hadmin/login" component={Login} />
      <Route path="/hadmin" component={PageContainer} onEnter={ requireLoginAndSchema }>
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
        <Route path="consumer_transactions/:userId/recharges" component={ConsumerRecharge} />
        <Route path="consumer_transactions/reservations" component={ConsumerReservation} />
        <Route path="consumer_transactions/:userId/reservations" component={ConsumerReservation} />
        <Route path="consumer_transactions/reservations/:cartId/items" component={ConsumerReservationItems} />
        <Route path="consumer_transactions/add_credits" component={AddCredit} />
        <Route path="consumer_transactions/confirm_credits" component={ConfirmCredit} />
        <Route path="consumer_transactions/view_credits/:batchNumber" component={ViewCredits} />
        /* End of Customer Transactions */

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
        <Route path="skus/top_picks/:stateId/:genreId/add_top_picks" component={AddTopPicks} />
        <Route path="skus/create_sku" component={CreateSku} />
        <Route path="skus/edit_sku/:Id" component={CreateSku} />
        <Route path="skus/view_sku" component={SkuManagementViewSkus} />
        <Route path="skus/top_picks/:stateId/:genreId" component={TopPicksInWrapper} />
        <Route path="homepage_management/ads" component={HomepageManagementAds} />
        <Route path="homepage_management/select_ads" component={HomepageManagementSelectAds} />
        <Route path="brands_offers_and_promos/brand_managers_list" component={BrandManagerProfile} />
        <Route path="brands_offers_and_promos/brand_manager_view/:Id" component={ViewBrandManager} />
        <Route path="brands_offers_and_promos/brand_manager_edit/:Id" component={EditBrandManager} />
        <Route path="brands_offers_and_promos/create_brand_manager" component={CreateBrandManager} />
        <Route path="brands_offers_and_promos/ads" component={BrandAds} />
        <Route path="brands_offers_and_promos/promos" component={BrandPromos} />
        <Route path="brands_offers_and_promos/promos/instant_cashback" component={PromosInstantCashback} />
        <Route path="retailer_management/create_branch" component={RetailerManagementCreate} />
        <Route path="retailer_management/settlement_details" component={RetailerManagementSettlementDetails} />
        <Route path="retailer_management/device_details" component={RetailerManagementDeviceDetail} />
        <Route path="retailer_management/disable_device" component={RetailerManagementDisableDevice} />
        <Route path="retailer_management/transactions" component={RetailerManagementTransactions} />
        <Route path="retailer_management/create_organization" component={RetailerManagementCreateOrganization} />
        <Route path="retailer_management/profile_and_kyc" component={ProfileKyc} />
        <Route path="customer_support" component={CustomerSupportSupport} />
        <Route path="customer_support/customer_profile/:Id" component={CustomerSupportCustomerProfile} />
        <Route path="customer_support/freshdesk_ticket/:Id" component={CustomerSupportFreshdeskTicket} />
        <Route path="customer_support/issue_history" component={CustomerSupportIssueHistory} />
        <Route path="customer_support/freshdesk_ticketlist" component={CustomerSupportFreshdeskTicketList} />
        <Route path="customer_support/instant_callback_history" component={CustomerSupportInstantCallbackHistory} />
        <Route path="parameter_management/consumer_manual_debit_credit_codes" component={ParameterManagementConsumerManualCodes} />
        <Route path="parameter_management/create_code" component={ParameterManagementCreateCode} />
        <Route path="parameter_management/consumer_issue_codes" component={ParameterManagementConsumerIssueCodes} />
        <Route path="parameter_management/consumer_issue/create_code" component={ParameterManagementConsumerIssueCreateCode} />
        <Route path="parameter_management/consumer_notepad_codes" component={ParameterManagementConsumerNotepadCodes} />
        <Route path="parameter_management/notepad_create_code" component={ParameterManagementNotepadCreateCode} />
        <Route path="parameter_management/retailer_manual_debit_credit_codes" component={ParameterManagementRetailerManualDebitCreditCodes} />
        <Route path="parameter_management/retailer_manual/create_code" component={ParameterManagementRetailerManualCreateCode} />
        <Route path="parameter_management/consumer_disable_account_code" component={ParameterManagementConsumerDisableAccountCode} />
        <Route path="parameter_management/consumer_disable_account/create_code" component={ParameterManagementConsumerDisableAccountCreateCode} />
        <Route path="parameter_management/consumer_device_account_codes" component={ParameterManagementConsumerDeviceAccountCodes} />
        <Route path="parameter_management/consumer_device_account_create_code" component={ParameterManagementConsumerDeviceAccountCreateCode} />
        <Route path="accounting/eod_report" component={AccountingEODReport} />
        <Route path="accounting/settlement_report" component={AccountingSettlementReport} />
        <Route path="accounting/upload_payu_report" component={AccountingUploadPayUReport} />
        <Route path="accounting/upload_settlement_report" component={AccountingUploadSettlementReport} />
        /* End of SKU Management */
        { /*
        <Route path="notepad_entries" component={NotepadEntries} />
        */ }
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
