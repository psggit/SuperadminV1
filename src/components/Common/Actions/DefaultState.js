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
  categoryList: []
};

const defaultCreateSkuState = {
  brandList: [],
  stateList: [],
  stateCityMapping: {},
  cityRetailerMapping: {},
  retailerMapping: {},
  retailerStatus: {},
  viewedState: {},
  viewedCity: {}
};

const defaultConsumerState = {
  userData: []
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
export { defaultNotepadState, defaultBrandState, defaultConsumerState, defaultKycState, defaultCreateSkuState};
