import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
import { routeActions } from 'redux-simple-router';
// //
import Endpoints from '../../../Endpoints';

/* Action constants */

const ORGANIZATION_INPUT_CHANGED = '@organisationDataReducer/ORGANIZATION_INPUT_CHANGED';
const ORGANIZATION_CONTACT_CHANGED = '@organisationDataReducer/ORGANIZATION_CONTACT_CHANGED';
const ORGANIZATION_REGISTERED_CHANGED = '@organisationDataReducer/ORGANIZATION_REGISTERED_CHANGED';
const ORGANIZATION_FETCHED = '@organisationDataReducer/ORGANIZATION_FETCHED';
const RESET_ORGANIZATION = '@organisationDataReducer/RESET_ORGANIZATION';

/* End of it */

/* Action creators */

const saveOrganization = () => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation/insert';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgDetail };

    const orgInsertCheck = ['annual_turnover', 'date_of_incorporation', 'organisation_name', 'pan_number', 'tan_number', 'tin_number', 'type_of_organisation', 'kyc_status', 'status'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation are mandatory');
      return Promise.reject({ stage: 0 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...organizationDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const saveOrganizationContact = ( id ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation_contact_details/insert';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgContact, organisation_id: id };

    const orgInsertCheck = ['address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'organisation_id'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation contact are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...organizationDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const saveBeneficiaryData = ( id ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/beneficiary/insert';

    const orgState = getState().organization_data.beneficiaryData;

    const localBens = Object.keys(orgState.localBens);

    if ( localBens.length === 0 ) {
      console.log('No beneficiary to create');
      return Promise.resolve();
    }

    const insertObj = {};
    insertObj.objects = [];

    localBens.forEach( ( ben ) => {
      insertObj.objects.push( { ...orgState.localBens[ben], organisation_id: id });
    });

    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const saveOrganizationAddress = ( id ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation_registered_address/insert';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgRegistered, organisation_id: id };

    const orgInsertCheck = ['address', 'pincode', 'city_id', 'state_id', 'organisation_id'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation registered address are mandatory');
      return Promise.reject( { stage: 3 } );
    }

    const insertObj = {};
    insertObj.objects = [ { ...organizationDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const saveOrganizationDetail = () => {
  return ( dispatch ) => {
    return dispatch(saveOrganization())
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        const orgId = resp.returning[0].id;
        return Promise.all([
          dispatch(saveOrganizationContact(orgId)),
          dispatch(saveOrganizationAddress(orgId)),
          dispatch(saveBeneficiaryData(orgId))
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Organisation Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Organization inserted with errors, please edit it to correct the information');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
    });
  };
};

/* Get */
const getOrganizationData = ( orgId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {
      'columns': [ '*', {
        'name': 'contact_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'registered_addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }]
    };

    payload.where = {
      'id': parseInt(orgId, 10)
    };

    const url = Endpoints.db + '/table/' + 'organisation' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, ORGANIZATION_FETCHED));
  };
};

/* End of it */

/* Update Organisation */
const updateOrganization = () => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation/update';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgDetail };

    const orgInsertCheck = ['annual_turnover', 'date_of_incorporation', 'organisation_name', 'pan_number', 'tan_number', 'tin_number', 'type_of_organisation', 'kyc_status', 'status'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation are mandatory');
      return Promise.reject();
    }

    const orgId = orgState.orgData.id;

    const insertObj = {};
    insertObj.values = { ...organizationDataObj };
    insertObj.where = {
      'id': parseInt(orgId, 10)
    };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const updateOrganizationContact = ( ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation_contact_details/update';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgContact };

    /* Check if the address entry is existing or not */

    if ( orgState.orgData.contact_addresses.length === 0 ) {
      return dispatch(saveOrganizationContact(orgState.orgData.id));
    }

    const orgInsertCheck = ['address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'organisation_id'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation contact are mandatory');
      return Promise.reject();
    }

    const insertObj = {};
    const orgId = orgState.orgData.id;
    insertObj.where = {
      'organisation_id': parseInt(orgId, 10)
    };
    insertObj.values = { ...organizationDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const updateOrganizationAddress = ( ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation_registered_address/update';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgRegistered };

    /* Check if the address entry is existing or not */

    if ( orgState.orgData.registered_addresses.length === 0 ) {
      return dispatch(saveOrganizationAddress(orgState.orgData.id));
    }

    const orgInsertCheck = ['address', 'pincode', 'city_id', 'state_id', 'organisation_id'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation registered address are mandatory');
      return Promise.reject();
    }

    const insertObj = {};
    const orgId = orgState.orgData.id;
    insertObj.where = {
      'organisation_id': parseInt(orgId, 10)
    };
    insertObj.values = { ...organizationDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( orgUrl, options ) );
    // return Promise.resolve();
  };
};

const updateOrganizationDetail = () => {
  return ( dispatch, getState ) => {
    const id = getState().organization_data.organizationData.orgData.id;
    return Promise.all([
      dispatch(updateOrganization()),
      dispatch(updateOrganizationContact()),
      dispatch(updateOrganizationAddress())
    ])
    .then( () => {
      alert('Organisation Uploaded Successfully');
      return dispatch( getOrganizationData( id ));
    })
    .catch( () => {
      alert('Error While Uploading');
      return dispatch( getOrganizationData( id ));
    });
  };
};

/* End of it */

/* End of it */

/* Reducers */

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
    case ORGANIZATION_FETCHED:
      const orgContactKeys = ['address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'organisation_id'];
      const orgAddressKeys = ['address', 'pincode', 'city_id', 'state_id', 'organisation_id'];
      const orgDetailKeys = ['annual_turnover', 'date_of_incorporation', 'organisation_name', 'pan_number', 'tan_number', 'tin_number', 'type_of_organisation', 'kyc_status', 'status'];

      const orgDetail = {};
      const orgContact = {};
      const orgRegistered = {};
      orgDetailKeys.forEach( ( detail ) => {
        orgDetail[detail] = action.data[0][detail];
      });

      if ( action.data[0].registered_addresses.length > 0 ) {
        orgAddressKeys.forEach( ( detail ) => {
          orgRegistered[detail] = action.data[0].registered_addresses[0][detail];
        });
      }

      if ( action.data[0].contact_addresses.length > 0 ) {
        orgContactKeys.forEach( ( detail ) => {
          orgContact[detail] = action.data[0].contact_addresses[0][detail];
        });
      }

      return { ...state, orgData: action.data[0], orgDetail: { ...orgDetail }, orgContact: { ...orgContact }, orgRegistered: { ...orgRegistered }, isOrgEdit: true };

    case RESET_ORGANIZATION:
      return { orgDetail: {}, orgContact: {}, orgRegistered: {} };
    default:
      return { ...state };
  }
};

export default organizationDataReducer;

export {
  ORGANIZATION_INPUT_CHANGED,
  ORGANIZATION_CONTACT_CHANGED,
  ORGANIZATION_REGISTERED_CHANGED,
  saveOrganizationDetail,
  getOrganizationData,
  updateOrganizationDetail,
  RESET_ORGANIZATION
};
