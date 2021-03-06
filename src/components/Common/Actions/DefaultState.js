const defaultState = {
  ongoingRequest: false,
  lastError: {},
  lastSuccess: [],
  credentials: null,
  secondaryData: null,
  count: 1
};

const defaultConvenienceFeeItem = {
  detail: {},
  statesAll: []
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

const defaultbrandListingData = {
  allState: [],
  allList: [],
  updateIndex: [],
  allGenre: []
};

const defaultpositionListingData = {
  allState: [],
  allList: [],
  allTypes: [],
  updateIndex: []
};

const defaultfeaturedListingData = {
  allState: [],
  allList: [],
  featuredList: [],
  updateIndex: []
};

const defaultadListingData = {
  adType: '',
  allCity: [],
  allList: [],
  allBar: []
};

const defaultGenreState = {
  genreName: '',
  displayName: '',
  displayOrder: 0,
  image: '',
  genreStatus: false,
  genreId: 0,
  genreShort: ''
};

const defaultBrandState = {
  companyList: [],
  brandSlugMap: {},
  genreList: [],
  categoryList: [],
  typeList: [],
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
  originList: [],
  updatedRegionReference: {},
  brandName: '',
  companyId: 0,
  categoryId: 0,
  genreId: 0,
  genreShort: '',
  alcoholPer: '',
  temperature: '',
  caloriesPer: '',
  caloriesTotal: '',
  origin: '',
  description: '',
  image: ''
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
  currentPage: '',
  skuPricingStateMap: {},
  reservedItems: [],
  showConsumer: false
  /* For each state in this mapping we need to create an entry in sku_pricing */
  // stateMrpObj: {}
};

const defaultConsumerState = {
  userData: []
};

const defaultUserState = {
  userData: {roles: [], is_active: true},
  availableRoles: []
};

const defaultBrandManagerProfileState = {
  lastSuccess: [{company: {}}]
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

const defaultcreatePromoAdData = {
  type: 'create',
  campaignDetails: {},
  campaignsAll: [{
    cashback_promos:
      [{skus:
        [{sku_pricing:
          {sku: {brand: {}}}
        }]
      }],
    brand_manager: {}
  }],
  bmInfo: {},
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  skus: {},
  selectedCities: {},
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const defaultcreateSkuAdData = {
  type: 'create',
  campaignDetails: {},
  brandsAll: [{}],
  brandManagers: [{}],
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  selectedBrand: {skus: []},
  selectedCities: {},
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const defaultcreateImageAdData = {
  type: 'create',
  campaignDetails: {},
  brandsAll: [{}],
  brandManagers: [{}],
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  selectedBrand: {skus: []},
  selectedCities: {},
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const whatsNewDefaultData = {
  type: 'create',
  campaignDetails: {},
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  selectedCities: {},
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const defaultViewImageAdData = {
  type: 'view',
  campaignDetails: {},
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  selectedCities: {},
  budgeted_amount: '',
  ad_location: '',
  ad_title: '',
  brand_manager_id: '',
  sku_id: '',
  brand_id: '',
  funds_credited: '',
  target_views: '',
  active_from: '',
  active_to: '',
  ad_status: '',
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const defaultcreateUrlAdData = {
  type: 'create',
  brandsAll: [{}],
  brandManagers: [{}],
  campaignDetails: {},
  statesAll: [{
    state_name: '',
    cities: [{}]
  }],
  selectedBrand: {skus: []},
  selectedCities: {},
  hideCities: 'hide',
  citiesView: {
    state_name: '',
    cities: [{}]
  },
  imageUrl: ''
};

const defaultWhatsNew = {cities: [], citiesView: {'cities': []}, statesAll: [{'cities': []}], selectedCities: [], hideCities: ''};
const defaultcreateBarAdData = {
  type: 'create',
  campaignDetails: {},
  citiesAll: [{
    bars: [{}]
  }],
  selectedCity: { bars: [] },
  imageUrl: ''
};
const defaultwelcomeCreateData = {
  type: 'create',
  campaignDetails: {},
  brandsAll: [],
  skusAll: [],
  productsAll: [],
  availableProducts: [],
  availableSkus: [],
  citiesAll: [{
    bars: [{}]
  }],
  selectedCity: { bars: [] },
  imageUrl: ''
};

const defaultmiscItem = {
  misc_info_detail: [],
  miscAll: [],
  citiesAll: [],
  barsAll: [],
  miscellaneousInformation: [],
  miscellaneousInformationCount: 0,
  miscellaneousInformationPage: 0,
  misc_detail: {},
  detail: {},
  banner_image: {}
};

export default defaultState;
export { defaultNotepadState
  , defaultBrandState
  , defaultConvenienceFeeItem
  , defaultBrandManagerProfileState
  , defaultCreateBrandManagerState
  , defaultwelcomeCreateData
  , defaultbrandListingData
  , defaultpositionListingData
  , defaultfeaturedListingData
  , defaultadListingData
  , defaultmiscItem
  , defaultViewBrandManagerState
  , defaultEditBrandManagerState
  , defaultConsumerState
  , defaultUserState
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
  , defaultcreateImageAdData
  , defaultcreateSkuAdData
  , defaultcreatePromoAdData
  , defaultViewImageAdData
  , defaultcreateUrlAdData
  , defaultWhatsNew
  , defaultcreateBarAdData
  , whatsNewDefaultData
};
