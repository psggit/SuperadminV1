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

export default defaultState;
export { defaultNotepadState, defaultBrandState, defaultConsumerState};
