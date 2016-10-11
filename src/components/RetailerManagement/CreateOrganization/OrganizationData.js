// import requestAction from '../../Common/Actions/requestAction';
//
// import { genOptions } from '../../Common/Actions/commonFunctions';
//
// import Endpoints from '../../../Endpoints';

/* Action constants */

const ORGANIZATION_INPUT_CHANGED = '@organisationDataReducer/ORGANIZATION_INPUT_CHANGED';
const ORGANIZATION_CONTACT_CHANGED = '@organisationDataReducer/ORGANIZATION_CONTACT_CHANGED';
const ORGANIZATION_REGISTERED_CHANGED = '@commonStateReducer/ORGANIZATION_REGISTERED_CHANGED';

/* End of it */

const organizationDataReducer = ( state = { orgDetail: {}, orgContact: {}, orgRegistered: {} }, action ) => {
  switch ( action.type ) {
    case ORGANIZATION_INPUT_CHANGED:
      const organizationDetail = {};
      organizationDetail[action.data.key] = action.data.value;
      return { ...state, orgDetail: { ...state.orgDetail, ...organizationDetail }};
    case ORGANIZATION_CONTACT_CHANGED:
      const organizationContact = {};
      organizationContact[action.data.key] = action.data.value;
      return { ...state, orgContact: { ...state.orgContact, ...organizationContact }};
    case ORGANIZATION_REGISTERED_CHANGED:
      const organizationRegistered = {};
      organizationRegistered[action.data.key] = action.data.value;
      return { ...state, orgRegistered: { ...state.orgRegistered, ...organizationRegistered}};
    default:
      return { ...state };
  }
};

export default organizationDataReducer;

export {
  ORGANIZATION_INPUT_CHANGED,
  ORGANIZATION_CONTACT_CHANGED,
  ORGANIZATION_REGISTERED_CHANGED
};
