import React from 'react';
import formValidator from '../../Common/CommonFormValidator';
import {CITY_SELECT} from './CreateAdBarActions';

import {AD_INFO} from './CreateAdBarActions';

const AdInfo = ({dispatch, cities, selectedCity}) => {
  const styles = require('./CreateBarAd.scss');
  const citiesDropdownHtml = cities.map((city) => {
    return (<option value={city.short_name}> {city.state_name} </option>);
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
              <label>Select Product</label>
              <select data-field-name="product_id" data-field-type="string" onChange={onCitySelect.bind(this)}>
                <option>Select</option>
                {citiesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Select State</label>
              <select data-field-name="state_short_name" data-field-type="string" onChange={onCitySelect.bind(this)}>
                <option>Select</option>
                {barsDropdownHtml}
              </select>
            </li>
            <li>
              <label>Ad Title</label>
              <input data-field-name="ad_title" data-field-type="string" type="text" />
            </li>
            <li>
              <label>Active To</label>
              <input data-field-name="active_to" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Active From</label>
              <input data-field-name="active_from" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Product ID</label>
              <input data-field-name="product_id" data-field-type="int" type="text"/>
            </li>
            <li>
              <label>State</label>
              <input data-field-name="state_short_name" data-field-type="string" type="text"/>
            </li>
            <li>
              <label>Store Type</label>
              <input data-field-name="store_type" data-field-type="string" type="text"/>
            </li>
            <li>
              <label>Refund on Cancellation</label>
              <input data-field-name="refund_on_cancellation" data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Ad Status</label>
              <select data-field-name="is_active" data-field-type="string">
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
