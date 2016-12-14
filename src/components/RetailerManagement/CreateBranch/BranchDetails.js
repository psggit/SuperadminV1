import React from 'react';

import formValidator from '../../Common/CommonFormValidator';

import {
  BRANCH_INPUT_CHANGED
} from './BranchData';

const BranchDetails = ( { currState, organisationData } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');

  const kycSelectObj = [
    {
      'label': 'True',
      'value': true
    },
    {
      'label': 'False',
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
          <label>Select Organisation</label>
          <select data-field-name="organisation_id" data-field-type="int" value={ currState.organisation_id } >
            <option value="0">Select Organisation </option>
            { orgObj }
          </select>
        </li>
        <li>
          <label>Application Number</label>
          <input data-field-name="name" type="text" data-field-name="application_number" data-field-type="text" value={ currState.application_number } />
        </li>
        <li>
          <label>Branch Name</label>
          <input data-field-name="name" type="text" data-field-name="org_name" data-field-type="text" value={ currState.org_name } />
        </li>
        <li>
          <label>Excise License Number</label>
          <input type="text" data-field-name="excise_licence_number" data-field-type="text" value={ currState.excise_licence_number } />
        </li>
        <li>
          <label>CST Number</label>
          <input type="text" data-field-name="cst_number" data-field-type="text" value={ currState.cst_number } />
        </li>
        <li>
          <label>Discount Percent</label>
          <input type="text" data-field-name="discount_percent" data-field-type="text" value={ currState.discount_percent } />
        </li>
        <li>
          <label>Service Charge Percent</label>
          <input type="text" data-field-name="service_charge_percent" data-field-type="text" value={ currState.service_charge_percent } />
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>KYC Verified</label>
            <select data-field-name="kyc_status" data-field-type="text" value={ currState.kyc_status }>
              <option value="">Select Kyc Status</option>
              { kycHtml }
            </select>
          </div>
          <div className={styles.wd_50}>
            <label>Branch Status</label>
            <select data-field-name="branch_status" data-field-type="text" value={ currState.branch_status }>
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
