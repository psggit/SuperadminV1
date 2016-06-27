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
const SkuInfo = ({ brandList }) => {
  const styles = require('./CreateSku.scss');
  return (
        <div className={styles.create_sku_wrapper}>
          <div className={styles.heading}>Create Sku</div>
          <div className={styles.indiv_element}>
            <label>Brand Name</label>
            <BrandDropDown brandData={ brandList } />
          </div>
          <div className={styles.indiv_element}>
            <label>Volume in ml</label>
            <input type="number" data-field-name="volume" data-field-type="int"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Alcohol Percentage</label>
            <input type="number" data-field-name="alcohol_per" data-field-type="float"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Temperature</label>
            <input type="text" data-field-name="temperature" data-field-type="string"/>
          </div>
          <div className={styles.indiv_element} >
            <label>Place of Origin</label>
            <input type="text" data-field-name="origin" data-field-type="string"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Test Volume</label>
            <input type="number" data-field-name="test_vol" data-field-type="int"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Barcode</label>
            <input type="text" data-field-name="barcode" />
          </div>
          <div className={styles.indiv_element}>
            <label>Description</label>
            <textarea rows="4" cols="10" data-field-name="description" data-field-type="string"></textarea>
          </div>
          <div className={styles.indiv_element}>
            <label>Status</label>
            <select data-field-name="status" data-field-type="boolean">
              <option value="1">Active</option>
              <option value="0">InActive</option>
            </select>
          </div>
        </div>
      );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(SkuInfo, 'data-field-name', 'data-field-type', SKU_INFORMATION_CHANGE);
