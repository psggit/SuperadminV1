import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
import { routeActions } from 'redux-simple-router';
// // //
import Endpoints from '../../../Endpoints';

/* Action constants */

const RESET_BRANCH = '@branchDataReducer/RESET_BRANCH';
const ORGANISATION_FETCHED = '@branchDataReducer/ORGANISATION_FETCHED';

const BRANCH_CONTACT_CHANGED = '@branchDataReducer/BRANCH_CONTACT_CHANGED';
const BRANCH_INPUT_CHANGED = '@branchDataReducer/BRANCH_INPUT_CHANGED';
const BRANCH_ACCOUNT_CHANGED = '@branchDataReducer/BRANCH_ACCOUNT_CHANGED';

const IMAGE_UPLOAD_SUCCESS = '@branchDataReducer/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = '@branchDataReducer/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = '@branchDataReducer/CANCEL_IMAGE';

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

/* Creation */


const saveBranch = () => {
  return ( dispatch, getState ) => {
    const branchUrl = Endpoints.db + '/table/retailer/insert';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = {
      ...branchState.branchDetail,
      gps_cordinates: branchState.branchContact.gps_cordinates,
      city_id: branchState.branchContact.city_id,
      is_open: true,
      is_active: true,
      kyc_outlet: true
    };

    const brInsertCheck = [
      'gps_cordinates',
      'is_open',
      'organisation_id',
      'application_number',
      'cst_number',
      'kyc_status',
      'branch_status',
      'is_active',
      'city_id',
      'excise_licence_number',
      'org_name',
      'kyc_outlet'
    ];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch are mandatory');
      return Promise.reject({ stage: 0 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...branchDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( branchUrl, options ) );
    // return Promise.resolve();
  };
};

const saveBranchContact = ( id ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/retailer_address/insert';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = { ...branchState.branchContact, retailer_id: id };

    const brInsertCheck = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'retailer_id', 'gps_cordinates'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch contact are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...branchDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( brUrl, options ) );
    // return Promise.resolve();
  };
};

const saveAccount = ( id ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/retailer_bank_details/insert';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = { ...branchState.branchAccountRegistered, retailer_id: id };

    const brInsertCheck = ['ifsc_code', 'account_number', 'branch', 'bank_name', 'retailer_id'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch Account are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...branchDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( brUrl, options ) );
    // return Promise.resolve();
  };
};

const saveBranchDetail = () => {
  return ( dispatch ) => {
    return dispatch(saveBranch())
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        const branchId = resp.returning[0].id;
        return Promise.all([
          dispatch(saveBranchContact(branchId)),
          dispatch(saveAccount(branchId))
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Branch Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Branch inserted with errors, please edit it to correct the information');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
    });
  };
};

/* End of it */

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
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: action.data[0]}};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: ''}};
    case CANCEL_IMAGE:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: ''}};
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
  BRANCH_ACCOUNT_CHANGED,
  saveBranchDetail,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE
};
