import React from 'react';
import BrandDropDown from './BrandDropDown';
import formValidator from '../../../Common/CommonFormValidator';

import { SKU_INFORMATION_CHANGE } from './CreateSkuActions';

/*
 * Each form element in this component will have two attributes
 *  1. data-field-type
 *  2. data-field-name
 *  formValidator will take these two attributes to retrieve values and create an object out of it.
 *  It also takes in Action using which the HOC can dispatch to update the Models
 *  */

const returnValue = (obj, key) => {
  return ( obj[key] ? obj[key] : '' );
};
const SkuInfo = ({ brandList, skuReqObj }) => {
  const styles = require('./CreateSku.scss');
  return (
        <div className={styles.create_sku_wrapper}>
          <div className={styles.heading}>Create Sku</div>
          <div className={styles.indiv_element}>
            <label>Brand Name</label>
            <BrandDropDown brandData={ brandList } value={ returnValue(skuReqObj, 'brand_id') }/>
          </div>
          <div className={styles.indiv_element}>
            <label>Volume in ml</label>
            <input type="number" data-field-name="volume" data-field-type="int" value = {parseInt(returnValue(skuReqObj, 'volume'), 10) ? parseInt(returnValue(skuReqObj, 'volume'), 10) : '' } />
          </div>
          {/*
          <div className={styles.indiv_element}>
            <label>Status</label>
            <select data-field-name="status" data-field-type="boolean">
              <option value="1">Active</option>
              <option value="0">InActive</option>
            </select>
          </div>
          */}
        </div>
      );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(SkuInfo, 'data-field-name', 'data-field-type', SKU_INFORMATION_CHANGE);
