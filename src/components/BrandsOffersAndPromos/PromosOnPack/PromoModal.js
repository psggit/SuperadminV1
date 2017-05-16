import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

// NOTE: THIS IS AN EXAMPLE NOT USED IN CODE.
const ModalInstance = ({styles, onSave, onClose, promoTitle, brands}) => {

  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Promo Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.heading + ' ' + styles.wd_100}>
            {promoTitle}
          </div>
          <ul>
            <li>
              <label>Sku Name</label>
              <select data-field-name="name" type="text" name="company_name"
                value={brandEmail} onChange={onBrandManagerChange.bind(this, brandManagerCampaignMap)} >
                {brandManagerOptions}
              </select>
            </li>
            <li>
              <label>Sku Name</label>
              <select data-field-name="name" type="text" name="brand_name"
                value={brand} onChange={onBrandManagerChange.bind(this, brandManagerCampaignMap)} >
                {brandManagerOptions}
              </select>
            </li>
            <li>
              <label>Sku Name</label>
              <select data-field-name="name" type="text" name="brand_email"
                value={brandEmail} onChange={onBrandManagerChange.bind(this, brandManagerCampaignMap)} >
                {brandManagerOptions}
              </select>
            </li>
            <li>
              <label>Compaign Name</label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose.bind(this)}>Close</Button>
          <Button onClick={onSave.bind(this)} bsStyle="primary">Save</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ModalInstance;
