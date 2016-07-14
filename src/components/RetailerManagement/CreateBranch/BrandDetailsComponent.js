import React from 'react';
import { connect } from 'react-redux';

const BrandDetailsComponent = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.brand_component}>
          <div className={styles.brand_details_container}>
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
                <li>
                  <div className={styles.heading}>Bank Account Details</div>
                </li>
                <li>
                  <div className={styles.wd_50}>
                    <ul>
                      <li>
                        <label>Name of the Bank</label>
                        <input type="text"/>
                      </li>
                      <li>
                        <label>IFSC Code</label>
                        <input type="text"/>
                      </li>
                      <li>
                        <label>Account Number</label>
                        <input type="number"/>
                      </li>
                      <li>
                        <label>Branch Name</label>
                        <input type="number"/>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.wd_50}>
                    <div className={styles.cheque_upload_container}>
                      <div className={styles.check_upload}>
                        <div className={styles.check_lab}>
                          Cancelled Cheque Copy
                        </div>
                        <div className={styles.upload_container}>
                          <input type="file" className={styles.input_upload}/>
                          <div className={styles.wd_100}>
                            <button className={styles.upload_btn}>Upload</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
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
          </div>
        </div>);
};

export default connect()(BrandDetailsComponent);
