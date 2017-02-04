import React from 'react';

const CampaignMenu = ({styles, brandManagerCampaignMap, brandManagerBrandMap, onBrandManagerChange,
  onValueChange, campaignList, brandManagerOptions, campaignName, budgetedAmount, brandEmail, companyOptions,
  onCompanyChange, fundsCredited, activeFrom, activeTo, campaignStatus, company}) => (
  <div>
    <div className={styles.compaign_details}>
      <div className={styles.heading + ' ' + styles.wd_100}>
        Campaign details
      </div>
      <ul>
        <li>
          <label>Company*</label>
          <select data-field-name="name" type="text" name="company_name"
            value={company} onChange={onCompanyChange.bind(this)} >
            {companyOptions}
          </select>
        </li>
        <li>
          <label>Brand Manager Email*</label>
          <select data-field-name="name" type="text" name="brand_email"
            value={brandEmail} data-field-value={brandEmail} onChange={onBrandManagerChange.bind(this, brandManagerCampaignMap, brandManagerBrandMap)} >
            {brandManagerOptions}
          </select>
        </li>
        <li>
          <label>Campaign Name*</label>
          <input data-field-name="name" type="text" name="campaign_name"
            value={campaignName} data-field-value={campaignName} onChange={onValueChange.bind(this, 'campaignName')} />
        </li>
        <li>
          <label>Budgeted Amount*</label>
          <input type="text" name="budgeted_amount"
            value={budgetedAmount} data-field-value={budgetedAmount} onChange={onValueChange.bind(this, 'budgetedAmount')} />
        </li>
        <li>
          <label>Funds Credited*</label>
          <input type="text" name="funds_credited"
            value={fundsCredited} data-field-value={fundsCredited} onChange={onValueChange.bind(this, 'fundsCredited')} />
        </li>
        <li>
          <label>Active From*</label>
          <input type="datetime-local" name="active_from"
            value={activeFrom} data-field-value={activeFrom} onChange={onValueChange.bind(this, 'activeFrom')} />
        </li>
        <li>
          <label>Active To*</label>
          <input type="datetime-local" name="active_to"
            value={activeTo} data-field-value={activeTo} onChange={onValueChange.bind(this, 'activeTo')} />
        </li>
        <li>
          <label>Campaign Status*</label>
          <select data-field-name="" name="campaign_status"
            value={campaignStatus} data-field-value={campaignStatus} onChange={onValueChange.bind(this, 'campaignStatus')} >
            <option value="inactive">In-Active</option>
            <option value="active">Active</option>
          </select>
        </li>
      </ul>
    </div>
    <div className={styles.table_details}>
      <div className={styles.heading + ' ' + styles.wd_100}>
        Campaign of current BM:
      </div>
      <table>
        <tr>
          <th>
          </th>
          <th>
            NAME
          </th>
          <th>
            ACTIVE FROM
          </th>
          <th>
            ACTIVE TO
          </th>
          <th>
            CREATED ON
          </th>
          <th>
            TYPE
          </th>
          <th>
            STATUS
          </th>
          <th>
            BUDGETED AMOUNT
          </th>
          <th>
            FUNDS CREDITED
          </th>
        </tr>
        {campaignList}
      </table>
    </div>
  </div>
);

export default CampaignMenu;
