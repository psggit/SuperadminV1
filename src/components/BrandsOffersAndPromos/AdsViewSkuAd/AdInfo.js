import React from 'react';
import formValidator from '../../Common/CommonFormValidator';
import { brandManagerFetch } from './CreateAdImageActions.js';

import {AD_INFO, BRAND_SELECT_FOR_SKU} from './CreateAdImageActions';

const AdInfo = ({dispatch, brands, sb, bms, campaign}) => {
  const styles = require('./CreateImageAd.scss');
  const brandsDropDownHtml = brands.map((brand) => {
    return (<option value={brand.id}> {brand.brand_name} </option>);
  });
  const skusDropdownHtml = sb.skus.map((sku) => {
    return (<option value={sku.id}> {sku.volume} ml</option>);
  });
  const bmDropDownHtml = bms.map((bm) => {
    return (<option value={bm.id}> {bm.name} / {bm.email} </option>);
  });
  const onBrandSelect = (e) => {
    Promise.all([
      dispatch({type: BRAND_SELECT_FOR_SKU, data: e.target.value}),
      dispatch(brandManagerFetch(e.target.value))
    ]);
  };
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
          <ul>
            <li>
              <label>Select Brand</label>
              <select className="hide" data-field-name="brand" value={campaign.brand_id} data-field-type="string" onChange={onBrandSelect.bind(this)}>
                <option>{campaign.brand_id}</option>
                {brandsDropDownHtml}
              </select>
              <input data-field-name="brand" value={campaign.brand_name} data-field-type="string" onChange={onBrandSelect.bind(this)}>
              </input>
            </li>
            <li>
              <label>Select SKU</label>
              <select className="hide" data-field-name="sku_id" value={campaign.sku_id} data-field-type="string">
                <option>Select</option>
                {skusDropdownHtml}
              </select>
              <input data-field-name="sku_id" value={campaign.sku_name} data-field-type="string">
              </input>
            </li>
            <li>
              <label>Select Brand Manager</label>
              <select className="hide" data-field-name="brand_manager_id" value={campaign.brand_manager_id} data-field-type="string">
                <option>Select</option>
                {bmDropDownHtml}
              </select>
              <input data-field-name="brand_manager_id" value={campaign.brand_manager} data-field-type="string">
              </input>
            </li>
            <li>
              <label>Ad Title</label>
              <input data-field-name="ad_title" data-field-type="string" value={campaign.ad_title} type="text" />
            </li>
            <li>
              <label>Ad Location</label>
              <select data-field-name="ad_location" value={campaign.ad_location} data-field-type="string">
                <option>Select</option>
                <option>Homepage</option>
                <option>Whats New</option>
              </select>
            </li>
            <li>
              <label>Budgeted Amount</label>
              <input data-field-name="budgeted_amount" value={campaign.budgeted_amount} data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Funds Credited</label>
              <input data-field-name="funds_credited" value={campaign.funds_credited} data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Target Views</label>
              <input data-field-name="target_views" value={campaign.target_views} data-field-type="int" type="text"/>
            </li>
            <li>
              <label>Active From</label>
              <input data-field-name="active_from" value={campaign.active_from} data-field-type="text" type="text"/>
            </li>
            <li>
              <label>Active To</label>
              <input data-field-name="active_to" value={campaign.active_to} data-field-type="text" type="text"/>
            </li>
            <li>
              <label>Ad Status</label>
              <select value={campaign.status} data-field-name="status" data-field-type="string">
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
