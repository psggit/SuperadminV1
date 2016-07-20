import React from 'react';
import formValidator from '../../Common/CommonFormValidator';
import {fetchBrands} from './CreateBMActions';

import { BRAND_MANAGER_INFO_CHANGE } from './CreateBMActions';

const BrandManagerInfo = ({dispatch, companyList}) => {
  const styles = require('./CreateBrandManager.scss');
  const onSelectCompany = () => {
    const companyId = parseInt(document.querySelectorAll('[data-field-name="company_id"] option:checked')[0].value, 10);
    dispatch(fetchBrands(companyId));
  };
  const companyHtml = companyList.map((company, index) => {
    return (
        <option key={index} value={parseInt(company.id, 10)}>{company.name}</option>
      );
  });
  return (
      <div className={styles.create_brand_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Create BrandManager</div>
        <ul>
          <li>
            <label>Name</label>
            <input data-field-name="name" data-field-type="text" />
          </li>
          <li>
            <label>Company Name</label>
            <select data-field-name="company_id" data-field-type="int" onChange={onSelectCompany.bind(this)}>
              <option disabled selected value> -- select an option -- </option>
              { companyHtml }
            </select>
          </li>
          <li>
            <label>Email</label>
            <input data-field-name="email" data-field-type="text"/>
          </li>
          <li>
            <label>Mobile Number</label>
            <input data-field-name="mobile_number" data-field-type="number"/>
          </li>
          <li>
            <label>Status</label>
            <select data-field-name="is_disabled">
              <option disable selected value> -- select status -- </option>
              <option value="false">Active</option>
              <option value="true">InActive</option>
            </select>
          </li>
          <li>
            <label>KYC Status</label>
            <select data-field-name="kyc_status" data-field-type="text">
              <option disable selected value> -- select -- </option>
              <option value="Verfied">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </li>
        </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(BrandManagerInfo, 'data-field-name', 'data-field-type', BRAND_MANAGER_INFO_CHANGE);
