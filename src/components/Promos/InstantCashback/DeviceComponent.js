import React from 'react';
import { connect } from 'react-redux';

const DeviceWrapper = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <div className={styles.device_items_container}>
        <div className={styles.device_lab}>
          Devices
          <p>10 Items</p>
        </div>
        <p className={styles.add_promo_lab}>+ Add Device</p>
        <div className={styles.items_list_container}>
          <div className={styles.indiv_item}>
            <div className={styles.heading_container}>
              <p className={styles.heading_lab}>
                Chevas Regular 12Y
              </p>
              <p className={styles.edit_lab}>
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
                INR 3000
              </div>
              <div className={styles.table_td + ' ' + 'col-md-6'}>
                2000
              </div>
            </div>
          </div>
          <div className={styles.indiv_item}>
            <div className={styles.heading_container}>
              <p className={styles.heading_lab}>
                Chevas Regular 12Y
              </p>
              <p className={styles.edit_lab}>
                Edit
              </p>
            </div>
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
                INR 3000
              </div>
              <div className={styles.table_td + ' ' + 'col-md-6'}>
                2000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default connect()(DeviceWrapper);
