import React from 'react';
import { connect } from 'react-redux';
const BranchContectDetails = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div>
          <ul>
            <li>
              <div className={styles.heading}>Branch Contact Details</div>
            </li>
            <li>
              <div className={styles.wd_50}>
                <label>Branch Address</label>
                <textarea rows="4" cols="10"></textarea>
              </div>
              <div className={styles.wd_50}>
                <label>State</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </div>
            </li>
            <li>
              <div className={styles.wd_50}>
                <label>Pincode</label>
                <input type="number"/>
              </div>
              <div className={styles.wd_50}>
                <label>City</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </div>
            </li>
            <li>
              <div className={styles.wd_50}>
                <label>Mobile Number</label>
                <input type="number"/>
              </div>
              <div className={styles.wd_50}>
                <label>Email</label>
                <input type="text"/>
              </div>
            </li>
            <li>
              <div className={styles.wd_50}>
                <label>Gps Coordinates</label>
                <input type="number"/>
              </div>
              <div className={styles.wd_50}>
                <label>Landline Number</label>
                <input type="text"/>
              </div>
            </li>
            <li>
              <div className={styles.wd_50}>
                <label>KYC Verified</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </div>
              <div className={styles.wd_50}>
                <label>Branch Status</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </div>
            </li>
          </ul>

        </div>);
};

export default connect()(BranchContectDetails);
