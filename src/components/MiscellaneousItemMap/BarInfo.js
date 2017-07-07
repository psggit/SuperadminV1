import React from 'react';
import formValidator from '../Common/CommonFormValidator';

import {MISC_INFO} from './MiscellaneousItemActions';

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
              <select data-field-name="city" data-field-type="int" onChange={onCityChange}>
                <option>Select</option>
                {citiesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Bars:</label>
              <select data-field-name="bar_id" data-field-type="int">
                <option>Select</option>
                {barsDropdownHtml}
              </select>
            </li>
            <li>
              <label>Hipbar Price</label>
              <input value={data.hipbarPrice} data-field-name="hipbarPrice" data-field-type="int"/>
            </li>
            <li>
              <label>Menu Price</label>
              <input value={data.menuPrice} data-field-name="menuPrice" data-field-type="int"/>
            </li>
            <li>
              <label>Service Charge</label>
              <input value={data.charges_and_tax_percentage} data-field-name="charges_and_tax_percentage" data-field-type="float"/>
            </li>
            <li>
              <label>Negotiated SKU Price</label>
              <input value={data.negotiated_sku_price} data-field-name="negotiated_sku_price" data-field-type="float"/>
            </li>
            <li>
              <label>Base SKU Price</label>
              <input value={data.base_sku_price} data-field-name="base_sku_price" data-field-type="number"/>
            </li>
            <li>
              <label>Start Date</label>
              <input value={data.start_date} data-field-name="start_date" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>End Date</label>
              <input value={data.end_date} data-field-name="end_date" data-field-type="time" type="datetime-local"/>
            </li>
            <li>
              <label>Listing Order</label>
              <input value={data.listing_order} data-field-name="listing_order" data-field-type="int"/>
            </li>
            <li>
              <label>Terms & Conditions</label>
              <textarea value={data.terms_conditions} data-field-name="terms_conditions" data-field-type="text"/>
            </li>
            <li>
              <label>Status</label>
              <select value={data.status} data-field-name="status" data-field-type="text">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </li>
            <li>
              <label>Is Experience?</label>
              <select value={data.is_experience} data-field-name="is_experience" data-field-type="boolean">
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </li>
          </ul>
    </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(BarInfo, 'data-field-name', 'data-field-type', MISC_INFO);
// Change emitter is the function
