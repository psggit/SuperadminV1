import React from 'react';
import formValidator from '../../Common/CommonFormValidator';

import {AD_INFO} from './CreateAdBarActions';

const AdInfo = ({ cities, brands, skus, products, stateSelect, brandSelect, skuSelect, campaignDetails}) => {
  const styles = require('./CreateBarAd.scss');
  const citiesDropdownHtml = cities.map((city) => {
    return (<option value={city.short_name}> {city.state_name} </option>);
  });
  const uniqBrands = brands.filter((brand, index, self) => self.findIndex(t => t.brand_id === brand.brand_id) === index);
  const brandDropdownHtml = uniqBrands.map((brand) => {
    return (<option value={brand.brand_id}> {brand.brand_name} </option>);
  });
  const skuDropdownHtml = skus.map((sku) => {
    return (<option value={sku.id}> {sku.volume} </option>);
  });
  const productDropdownHtml = products.map((product) => {
    return (<option value={product.id}> {product.price + '(' + product.state_short_name + ')'} </option>);
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
          <ul>
            <li>
              <label>Select State</label>
              <select data-field-name="state_short_name" data-field-type="string" onChange={stateSelect}>
                <option>Select</option>
                {citiesDropdownHtml}
              </select>
            </li>
            <li>
              <label>Select Brand</label>
              <select onChange={brandSelect}>
                <option>Select</option>
                {brandDropdownHtml}
              </select>
            </li>
            <li>
              <label>Select SKU</label>
              <select onChange={skuSelect.bind(this)}>
                <option>Select</option>
                {skuDropdownHtml}
              </select>
            </li>
            <li>
              <label>Select SKU Available in {campaignDetails.state_short_name} </label>
              <select data-field-name="product_id" data-field-type="int">
                <option>Select</option>
                {productDropdownHtml}
              </select>
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
              <label>Ad Status</label>
              <select data-field-name="is_active" data-field-type="string">
                <option>Select</option>
                <option value={0}>True</option>
                <option value={1}>False</option>
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
