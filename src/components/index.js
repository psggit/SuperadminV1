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
export AddTable from './Consumer/AddTable';
export InsertItem from './Consumer/InsertItem';
export EditItem from './Bills/EditItem';
export ViewConsumerProfile from './Consumer/ViewProfile';
export ViewCart from './Consumer/components/Cart/Cart';
export RechargeHistory from './Consumer/components/Recharge/Recharge';
export ViewDevice from './Consumer/components/Device/Device';
export ViewStates from './State/ViewTable';
export ViewState from './State/ViewState';
export ViewSkus from './Sku/ViewTable';
export ViewSku from './Sku/ViewSku';
export Kycfunctions from './KycUpload/KycLanding/Kycfunctions';
export CustomerTransaction from './CustomerTransaction/CustomerTransaction';
export VerifyKycs from './KycUpload/KycVerify/VerifyKyc';
export UploadKycs from './KycUpload/KycUpload/UploadKyc';
export Reservations from './Reservation/ViewProfile';
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

export AddCredit from './CustomerTransaction/components/Credits/CreateCredit';
export ConfirmCredit from './CustomerTransaction/components/Credits/ConfirmCredits';
export ViewCredits from './CustomerTransaction/components/Credits/ViewCredits';
export HomepageManagementAds from './HomepageManagement/Ads';
export HomepageManagementSelectAds from './HomepageManagement/SelectAds';
export BrandManagerProfile from './BrandsOffersAndPromos/BrandManagerProfile/BrandManagerProfile';
export CreateBrandManager from './BrandsOffersAndPromos/CreateBrandManager/CreateBrandManager';
export BrandAds from './BrandsOffersAndPromos/BrandAds/BrandAds';
export BrandPromos from './BrandsOffersAndPromos/BrandPromos/BrandPromos';
export PromosInstantCashback from './BrandsOffersAndPromos/PromosInstantCashback/PromosInstantCashback';
export RetailerManagementCreate from './RetailerManagement/CreateBranch/CreateBranch';
export RetailerManagementSettlementDetails from './RetailerManagement/RedemptionHistory/SettlementDetails';
export RetailerManagementDeviceDetail from './RetailerManagement/DeviceDetail/DeviceDetail';
export RetailerManagementDisableDevice from './RetailerManagement/DisableDevice/DisableDevice';
export RetailerManagementTransactions from './Sku/Transactions/Transactions';
export RetailerManagementCreateOrganization from './RetailerManagement/CreateOrganization/CreateOrganization';
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
/* Consumer Transactions */

export ConsumerRecharge from './CustomerTransaction/components/Recharge/Recharge';
export ConsumerReservation from './CustomerTransaction/components/Reservation/Reservation';

/* ViewBrandManager */
export ViewBrandManager from './BrandsOffersAndPromos/ViewBrandManager/ViewBrandManager';
export EditBrandManager from './BrandsOffersAndPromos/EditBrandManager/EditBrandManager';

/* SKU */
export ListSku from './SkuManagement/Skus/ListSku/ListSku';

/* Retailer Management */
export ProfileKyc from './RetailerManagement/ProfileKyc/ProfileKyc';
/* */
