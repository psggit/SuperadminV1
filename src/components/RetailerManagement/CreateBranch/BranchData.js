import requestAction from '../../Common/Actions/requestAction';
// //
import { routeActions } from 'redux-simple-router';
// // //
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';

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
const RETAILER_SETTLEMENT_REPORT_FETCHED = '@branchDataReducer/RETAILER_SETTLEMENT_REPORT_FETCHED';
const RETAILER_SETTLEMENT_CHANGED = '@branchDataReducer/RETAILER_SETTLEMENT_CHANGED';
const RETAILER_SETTLEMENT_REPORT_COUNT_FETCHED = '@branchDataReducer/RETAILER_SETTLEMENT_REPORT_COUNT_FETCHED';
const DAILY_RETAILER_REPORT_FETCHED = '@branchDataReducer/DAILY_RETAILER_REPORT_FETCHED';
const DAILY_RETAILER_CHANGED = '@branchDataReducer/DAILY_RETAILER_CHANGED';
const DAILY_RETAILER_REPORT_COUNT_FETCHED = '@branchDataReducer/DAILY_RETAILER_REPORT_COUNT_FETCHED';

const RETAILER_TRANSACTION_REPORT_FETCHED = '@branchDataReducer/RETAILER_TRANSACTION_REPORT_FETCHED';
const RETAILER_TRANSACTION_CHANGED = '@branchDataReducer/RETAILER_TRANSACTION_CHANGED';
const RETAILER_TRANSACTION_REPORT_COUNT_FETCHED = '@branchDataReducer/RETAILER_TRANSACTION_REPORT_COUNT_FETCHED';
/* End of it */

/* Action creators */

const getOrganisation = ( isEdit ) => {
  return ( dispatch, getState ) => {
    const orgUrl = Endpoints.db + '/table/organisation/select';

    const selectObj = {};
    selectObj.columns = ['id', 'organisation_name'];
    if ( !isEdit ) {
      selectObj.where = {
        'status': 'true'
      };
    }
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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
    const brList = [];

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( branchDataObj[i] ? true : false );
      if (( branchDataObj[i] === undefined ) || (branchDataObj[i] === 0)) {
        brList.push(i);
      }
    });

    if ( !brCheckStatus ) {
      let text = '1) Following Fields Missing:\n';
      brList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject({ stage: 0 });
    }

    // check Branch Contact => If not available throw list of invalid inputs
    const branchConDataObj = { ...branchState.branchContact };
    const brConInsertCheck = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'gps_cordinates'];
    let brConCheckStatus = true;
    const brConList = [];

    brConInsertCheck.forEach( ( i ) => {
      brConCheckStatus = brConCheckStatus && ( branchConDataObj[i] ? true : false );
      if (( branchConDataObj[i] === undefined ) || (branchConDataObj[i] === 0) || (branchConDataObj[i] === '')) {
        brConList.push(i);
      }
    });

    if ( !brConCheckStatus ) {
      let text = '2) Following Fields Missing:\n';
      brConList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject({ stage: 0 });
    }

    // Check Branch Account Details => If not available throw list of invalid inputs
    const branchAccDataObj = { ...branchState.branchAccountRegistered };

    const brAccInsertCheck = ['ifsc_code', 'account_number', 'branch', 'bank_name'];
    let brAccCheckStatus = true;
    const brAccList = [];

    brAccInsertCheck.forEach( ( i ) => {
      brAccCheckStatus = brAccCheckStatus && ( branchAccDataObj[i] ? true : false );
      if ( branchAccDataObj[i] === undefined ) {
        brAccList.push(i);
      }
    });

    if ( !brAccCheckStatus ) {
      let text = '3) Following Fields Missing:\n';
      brAccList.forEach( ( i, index ) => {
        text += (index + 1) + ') ' + i + '\n';
      });
      alert(text);
      return Promise.reject( { stage: 0 });
    }


    /* Adding address for retailer */
    branchDataObj.org_address = branchState.branchContact.branch_address;
    console.log('Check this for once');
    branchDataObj.org_phone = branchState.branchContact.mobile_number;
    /* End of it */

    const insertObj = {};
    insertObj.objects = [ { ...branchDataObj } ];
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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
  return (dispatch, getState) => {
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
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, BRANCH_FETCHED));
  };
};

const getRetailerDailyReport = (page, brId ) => {
  return (dispatch, getState) => {
    if (brId === '') {
      alert('HANDLE');
    }
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;
    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;
    const payload2 = {
      'columns': ['*'],
      'order_by': '-date',
      'limit': limit,
      'offset': offset
    };
    payload2.where = {
      'retailer_id': parseInt(brId, 10)
    };

    let url = Endpoints.db + '/table/' + 'daily_retailer_reports' + '/select';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    let options = {
      ...genOptions,
      body: JSON.stringify(payload2),
    };
    return dispatch(requestAction(url, options, DAILY_RETAILER_REPORT_FETCHED)).then( () => {
      dispatch({'type': DAILY_RETAILER_CHANGED, 'data': page});
      const payload3 = {};
      payload3.where = {
        'retailer_id': parseInt(brId, 10)
      };

      url = Endpoints.db + '/table/' + 'daily_retailer_reports' + '/count';
      options = {
        ...genOptions,
        body: JSON.stringify(payload3),
      };
      return dispatch(requestAction(url, options, DAILY_RETAILER_REPORT_COUNT_FETCHED));
    });
  };
};

const getRetailerSettlementReport = (page, brId ) => {
  return (dispatch, getState) => {
    if (brId === '') {
      alert('HANDLE');
    }
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;
    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;
    const payload2 = {
      'columns': ['*'],
      'order_by': '-date',
      'limit': limit,
      'offset': offset
    };
    payload2.where = {
      'retailer_id': parseInt(brId, 10)
    };

    let url = Endpoints.db + '/table/' + 'retailer_settlement_report' + '/select';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    let options = {
      ...genOptions,
      body: JSON.stringify(payload2),
    };
    return dispatch(requestAction(url, options, RETAILER_SETTLEMENT_REPORT_FETCHED)).then( () => {
      dispatch({'type': RETAILER_SETTLEMENT_CHANGED, 'data': page});
      const payload3 = {};
      payload3.where = {
        'retailer_id': parseInt(brId, 10)
      };

      url = Endpoints.db + '/table/' + 'retailer_settlement_report' + '/count';
      options = {
        ...genOptions,
        body: JSON.stringify(payload3),
      };
      return dispatch(requestAction(url, options, RETAILER_SETTLEMENT_REPORT_COUNT_FETCHED));
    });
  };
};


const getRetailerTransactionReport = (page, brId ) => {
  return (dispatch, getState) => {
    const devicesId = getState().branch_data.deviceData.devices.map((x) => { return x.id; });
    if (brId === '') {
      alert('HANDLE');
    }
    let offset = 0;
    let limit = 0;
    // const count = currentProps.count;
    // limit = (page * 10) > count ? count : ((page) * 10);
    // limit = ((page) * 10);
    limit = 10;
    offset = (page - 1) * 10;
    const payload2 = {
      'columns': ['*'],
      'order_by': '-created_at',
      'limit': limit,
      'offset': offset
    };
    payload2.where = {
      'retailer_pos_id': {'$in': devicesId}
    };

    let url = Endpoints.db + '/table/' + 'retailer_transactions' + '/select';
    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
    let options = {
      ...genOptions,
      body: JSON.stringify(payload2),
    };
    return dispatch(requestAction(url, options, RETAILER_TRANSACTION_REPORT_FETCHED)).then( () => {
      dispatch({'type': RETAILER_TRANSACTION_CHANGED, 'data': page});
      const payload3 = {};
      payload3.where = {
        'retailer_pos_id': {'$in': devicesId}
      };

      url = Endpoints.db + '/table/' + 'retailer_transactions' + '/count';
      options = {
        ...genOptions,
        body: JSON.stringify(payload3),
      };
      return dispatch(requestAction(url, options, RETAILER_TRANSACTION_REPORT_COUNT_FETCHED));
    });
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
    console.log('Check this for once');
    branchDataObj.org_phone = branchState.branchContact.mobile_number;
    branchDataObj.updated_at = new Date().toISOString();
    /* End of it */

    const insertObj = {};

    const brId = branchState.branchData.id;
    insertObj.where = {
      'id': parseInt(brId, 10)
    };

    insertObj.values = { ...branchDataObj };
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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

    const genOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-hasura-role': getState().loginState.highestRole},
      credentials: globalCookiePolicy
    };
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
    case RETAILER_SETTLEMENT_REPORT_FETCHED:
      return { ...state, retailerSettlementReport: action.data};
    case RETAILER_SETTLEMENT_REPORT_COUNT_FETCHED:
      return { ...state, retailerSettlementReportCount: action.data.count};
    case RETAILER_SETTLEMENT_CHANGED:
      return { ...state, retailerSettlementReportPage: action.data};
    case RETAILER_TRANSACTION_REPORT_FETCHED:
      return { ...state, retailerTransactionReport: action.data};
    case RETAILER_TRANSACTION_REPORT_COUNT_FETCHED:
      return { ...state, retailerTransactionReportCount: action.data.count};
    case RETAILER_TRANSACTION_CHANGED:
      return { ...state, retailerTransactionReportPage: action.data};
    case DAILY_RETAILER_REPORT_FETCHED:
      return { ...state, dailyRetailerReport: action.data};
    case DAILY_RETAILER_REPORT_COUNT_FETCHED:
      return { ...state, dailyRetailerReportCount: action.data.count};
    case DAILY_RETAILER_CHANGED:
      return { ...state, dailyRetailerReportPage: action.data};
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
        'id',
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
  getRetailerDailyReport,
  getRetailerSettlementReport,
  getRetailerTransactionReport,
  saveBranchDetail,
  updateBranchDetail,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  getBranchData,
  saveInventoryEdit
};
