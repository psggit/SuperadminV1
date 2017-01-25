/* Default State */

import { addDeviceState, uiState } from './State';

/* Imports */

import requestAction from '../../Common/Actions/requestAction';

import Endpoints from '../../../Endpoints';

import { genOptions } from '../../Common/Actions/commonFunctions';

/* Action Constant */

const INITIAL_DATA_FETCHED = '@device/INITIAL_DATA_FETCHED';
const HANDLE_ERROR = '@device/HANDLE_ERROR';

const TOGGLE_DEVICE_DETAIL = '@device/TOGGLE_DEVICE_DETAIL';

const LOAD_DEVICE = '@device/LOAD_DEVICE';
const LOAD_LOCAL_DEVICE = '@device/LOAD_LOCAL_DEVICE';

const LOCAL_CREATE_DEVICE = '@device/LOCAL_CREATE_DEVICE';
const LOCAL_UPDATE_DEVICE = '@device/LOCAL_UPDATE_DEVICE';
const LOCAL_DELETE_DEVICE = '@device/LOCAL_DELETE_DEVICE';

const UNLOAD_DEVICE = '@device/UNLOAD_DEVICE';

const DEVICE_INPUT_CHANGE = '@organisationDataReducer/DEVICE_INPUT_CHANGE';
const RESET_DEVICE = '@organisationDataReducer/RESET_DEVICE';

/* End of it */

/* Action Creators */

const fetchDevice = ( id ) => {
  return ( dispatch ) => {
    const devUrl = Endpoints.db + '/table/retailer_pos/select';

    const devObj = {
      'columns': ['*', { 'name': 'device', 'columns': ['*'] }]
    };

    devObj.where = {
      'bar_id': parseInt(id, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(devObj)
    };

    return dispatch( requestAction( devUrl, options, INITIAL_DATA_FETCHED, HANDLE_ERROR ) );
  };
};

const activateDevice = ( devId, retailId, option ) => {
  return ( dispatch) => {
    const devUrl = Endpoints.db + '/table/retailer_pos/update';

    const retailerDataObj = {
      'is_active': ((option === 'true') || (option === true)) ? true : false,
    };

    const updateObj = {};
    updateObj.values = { ...retailerDataObj };
    updateObj.returning = ['id'];
    updateObj.where = {
      'bar_id': retailId,
      'device_id': devId
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };
    return dispatch( requestAction( devUrl, options) ).then(() => {
      alert('Device Activated/Deactivated');
    });
  };
};
/* User methods */
const activateUser = ( hasuraId ) => {
  return ( dispatch ) => {
    const activateUrl = Endpoints.authUrl + '/admin/user/activate';

    const updateObj = {
      'hasura_id': parseInt(hasuraId, 10)
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };

    return dispatch( requestAction( activateUrl, options ));
  };
};

const assignUserRole = ( hasuraId ) => {
  return ( dispatch ) => {
    const activateUrl = Endpoints.authUrl + '/admin/user/assign-role';

    const updateObj = {
      'hasura_id': parseInt(hasuraId, 10),
      'role': 'retailer'
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };

    return dispatch(requestAction( activateUrl, options ));
  };
};

const unAssignUserRole = ( hasuraId ) => {
  return ( dispatch ) => {
    const activateUrl = Endpoints.authUrl + '/admin/user/unassign-role';

    const updateObj = {
      'hasura_id': parseInt(hasuraId, 10),
      'role': 'user'
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };

    return dispatch( requestAction( activateUrl, options ));
  };
};

const createRetailerPos = ( id, email, mobileNumber, retailerId, deviceId ) => {
  return ( dispatch ) => {
    const retailerPos = Endpoints.db + '/table/retailer_pos/insert';

    const insertObj = {};
    insertObj.objects = [{
      'id': parseInt(id, 10),
      'email': email,
      'mobile': mobileNumber,
      'bar_id': retailerId,
      'device_id': deviceId,
      'is_active': true,
      'online': true,
      'name': email,
      'type': 'bar'
    }];
    insertObj.returning = ['id'];

    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( retailerPos, options ));
  };
};

const createUser = ( deviceId ) => {
  return ( dispatch, getState ) => {
    const createUrl = Endpoints.authUrl + '/admin/user/create';

    const currState = getState().bar_data.deviceData;

    const retId = getState().bar_data.barData.barData.id;

    const createObj = {
      'username': currState.email,
      'email': currState.email,
      'password': currState.password,
      'mobile': currState.mobile_number
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(createObj)
    };

    return dispatch( requestAction( createUrl, options )).then(( resp ) => {
      return Promise.all([
        dispatch(activateUser(resp.hasura_id)),
        dispatch(assignUserRole(resp.hasura_id)),
        dispatch(unAssignUserRole(resp.hasura_id)),
        dispatch(createRetailerPos(resp.hasura_id, currState.email, currState.mobile_number, retId, deviceId))
      ]);
    })
    .catch( ( resp ) => {
      console.log('resp');
      alert(resp.message);
      /* Rolling back the device as the user hasn't gotten created */
      return Promise.reject({ id: deviceId });
    });
  };
};

/* End of it */

const updateDevice = () => {
  return ( dispatch, getState ) => {
    const devUrl = Endpoints.db + '/table/device/update';

    const deviceData = getState().bar_data.deviceData;
    const deviceDataObj = {
      'device_num': deviceData.device_num,
      'operator': deviceData.operator
    };

    const updateObj = {};
    updateObj.values = { ...deviceDataObj };
    updateObj.returning = ['id'];
    updateObj.where = {
      'id': getState().bar_data.deviceData.editDeviceId
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(updateObj)
    };

    return dispatch( requestAction( devUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Device Updated Successfully');
        return Promise.all([
          dispatch( activateDevice(resp.returning[0].id, getState().bar_data.barData.barData.id, deviceData.is_active) ),
          dispatch( fetchDevice(getState().bar_data.barData.barData.id)),
          dispatch( { type: UNLOAD_DEVICE })
        ]);
      }
    })
    .catch( ( ) => {
      alert('Could not Update Device');
    });
    // return Promise.resolve();
  };
};

/* Device Email/SMS */

const getEmailDeviceCreationObj = ( getState, id, templateName ) => {
  const deviceData = getState().bar_data.deviceData;
  const barData = getState().bar_data.barData;

  const currDevice = ( deviceData.devices ).filter( ( f ) => {
    return ( f.device_id === parseInt(id, 10) );
  });

  if ( currDevice.length === 0 ) {
    alert('Device doesn\'t exist');
    return Promise.reject();
  }

  if ( !barData.barContact.email ) {
    alert('Store manager email not available');
    return Promise.reject();
  }

  if ( !currDevice[0].is_active ) {
    alert('Device is not active yet');
    return Promise.reject();
  }

  const emailerObj = {};
  emailerObj.to = [ barData.barContact.email ];
  emailerObj.template_name = templateName;
  emailerObj.content = {};
  const retailerInfo = {};
  retailerInfo.name = barData.barDetail.name;
  retailerInfo.device = {};
  retailerInfo.device.email = barData.barContact.email;
  retailerInfo.device.imei = currDevice[0].device.device_num;
  retailerInfo.device.mobile = currDevice[0].device.mobile_number;

  emailerObj.content.retailer = { ...retailerInfo };
  return Promise.resolve(emailerObj);
};

const getSmsDeviceCreationObj = ( getState, id, templateName ) => {
  const deviceData = getState().bar_data.deviceData;
  const barData = getState().bar_data.barData;

  const currDevice = ( deviceData.devices ).filter( ( f ) => {
    return ( f.device_id === parseInt(id, 10) );
  });

  if ( currDevice.length === 0 ) {
    alert('Device doesn\'t exist');
    return Promise.reject();
  }

  if ( !barData.barContact.mobile_number ) {
    alert('Store manager email not available');
    return Promise.reject();
  }

  if ( !currDevice[0].is_active ) {
    alert('Device is not active yet');
    return Promise.reject();
  }

  const emailerObj = {};
  emailerObj.to = [ barData.barContact.mobile_number ];
  emailerObj.template_name = templateName;
  emailerObj.content = {};
  const retailerInfo = {};
  retailerInfo.name = barData.barDetail.name;

  emailerObj.content.retailer = { ...retailerInfo };
  return Promise.resolve(emailerObj);
};

const getEmailCredsCreationObj = ( getState, id, templateName ) => {
  const deviceData = getState().bar_data.deviceData;
  const barData = getState().bar_data.barData;

  const currDevice = ( deviceData.devices ).filter( ( f ) => {
    return ( f.device_id === parseInt(id, 10) );
  });

  if ( currDevice.length === 0 ) {
    alert('Device doesn\'t exist');
    return Promise.reject();
  }

  if ( !barData.barContact.email ) {
    alert('Store manager email not available');
    return Promise.reject();
  }

  if ( !currDevice[0].is_active ) {
    alert('Device is not active yet');
    return Promise.reject();
  }

  const emailerObj = {};
  emailerObj.to = [ barData.barContact.email ];
  emailerObj.template_name = templateName;
  emailerObj.content = {};
  const retailerInfo = {};
  retailerInfo.name = barData.barDetail.name;
  retailerInfo.username = barData.barContact.email;
  retailerInfo.password = '*****';

  emailerObj.content.retailer = { ...retailerInfo };
  return Promise.resolve(emailerObj);
};

const getSmsCredsCreationObj = ( getState, id, templateName ) => {
  const deviceData = getState().bar_data.deviceData;
  const barData = getState().bar_data.barData;

  const currDevice = ( deviceData.devices ).filter( ( f ) => {
    return ( f.device_id === parseInt(id, 10) );
  });

  if ( currDevice.length === 0 ) {
    alert('Device doesn\'t exist');
    return Promise.reject();
  }

  if ( !barData.barContact.mobile_number ) {
    alert('Store manager email not available');
    return Promise.reject();
  }

  if ( !currDevice[0].is_active ) {
    alert('Device is not active yet');
    return Promise.reject();
  }

  const emailerObj = {};
  emailerObj.to = [ barData.barContact.mobile_number ];
  emailerObj.template_name = templateName;
  emailerObj.content = {};
  const retailerInfo = {};
  retailerInfo.name = barData.barDetail.name;

  emailerObj.content.retailer = { ...retailerInfo };
  return Promise.resolve(emailerObj);
};

const sendEmail = ( emailerObj ) => {
  return ( dispatch ) => {
    const emailUrl = Endpoints.blogicUrl + '/admin/trigger/email';
    const options = {
      ...genOptions,
      body: JSON.stringify(emailerObj)
    };

    return dispatch( requestAction(emailUrl, options) )
    .then( () => {
      alert('Emailer Sent');
    })
    .catch( () => {
      alert('Something went wrong while sending an email');
    });
  };
};

const sendSMS = ( emailerObj ) => {
  return ( dispatch ) => {
    const smsUrl = Endpoints.blogicUrl + '/admin/trigger/sms';
    const options = {
      ...genOptions,
      body: JSON.stringify(emailerObj)
    };

    return dispatch( requestAction(smsUrl, options) )
    .then( () => {
      alert('SMS Sent');
    })
    .catch( () => {
      alert('Something went wrong while sending an  SMS ');
    });
  };
};

const emailSmsDeviceCreation = (id, templateName ) => {
  return ( dispatch, getState ) => {
    return Promise.all([
      getEmailDeviceCreationObj(getState, id, templateName ).then( ( resp ) => { return dispatch(sendEmail(resp)); }),
      getSmsDeviceCreationObj(getState, id, templateName).then( ( resp ) => { return dispatch(sendSMS(resp )); })
    ])
    .catch( ( resp ) => {
      alert(resp);
    });
  };
};

const emailSmsCredsCreation = (id, templateName ) => {
  return ( dispatch, getState ) => {
    return Promise.all([
      getEmailCredsCreationObj(getState, id, templateName ).then( ( resp ) => { return dispatch(sendEmail(resp)); }),
      getSmsCredsCreationObj(getState, id, templateName).then( ( resp ) => { return dispatch(sendSMS(resp )); })
    ])
    .catch( ( resp ) => {
      alert(resp);
    });
  };
};

/* End of it */

const deleteDevice = ( id ) => {
  return ( dispatch, getState ) => {
    const devUrl = Endpoints.db + '/table/device/delete';


    const deleteObj = {};
    deleteObj.returning = ['id'];
    deleteObj.where = {
      'id': id
    };

    const options = {
      ...genOptions,
      body: JSON.stringify(deleteObj)
    };

    return dispatch( requestAction( devUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        alert('Device Deleted Successfully');
        return Promise.all([
          dispatch( fetchDevice(getState().bar_data.barData.barData.id)),
          dispatch( { type: UNLOAD_DEVICE })
        ]);
      }
    })
    .catch( ( ) => {
      alert('Couldn"t Delete Device');
    });
    // return Promise.resolve();
  };
};

const createDevice = () => {
  return ( dispatch, getState ) => {
    if ( !getState().bar_data.barData.barData.id ) {
      alert('Create Organization to create device');
      return Promise.reject();
    }

    const devUrl = Endpoints.db + '/table/device/insert';
    const deviceData = getState().bar_data.deviceData;
    const deviceDataObj = {
      'device_num': deviceData.device_num,
      'mobile_number': deviceData.mobile_number,
      'operator': deviceData.operator
    };

    const deviceInsertCheck = ['device_num', 'mobile_number', 'operator'];
    let deviceCheck = true;
    deviceInsertCheck.forEach( ( i ) => {
      deviceCheck = deviceCheck && ( deviceDataObj[i] ? true : false );
    });
    if ( !deviceInsertCheck ) {
      alert('All the fields for organisation are mandatory');
      return Promise.reject();
    }

    const insertObj = {};
    insertObj.objects = [ { ...deviceDataObj } ];
    insertObj.returning = ['id'];
    const options = {
      ...genOptions,
      body: JSON.stringify(insertObj)
    };

    return dispatch( requestAction( devUrl, options ) )
    .then( ( resp ) => {
      if ( resp.returning.length > 0 ) {
        console.log('Device Created : Moving on to creating User');
        return Promise.all([
          dispatch( createUser(resp.returning[0].id) ),
        ])
        .then( () => {
          return Promise.all([
            dispatch( activateDevice(resp.returning[0].id, getState().bar_data.barData.barData.id, deviceData.is_active) ),
            dispatch( fetchDevice( getState().bar_data.barData.barData.id )),
            dispatch( { type: UNLOAD_DEVICE })
          ]);
        });
      }
    })
    .catch( ( resp ) => {
      if ( resp.id ) {
        alert('User Creation failed device creation rolling back');
        return dispatch( deleteDevice( resp.id ) );
      }
      alert('Couldn"t create device Benefiiciary');
    });
    // return Promise.resolve();
  };
};

const createDeviceLocal = () => {
  return ( dispatch, getState ) => {
    const deviceData = getState().bar_data.deviceData;
    const deviceDataObj = {
      'device_num': deviceData.device_num,
      'mobile_number': deviceData.mobile_number,
      'operator': deviceData.operator
    };

    const deviceInsertCheck = ['device_num', 'mobile_number', 'operator'];
    let deviceCheck = true;

    deviceInsertCheck.forEach( ( i ) => {
      deviceCheck = deviceCheck && ( deviceDataObj[i] ? true : false );
    });

    if ( !deviceInsertCheck ) {
      alert('All the fields for Device are mandatory');
      return Promise.reject();
    }

    return dispatch({ type: LOCAL_CREATE_DEVICE, data: { devId: getState().bar_data.deviceData.localDevId, devData: { ...deviceDataObj }} });
  };
};

const updateDeviceLocal = () => {
  return ( dispatch, getState ) => {
    const deviceData = getState().bar_data.deviceData;
    const deviceDataObj = {
      'device_num': deviceData.device_num,
      'is_active': deviceData.is_active,
      'mobile_number': deviceData.mobile_number,
      'operator': deviceData.operator
    };

    const deviceInsertCheck = ['device_num', 'mobile_number', 'operator'];
    let deviceCheck = true;

    deviceInsertCheck.forEach( ( i ) => {
      deviceCheck = deviceCheck && ( deviceDataObj[i] ? true : false );
    });

    if ( !deviceInsertCheck ) {
      alert('All the fields for Device are mandatory');
      return Promise.reject();
    }

    return dispatch({ type: LOCAL_UPDATE_DEVICE, data: { devId: getState().bar_data.deviceData.editDeviceId, devData: { ...deviceDataObj }} });
  };
};

const deleteDeviceLocal = () => {
  return ( dispatch, getState ) => {
    const localDevId = getState().bar_data.deviceData.editDeviceId;
    return dispatch({ type: LOCAL_DELETE_DEVICE, data: { devId: localDevId } });
  };
};

const defaultDevState = {'is_active': '', 'device_num': '', 'mobile_number': '', 'operator': '', 'email': '', 'password': ''};

/* End of it */

/* Reducer */

const deviceReducer = ( state = { ...addDeviceState, ...uiState }, action ) => {
  switch ( action.type ) {
    case INITIAL_DATA_FETCHED:
      return { ...state, devices: action.data };
    case DEVICE_INPUT_CHANGE:
      const deviceData = {};
      deviceData[action.data.key] = action.data.value;
      return { ...state, ...deviceData };
    case HANDLE_ERROR:
      return { ...state };
    case TOGGLE_DEVICE_DETAIL:
      return { ...state, showDetail: !state.showDetail, device_num: '', mobile_number: '', operator: '', email: '', is_active: true, isEditing: false, editDeviceId: 0, 'password': ''};
    case LOCAL_CREATE_DEVICE:
      const localState = {};
      localState[action.data.devId] = action.data.devData;

      return { ...state, ...defaultDevState, localDevs: { ...state.localDevs, ...localState }, showDetail: false, localDevId: action.data.devId + 1};

    case LOCAL_DELETE_DEVICE:
      const localDevState = Object.assign({}, state.localDevs );
      delete localDevState[action.data.devId];

      return { ...state, ...defaultDevState, localDevs: { ...localDevState }, showDetail: false, localDevId: state.localDevId - 1, isEditing: false};

    case LOCAL_UPDATE_DEVICE:
      const localUpdateState = {};
      localUpdateState[action.data.devId] = action.data.devData;

      return { ...state, ...defaultDevState, localDevs: { ...state.localDevs, ...localUpdateState }, showDetail: false };

    case LOAD_DEVICE:
      const devId = action.data;
      const filteredDev = state.devices.filter( ( dev ) => {
        return ( dev.device.id === devId );
      });
      const {
        device_num,
        mobile_number,
        operator,
      } = filteredDev[0].device;

      const {
        email,
        is_active,
      } = filteredDev[0];

      const devData = {is_active, device_num, mobile_number, operator, email};

      return { ...state, ...devData, editDeviceId: devId, showDetail: true, isEditing: true};
    case LOAD_LOCAL_DEVICE:
      const localDevId = action.data;

      return { ...state, ...state.localDevs[localDevId], editDeviceId: localDevId, showDetail: true, isEditing: true };
    case UNLOAD_DEVICE:
      const devD = {is_active: '', password: '', device_num: '', mobile_number: '', operator: '', email: ''};

      return { ...state, ...devD, isEditing: false, showDetail: false, editDeviceId: 0 };
    case RESET_DEVICE:
      return { ...addDeviceState, ...uiState };
    default:
      return { ...state };
  }
};

/* End of it */

export {
  fetchDevice,
  TOGGLE_DEVICE_DETAIL,
  DEVICE_INPUT_CHANGE,
  LOAD_DEVICE,
  LOAD_LOCAL_DEVICE,
  updateDevice,
  deleteDevice,
  createDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  UNLOAD_DEVICE,
  RESET_DEVICE,
  emailSmsDeviceCreation,
  emailSmsCredsCreation
};

export default deviceReducer;
