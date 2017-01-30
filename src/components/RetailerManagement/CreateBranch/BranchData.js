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

const BRANCH_FETCHED = '@branchDataReducer/BRANCH_FETCHED';

/* End of it */

/* Action creators */

const getOrganisation = ( isEdit ) => {
  return ( dispatch ) => {
    const orgUrl = Endpoints.db + '/table/organisation/select';

    const selectObj = {};
    selectObj.columns = ['id', 'organisation_name'];
    if ( !isEdit ) {
      selectObj.where = {
        'status': 'true'
      };
    }

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
      'kyc_status',
      'branch_status',
      'is_active',
      'city_id',
      'excise_licence_number',
      'org_name',
      'kyc_outlet',
      'service_charge_percent',
      'discount_percent'
    ];
    let brCheckStatus = true;
    const brList = [];


    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
      if ( branchDataObj[i] === undefined ) {
        brList.push(i);
      }
    });

    if ( !brCheckStatus ) {
      let text = 'Following Fields Missing:\n';
      brList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject({ stage: 0 });
    }

    /* Adding address for retailer */
    branchDataObj.org_address = branchState.branchContact.branch_address;
    /* End of it */

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

const saveInventory = ( id ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/inventory/insert';

    const branchState = getState().branch_data.branchData;

    const brandState = getState().branch_data.brandData;

    if ( Object.keys(brandState.skus).length === 0 ) {
      return Promise.resolve();
    }

    const stateId = getState().branch_data.genStateData.stateIdMap[branchState.branchContact.state_id];

    if ( !stateId ) {
      alert('State is required to assign SKU');
      return Promise.resolve();
    }

    const insertObjs = Object.keys(brandState.skus).map( ( sku ) => {
      const pricingId = brandState.skus[sku].pricings.filter( ( p ) => {
        return p.state_short_name === stateId;
      });

      return {
        'sku_pricing_id': parseInt(pricingId[0].id, 10),
        'retailer_id': parseInt(id, 10),
        'stock': 10,
        'is_active': true
      };
    });

    /*
    const insertObjs = Object.keys(brandState.skus).map( ( sku ) => {
      return {
        'sku_pricing_id': parseInt(brandState.skus[sku].pricings[0].id, 10),
        'retailer_id': parseInt(id, 10),
        'stock': 10,
        'is_active': true
      };
    });
    */

    const insertObj = {};
    insertObj.objects = [ ...insertObjs ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( brUrl, options ) );
    // return Promise.resolve();
  };
};

const saveInventoryEdit = ( ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/inventory/insert';

    const brandState = getState().branch_data.brandData;

    const branchState = getState().branch_data.branchData;

    if ( Object.keys(brandState.unsavedSkus).length === 0 ) {
      return Promise.resolve();
    }

    const brId = branchState.branchData.id;

    /* Get the correct state's pricing */

    const stateId = getState().branch_data.genStateData.stateIdMap[branchState.branchContact.state_id];

    if ( !stateId ) {
      alert('State is required to assign SKU');
      return Promise.resolve();
    }

    const insertObjs = Object.keys(brandState.unsavedSkus).map( ( sku ) => {
      const pricingId = brandState.unsavedSkus[sku].pricings.filter( ( p ) => {
        return p.state_short_name === stateId;
      });

      return {
        'sku_pricing_id': parseInt(pricingId[0].id, 10),
        'retailer_id': parseInt(brId, 10),
        'stock': 10,
        'is_active': true
      };
    });

    const insertObj = {};
    insertObj.objects = [ ...insertObjs ];
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
          dispatch(saveAccount(branchId)),
          dispatch(saveInventory(branchId))
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Branch Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_branches'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Branch inserted with errors, please edit it to correct the information');
      // return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
      return dispatch( routeActions.push('/hadmin/retailer_management/view_branches'));
    });
  };
};

/* End of it */

/* Get Branch Details */

const getBranchData = ( brId ) => {
  return (dispatch) => {
    // dispatch({ type: MAKE_REQUEST, f});
    //
    /* const payload = {'where': {'id': f}, 'columns': ['*']};*/

    const payload = {
      'columns': [ '*', {
        'name': 'addresses',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'bank_details',
        'columns': ['*'],
        'order_by': '-created_at',
        'limit': 1
      }, {
        'name': 'inventories',
        'columns': ['*']
      }]
    };

    payload.where = {
      'id': parseInt(brId, 10)
    };

    const url = Endpoints.db + '/table/' + 'retailer' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, BRANCH_FETCHED));
  };
};

/* End of it */

/* Update Branch */

const updateBranch = () => {
  return ( dispatch, getState ) => {
    const branchUrl = Endpoints.db + '/table/retailer/update';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = {
      ...branchState.branchDetail,
      gps_cordinates: branchState.branchContact.gps_cordinates,
      city_id: branchState.branchContact.city_id
    };

    const brInsertCheck = [
      'gps_cordinates',
      'organisation_id',
      'application_number',
      'kyc_status',
      'branch_status',
      'city_id',
      'excise_licence_number',
      'org_name',
      'service_charge_percent',
      'discount_percent'
    ];

    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch are mandatory');
      return Promise.reject({ stage: 0 });
    }

    /* Adding address for retailer */
    branchDataObj.org_address = branchState.branchContact.branch_address;
    branchDataObj.updated_at = new Date().toISOString();
    /* End of it */

    const insertObj = {};

    const brId = branchState.branchData.id;
    insertObj.where = {
      'id': parseInt(brId, 10)
    };

    insertObj.values = { ...branchDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( branchUrl, options ) );
    // return Promise.resolve();
  };
};

const updateBranchContact = ( ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/retailer_address/update';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = { ...branchState.branchContact };

    if ( branchState.branchData.addresses.length === 0 ) {
      return dispatch(saveBranchContact(branchState.branchData.id));
    }

    const brInsertCheck = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'gps_cordinates'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch contact are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};

    const brId = branchState.branchData.id;
    insertObj.where = {
      'retailer_id': parseInt(brId, 10)
    };
    insertObj.values = { ...branchDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( brUrl, options ) );
    // return Promise.resolve();
  };
};

const updateAccount = ( ) => {
  return ( dispatch, getState ) => {
    const brUrl = Endpoints.db + '/table/retailer_bank_details/update';

    const branchState = getState().branch_data.branchData;
    const branchDataObj = { ...branchState.branchAccountRegistered };

    if ( branchState.branchData.bank_details.length === 0 ) {
      return dispatch(saveAccount(branchState.branchData.id));
    }

    const brInsertCheck = ['ifsc_code', 'account_number', 'branch', 'bank_name'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Branch Account are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    const brId = branchState.branchData.id;
    insertObj.where = {
      'retailer_id': parseInt(brId, 10)
    };
    insertObj.values = { ...branchDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( brUrl, options ) );
    // return Promise.resolve();
  };
};

const updateBranchDetail = () => {
  return ( dispatch ) => {
    return dispatch(updateBranch())
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        return Promise.all([
          dispatch(updateBranchContact()),
          dispatch(updateAccount()),
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Branch Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/retailer_management/view_branches'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Branch inserted with errors, please edit it to correct the information');
      // return dispatch( routeActions.push('/hadmin/retailer_management/view_organizations'));
      return dispatch( routeActions.push('/hadmin/retailer_management/view_branches'));
    });
  };
};

/* End of it */

/* Reducers */

const branchDataReducer = ( state = { organisationData: [], branchDetail: {}, branchContact: {}, branchAccountRegistered: {} }, action ) => {
  let branchDetail;
  let branchContact;
  let branchAccountRegistered;
  switch ( action.type ) {
    case ORGANISATION_FETCHED:
      return { ...state, organisationData: action.data };
    case BRANCH_CONTACT_CHANGED:
      branchContact = {};
      branchContact[action.data.key] = action.data.value;
      return { ...state, branchContact: { ...state.branchContact, ...branchContact }};
    case BRANCH_INPUT_CHANGED:
      branchDetail = {};
      branchDetail[action.data.key] = action.data.value;
      return { ...state, branchDetail: { ...state.branchDetail, ...branchDetail }};
    case BRANCH_ACCOUNT_CHANGED:
      branchAccountRegistered = {};
      branchAccountRegistered[action.data.key] = action.data.value;
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, ...branchAccountRegistered}};
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: action.data[0]}};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: ''}};
    case CANCEL_IMAGE:
      return { ...state, branchAccountRegistered: { ...state.branchAccountRegistered, canceled_cheque_image: ''}};
    case RESET_BRANCH:
      return { branchDetail: {}, branchContact: {}, branchAccountRegistered: {}, organisationData: []};
    case BRANCH_FETCHED:
      const branchDetailKeys = [
        'organisation_id',
        'application_number',
        'cst_number',
        'kyc_status',
        'branch_status',
        'excise_licence_number',
        'org_name',
        'service_charge_percent',
        'discount_percent'
      ];

      const branchContactKeys = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'retailer_id', 'gps_cordinates'];

      const branchAccountKeys = ['ifsc_code', 'account_number', 'branch', 'bank_name', 'retailer_id', 'canceled_cheque_image'];

      branchDetail = {};
      branchContact = {};
      branchAccountRegistered = {};
      branchDetailKeys.forEach( ( detail ) => {
        branchDetail[detail] = action.data[0][detail];
      });

      if ( action.data[0].bank_details.length > 0 ) {
        branchAccountKeys.forEach( ( detail ) => {
          branchAccountRegistered[detail] = action.data[0].bank_details[0][detail];
        });
      }

      if ( action.data[0].addresses.length > 0 ) {
        branchContactKeys.forEach( ( detail ) => {
          branchContact[detail] = action.data[0].addresses[0][detail];
        });
      }

      return { ...state, branchData: action.data[0], branchDetail: { ...branchDetail }, branchContact: { ...branchContact }, branchAccountRegistered: { ...branchAccountRegistered }, isBrEdit: true };
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
  updateBranchDetail,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  getBranchData,
  saveInventoryEdit
};
