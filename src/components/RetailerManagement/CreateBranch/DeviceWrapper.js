import React from 'react';
import { connect } from 'react-redux';
import DeviceComponent from './DeviceComponent';
import AddDeviceComponent from './AddDeviceComponent';
const DeviceWrapper = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.brand_wrapper}>
        <div className={styles.device_container}>
          <DeviceComponent />
          <AddDeviceComponent />
        </div>
      </div>
    </div>);
};

export default connect()(DeviceWrapper);
