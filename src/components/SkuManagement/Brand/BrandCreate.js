import React from 'react';
import { connect } from 'react-redux';

const BrandManagement = () => { // eslint-disable-line no-unused-vars
  const styles = require('./BrandManagement.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.create_brand_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Create Brand</div>
          <ul>
            <li>
              <label>Brand Name</label>
              <input type="text" />
            </li>
            <li>
              <label>Company Name</label>
              <select>
                <option>Sipping Spirit</option>
              </select>
            </li>
            <li>
              <label>Category</label>
              <select>
                <option>Sipping Spirit</option>
              </select>
            </li>
            <li>
              <label>Genre</label>
              <select>
                <option>Sipping Spirit</option>
              </select>
            </li>
            <li>
              <label>Brand Manager</label>
              <input type="email" />
            </li>
            <li>
              <label>Status</label>
              <select data-field-name="status">
                <option>Select Status</option>
                <option data-field-name="status" data-field-value="active">Active</option>
                <option data-field-name="status" data-field-value="inactive">InActive</option>
              </select>
            </li>
          </ul>
      </div>
      <div className={styles.states_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>
          Select Available States
        </div>
        <ul>
          <li>
              <label>
                <input type="checkbox"/>Jharkhand
              </label>
          </li>
          <li>
              <label>
                <input type="checkbox"/>Jharkhand
              </label>
          </li>
          <li>
              <label>
                <input type="checkbox"/>Jharkhand
              </label>
          </li>
        </ul>
      </div>
      <div className={styles.edit_brand_btn}>Create Brand</div>
    </div>);
};

export default connect()(BrandManagement);
