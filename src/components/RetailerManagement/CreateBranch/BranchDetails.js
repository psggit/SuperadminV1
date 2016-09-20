import React from 'react';
import { connect } from 'react-redux';

const BranchDetails = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div>
            <div className={styles.heading + ' ' + styles.wd_100}>Branch Details</div>
              <ul>
                <li>
                  <label>Select Organisation</label>
                  <select data-field-name="">
                    <option>Select</option>
                  </select>
                </li>
                <li>
                  <label>Application Number</label>
                  <input data-field-name="name" type="text" />
                </li>
                <li>
                  <label>Branch Name</label>
                  <input data-field-name="name" type="text" />
                </li>
                <li>
                  <label>Excise License Number</label>
                  <input type="date"/>
                </li>
                <li>
                  <label>CST Number</label>
                  <input type="date"/>
                </li>
              </ul>
        </div>);
};

export default connect()(BranchDetails);
