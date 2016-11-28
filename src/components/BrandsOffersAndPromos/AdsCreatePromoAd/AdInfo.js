import React from 'react';
import formValidator from '../../Common/CommonFormValidator';

import {AD_INFO, CAMPAIGN_SELECT_FOR_PROMO} from './CreateAdPromoActions';

const AdInfo = ({dispatch, campaigns, skl, bmi}) => {
  const styles = require('./CreatePromoAd.scss');
  const campaignsDropDownHtml = campaigns.map((campaign) => {
    return (<option value={campaign.id}>{campaign.id} : {campaign.name} </option>);
  });
  const promosDropdownHtml = Object.keys(skl).map((key) => {
    return (<option value={skl[key].id}> {skl[key].id} : {skl[key].name} : {skl[key].volume} ml</option>);
  });
  const onCampaignSelect = (e) => {
    Promise.all([
      dispatch({type: CAMPAIGN_SELECT_FOR_PROMO, data: e.target.value}),
    ]);
  };
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>CAMPAIGN DETAILS</div>
          <ul>
            <li>
              <label>Select Campaign</label>
              <select data-field-name="campaign" data-field-type="string" onChange={onCampaignSelect.bind(this)}>
                <option>Select</option>
                {campaignsDropDownHtml}
              </select>
            </li>
            <li>
              <label>Select Promo</label>
              <select data-field-name="cash_back_offer_sku_id" data-field-type="string">
                <option>Select</option>
                {promosDropdownHtml}
              </select>
            </li>
            <li>
              <label>Brand Manager</label>
              <input data-field-name="brand_manager_id" value={ bmi.id + ' : ' + bmi.email + ' : ' + bmi.name} data-field-type="string" type="text" />
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
