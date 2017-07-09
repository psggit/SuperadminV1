import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {CONVENIENCE_INFO} from './ConvenienceFeeActions';

const ConvenienceFeeInfo = ({statesAll, data}) => {
  const styles = require('./ConvenienceFee.scss');
  const statesDropdownHtml = statesAll.map((state) => {
    return (<option value={state.short_name}> {state.state_name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>MANAGE CONVENIENCE FEE</div>
          <ul>
            <li>
              <label>State:</label>
              <select data-field-name="state_short_name" data-field-type="state_short_name">
                <option>Select</option>
                  {statesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Percentage</label>
              <input value={data.percentage} data-field-name="percentage" data-field-type="int"/>
            </li>
            <li>
              <label>Valid From</label>
              <input value={data.valid_from} data-field-name="valid_from" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>End Date</label>
              <input value={data.valid_to} data-field-name="valid_to" data-field-type="time" type="datetime-local"/>
            </li>
          </ul>
    </div>
  );
};
export default formValidator(ConvenienceFeeInfo, 'data-field-name', 'data-field-type', CONVENIENCE_INFO);
