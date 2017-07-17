import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './MiscellaneousItemActions';

const MiscInfo = ({data, type}) => {
  const styles = require('./CreateBarAd.scss');
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>{type} MISCELLANEOUS ITEM:</div>
          <ul>
            <li>
              <label>Name</label>
              <input value={data.name} data-field-name="name" data-field-type="string"/>
            </li>
            <li>
              <label>Short Description</label>
              <input value={data.short_description} data-field-name="short_description" data-field-type="string"/>
            </li>
            <li>
              <label>Description</label>
              <textarea value={data.description} data-field-name="description" data-field-type="string"/>
            </li>
            <li>
              <label>Volume</label>
              <input value={data.volume} data-field-name="volume" data-field-type="int"/>
            </li>
          </ul>
    </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
//            <li>
//              <label>Active From</label>
//              <input value={data.active_from} data-field-name="active_from" data-field-type="time" type="datetime-local"/>
//            </li>
//            <li>
//              <label>Active To</label>
//              <input value={data.active_to} data-field-name="active_to" data-field-type="time" type="datetime-local"/>
//            </li>
export default formValidator(MiscInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
