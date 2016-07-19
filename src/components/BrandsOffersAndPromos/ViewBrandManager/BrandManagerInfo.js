import React from 'react';
import formValidator from '../../Common/CommonFormValidator';

import { BRAND_MANAGER_INFO_CHANGE, fetchBrands } from './ViewBMActions';

const BrandManagerInfo = ({dispatch, brandManagerInfo}) => {
  const bmInfo = {...brandManagerInfo};
  const styles = require('./ViewBrandManager.scss');
  const onSelectCompany = () => {
    const companyId = parseInt(document.querySelectorAll('[data-field-name="company_id"] option:checked')[0].value, 10);
    dispatch(fetchBrands(companyId));
  };
  return (
      <div className={styles.create_brand_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Create Brand</div>
        <ul>
          <li>
            <label>Name</label>
            <input data-field-name="name" data-field-type="text" value={bmInfo.name}/>
          </li>
          <li>
            <label>Company Name</label>
            <select data-field-name="company_id" data-field-type="int" onChange={onSelectCompany.bind(this)}>
              <option value={parseInt(bmInfo.company.id, 10)}>{bmInfo.company.name}</option>
            </select>
          </li>
          <li>
            <label>Email</label>
            <input data-field-name="email" data-field-type="text" value={bmInfo.email}/>
          </li>
          <li>
            <label>Mobile Number</label>
            <input data-field-name="mobile_number" data-field-type="number" value={bmInfo.mobile_number}/>
          </li>
          <li>
            <label>Status</label>
            <select data-field-name="is_disabled">
              <option selected value={bmInfo.is_disabled}>{(bmInfo.is_disabled) ? 'Disbled' : 'Active' }</option>
            </select>
          </li>
          <li>
            <label>KYC Status</label>
            <select data-field-name="kyc_status" data-field-type="text">
              <option selected value={bmInfo.kyc_status}>{bmInfo.kyc_status}</option>
            </select>
          </li>
        </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(BrandManagerInfo, 'data-field-name', 'data-field-type', BRAND_MANAGER_INFO_CHANGE);
