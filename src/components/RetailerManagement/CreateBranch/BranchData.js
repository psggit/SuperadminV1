import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
// import { routeActions } from 'redux-simple-router';
// // //
import Endpoints from '../../../Endpoints';

/* Action constants */

const RESET_BRANCH = '@branchDataReducer/RESET_BRANCH';
const ORGANISATION_FETCHED = '@branchDataReducer/ORGANISATION_FETCHED';

const BRANCH_CONTACT_CHANGED = '@branchDataReducer/BRANCH_CONTACT_CHANGED';
const BRANCH_INPUT_CHANGED = '@branchDataReducer/BRANCH_INPUT_CHANGED';
const BRANCH_ACCOUNT_CHANGED = '@branchDataReducer/BRANCH_ACCOUNT_CHANGED';

/* End of it */

/* Action creators */

const getOrganisation = () => {
  return ( dispatch ) => {
    const orgUrl = Endpoints.db + '/table/organisation/select';

    const selectObj = {};
    selectObj.columns = ['id', 'organisation_name'];

    const options = {
      ...genOptions,
      body: JSON.stringify(selectObj)
    };

    return dispatch( requestAction( orgUrl, options, ORGANISATION_FETCHED ) )
    .catch( () => {
      alert('Error While fetching organisation');
      return Promise.reject();
    });
    // return Promise.resolve();
  };
};

/* End of it */

/* Update Branch */

/* End of it */

/* Reducers */

const branchDataReducer = ( state = { organisationData: [], branchDetail: {}, branchContact: {}, branchAccountRegistered: {} }, action ) => {
  switch ( action.type ) {
    case ORGANISATION_FETCHED:
      return { ...state, organisationData: action.data };
    case BRANCH_CONTACT_CHANGED:
      const branchContact = {};
      branchContact[action.data.key] = action.data.value;
      return { ...state, branchContact: { ...state.branchContact, ...branchContact }};
    case BRANCH_INPUT_CHANGED:
      const branchDetail = {};
      branchDetail[action.data.key] = action.data.value;
      return { ...state, branchDetail: { ...state.branchDetail, ...branchDetail }};
    case BRANCH_ACCOUNT_CHANGED:
      const branchAccountRegistered = {};
      branchAccountRegistered[action.data.key] = action.data.value;
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, ...branchAccountRegistered}};
    case RESET_BRANCH:
      return { branchDetail: {}, branchContact: {}, branchRegistered: {} };
    default:
      return { ...state };
  }
};

export default branchDataReducer;

export {
  RESET_BRANCH,
  getOrganisation,
  BRANCH_CONTACT_CHANGED,
  BRANCH_INPUT_CHANGED,
  BRANCH_ACCOUNT_CHANGED
};
