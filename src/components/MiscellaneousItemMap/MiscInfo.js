import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './MiscellaneousItemActions';

const MiscInfo = ({type, miscAll}) => {
  const styles = require('./CreateBarAd.scss');
  const miscDropdownHtml = miscAll.map((misc) => {
    return (<option value={misc.id}> {misc.name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>{type} MISCELLANEOUS ITEM:</div>
          <ul>
            <li>
              <label>Miscellaneous Item:</label>
              <select data-field-name="misc" data-field-type="string">
                <option>Select</option>
                {miscDropdownHtml}
              </select>
            </li>
          </ul>
    </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(MiscInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
