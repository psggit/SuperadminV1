import React from 'react';
import formValidator from '../../Common/CommonFormValidator';
import {CITY_SELECT} from './CreateAdBarActions';

import {AD_INFO} from './CreateAdBarActions';

const AdInfo = ({dispatch, cities, selectedCity}) => {
  const styles = require('./CreateBarAd.scss');
  const citiesDropdownHtml = cities.map((city, index) => {
    return (<option value={index}> {city.name} </option>);
  });
  const barsDropdownHtml = selectedCity.bars.map((bar) => {
    return (<option value={bar.id}> {bar.name} </option>);
  });
  const onCitySelect = (e) => {
    dispatch({type: CITY_SELECT, data: e.target.value});
  };
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
          <ul>
            <li>
              <label>Select City</label>
              <select data-field-name="city" data-field-type="string" onChange={onCitySelect.bind(this)}>
                <option>Select</option>
                {citiesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Select Bar</label>
              <select data-field-name="bar" data-field-type="string">
                <option>Select</option>
                {barsDropdownHtml}
              </select>
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
              <label>Target Views</label>
              <input data-field-name="target_views" data-field-type="int" type="text"/>
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
