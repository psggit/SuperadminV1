import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {AD_INFO} from './MiscellaneousItemActions';

const BarInfo = ({data, barsAll, citiesAll, type, onCityChange}) => {
  const styles = require('./CreateBarAd.scss');
  const citiesDropdownHtml = citiesAll.map((city) => {
    return (<option value={city.id}> {city.name} </option>);
  });
  const barsDropdownHtml = barsAll.map((bar) => {
    return (<option value={bar.id}> {bar.name} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>{type} MISCELLANEOUS ITEM:</div>
          <ul>
            <li>
              <label>City:</label>
              <select data-field-name="city" data-field-type="string" onChange={onCityChange}>
                <option>Select</option>
                {citiesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Bars:</label>
              <select data-field-name="bars" data-field-type="string">
                <option>Select</option>
                {barsDropdownHtml}
              </select>
            </li>
            <li>
              <label>Hipbar Price</label>
              <input value={data.name} data-field-name="name" data-field-type="string"/>
            </li>
            <li>
              <label>Menu Price</label>
              <input value={data.short_description} data-field-name="short_description" data-field-type="string"/>
            </li>
            <li>
              <label>Service Charge</label>
              <input value={data.short_description} data-field-name="short_description" data-field-type="string"/>
            </li>
            <li>
              <label>Active From</label>
              <input value={data.active_from} data-field-name="active_from" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Active To</label>
              <input value={data.active_to} data-field-name="active_to" data-field-type="time" type="datetime-local"/>
            </li>
          </ul>
    </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(BarInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
