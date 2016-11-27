import React from 'react';

const CampaignMenu = ({styles, brandManagerCampaignMap, brandManagerBrandMap, onBrandManagerChange,
  onValueChange, brandManagerOptions, campaignName, budgetedAmount, brandEmail,
  fundsCredited, activeFrom, activeTo, campaignStatus}) => (
  <div className={styles.compaign_details}>
    <div className={styles.heading + ' ' + styles.wd_100}>
      Campaign details
    </div>
    <ul>
      <li>
        <label>Brand Manager Email</label>
        <select data-field-name="name" type="text" name="brand_email"
          value={brandEmail} onChange={onBrandManagerChange.bind(this, brandManagerCampaignMap, brandManagerBrandMap)} >
          {brandManagerOptions}
        </select>
      </li>
      <li>
        <label>Campaign Name</label>
        <input data-field-name="name" type="text" name="campaign_name"
          value={campaignName} onChange={onValueChange.bind(this, 'campaignName')} />
      </li>
      <li>
        <label>Budgeted Amount</label>
        <input type="number" name="budgeted_amount"
          value={budgetedAmount} readOnly />
      </li>
      <li>
        <label>Funds Credited</label>
        <input type="number" name="funds_credited"
          value={fundsCredited} onChange={onValueChange.bind(this, 'fundsCredited')} />
      </li>
      <li>
        <label>Active From</label>
        <input type="datetime-local" name="active_from"
          value={activeFrom} onChange={onValueChange.bind(this, 'activeFrom')} />
      </li>
      <li>
        <label>Active To</label>
        <input type="datetime-local" name="active_to"
          value={activeTo} onChange={onValueChange.bind(this, 'activeTo')} />
      </li>
      <li>
        <label>Campaign Status</label>
        <select data-field-name="" name="campaign_status"
          value={campaignStatus} onChange={onValueChange.bind(this, 'campaignStatus')} >
          <option value="inactive">In-Active</option>
          <option value="active">Active</option>
        </select>
      </li>
    </ul>
  </div>
);

export default CampaignMenu;
