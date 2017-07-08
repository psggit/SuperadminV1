import React from 'react';
import { Link } from 'react-router';

import formValidator from '../../Common/CommonFormValidator';

import AdImageUpload from './AdUpload';

import {
  AD_IMAGE_UPLOAD_SUCCESS,
  AD_IMAGE_UPLOAD_ERROR,
  AD_CANCEL_IMAGE,
  LISTING_IMAGE_UPLOAD_SUCCESS,
  LISTING_IMAGE_UPLOAD_ERROR,
  LISTING_CANCEL_IMAGE,
  BAR_INPUT_CHANGED
} from './BarData';

const BarDetails = ( { currState, organisationData } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBar.scss');

  const kycSelectObj = [
    {
      'label': 'Verified',
      'value': true
    },
    {
      'label': 'Not Verified',
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
  const barStatusHtml = statusSelectObj.map( ( statusSelect, index ) => {
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
      <div className={styles.heading + ' ' + styles.wd_100}>Bar Details</div>
      <ul>
        <li>
          <div className={styles.wd_50}>
            <label>Select Organisation</label>
            <select data-field-name="organisation_id" data-field-type="int" value={ currState.organisation_id } >
              <option value="0">Select Organisation </option>
              { orgObj }
            </select>
          </div>
          <div className={styles.wd_50}>
            <Link to={'/hadmin/bar/profile/' + currState.id + '/view_notepads'}>
              <button>Make Notes</button>
            </Link>
          </div>
        </li>
        <li>
          <label>Application Number</label>
          <input data-field-name="name" type="text" data-field-name="application_number" data-field-type="text" value={ currState.application_number } />
        </li>
        <li>
          <label>Bar Name</label>
          <input data-field-name="name" type="text" data-field-name="name" data-field-type="text" value={ currState.name } />
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
          <div className={styles.wd_50}>
            <label>KYC Verified</label>
            <select data-field-name="kyc_status" data-field-type="text" value={ currState.kyc_status }>
              <option value="">Select Kyc Status</option>
              { kycHtml }
            </select>
          </div>
          <div className={styles.wd_50}>
            <label>Bar Status</label>
            <select data-field-name="bar_status" data-field-type="text" value={ currState.bar_status }>
              <option value="">Select Bar Status</option>
              { barStatusHtml }
            </select>
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>Discount Percent</label>
            <input type="number" min="0" max="100" data-field-name="discount_percent" data-field-type="float" value={ currState.discount_percent } />
          </div>
          <div className={styles.wd_50}>
            <label>Service Charge Percent</label>
            <input type="number" min="0" max="100" data-field-name="service_charge_percent" data-field-type="float" value={ currState.service_charge_percent } />
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <AdImageUpload name={'Ad Image'} imageUrl={currState.adImage ? currState.adImage : ''} requestSuccess={AD_IMAGE_UPLOAD_SUCCESS} requestError={ AD_IMAGE_UPLOAD_ERROR } cancelImage={ AD_CANCEL_IMAGE }/>
          </div>
          <div className={styles.wd_50}>
            <label>House Rules</label>
            <textarea type="text" data-field-name="house_rules" data-field-type="text" value={ currState.house_rules } />
          </div>
        </li>
        <li>
          <label>Bar Listing Image</label>
          <div className={styles.wd_50}>
            <AdImageUpload name={'Listing Image'} imageUrl={currState.listing_image ? currState.listing_image : ''} requestSuccess={LISTING_IMAGE_UPLOAD_SUCCESS} requestError={ LISTING_IMAGE_UPLOAD_ERROR } cancelImage={ LISTING_CANCEL_IMAGE }/>
          </div>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BarDetails, 'data-field-name', 'data-field-type', BAR_INPUT_CHANGED);

export default decoratedOne;
