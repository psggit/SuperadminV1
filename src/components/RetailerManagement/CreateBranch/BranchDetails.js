import React from 'react';
import { Link } from 'react-router';

import formValidator from '../../Common/CommonFormValidator';

import {
  BRANCH_INPUT_CHANGED
} from './BranchData';

const BranchDetails = ( { currState, organisationData } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');

  const kycSelectObj = [
    {
      'label': 'Verified',
      'value': true
    },
    {
      'label': 'Unverified',
      'value': false
    }
  ];
  const statusSelectObj = [
    {
      'label': 'Active',
      'value': true
    },
    {
      'label': 'InActive',
      'value': false
    }
  ];

  const kycHtml = kycSelectObj.map( ( kyc, index ) => {
    return (
      <option key={ index } value={ kyc.value }> { kyc.label } </option>
    );
  });
  const branchStatusHtml = statusSelectObj.map( ( statusSelect, index ) => {
    return (
      <option key={ index } value={ statusSelect.value }> { statusSelect.label } </option>
    );
  });
  const deliveryStatusHtml = statusSelectObj.map( ( statusSelect, index ) => {
    return (
      <option key={ index } value={ statusSelect.value }> { statusSelect.label } </option>
    );
  });

  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  let orgObj = [];

  orgObj = (organisationData) ? organisationData.map( ( organisation, index ) => {
    return (
      <option key={ index } value={ organisation.id }> { organisation.organisation_name } </option>
    );
  }) : [];

  return (
    <div>
      <div className={styles.heading + ' ' + styles.wd_100}>Branch Details</div>
      <ul>
        <li>
          <div className={styles.wd_50}>
            <label>Select Organisation*</label>
            <select data-field-name="organisation_id" data-field-type="int" data-field-value={ currState.organisation_id } value={ currState.organisation_id } >
              <option value="0">Select Organisation </option>
              { orgObj }
            </select>
          </div>
          <div className={styles.wd_50}>
            <Link to={'/hadmin/retailer/profile/' + currState.id + '/view_notepads'}>
              <button>Make Notes</button>
            </Link>
          </div>
        </li>
        <li>
          <label>Application Number*</label>
          <input data-field-name="name" type="text" data-field-name="application_number" data-field-type="text" data-field-value={ currState.application_number } value={ currState.application_number } />
        </li>
        <li>
          <label>State Store Id</label>
          <input data-field-name="name" type="text" data-field-name="state_store_id" data-field-type="text" data-field-value={ currState.state_store_id } value={ currState.state_store_id } />
        </li>
        <li>
          <label>Branch Name*</label>
          <input data-field-name="name" type="text" data-field-name="org_name" data-field-type="text" data-field-value={ currState.org_name } value={ currState.org_name } />
        </li>
        <li>
          <label>Excise License Number*</label>
          <input type="text" data-field-name="excise_licence_number" data-field-type="text" data-field-value={ currState.excise_licence_number } value={ currState.excise_licence_number } />
        </li>
        <li>
          <label>CST Number</label>
          <input type="text" data-field-name="cst_number" data-field-type="text" value={ currState.cst_number } />
        </li>
        <li>
          <label>Discount Percent*</label>
          <input type="number" data-field-name="discount_percent" data-field-type="float" data-field-value={ currState.discount_percent } value={ currState.discount_percent } />
        </li>
        <li>
          <label>Service Charge Percent*</label>
          <input type="number" max="100" data-field-name="service_charge_percent" data-field-type="float" data-field-value={ currState.service_charge_percent } value={ currState.service_charge_percent } />
        </li>
        <li>
          <label>Delivery Discount Percent*</label>
          <input type="number" max="100" data-field-name="delivery_discount_percent" data-field-type="float" data-field-value={ currState.delivery_discount_percent} value={ currState.delivery_discount_percent} />
          <div className={styles.wd_50}>
            <label>Delivery Status*</label>
            <select data-field-name="is_deliverable" data-field-type="text" data-field-value={ currState.is_deliverable} value={ currState.is_deliverable}>
              <option value="">Select Branch Status</option>
              { deliveryStatusHtml }
            </select>
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>KYC Verified*</label>
            <select data-field-name="kyc_status" data-field-type="text" data-field-value={ currState.kyc_status } value={ currState.kyc_status }>
              <option value="">Select Kyc Status</option>
              { kycHtml }
            </select>
          </div>
          <div className={styles.wd_50}>
            <label>Branch Status*</label>
            <select data-field-name="branch_status" data-field-type="text" data-field-value={ currState.branch_status } value={ currState.branch_status }>
              <option value="">Select Branch Status</option>
              { branchStatusHtml }
            </select>
          </div>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BranchDetails, 'data-field-name', 'data-field-type', BRANCH_INPUT_CHANGED);

export default decoratedOne;
