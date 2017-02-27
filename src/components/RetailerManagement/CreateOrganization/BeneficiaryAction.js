/* Default State */

import { addBeneficiaryState, uiState } from './State';

/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

/* Action Constant */

const INITIAL_DATA_FETCHED = '@beneficiary/INITIAL_DATA_FETCHED';
const HANDLE_ERROR = '@beneficiary/HANDLE_ERROR';

const TOGGLE_BENEFICIARY_DETAIL = '@beneficiary/TOGGLE_BENEFICIARY_DETAIL';

const LOAD_BENEFICIARY = '@beneficiary/LOAD_BENEFICIARY';
const LOAD_LOCAL_BENEFICIARY = '@beneficiary/LOAD_LOCAL_BENEFICIARY';

const LOCAL_CREATE_BENEFICIARY = '@beneficiary/LOCAL_CREATE_BENEFICIARY';
const LOCAL_UPDATE_BENEFICIARY = '@beneficiary/LOCAL_UPDATE_BENEFICIARY';
const LOCAL_DELETE_BENEFICIARY = '@beneficiary/LOCAL_DELETE_BENEFICIARY';

const UNLOAD_BENEFICIARY = '@beneficiary/UNLOAD_BENEFICIARY';

const BENEFICIARY_INPUT_CHANGE = '@organisationDataReducer/BENEFICIARY_INPUT_CHANGE';
const RESET_BENEFICIARY = '@organisationDataReducer/RESET_BENEFICIARY';

/* End of it */

/* Action Creators */

const fetchBeneficiaries = (orgId) => {
  return ( dispatch, getState ) => {
    const benUrl = Endpoints.db + '/table/beneficiary/select';

    const benObj = {
      'columns': ['*']
    };

    benObj.where = {
      'organisation_id': parseInt(orgId, 10)
    };

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(benObj)
    };

    return dispatch( requestAction( benUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

const createBeneficiary = () => {
  return ( dispatch, getState ) => {
    if ( !getState().organization_data.organizationData.orgData.id ) {
      alert('Create Organization to create beneficiary');
      return Promise.reject();
    }
    const benUrl = Endpoints.db + '/table/beneficiary/insert';

    const beneficiaryData = getState().organization_data.beneficiaryData;
    const beneficiaryDataObj = {
      'name': beneficiaryData.name,
      'address': beneficiaryData.address,
      'landline_number': beneficiaryData.landline_number,
      'pincode': beneficiaryData.pincode,
      'email': beneficiaryData.email,
      'city_id': beneficiaryData.city_id,
      'state_id': beneficiaryData.state_id,
      'organisation_id': getState().organization_data.organizationData.orgData.id
    };

    const beneficiaryInsertCheck = ['name', 'address', 'landline_number', 'pincode', 'email', 'city_id', 'state_id'];
    let beneficiaryCheck = true;
    const beneficiaryList = [];

    beneficiaryInsertCheck.forEach( ( i ) => {
      beneficiaryCheck = beneficiaryCheck && ( beneficiaryDataObj[i] ? true : false );
      if ( beneficiaryDataObj[i] === '' ) {
        beneficiaryList.push(i);
      }
    });

    if ( !beneficiaryCheck ) {
      let text = 'Following Fields Missing:\n';
      beneficiaryList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject();
    }

    const insertObj = {};
    insertObj.objects = [ { ...beneficiaryDataObj } ];
    insertObj.returning = ['id'];

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( benUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Beneficiary Created Successfully');
        return Promise.all([
          dispatch( fetchBeneficiaries(getState().organization_data.organizationData.orgData.id)),
          dispatch( { type: UNLOAD_BENEFICIARY })
        ]);
      }
    })
    .catch( ( ) => {
      alert('Couldn"t create beneficiciary');
    });
    // return Promise.resolve();
  };
};

const updateBeneficiary = () => {
  return ( dispatch, getState ) => {
    const benUrl = Endpoints.db + '/table/beneficiary/update';

    const beneficiaryData = getState().organization_data.beneficiaryData;
    const beneficiaryDataObj = {
      'name': beneficiaryData.name,
      'address': beneficiaryData.address,
      'landline_number': beneficiaryData.landline_number,
      'pincode': beneficiaryData.pincode,
      'email': beneficiaryData.email,
      'city_id': beneficiaryData.city_id,
      'state_id': beneficiaryData.state_id,
      'organisation_id': getState().organization_data.organizationData.orgData.id
    };

    const updateObj = {};
    updateObj.values = { ...beneficiaryDataObj };
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': getState().organization_data.beneficiaryData.editBeneficiaryId
    };

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };

    return dispatch( requestAction( benUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Beneficiary Updated Successfully');
        return Promise.all([
          dispatch( fetchBeneficiaries(getState().organization_data.organizationData.orgData.id)),
          dispatch( { type: UNLOAD_BENEFICIARY })
        ]);
      }
    })
    .catch( ( ) => {
      alert('Couldn"t delete beneficiciary');
    });
    // return Promise.resolve();
  };
};

const deleteBeneficiary = () => {
  return ( dispatch, getState ) => {
    const benUrl = Endpoints.db + '/table/beneficiary/delete';

    const deleteObj = {};
    deleteObj.returning = ['id'];
    deleteObj.where = {
      'id': getState().organization_data.beneficiaryData.editBeneficiaryId
    };

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(deleteObj)
    };

    return dispatch( requestAction( benUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Beneficiary Deleted Successfully');
        return Promise.all([
          dispatch( fetchBeneficiaries(getState().organization_data.organizationData.orgData.id)),
          dispatch( { type: UNLOAD_BENEFICIARY })
        ]);
      }
    })
    .catch( ( ) => {
      alert('Couldn"t Delete beneficiciary');
    });
    // return Promise.resolve();
  };
};

const createBeneficiaryLocal = () => {
  return ( dispatch, getState ) => {
    const beneficiaryData = getState().organization_data.beneficiaryData;
    const beneficiaryDataObj = {
      'name': beneficiaryData.name,
      'address': beneficiaryData.address,
      'landline_number': beneficiaryData.landline_number,
      'pincode': beneficiaryData.pincode,
      'email': beneficiaryData.email,
      'city_id': beneficiaryData.city_id,
      'state_id': beneficiaryData.state_id
    };

    const beneficiaryInsertCheck = ['name', 'address', 'landline_number', 'pincode', 'email', 'city_id', 'state_id'];
    let beneficiaryCheck = true;

    beneficiaryInsertCheck.forEach( ( i ) => {
      beneficiaryCheck = beneficiaryCheck && ( beneficiaryDataObj[i] ? true : false );
    });

    if ( !beneficiaryInsertCheck ) {
      alert('All the fields for Beneficiary are mandatory');
      return Promise.reject();
    }

    return dispatch({ type: LOCAL_CREATE_BENEFICIARY, data: { benId: getState().organization_data.beneficiaryData.localBenId, benData: { ...beneficiaryDataObj }} });
  };
};

const updateBeneficiaryLocal = () => {
  return ( dispatch, getState ) => {
    const beneficiaryData = getState().organization_data.beneficiaryData;
    const beneficiaryDataObj = {
      'name': beneficiaryData.name,
      'address': beneficiaryData.address,
      'landline_number': beneficiaryData.landline_number,
      'pincode': beneficiaryData.pincode,
      'email': beneficiaryData.email,
      'city_id': beneficiaryData.city_id,
      'state_id': beneficiaryData.state_id
    };

    const beneficiaryInsertCheck = ['name', 'address', 'landline_number', 'pincode', 'email', 'city_id', 'state_id'];
    let beneficiaryCheck = true;

    beneficiaryInsertCheck.forEach( ( i ) => {
      beneficiaryCheck = beneficiaryCheck && ( beneficiaryDataObj[i] ? true : false );
    });

    if ( !beneficiaryInsertCheck ) {
      alert('All the fields for Beneficiary are mandatory');
      return Promise.reject();
    }

    return dispatch({ type: LOCAL_UPDATE_BENEFICIARY, data: { benId: getState().organization_data.beneficiaryData.editBeneficiaryId, benData: { ...beneficiaryDataObj }} });
  };
};

const deleteBeneficiaryLocal = () => {
  return ( dispatch, getState ) => {
    const localBenId = getState().organization_data.beneficiaryData.editBeneficiaryId;
    return dispatch({ type: LOCAL_DELETE_BENEFICIARY, data: { benId: localBenId } });
  };
};

const defaultBenState = { name: '', address: '', landline_number: '', pincode: '', email: '', city_id: 0, state_id: 0};


/* End of it */

/* Reducer */

const beneficiaryReducer = ( state = { ...addBeneficiaryState, ...uiState }, action ) => {
  switch ( action.type ) {
    case INITIAL_DATA_FETCHED:
      return { ...state, beneficiaries: action.data };
    case BENEFICIARY_INPUT_CHANGE:
      const beneficiaryData = {};
      beneficiaryData[action.data.key] = action.data.value;
      return { ...state, ...beneficiaryData };
    case HANDLE_ERROR:
      return { ...state };
    case TOGGLE_BENEFICIARY_DETAIL:
      return { ...state, showDetail: !state.showDetail };
    case LOCAL_CREATE_BENEFICIARY:
      const localState = {};
      localState[action.data.benId] = action.data.benData;

      return { ...state, ...defaultBenState, localBens: { ...state.localBens, ...localState }, showDetail: false, localBenId: action.data.benId + 1};

    case LOCAL_DELETE_BENEFICIARY:
      const localBenState = Object.assign({}, state.localBens );
      delete localBenState[action.data.benId];

      return { ...state, ...defaultBenState, localBens: { ...localBenState }, showDetail: false, localBenId: state.localBenId - 1, isEditing: false};

    case LOCAL_UPDATE_BENEFICIARY:
      const localUpdateState = {};
      localUpdateState[action.data.benId] = action.data.benData;

      return { ...state, ...defaultBenState, localBens: { ...state.localBens, ...localUpdateState }, showDetail: false };

    case LOAD_BENEFICIARY:
      const benId = action.data;
      const filteredBen = state.beneficiaries.filter( ( ben ) => {
        return ( ben.id === benId );
      });
      const {
        name,
        address,
        landline_number,
        pincode,
        email,
        city_id,
        state_id,
      } = filteredBen[0];

      const benData = { name, address, landline_number, pincode, email, city_id, state_id };

      return { ...state, ...benData, editBeneficiaryId: benId, showDetail: true, isEditing: true};
    case LOAD_LOCAL_BENEFICIARY:
      const localBenId = action.data;

      return { ...state, ...state.localBens[localBenId], editBeneficiaryId: localBenId, showDetail: true, isEditing: true };
    case UNLOAD_BENEFICIARY:
      const benD = { name: '', address: '', landline_number: '', pincode: '', email: '', city_id: 0, state_id: 0};

      return { ...state, ...benD, isEditing: false, showDetail: false, editBeneficiaryId: 0 };
    case RESET_BENEFICIARY:
      return { ...addBeneficiaryState, ...uiState };
    default:
      return { ...state };
  }
};

/* End of it */

export {
  fetchBeneficiaries,
  TOGGLE_BENEFICIARY_DETAIL,
  BENEFICIARY_INPUT_CHANGE,
  LOAD_BENEFICIARY,
  LOAD_LOCAL_BENEFICIARY,
  updateBeneficiary,
  deleteBeneficiary,
  createBeneficiary,
  createBeneficiaryLocal,
  updateBeneficiaryLocal,
  deleteBeneficiaryLocal,
  UNLOAD_BENEFICIARY,
  RESET_BENEFICIARY
};

export default beneficiaryReducer;
