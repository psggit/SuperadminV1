import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
// //
import Endpoints from '../../../Endpoints';

/* Action constants */

const ORGANIZATION_INPUT_CHANGED = '@organisationDataReducer/ORGANIZATION_INPUT_CHANGED';
const ORGANIZATION_CONTACT_CHANGED = '@organisationDataReducer/ORGANIZATION_CONTACT_CHANGED';
const ORGANIZATION_REGISTERED_CHANGED = '@organisationDataReducer/ORGANIZATION_REGISTERED_CHANGED';
const ORGANIZATION_FETCHED = '@organisationDataReducer/ORGANIZATION_FETCHED';

/* End of it */

/* Action creators */

const saveOrganization = () => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation/insert';

    const orgState = getState().organization_data.organizationData;
    const organizationDataObj = { ...orgState.orgDetail, 'kyc_status': orgState.orgContact.kycStatus, 'status': orgState.orgContact.organizationStatus };

    const orgInsertCheck = ['annual_turnover', 'date_of_incorporation', 'organisation_name', 'pan_number', 'tan_number', 'tin_number', 'type_of_organisation'];
    let orgCheckStatus = true;

    orgInsertCheck.forEach( ( i ) => {
      orgCheckStatus = orgCheckStatus && ( organizationDataObj[i] ? true : false );
    });

    if ( !orgCheckStatus ) {
      alert('All the fields for organisation are mandatory');
      return Promise.reject();
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

    delete organizationDataObj.kycStatus;
    delete organizationDataObj.organizationStatus;

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
      return Promise.reject();
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
        console.log('org');
        console.log(orgId);
        return Promise.all([
          dispatch(saveOrganizationContact(orgId)),
          dispatch(saveOrganizationAddress(orgId))
        ]);
      }
      return Promise.reject();
    })
    .then( () => {
      alert('Organisation Uploaded Successfully');
    })
    .catch( () => {
      console.log('rejeced');
      alert('Error While Uploading');
    });
  };
};

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
      return { ...state, orgData: action.data };
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
  getOrganizationData
};
