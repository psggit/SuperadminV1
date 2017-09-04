import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {FEATURED_INFO} from './FeaturedListingActions';

const FeaturedInfo = ({allState, displayList}) => {
  const styles = require('./FeaturedList.scss');
  const allStateHtml = allState.map((state) => {
    return (<option value={state.short_name}> {state.state_name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Featured Ordering</div>
          <ul>
            <li>
              <label>Select State</label>
              <select data-field-name="state_short_name" id="state_short" data-field-type="string" onChange={displayList}>
                <option value={null}>Select</option>
                {allStateHtml}
              </select>
            </li>
          </ul>
      </div>
  );
};

export default formValidator(FeaturedInfo, 'data-field-name', 'data-field-type', FEATURED_INFO);
