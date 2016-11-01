import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import loginReducer from './components/Login/Actions';
// import dataReducer from './components/Consumer/DataActions';
import fileReducer from './components/FileUpload/Actions';
import profileReducer from './components/Consumer/ProfileActions';
// import skuReducer from './components/Sku/SkuActions';
import kycReducer from './components/KycUpload/KycUploadViewActions';
import kycuploadviewReducer from './components/KycUpload/KycUploadViewActions';
import transactionReducer from './components/CustomerTransaction/actions/Action';
import skuReducer from './components/SkuManagement/Action';
import brandReducer from './components/SkuManagement/Brand/BrandAction';

import defaultReducer from './components/Common/Actions/CommonReducer';
import notepadReducer from './components/NotepadEntries/NotepadAction';
import userDataReducer from './components/Consumer/components/EditProfile/EditAction';

import createSKUReducer from './components/SkuManagement/Skus/CreateSku/CreateSkuActions';
import stateManagementReducer from './components/SkuManagement/State/StateActions';
import brandManagerProfileReducer from './components/BrandsOffersAndPromos/BrandManagerProfile/BrandManagerProfileActions';
import createBrandManagerReducer from './components/BrandsOffersAndPromos/CreateBrandManager/CreateBMActions';
import categoryReducer from './components/SkuManagement/Category/CategoryAction';
import companyReducer from './components/SkuManagement/Companies/CompanyAction';
import freshDeskReducer from './components/CustomerSupport/FreshdeskTicketList/FreshDeskAction';
import InstantCallbackHistoryReducer from './components/CustomerSupport/InstantCallbackHistory/InstantCallbackHistoryAction';
import viewBrandManagerReducer from './components/BrandsOffersAndPromos/ViewBrandManager/ViewBMActions';
import editBrandManagerReducer from './components/BrandsOffersAndPromos/EditBrandManager/EditBMActions';

import topPicksReducer from './components/SkuManagement/Skus/Toppicks/TopPicksAction';
import topPicksStateGenreReducer from './components/SkuManagement/Skus/ToppicksIn/TopPicksInAction';
import addTopPickReducer from './components/SkuManagement/Skus/AddTopPicks/AddTopPickAction';

import freshdeskTicketReducer from './components/CustomerSupport/FreshdeskTicket/FreshdeskTicketActions';
import customerSupportReducer from './components/CustomerSupport/CustomerProfile/CustomerProfileActions';

import organizationReducer from './components/RetailerManagement/CreateOrganization/CreateOrganizationAction';
import branchReducer from './components/RetailerManagement/CreateBranch/CreateBranchAction';
import barReducer from './components/BarManagement/CreateBar/CreateBarAction';
import barSkuReducer from './components/BarManagement/CreateSKU/BrandAction';

import genreReducer from './components/SkuManagement/Genre/GenreAction';

const reducer = combineReducers({
  loginState: loginReducer,
  routing: routeReducer,
  profile: profileReducer,
  files: fileReducer,
  kyc: kycReducer,
  kycupload: kycuploadviewReducer,
  transaction_data: transactionReducer,
  sku_data: skuReducer,
  page_data: defaultReducer,
  notepad_data: notepadReducer,
  brand_data: brandReducer,
  user_data: userDataReducer,
  create_sku_data: createSKUReducer,
  state_data: stateManagementReducer,
  brandmanagerprofile_data: brandManagerProfileReducer,
  createbrandmanager_data: createBrandManagerReducer,
  category_data: categoryReducer,
  company_data: companyReducer,
  freshdesk_ticket_data: freshDeskReducer,
  instant_callback_history_data: InstantCallbackHistoryReducer,
  view_bm_data: viewBrandManagerReducer,
  edit_bm_data: editBrandManagerReducer,
  sku_top_picks_data: topPicksReducer,
  sku_top_picks_state_genre_data: topPicksStateGenreReducer,
  add_top_picks_data: addTopPickReducer,
  freshdesk_ticket: freshdeskTicketReducer,
  customer_support_data: customerSupportReducer,
  organization_data: organizationReducer,
  genre_data: genreReducer,
  branch_data: branchReducer,
  bar_data: barReducer,
  bar_sku_data: barSkuReducer
});

export default reducer;
