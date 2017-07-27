import React, { Component, PropTypes } from 'react';
import DeviceComponent from './DeviceComponent';
import AddDeviceComponent from './AddDeviceComponent';

import {
  TOGGLE_DEVICE_DETAIL,
  LOAD_DEVICE,
  UNLOAD_DEVICE,
  LOAD_LOCAL_DEVICE
} from './DeviceAction';

class DeviceWrapper extends Component { // eslint-disable-line no-unused-vars
  toggleDeviceDetail() {
    this.props.dispatch( { type: TOGGLE_DEVICE_DETAIL } );
  }
  loadDevice( id ) {
    this.props.dispatch( { type: LOAD_DEVICE, data: parseInt(id, 10) });
  }
  loadLocalDevice( id ) {
    this.props.dispatch( { type: LOAD_LOCAL_DEVICE, data: parseInt(id, 10) });
  }
  unloadDevice() {
    this.props.dispatch( { type: UNLOAD_DEVICE });
  }

  render() {
    const styles = require('./CreateBar.scss');
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    const {
      deviceData,
      dispatch,
      createDevice,
      updateDevice,
      toggleDevice,
      deleteDevice,
      createDeviceLocal,
      updateDeviceLocal,
      deleteDeviceLocal,
      barData,
      emailSmsDeviceCreation,
      emailSmsCredsCreation
    } = this.props;

    const { showDetail, devices, localDevs, isEditing } = deviceData;

    return (
      <div className={styles.container}>
        <div className={styles.bar_wrapper}>
          <div className={styles.device_container}>
            <DeviceComponent
      toggleDeviceDetail={ this.toggleDeviceDetail.bind(this) }
      devices = { devices }
      localDevs = { localDevs }
      loadDevice ={ this.loadDevice.bind(this) }
      toggleDevice = { toggleDevice }
      loadLocalDevice = { this.loadLocalDevice.bind(this) }
      emailSmsDeviceCreation = { emailSmsDeviceCreation }
      emailSmsCredsCreation = { emailSmsCredsCreation }
        />
            <AddDeviceComponent
      dispatch = { dispatch }
      isEditing = { isEditing }
      isShow = { !showDetail ? 'hide' : '' }
      currState= { Object.assign({}, ...deviceData) }

      createDevice = { createDevice }
      updateDevice = { updateDevice }
      deleteDevice = { deleteDevice }

      createDeviceLocal = { createDeviceLocal }
      updateDeviceLocal = { updateDeviceLocal }
      deleteDeviceLocal = { deleteDeviceLocal }

      unloadDevice={ this.unloadDevice.bind(this) }
      isBrEdit = { barData.isBrEdit }
        />
          </div>
        </div>
      </div>);
  }
}

DeviceWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  deviceData: PropTypes.object.isRequired,
  barData: PropTypes.object.isRequired,
  createDevice: PropTypes.func.isRequired,
  updateDevice: PropTypes.func.isRequired,
  toggleDevice: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  createDeviceLocal: PropTypes.func.isRequired,
  updateDeviceLocal: PropTypes.func.isRequired,
  deleteDeviceLocal: PropTypes.func.isRequired,
  emailSmsDeviceCreation: PropTypes.func.isRequired,
  emailSmsCredsCreation: PropTypes.func.isRequired
};

export default DeviceWrapper;
