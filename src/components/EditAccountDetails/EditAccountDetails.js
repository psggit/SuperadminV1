import React from 'react';
import { connect } from 'react-redux';

const EditAccountDetails = () => { // eslint-disable-line no-unused-vars
  const styles = require('./EditAccountDetails.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.edit_account_details_container}>
        <div className={styles.account_details_form}>
          <label className={styles.heading}>Edit Account Details</label>
          <div className={styles.indiv_form + ' ' + styles.wd_100}>
            <label>Name</label>
            <input type="text" />
          </div>
          <div className={styles.indiv_form + ' ' + styles.wd_100}>
            <label>Date of Birth</label>
            <input type="text" />
          </div>
          <div className={styles.indiv_form + ' ' + styles.wd_100}>
            <label>Gender</label>
            <select>
                <option>Male</option>
                <option>Female</option>
            </select>
          </div>
          <div className="clearfix"></div>
          <button className={styles.update_user_btn}>Update user</button>
        </div>
      </div>
    </div>);
};

export default connect()(EditAccountDetails);
