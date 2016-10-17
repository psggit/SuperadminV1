import React from 'react';
import { connect } from 'react-redux';

const DeviceComponent = ( {
  toggleDeviceDetail,
  devices,
  localDevs,
  loadLocalDevice,
  loadDevice
} ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  //
  const content = Object.keys(devices).map( ( device, index ) => {
    return (
      <div className={styles.indiv_item} key={ index } >
        <div className={styles.heading_container}>
          <p className={styles.heading_lab}>
            { device.device_num }
          </p>
          <p className={styles.edit_lab} onClick={ ( e ) => { loadDevice.call(undefined, e.target.getAttribute('data-dev-id')); }} data-dev-id={ device.id }>
            Edit
          </p>
        </div>
        <div className="clearfix"></div>
        <div className={styles.custom_table_th + ' ' + 'row'}>
          <div className={styles.table_th + ' ' + 'col-md-6'}>
            Mobile Number
          </div>
          <div className={styles.table_th + ' ' + 'col-md-6'}>
            Operator
          </div>
        </div>
        <div className={styles.custom_table_td + ' ' + 'row'}>
          <div className={styles.table_td + ' ' + 'col-md-6'}>
            { device.mobile_number }
          </div>
          <div className={styles.table_td + ' ' + 'col-md-6'}>
            { device.operator }
          </div>
        </div>
      </div>
    );
  });
  const contentLocal = Object.keys(localDevs).map( ( device, index ) => {
    return (
      <div className={styles.indiv_item} key={ index } >
        <div className={styles.heading_container}>
          <p className={styles.heading_lab}>
            { localDevs[device].device_num }
          </p>
          <p className={styles.edit_lab} onClick={ ( e ) => { loadLocalDevice.call(undefined, e.target.getAttribute('data-dev-id')); }} data-dev-id={ device }>
            Edit
          </p>
        </div>
        <div className="clearfix"></div>
        <div className={styles.custom_table_th + ' ' + 'row'}>
          <div className={styles.table_th + ' ' + 'col-md-6'}>
            Mobile Number
          </div>
          <div className={styles.table_th + ' ' + 'col-md-6'}>
            Operator
          </div>
        </div>
        <div className={styles.custom_table_td + ' ' + 'row'}>
          <div className={styles.table_td + ' ' + 'col-md-6'}>
            { localDevs[device].mobile_number }
          </div>
          <div className={styles.table_td + ' ' + 'col-md-6'}>
            { localDevs[device].operator }
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className={styles.device_items_container}>
        <div className={styles.device_lab}>
          Devices
          <p>10 Items</p>
        </div>
        <p className={styles.add_promo_lab} onClick={ toggleDeviceDetail } >
          + Add Device
        </p>
        <div className={styles.items_list_container}>
          { content }
          { contentLocal }
        </div>
      </div>
    </div>
  );
};

export default connect()(DeviceComponent);
