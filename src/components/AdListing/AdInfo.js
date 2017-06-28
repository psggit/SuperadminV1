import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './AdListingActions';

const AdInfo = ({allCity, adType, allBar, displayList}) => {
  const styles = require('./CreateBarAd.scss');
  const allCityHtml = allCity.map((city) => {
    return (<option value={city.id}> {city.name} </option>);
  });
  const allBarHtml = allBar.map((bar) => {
    return (<option value={bar.id}> {bar.name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={(adType === null) ? 'hide' : 'show'}>
          <div className={styles.heading + ' ' + styles.wd_100}>Brand Ordering</div>
          <ul>
            <li>
              <label>Select City</label>
              <select data-field-name="state_short_name" id="city" data-field-type="string" onChange={displayList}>
                <option value={null}>Select</option>
                {allCityHtml}
              </select>
            </li>
            <li className={(adType !== 'ad_bar') ? 'hide' : 'show'}>
              <label>Select Bar</label>
              <select id="bar" onChange={displayList}>
                <option value={null}>null</option>
                {allBarHtml}
              </select>
            </li>
          </ul>
        </div>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(AdInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
