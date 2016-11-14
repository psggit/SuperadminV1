import React from 'react';
import formValidator from '../../Common/CommonFormValidator';

import {AD_INFO} from './CreateAdImageActions';

const AdInfo = () => {
  const styles = require('./CreateImageAd.scss');
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
          <ul>
            <li>
              <label>Brand Manager Email</label>
              <input data-field-name="email" data-field-type="text" type="text" />
            </li>
            <li>
              <label>Ad Title</label>
              <input data-field-name="ad_title" data-field-type="string" type="text" />
            </li>
            <li>
              <label>Ad Location</label>
              <select data-field-name="ad_location" data-field-type="string">
                <option>Select</option>
                <option>Homepage</option>
                <option>Whats New</option>
              </select>
            </li>
            <li>
              <label>Budgeted Amount</label>
              <input data-field-name="budgeted_amount" data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Funds Credited</label>
              <input data-field-name="funds_credited" data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Active From</label>
              <input data-field-name="active_from" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Active To</label>
              <input data-field-name="active_to" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Ad Status</label>
              <select data-field-name="status" data-field-type="string">
                <option>Select</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </li>
          </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(AdInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
