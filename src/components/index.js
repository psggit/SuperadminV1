/*
 *  Point of contact for component modules
 *
 *  ie: import { CounterButton, InfoBar } from 'components';
 *
 */

export PageContainer from './PageContainer/PageContainer';
export Login from './Login/Login';
export FileUpload from './FileUpload/FileUpload';
export Home from './Home/Home';
export ViewConsumers from './Consumer/components/ViewConsumer/ViewConsumer';
export ViewUsers from './User/components/ListUser/ViewUser';
export CreateUser from './User/components/CreateUser/CreateUser';
// export InsertItem from './Consumer/InsertItem';
// export EditItem from './Bills/EditItem';
export ViewConsumerProfile from './Consumer/ViewProfile';
export CreateConvenienceFee from './ConvenienceFee/ConvenienceFee';
export ConvenienceFeeList from './ConvenienceFeeList/ConvenienceFeeList';
export DeliveryConstraints from './DeliveryConstraints/DeliveryConstraints';
export DeliveryPersonList from './DeliveryPersonManagement/DeliveryPerson/DPManagement';
export DeliveryPersonCreate from './DeliveryPersonManagement/DeliveryPerson/ManageDP';
export DeliveryConstraintsManagement from './DeliveryConstraints/DeliveryConstraintsManagement';
export ConfigureWorkTimes from './DeliveryConstraints/ConfigureWorkTimes';
export AddHolidays from './DeliveryConstraints/AddHolidays';
export ViewCart from './Consumer/components/Cart/Cart';
export RechargeHistory from './Consumer/components/Recharge/Recharge';
export ViewDevice from './Consumer/components/Device/Device';
// export ViewStates from './State/ViewTable';
// export ViewState from './State/ViewState';
// export ViewSkus from './Sku/ViewTable';
// export ViewSku from './Sku/ViewSku';
export Kycfunctions from './KycUpload/KycLanding/Kycfunctions';
export CustomerTransaction from './CustomerTransaction/CustomerTransaction';
export VerifyKycs from './KycUpload/KycVerify/VerifyKyc';
export UploadKycs from './KycUpload/KycUpload/UploadKyc';
// export ViewKyc from './KycUpload/ViewTable';
// export ViewKycProfile from './Kyc/KycView';
export KycViewUpload from './KycUpload/KycUploadViews';
export KycViewVerify from './KycUpload/KycVerifyUser/KycVerifyUserView';
export StateManagement from './SkuManagement/State/StateManagement';
export GenreManagement from './SkuManagement/Genre/GenreManagement';
export CategoryManagement from './SkuManagement/Category/CategoryManagement';
export ManageState from './SkuManagement/State/ManageState';
export ManageGenre from './SkuManagement/Genre/ManageGenre';
export ManageCategory from './SkuManagement/Category/ManageCategory';
export CreateNotepadEntry from './NotepadEntries/CreateNotepadEntry';
export Notepad from './NotepadEntries/Notepad';
export RetailerCreateNotepadEntry from './RetailerNotepadEntries/CreateNotepadEntry';
export RetailerNotepad from './RetailerNotepadEntries/Notepad';
export BarCreateNotepadEntry from './BarNotepadEntries/CreateNotepadEntry';
export BarNotepad from './BarNotepadEntries/Notepad';
export EditAccountDetails from './Consumer/components/EditProfile/EditAccountDetails';
export BrandManagement from './SkuManagement/Brand/BrandManagement';
export CompaniesManagement from './SkuManagement/Companies/CompaniesManagement';
export ManageCompanies from './SkuManagement/Companies/ManageCompanies';


/* Brand Management */
export BrandCreate from './SkuManagement/Brand/BrandCreate';
export BrandEdit from './SkuManagement/Brand/BrandEdit';
/* End of it */

export Skus from './SkuManagement/Skus/Skus';
// export Toppicks from './SkuManagement/Skus/Toppicks/Toppicks';
export Toppicks from './SkuManagement/Skus/Toppicks/TopPicksWrapper';
export TopPicksInWrapper from './SkuManagement/Skus/ToppicksIn/TopPicksInWrapper';

// export AddToppicks from './SkuManagement/Skus/AddToppicks/AddToppicks';
export AddTopPicks from './SkuManagement/Skus/AddTopPicks/AddTopPicksWrapper';
export CreateSku from './SkuManagement/Skus/CreateSku/CreateSkuWrapper';
export SkuManagementViewSkus from './SkuManagement/Skus/ViewSku/ViewSku';
// export SkuManagementToppicks from './SkuManagement/Skus/ToppicksIn/ToppicksIn';

/* Customer Transaction */
export AddCredit from './CustomerTransaction/components/Credits/CreateCredit';
export ConfirmCredit from './CustomerTransaction/components/Credits/ConfirmCredits';
export ViewCredits from './CustomerTransaction/components/Credits/ViewCredits';

export ViewAllCredits from './CustomerTransaction/components/ViewCredits/ViewCredits';

/* */
export HomepageManagementAds from './HomepageManagement/Ads';
export HomepageManagementSelectAds from './HomepageManagement/SelectAds';
export BrandManagerProfile from './BrandsOffersAndPromos/BrandManagerProfile/BrandManagerProfile';
export CreateBrandManager from './BrandsOffersAndPromos/CreateBrandManager/CreateBrandManager';
export BrandPromos from './BrandsOffersAndPromos/BrandPromos/BrandPromos';
export BrandListing from './BrandListing/BrandListing';
export FeaturedListing from './FeaturedListing/FeaturedListing';
export PositionListing from './PositionLimits/PositionListing';
export AdListing from './AdListing/AdListing';
export WelcomeDrinksView from './BrandsOffersAndPromos/WelcomeDrinksView/WelcomeDrinksView';
export MiscellaneousItem from './MiscellaneousItem/MiscellaneousItem';
export MiscellaneousItemList from './MiscellaneousItemList/MiscellaneousItemList';
export MiscellaneousItemMap from './MiscellaneousItemMap/MiscellaneousItem';
export WelcomeDrinksCreate from './BrandsOffersAndPromos/WelcomeDrinksCreate/WelcomeDrinksCreate';
export CreatePromos from './BrandsOffersAndPromos/CreatePromos/CreatePromos';
export PromosCashbackRedeem from './BrandsOffersAndPromos/PromosCashbackRedeem/PromosCashbackRedeem';
export PromosOnPack from './BrandsOffersAndPromos/PromosOnPack/PromosOnPack';
export RetailerManagementCreate from './RetailerManagement/CreateBranch/CreateBranch';

export RetailerManagementBarCreate from './BarManagement/CreateBar/CreateBar';
export RetailerManagementViewBar from './BarManagement/ViewBar/ViewBar';

export RetailerManagementSettlementDetails from './RetailerManagement/RedemptionHistory/SettlementDetails';
export RetailerManagementDeviceDetail from './RetailerManagement/DeviceDetail/DeviceDetail';
export RetailerManagementDisableDevice from './RetailerManagement/DisableDevice/DisableDevice';
export RetailerManagementTransactions from './RetailerManagement/DebitsCredits/Transactions';
export RetailerManagementCreateOrganization from './RetailerManagement/CreateOrganization/CreateOrganization';
export RetailerManagementViewOrganization from './RetailerManagement/ViewOrganization/ViewOrganization';
export RetailerManagementViewBranch from './RetailerManagement/ViewBranch/ViewBranch';
export CustomerSupportCustomerProfile from './CustomerSupport/CustomerProfile/CustomerProfile';
export CustomerSupportFreshdeskTicket from './CustomerSupport/FreshdeskTicket/FreshdeskTicket';
export CustomerSupportIssueHistory from './CustomerSupport/IssueHistory/IssueHistory';
export CustomerSupportSupport from './CustomerSupport/Support/Support';
export CustomerSupportFreshdeskTicketList from './CustomerSupport/FreshdeskTicketList/FreshdeskTicketList';
export CustomerSupportInstantCallbackHistory from './CustomerSupport/InstantCallbackHistory/InstantCallbackHistory';
export ParameterManagementConsumerManualCodes from './ParameterManagement/ConsumerManualCodes/ConsumerManualCodes';
export ParameterManagementCreateCode from './ParameterManagement/CreateCode/CreateCode';
export ParameterManagementConsumerIssueCodes from './ParameterManagement/ConsumerIssueCodes/ConsumerIssueCodes';
export ParameterManagementConsumerIssueCreateCode from './ParameterManagement/ConsumerIssueCreateCode/ConsumerIssueCreateCode';
export ParameterManagementConsumerNotepadCodes from './ParameterManagement/ConsumerNotepadCodes/ConsumerNotepadCodes';
export ParameterManagementNotepadCreateCode from './ParameterManagement/NotepadCreateCode/NotepadCreateCode';
export ParameterManagementRetailerManualDebitCreditCodes from './ParameterManagement/RetailerManualDebitCreditCodes/RetailerManualDebitCreditCodes';
export ParameterManagementRetailerManualCreateCode from './ParameterManagement/RetailerManualCreateCode/RetailerManualCreateCode';
export ParameterManagementConsumerDisableAccountCode from './ParameterManagement/ConsumerDisableAccountCode/ConsumerDisableAccountCode';
export ParameterManagementConsumerDisableAccountCreateCode from './ParameterManagement/ConsumerDisableAccountCreateCode/ConsumerDisableAccountCreateCode';
export ParameterManagementConsumerDeviceAccountCodes from './ParameterManagement/ConsumerDeviceAccountCodes/ConsumerDeviceAccountCodes';
export ParameterManagementConsumerDeviceAccountCreateCode from './ParameterManagement/ConsumerDeviceAccountCreateCode/ConsumerDeviceAccountCreateCode';
export AccountingEODReport from './Accounting/EODReport/EODReport';
export AccountingSettlementReport from './Accounting/SettlementReport/SettlementReport';
export AccountingUploadPayUReport from './Accounting/UploadPayUReport/UploadPayUReport';
export AccountingUploadSettlementReport from './Accounting/UploadSettlementReport/UploadSettlementReport';
// export WhatsNewCreatePost from './WhatsNew/CreatePost/CreatePost';
export WhatsNewCreateArticle from './WhatsNewArticle/CreateArticle/CreateArticle';
export WhatsNewViewArticle from './WhatsNewArticle/ArticleList/ArticleManagement';
/* Consumer Transactions */

export ConsumerRecharge from './CustomerTransaction/components/Recharge/Recharge';
export ConsumerDevice from './CustomerTransaction/components/Devices/Devices';
export ConsumerCancellation from './CustomerTransaction/components/Cancellation/Cancellation';
export ConsumerReservation from './CustomerTransaction/components/Reservation/Reservation';
export ConsumerRedemption from './CustomerTransaction/components/Redemption/Redemption';
export ConsumerReservationItems from './CustomerTransaction/components/Reservation/ReservationItems/ReservationItems';
export ConsumerRedemptionItems from './CustomerTransaction/components/Redemption/RedemptionItems/RedemptionItems';

/* ViewBrandManager */
export ViewBrandManager from './BrandsOffersAndPromos/ViewBrandManager/ViewBrandManager';
export EditBrandManager from './BrandsOffersAndPromos/EditBrandManager/EditBrandManager';

/* SKU */
export ListSku from './SkuManagement/Skus/ListSku/ListSku';

/* Retailer Management */
export ProfileKyc from './RetailerManagement/ProfileKyc/ProfileKyc';
/* */

/* Bar */
export BarProfileKyc from './BarManagement/ProfileKyc/BarProfileKyc';
export BarSkuLanding from './BarManagement/BarSku/BarSkuLanding';
export BarSkuCreateLanding from './BarManagement/BarSkuCreateLanding/BarSkuCreateLanding';
export BarSkuCreate from './BarManagement/CreateSKU/CreateSku';
export BarList from './BarManagement/ListBar/ListBar';
export BarManagementUnlockBar from './BarManagement/UnlockBar/UnlockBar';
export BarManagementAddSKU from './BarManagement/UnlockBarAddSKU/UnlockBarAddSKU';

/* All Bar Skus */

export ManageBarSkus from './BarManagement/ManageBarSku/ManageBarSku';

/* */
/* */

/* Ads */
export AdsMain from './BrandsOffersAndPromos/Ads/AdsMain';
export CreateMain from './BrandsOffersAndPromos/Ads/CreateMain';
export AdsListing from './BrandsOffersAndPromos/AdsListing/AdsListing';
export CreateImageAd from './BrandsOffersAndPromos/AdsCreateImageAd/CreateImageAd';
export ViewImageAd from './BrandsOffersAndPromos/AdsViewImageAd/CreateImageAd';
export CreateSkuAd from './BrandsOffersAndPromos/AdsCreateSkuAd/CreateSkuAd';
export ViewSkuAd from './BrandsOffersAndPromos/AdsViewSkuAd/CreateImageAd';
export CreatePromoAd from './BrandsOffersAndPromos/AdsCreatePromoAd/CreatePromoAd';
export CreateUrlAd from './BrandsOffersAndPromos/AdsCreateUrlAd/CreateUrlAd';
export CreateBarAd from './BrandsOffersAndPromos/AdsCreateBarAd/CreateBarAd';
/* */

/* Reports */
export Reports from './Reports/Reports/Report';
export BarReportUpload from './Reports/Reports/UploadBar';
export RetailerReportUpload from './Reports/Reports/UploadRetailer';
/* */

/* Retailer Transactions */

export TransactionLanding from './RetailerManagement/Transactions/TransactionLanding/TransactionLanding';
export ViewDebitCredit from './RetailerManagement/DebitsCredits/ViewDebitCredit/ViewDebitCredit';

export ViewDailyReports from './RetailerManagement/Transactions/ViewDailyReports/ViewDailyReports';
export RetailerSettlements from './RetailerManagement/Transactions/Settlements/Settlements';
export RetailerSettlementsStatus from './RetailerManagement/Transactions/SettlementsStatus/Settlements';
export RetailerRedemptions from './RetailerManagement/Transactions/Redemptions/Redemptions';

/* Invite a Friend */

export InvitationLanding from './Invites/approvedUserComponent/approvedUserComponent';

/* Bar Transactions */

export BarTransactionLanding from './RetailerManagement/Transactions/BarTransactionLanding/BarTransactionLanding';
export BarViewDebitCredit from './RetailerManagement/BarDebitsCredits/ViewDebitCredit/ViewDebitCredit';
export BarDebitTransactions from './RetailerManagement/BarDebitsCredits/Transactions';

export BarDailyReports from './BarManagement/Transactions/ViewDailyReports/ViewDailyReports';

export BarSettlements from './BarManagement/Transactions/Settlements/Settlements';

/* Campaigns */

export ViewCampaigns from './BrandsOffersAndPromos/ViewCampaigns/ViewCampaigns';

/* End of it */

/* Consumer History */
export ViewConsumerTransactions from './Consumer/components/ViewConsumerTransactions/ViewConsumerTransactions';
/* */
