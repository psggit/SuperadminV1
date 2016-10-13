/* Default state for the beneficiary components */

const addBeneficiaryState = {
  'name': '',
  'address': '',
  'pincode': '',
  'city_id': 0,
  'state_id': 0,
  'email': '',
  'landline_number': '',
  'beneficiaries': []
};

const uiState = {
  'showDetail': false,
  'isEditing': false,
  'isOrgEdit': false,
  'editBeneficiaryId': 0,
  'localBenId': 1000,
  'localBens': {},
  'editLocalBenId': 0
};

export {
  addBeneficiaryState,
  uiState
};
