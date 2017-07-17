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
import userReducer from './components/User/components/CreateUser/CreateUserAction';

import defaultReducer from './components/Common/Actions/CommonReducer';
import notepadReducer from './components/NotepadEntries/NotepadAction';
import retailerNotepadReducer from './components/RetailerNotepadEntries/NotepadAction';
import barNotepadReducer from './components/BarNotepadEntries/NotepadAction';
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

import barSkuDataReducer from './components/BarManagement/UnlockBarAddSKU/BarSkuAction';

import genreReducer from './components/SkuManagement/Genre/GenreAction';

// Reducer for PromosInstantCashback
import PromosCashbackRedeem from './components/BrandsOffersAndPromos/PromosCashbackRedeem/actions';
// Reducer for Promos ON Pack
import PromosOnPack from './components/BrandsOffersAndPromos/PromosOnPack/actions';
// import whatsNewReducer from './components/WhatsNew/CreatePost/Action';
import whatsNewReducer from './components/WhatsNewArticle/CreateArticle/CreateArticleAction';

import brandListingReducer from './components/BrandListing/BrandListingActions';
import adListingReducer from './components/AdListing/AdListingActions';
// Ads
import adsListReducer from './components/BrandsOffersAndPromos/AdsListing/AdsListActions';
import adsCreateImageReducer from './components/BrandsOffersAndPromos/AdsCreateImageAd/CreateAdImageActions';
import adsViewImageReducer from './components/BrandsOffersAndPromos/AdsViewImageAd/CreateAdImageActions';
import adsCreateSkuReducer from './components/BrandsOffersAndPromos/AdsCreateSkuAd/CreateAdSkuActions';
import adsViewSkuReducer from './components/BrandsOffersAndPromos/AdsViewSkuAd/CreateAdImageActions';
import adsCreatePromoReducer from './components/BrandsOffersAndPromos/AdsCreatePromoAd/CreateAdPromoActions';
import adsCreateBarReducer from './components/BrandsOffersAndPromos/AdsCreateBarAd/CreateAdBarActions';
import welcomeDrinksReducer from './components/BrandsOffersAndPromos/WelcomeDrinksCreate/CreateAdBarActions';
import miscellaneousItemReducer from './components/MiscellaneousItem/MiscellaneousItemActions';
import miscellaneousItemMapReducer from './components/MiscellaneousItemMap/MiscellaneousItemActions';
// import adsViewImageReducer from './components/BrandsOffersAndPromos/AdsViewImageAd/ViewAdImageActions';
import adsCreateUrlReducer from './components/BrandsOffersAndPromos/AdsCreateUrlAd/CreateAdUrlActions';

import filterReducer from './components/Common/SearchComponent/FilterState';
import filterGenReducer from './components/Common/SearchComponentGen/FilterState';

import retailerDebitCreditRedicer from './components/RetailerManagement/DebitsCredits/Actions';
import barDebitCreditRedicer from './components/RetailerManagement/BarDebitsCredits/Actions';

import barAllSkuReducer from './components/BarManagement/ManageBarSku/Actions';
import miscellaneousItemListReducer from './components/MiscellaneousItemList/Actions';

// Invite
import invitationReducer from './components/Invites/reducer';
import convenienceFeeReducer from './components/ConvenienceFee/ConvenienceFeeActions';
import convenienceFeeListReducer from './components/ConvenienceFeeList/ConvenienceFeeActions';

const reducer = combineReducers({
  // The promos Side-menu states
  promosCashbackRedeemState: PromosCashbackRedeem,
  convenienceFeeState: convenienceFeeReducer,
  convenienceFeeListState: convenienceFeeListReducer,
  promosOnPackRedeemState: PromosOnPack,
  welcomeDrinksState: welcomeDrinksReducer,
  brandListingState: brandListingReducer,
  adListingState: adListingReducer,
  miscellaneousItemState: miscellaneousItemReducer,
  miscellaneousItemMapState: miscellaneousItemMapReducer,
  // Everything else.
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
  retailer_notepad_data: retailerNotepadReducer,
  bar_notepad_data: barNotepadReducer,
  brand_data: brandReducer,
  user_data: userDataReducer,
  operationUserData: userReducer,
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
  bar_sku_data: barSkuReducer,
  bar_sku_create_data: barSkuDataReducer,
  adslist_data: adsListReducer,
  createImageAd_data: adsCreateImageReducer,
  viewSkuAd_data: adsViewSkuReducer,
  viewImageAd_data: adsViewImageReducer,
  createSkuAd_data: adsCreateSkuReducer,
  createPromoAd_data: adsCreatePromoReducer,
  whats_new_data: whatsNewReducer,
  createBarAd_data: adsCreateBarReducer,
  createUrlAd_data: adsCreateUrlReducer,
  filter_data: filterReducer,
  retailer_debit_credit: retailerDebitCreditRedicer,
  bar_debit_credit: barDebitCreditRedicer,
  all_bar_skus: barAllSkuReducer,
  miscellaneous_item_list: miscellaneousItemListReducer,
  invite_data: invitationReducer,
  gen_filter_data: filterGenReducer

});

export default reducer;
