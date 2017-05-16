const currentDate = new Date();

const finalTestObj = {
  // options which are used for the dropdown and checkout
  company: '',
  companies: [],
  brandManagers: [],
  campaigns: [],
  brands: [],

  // The promos array has a list of promos which have been inserted by the users
  promos: [],
  currentEditingPromo: 0,
  isPromoSectionShown: false,

  // brand campaign dictionary
  brandManagerIdMap: {},
  brandManagerCampaignMap: {},
  brandManagerBrandMap: {},

  // currentInputs
  brandEmail: '',
  campaignName: '',
  budgetedAmount: 0,
  fundsCredited: 0,

  // The start date is 1 day
  activeFrom: (new Date(currentDate.setDate(currentDate.getDate() + 1))).toISOString().split('.')[0],
  activeTo: (new Date(currentDate.setMonth(currentDate.getMonth() + 2))).toISOString().split('.')[0],

  campaignStatus: 'inactive'
};

const defaultState = {
  ...finalTestObj
};

export default defaultState;
export {defaultState};
