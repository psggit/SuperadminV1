const defaultState = {
  ongoingRequest: false,
  lastError: {},
  lastSuccess: [],
  credentials: null,
  secondaryData: null,
  count: 1
};

const defaultNotepadState = {
  issueTypes: []
};

const defaultFreshdeskTicketState = {
  freshdeskTicketData: {
    attachments: [],
    to_emails: [],
    conversations: [{attachments: [], to_emails: []}]
  }
};

const defaultCustomerSupportState = {
  issueData: {
    consumer_id: '',
    consumer: {
      full_name: '',
      mobile_number: '',
    },
  }
};

const defaultGenreState = {
  genreName: '',
  displayName: '',
  displayOrder: 0,
  image: '',
  genreStatus: false,
  genreId: 0
};

const defaultBrandState = {
  companyList: [],
  genreList: [],
  categoryList: [],
  stateList: [],
  stateCityMapping: {},
  viewedState: {},
  showRegionState: false,
  region: {},
  regionCity: {},
  regionCityUpdated: {},
  viewedRegionId: 0,
  regionId: 100000000,
  baseLocalRegionId: 100000000,
  isEdit: false,
  brandId: 0,
  brandObj: {},
  updatedRegions: {},
  updatedRegionReference: {},
  brandName: '',
  companyId: 0,
  categoryId: 0,
  genreId: 0
};

const defaultStateManagementState = {
  stateInput: '',
  shortName: '',
  stateStatus: false,
  cityInput: '',
  cityGPS: '',
  hideCityComponent: true,
  isCityEdit: false,
  isCityLocal: false,
  cityId: '0',
  cities: {},
  fromDB: [],
  regionInput: ''
};

/* Response Objs =>
 *  {
 *    'sku': {
 *      'id': 'sku_id'
 *    }
 *    sku_pricing': {
 *      'state_id': {
 *        'id': 'sku_pricing_id'
 *      }
 *    }
 *  }
*/

const defaultCreateSkuState = {
  brandList: [], /* Stores the brands fetched from the server */
  stateList: [], /* Stores the states fetched from the server */
  stateCityMapping: {}, /* Stores the state information of selected states and its corresponding cities */
  cityRetailerMapping: {}, /* Stores the state information of selected cities and its corresponding retailers */
  retailerMapping: {},
  retailerStatus: {},
  viewedState: {}, /* Stores viewed states id's */
  viewedCity: {}, /* Stores viewed city id's */
  skuImageUrl: '', /* Uploaded image url is saved */
  responseObjs: {},
  skuReqObj: {}, /* Stores the request object for SKU creation */
  sku_id: '',
  sku_state_id: {},
  currentPage: ''
  /* For each state in this mapping we need to create an entry in sku_pricing */
  // stateMrpObj: {}
};

const defaultConsumerState = {
  userData: []
};

const defaultBrandManagerProfileState = {
  brandManagerList: []
};

const defaultCreateBrandManagerState = {
  companyList: [],
  selected_company: {},
  companyBrands: [],
  selectedBrand: {},
  selectedBrandsList: [],
  regionCitiesView: {},
  showBrandContainer: false,
  isExistingBrand: false,
  brandManagerInfo: {}
};

const defaultEditBrandManagerState = {
  companyList: [],
  selected_company: {},
  companyBrands: [],
  selectedBrand: {},
  selectedBrandsList: [],
  regionCitiesView: {},
  showBrandContainer: false,
  isExistingBrand: false,
  brandManagerInfo: {'company': {}}
};

const defaultViewBrandManagerState = {
  companyList: [],
  selected_company: {},
  companyBrands: [],
  selectedBrand: {},
  selectedBrandsList: [],
  regionCitiesView: {},
  showBrandContainer: false,
  isExistingBrand: false,
  brandManagerInfo: {'company': {}}
};

const defaultKycState = {
  isConsumerPICUploaded: false,
  isAddressProofUploaded: false,
  isIdProofUploaded: false,
  consumerPIC: [],
  idProof: [],
  addressProof: [],
  consumerCommentStatus: 'hide',
  idCommentStatus: 'hide',
  addressCommentStatus: 'hide',

  isConsumerPICVUpdated: false,
  consumerPICVIStatus: '',
  consumerPICVCStatus: '',
  consumerPICVComment: '',

  isAddressProofVUpdated: false,
  addressProofVIStatus: '',
  addressProofVCStatus: '',
  addressProofVComment: '',

  isIdProofVUpdated: false,
  idProofVIStatus: '',
  idProofVCStatus: '',
  idProofVComment: '',

  panIValue: '',
  address1IValue: '',
  address2IValue: '',
  cityIValue: '',
  proofType: '',
  pinCodeIValue: '',

  defaultConsumerPIC: {
    consumerPICVIStatus: '',
    consumerCommentStatus: 'hide',
    consumerPICVComment: ''
  },
  defaultIdProof: {
    idProofVIStatus: '',
    idCommentStatus: 'hide',
    idProofVComment: '',
    panIValue: ''
  },

  defaultAddressProof: {
    addressProofVIStatus: '',
    addressCommentStatus: 'hide',
    addressProofVComment: '',
    address1IValue: '',
    address2IValue: '',
    cityIValue: '',
    pinCodeIValue: '',
    proofType: ''
  }

};

const defaultCategoryState = {
  genreList: [],
  name: '',
  genreShort: '',
  categoryId: 0,
  categoryStatus: true
};

const defaultCompanyState = {
  cityList: [],
  stateList: [],
  companyId: 0,
  name: '',
  address: '',
  pinCode: 0,
  cityId: 0,
  stateId: 0
};

const defaultTopPicksSelectState = {
  stateList: [],
  stateMapping: {},
  selectedState: {},
  showGenre: false
};

const defaultTopPicksState = {
  state: '',
  genre: '',
  stateId: 0,
  genreId: 0
};

const defaultAddTopPickData = {
  brandList: [],
  selectedBrand: {},
  skuPricingId: 0
};

export default defaultState;
export { defaultNotepadState
  , defaultBrandState
  , defaultBrandManagerProfileState
  , defaultCreateBrandManagerState
  , defaultViewBrandManagerState
  , defaultEditBrandManagerState
  , defaultConsumerState
  , defaultKycState
  , defaultCreateSkuState
  , defaultStateManagementState
  , defaultCategoryState
  , defaultCompanyState
  , defaultTopPicksSelectState
  , defaultTopPicksState
  , defaultAddTopPickData
  , defaultFreshdeskTicketState
  , defaultCustomerSupportState
  , defaultGenreState
};
