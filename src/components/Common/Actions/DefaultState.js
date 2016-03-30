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

const defaultConsumerState = {
  userData: []
};

const defaultKycState = {
  isUploaded: false,
  consumerPIC: [],
  idProof: [],
  addressProof: [],
  consumerCommentStatus: 'hide',
  idCommentStatus: 'hide',
  addressCommentStatus: 'hide'
};

export default defaultState;
export { defaultNotepadState, defaultBrandState, defaultConsumerState, defaultKycState};
