import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {MISC_INFO} from './MiscellaneousItemActions';

const MiscInfo = ({type, miscAll, onMiscChange, data}) => {
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
              {(!data.id)
              ?
              <select onChange={onMiscChange} data-field-name="misc" data-field-type="string">
                <option>Select</option>
                {miscDropdownHtml}
              </select>
              :
              <select onChange={onMiscChange} data-field-name="misc" data-field-type="string">
                <option value={data.id}>{data.name}</option>
              </select>
              }
            </li>
          </ul>
    </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(MiscInfo, 'data-field-name', 'data-field-type', MISC_INFO);
// Change emitter is the function
