import React from 'react';
import { connect } from 'react-redux';

const BrandAds = () => { // eslint-disable-line no-unused-vars
  const styles = require('./BrandAds.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.brand_wrapper}>
        <div className={styles.campaign_container}>
          <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
            <ul>
              <li>
                <label>Brand Manager Email</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Ad Title</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Ad Location</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
              <li>
                <label>Ad Type</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
              <li>
                <label>View Count</label>
                <input type="number"/>
              </li>
              <li>
                <label>Budgeted Amount</label>
                <input type="number"/>
              </li>
              <li>
                <label>Funds Credited</label>
                <input type="number"/>
              </li>
              <li>
                <label>Active From</label>
                <input type="date"/>
              </li>
              <li>
                <label>Active To</label>
                <input type="date"/>
              </li>
              <li>
                <label>Ad Status</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
            </ul>
        </div>
        <div className={styles.profile_view_right}>
          <div className={styles.upload_white}>
          <p className={styles.upload_header}>
              Upload Ad Image
          </p>
          <div className={styles.uploaded_images}>
          </div>
          <div className={styles.upload_actions}>
            <input type="file" className="" data-field-name="customer_upload" placeholder="username" />
            <div className={styles.upload_action_button}>
              <button className="" id="customer_upload">
              Upload
              </button>
            </div>
          </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className={styles.brands_wrapper}>
          <div className={styles.select_sku_container}>
            <div className={styles.heading}>Select SKU</div>
            <div className={styles.brands_container}>
              <div className={styles.heading}>
                  <label>BRANDS</label>
              </div>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
            <div className={styles.brands_ml_container}>
              <div className={styles.heading}>
                Cheni
              </div>
              <ul>
                <li>
                  <label>
                    <input type="checkbox"/> Tamil nadu
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.select_cities_container}>
            <div className={styles.heading}>Select CITIES</div>
            <div className={styles.brands_container}>
              <div className={styles.heading}>
                  <label>REGIONS</label>
              </div>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
            <div className={styles.brands_ml_container}>
              <div className={styles.heading}>
                CITIES
              </div>
              <ul>
                <li>
                  <label>
                    <input type="checkbox"/> Tamil nadu
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <button className={styles.edit_brand_btn}>
          Save Ad
        </button>
      </div>
    </div>);
};

export default connect()(BrandAds);
