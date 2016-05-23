import React from 'react';
import { connect } from 'react-redux';

const CreateBrandManager = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrandManager.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.brand_wrapper}>
        <div className={styles.create_brand_container}>
          <div className={styles.heading + ' ' + styles.wd_100}>Create Brand</div>
            <ul>
              <li>
                <label>Name</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Company Name</label>
                <select data-field-name="company_id">
                  <option>Select Company</option>
                </select>
              </li>
              <li>
                <label>Email</label>
                <input type="text"/>
              </li>
              <li>
                <label>Mobile Number</label>
                <input type="number"/>
              </li>
              <li>
                <label>Status</label>
                <select data-field-name="status">
                  <option>Select Status</option>
                  <option data-field-name="status" data-field-value="active">Active</option>
                  <option data-field-name="status" data-field-value="inactive">InActive</option>
                </select>
              </li>
              <li>
                <label>KYC Status</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
            </ul>
        </div>
        <div className="clearfix"></div>
        <div className={styles.brands_wrapper}>
          <div className={styles.brand_container}>
            <div className={styles.heading}>Brands</div>
            <div className={styles.add_lab}>+ Select Brand</div>
            <ul>
              <li>
                <label>South</label>
                <p>3 Cities</p>
              </li>
            </ul>
          </div>
          <div className={styles.select_brands_container}>
            <div className={styles.heading}>Select Brand</div>
            <div className={styles.wd_100}>
              <label className={styles.region_lab}>Brand name</label>
              <select data-field-name="status">
                <option>Select Status</option>
                <option data-field-name="status" data-field-value="active">Active</option>
                <option data-field-name="status" data-field-value="inactive">InActive</option>
              </select>
            </div>
            <div className={styles.wd_100 + ' ' + styles.select_city}>
              <label className={styles.cites_lab}>
                SELECT REGIONS
                <span className={styles.selected}>1 Selected</span>
              </label>
            </div>
            <div className={styles.available_states_container}>
              <div className={styles.heading}>
                  <label>Available regions</label>
              </div>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
            <div className={styles.cities_in_container}>
              <div className={styles.heading}>
                Cities in: <span className={styles.state}>Tamil Nadu</span>
              </div>
              <ul>
                <li>
                  <label>
                    <input type="checkbox"/> Tamil nadu
                  </label>
                </li>
              </ul>
            </div>
            <div className="clearfix"></div>
            <div className={styles.user_actions}>
              <button>Delete</button>
              <button>Update</button>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <button className={styles.edit_brand_btn}>
          Save BM
        </button>
      </div>
    </div>);
};

export default connect()(CreateBrandManager);
