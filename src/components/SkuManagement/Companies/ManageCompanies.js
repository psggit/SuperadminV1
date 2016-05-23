import React from 'react';
import { connect } from 'react-redux';

const ManageCompanies = () => { // eslint-disable-line no-unused-vars
  const styles = require('./ManageCompanies.scss');
  return (
    <div className={styles.container}>
      <div className={styles.companies_wrapper}>
        <div className={styles.search_wrapper + ' ' + styles.wd_100}>
            <p>Search</p>
            <div className={styles.search_form + ' ' + styles.wd_100}>
              <input type="text" placeholder="Mobile Number" />
              <input type="text" placeholder="Contains" />
              <input type="number" />
              <button className={styles.common_btn}>Search</button>
            </div>
        </div>
        <div className={styles.create_layout + ' ' + styles.wd_100}>
          <div className={styles.create_company_container}>
            <div className={styles.heading + ' ' + styles.wd_100}>Create Company</div>
              <ul>
                <li>
                  <label>Company Name</label>
                  <input data-field-name="name" type="text" />
                </li>
                <li>
                  <label>Address</label>
                  <textarea rows="4" cols="10"></textarea>
                </li>
                <li>
                  <label>City</label>
                  <input type="text"/>
                </li>
                <li>
                  <label>State</label>
                  <input type="text"/>
                </li>
                <li>
                  <label>Pincode</label>
                  <input type="number"/>
                </li>
                <li>
                  <label>Status</label>
                  <select data-field-name="">
                    <option>Select</option>
                  </select>
                </li>
              </ul>
              <center>
                <button className={styles.common_btn}>Create Company</button>
              </center>
          </div>
        </div>
      </div>
    </div>);
};

export default connect()(ManageCompanies);
