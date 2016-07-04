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

const defaultBrandState = {
  companyList: [],
  genreList: [],
  categoryList: [],
  stateList: [],
  stateCityMapping: {},
  viewedState: {},
  showRegionState: false,
};

const defaultStateManagementState = {
  stateInput: '',
  stateStatus: false,
  cityInput: '',
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
  selectedBrandsList: []
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

export default defaultState;
export { defaultNotepadState
  , defaultBrandState
  , defaultBrandManagerProfileState
  , defaultCreateBrandManagerState
  , defaultConsumerState
  , defaultKycState
  , defaultCreateSkuState
  , defaultStateManagementState
};
