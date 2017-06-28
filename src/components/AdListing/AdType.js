import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './AdListingActions';

const AdType = ({displayOption}) => {
  const styles = require('./CreateBarAd.scss');
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Brand Ordering</div>
          <ul>
            <li>
              <label>Select State</label>
              <select data-field-name="ad_type" id="ad_type" data-field-type="string" onChange={displayOption}>
                <option value={null}>Select</option>
                <option value="ad_bar"> Bar Ad </option>
                <option value="ad_url"> Url Ad </option>
                <option value="ad_image"> Image Ad </option>
                <option value="ad_promo"> Promo Ad </option>
                <option value="ad_sku"> SKU Ad </option>
              </select>
            </li>
          </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(AdType, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
