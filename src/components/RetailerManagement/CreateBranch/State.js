/* Default state for the beneficiary components */

const addDeviceState = {
  'device_num': '',
  'mobile_number': '',
  'operator': '',
  'devices': []
};

const uiState = {
  'showDetail': false,
  'isEditing': false,
  'isBrEdit': false,
  'is_active': true,
  'editDeviceId': 0,
  'localDevId': 1000,
  'localDevs': {},
  'editLocalDevId': 0
};

export {
  addDeviceState,
  uiState
};
