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
const SkuInfo = ({ brandList, showConsumer, toggleConsumerInfo, skuReqObj, disableSKUs, reservedItems, page }) => {
  const styles = require('./CreateSku.scss');
  const customerInfo = reservedItems.map((indiv, index) => {
    return (
      <div>
        -------------------------------------------
        <div>
        {index + 1})<span className={styles.label}> ID: </span>{indiv.consumer_id}
        </div>
        <div>
        <span className={styles.label}> Name: </span>{indiv.name}
        </div>
        <div>
        <span className={styles.label}> Email: </span>{indiv.email}
        </div>
        <div>
        <span className={styles.label}> Mobile: </span>{indiv.mobile_number}
        </div>
        <div>
        <span className={styles.label}> Price: </span>{indiv.price}
        </div>
      </div>
    );
  });
  return (
        <div className={styles.create_sku_wrapper}>
          <div className={ ( page === 'edit_page' ) ? styles.indiv_element : 'hide' }>Edit Sku</div>
          <div className={ ( page !== 'edit_page' ) ? styles.indiv_element : 'hide' }>Create Sku</div>
          <div className={styles.indiv_element}>
            <label>Brand Name</label>
            <BrandDropDown page={ page } brandData={ brandList } value={ returnValue(skuReqObj, 'brand_id') }/>
          </div>
          <div className={styles.indiv_element}>
            <label>Volume in ml</label>
            <input type="number" data-field-name="volume" data-field-type="int" disabled ={ ( page === 'edit_page' ) ? true : false } data-field-value = {parseInt(returnValue(skuReqObj, 'volume'), 10) ? parseInt(returnValue(skuReqObj, 'volume'), 10) : '' } value = {parseInt(returnValue(skuReqObj, 'volume'), 10) ? parseInt(returnValue(skuReqObj, 'volume'), 10) : '' } />
          </div>
          <div className={styles.indiv_element}>
            <label>Status</label>
            <div className={ styles.status_div }>
              <select data-field-name="is_active" data-field-type="boolean" value={ skuReqObj.is_active ? '1' : '0' } >
                <option value="1">Active</option>
                <option value="0">InActive</option>
              </select>
              <button className={ !skuReqObj.is_active && !skuReqObj.status && ( page === 'edit_page' ) ? '' : 'hide' } onClick={ disableSKUs }>Disable</button>
            </div>
            <div onClick={toggleConsumerInfo} className={ styles.warning_block + ' ' + ((( page === 'edit_page' ) && (showConsumer === false)) ? '' : 'hide' ) }>
              * Open Reservations: { reservedItems ? reservedItems.length + ' (Show Consumers)' : 0 }
            </div>
            <div onClick={toggleConsumerInfo} className={ styles.warning_block + ' ' + ((( page === 'edit_page' ) && (showConsumer === true)) ? '' : 'hide' ) }>
              * Open Reservations: { reservedItems ? reservedItems.length + ' (Close)' : 0 }
            </div>
            <div className={ styles.warning_block + ' ' + ( !skuReqObj.is_active && !skuReqObj.status && ( page === 'edit_page' ) ? '' : 'hide' ) }>
              * Click on Disable button to cancel { reservedItems ? reservedItems.length : 0 } open reservations
            </div>
            <div className={ styles.warning_block + ' ' + ( !skuReqObj.is_active && skuReqObj.status && ( page === 'edit_page' ) ? '' : ' hide ' ) }>
              * Click on Update to Deactivate an SKU
            </div>
          </div>
          <div className={(showConsumer) ? '' : 'hide'}>
          {customerInfo}
          </div>
        </div>
      );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(SkuInfo, 'data-field-name', 'data-field-type', SKU_INFORMATION_CHANGE);
