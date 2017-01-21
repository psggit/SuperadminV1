import requestAction from '../../Common/Actions/requestAction';
// //
import { genOptions } from '../../Common/Actions/commonFunctions';
import { routeActions } from 'redux-simple-router';
// // //
import Endpoints from '../../../Endpoints';

/* Action constants */

const RESET_BAR = '@barDataReducer/RESET_BAR';
const ORGANISATION_FETCHED = '@barDataReducer/ORGANISATION_FETCHED';

const BAR_CONTACT_CHANGED = '@barDataReducer/BAR_CONTACT_CHANGED';
const BAR_INPUT_CHANGED = '@barDataReducer/BAR_INPUT_CHANGED';
const BAR_ACCOUNT_CHANGED = '@barDataReducer/BAR_ACCOUNT_CHANGED';

const IMAGE_UPLOAD_SUCCESS = '@barDataReducer/IMAGE_UPLOAD_SUCCESS';
const IMAGE_UPLOAD_ERROR = '@barDataReducer/IMAGE_UPLOAD_ERROR';
const CANCEL_IMAGE = '@barDataReducer/CANCEL_IMAGE';
const AD_IMAGE_UPLOAD_SUCCESS = '@barDataReducer/AD_IMAGE_UPLOAD_SUCCESS';
const AD_IMAGE_UPLOAD_ERROR = '@barDataReducer/AD_IMAGE_UPLOAD_ERROR';
const AD_CANCEL_IMAGE = '@barDataReducer/AD_CANCEL_IMAGE';

const BAR_FETCHED = '@barDataReducer/BAR_FETCHED';

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


const saveBar = () => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/bars/insert';

    const barState = getState().bar_data.barData;
    const barDataObj = {
      ...barState.barDetail,
      gps: barState.barContact.gps_cordinates,
      city_id: barState.barContact.city_id,
      is_open: true
    };

    if ( barState.barContact.branch_address ) {
      barDataObj.address = barState.barContact.branch_address;
    }

    const brInsertCheck = [
      'gps',
      'is_open',
      'organisation_id',
      'application_number',
      'kyc_status',
      'bar_status',
      'discount_percent',
      'service_charge_percent',
      'city_id',
      'excise_licence_number',
      'name',
      'address',
      'discount_percent',
      'service_charge_percent'
    ];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar are mandatory');
      return Promise.reject({ stage: 0 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...barDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const saveBarContact = ( id ) => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/retailer_address/insert';

    const barState = getState().bar_data.barData;
    const barDataObj = { ...barState.barContact, bar_id: id };

    const brInsertCheck = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'bar_id', 'gps_cordinates'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar contact are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...barDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const saveAccount = ( id ) => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/retailer_bank_details/insert';

    const barState = getState().bar_data.barData;
    const barDataObj = { ...barState.barAccountRegistered, bar_id: id };

    const brInsertCheck = ['ifsc_code', 'account_number', 'branch', 'bank_name', 'bar_id'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar Account are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    insertObj.objects = [ { ...barDataObj } ];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const saveBarDetail = () => {
  return ( dispatch ) => {
    return dispatch(saveBar())
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        const barId = resp.returning[0].id;
        return Promise.all([
          dispatch(saveBarContact(barId)),
          dispatch(saveAccount(barId))
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Bar Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/bar_management/view_bars'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Bar inserted with errors, please edit it to correct the information');
      return dispatch( routeActions.push('/hadmin/bar_management/view_bars'));
    });
  };
};

/* End of it */

/* Get Bar Details */

const getBarData = ( brId ) => {
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
      }]
    };

    payload.where = {
      'id': parseInt(brId, 10)
    };

    const url = Endpoints.db + '/table/' + 'bars' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload),
    };
    return dispatch(requestAction(url, options, BAR_FETCHED));
  };
};

/* End of it */

/* Update Bar */

const updateBar = () => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/bars/update';

    const barState = getState().bar_data.barData;
    const barDataObj = {
      ...barState.barDetail,
      gps: barState.barContact.gps_cordinates,
      city_id: barState.barContact.city_id
    };

    if ( barState.barContact.branch_address ) {
      barDataObj.address = barState.barContact.branch_address;
    }

    const brInsertCheck = [
      'gps',
      'organisation_id',
      'application_number',
      'kyc_status',
      'bar_status',
      'discount_percent',
      'service_charge_percent',
      'city_id',
      'excise_licence_number',
      'name',
      'discount_percent',
      'service_charge_percent'
    ];

    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar are mandatory');
      return Promise.reject({ stage: 0 });
    }

    barDataObj.updated_at = new Date().toISOString();

    const insertObj = {};

    const brId = barState.barData.id;
    insertObj.where = {
      'id': parseInt(brId, 10)
    };

    insertObj.values = { ...barDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const updateBarContact = ( ) => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/retailer_address/update';

    const barState = getState().bar_data.barData;
    const barDataObj = { ...barState.barContact };

    if ( barState.barData.addresses.length === 0 ) {
      return dispatch(saveBarContact(barState.barData.id));
    }

    const brInsertCheck = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'gps_cordinates'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar contact are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};

    const brId = barState.barData.id;
    insertObj.where = {
      'bar_id': parseInt(brId, 10)
    };
    insertObj.values = { ...barDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const updateAccount = ( ) => {
  return ( dispatch, getState ) => {
    const barUrl = Endpoints.db + '/table/retailer_bank_details/update';

    const barState = getState().bar_data.barData;
    const barDataObj = { ...barState.barAccountRegistered };

    if ( barState.barData.bank_details.length === 0 ) {
      return dispatch(saveAccount(barState.barData.id));
    }

    const brInsertCheck = ['ifsc_code', 'account_number', 'branch', 'bank_name'];
    let brCheckStatus = true;

    brInsertCheck.forEach( ( i ) => {
      brCheckStatus = brCheckStatus && ( barDataObj[i] ? true : false );
    });

    if ( !brCheckStatus ) {
      alert('All the fields for Bar Account are mandatory');
      return Promise.reject( { stage: 2 });
    }

    const insertObj = {};
    const brId = barState.barData.id;
    insertObj.where = {
      'bar_id': parseInt(brId, 10)
    };
    insertObj.values = { ...barDataObj };
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( barUrl, options ) );
    // return Promise.resolve();
  };
};

const updateBarDetail = () => {
  return ( dispatch ) => {
    return dispatch(updateBar())
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        return Promise.all([
          dispatch(updateBarContact()),
          dispatch(updateAccount()),
        ]);
      }
      return Promise.reject( { stage: 0 });
    })
    .then( () => {
      alert('Bar Uploaded Successfully');
      return dispatch( routeActions.push('/hadmin/bar_management/view_bars'));
    })
    .catch( ( resp ) => {
      if ( !resp.stage ) {
        alert('Error While Uploading');
        return Promise.reject();
      }
      alert('Bar inserted with errors, please edit it to correct the information');
      return dispatch( routeActions.push('/hadmin/bar_management/view_bars'));
    });
  };
};

/* End of it */

/* Reducers */

const barDataReducer = ( state = { organisationData: [], barDetail: {}, barContact: {}, barAccountRegistered: {} }, action ) => {
  let barDetail;
  let barContact;
  let barAccountRegistered;
  switch ( action.type ) {
    case ORGANISATION_FETCHED:
      return { ...state, organisationData: action.data };
    case BAR_CONTACT_CHANGED:
      barContact = {};
      barContact[action.data.key] = action.data.value;
      return { ...state, barContact: { ...state.barContact, ...barContact }};
    case BAR_INPUT_CHANGED:
      barDetail = {};
      barDetail[action.data.key] = action.data.value;
      return { ...state, barDetail: { ...state.barDetail, ...barDetail }};
    case BAR_ACCOUNT_CHANGED:
      barAccountRegistered = {};
      barAccountRegistered[action.data.key] = action.data.value;
      return { ...state, barAccountRegistered: { ...state.barAccountRegistered, ...barAccountRegistered}};
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, barAccountRegistered: { ...state.barAccountRegistered, canceled_cheque_image: action.data[0]}};
    case IMAGE_UPLOAD_ERROR:
      return { ...state, barAccountRegistered: { ...state.barAccountRegistered, canceled_cheque_image: ''}};
    case CANCEL_IMAGE:
      return { ...state, barAccountRegistered: { ...state.barAccountRegistered, canceled_cheque_image: ''}};
    case AD_IMAGE_UPLOAD_SUCCESS:
      return { ...state, barDetail: { ...state.barDetail, adImage: action.data[0]}};
    case AD_IMAGE_UPLOAD_ERROR:
      return { ...state, barDetail: { ...state.barDetail, adImage: ''}};
    case AD_CANCEL_IMAGE:
      return { ...state, barDetail: { ...state.barDetail, adImage: ''}};
    case RESET_BAR:
      return { barDetail: {}, barContact: {}, barAccountRegistered: {}, organisationData: []};
    case BAR_FETCHED:
      const barDetailKeys = [
        'organisation_id',
        'application_number',
        'cst_number',
        'kyc_status',
        'bar_status',
        'house_rules',
        'discount_percent',
        'service_charge_percent',
        'excise_licence_number',
        'adImage',
        'name'
      ];

      const barContactKeys = ['branch_address', 'pincode', 'city_id', 'state_id', 'email', 'mobile_number', 'landline_number', 'bar_id', 'gps_cordinates'];

      const barAccountKeys = ['ifsc_code', 'account_number', 'branch', 'bank_name', 'bar_id', 'canceled_cheque_image'];

      barDetail = {};
      barContact = {};
      barAccountRegistered = {};
      barDetailKeys.forEach( ( detail ) => {
        barDetail[detail] = action.data[0][detail];
      });

      if ( action.data[0].bank_details.length > 0 ) {
        barAccountKeys.forEach( ( detail ) => {
          barAccountRegistered[detail] = action.data[0].bank_details[0][detail];
        });
      }

      if ( action.data[0].addresses.length > 0 ) {
        barContactKeys.forEach( ( detail ) => {
          barContact[detail] = action.data[0].addresses[0][detail];
        });
      }

      return { ...state, barData: action.data[0], barDetail: { ...barDetail }, barContact: { ...barContact }, barAccountRegistered: { ...barAccountRegistered }, isBrEdit: true };
    default:
      return { ...state };
  }
};

export default barDataReducer;

export {
  RESET_BAR,
  getOrganisation,
  BAR_CONTACT_CHANGED,
  BAR_INPUT_CHANGED,
  BAR_ACCOUNT_CHANGED,
  saveBarDetail,
  updateBarDetail,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE,
  AD_IMAGE_UPLOAD_SUCCESS,
  AD_IMAGE_UPLOAD_ERROR,
  AD_CANCEL_IMAGE,
  getBarData,
};
