import React from 'react';
import { connect } from 'react-redux';
const AddDeviceComponent = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <div className={styles.promo_details_container}>
        <div className={styles.heading}>
          Add Device
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Device IMEI(1)
          </label>
          <input type="text"/>
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Mobile Number
          </label>
          <input type="text"/>
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Mobile Operator
          </label>
          <input type="text"/>
        </div>
        <div className={styles.user_actions}>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>);
};

export default connect()(AddDeviceComponent);
