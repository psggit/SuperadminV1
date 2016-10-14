import React from 'react';

import formValidator from '../../Common/CommonFormValidator';

import {
  BRANCH_CONTACT_CHANGED
} from './BranchData';

const BranchContectDetails = ( { stateData, currState } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  let stateObj = [];

  stateObj = (stateData) ? stateData.states.map( ( state, index ) => {
    return (
      <option key={ index } value={ state.id }> { state.state_name } </option>
    );
  }) : [];

  const filteredCities = ( stateData && currState.state_id ) ? stateData.cities.filter( ( city ) => {
    return ( city.state_short_name === stateData.stateIdMap[currState.state_id] );
  }) : [];

  let cityObj = [];
  cityObj = (stateData) ? filteredCities.map( ( city, index ) => {
    return (
      <option key={ index } value={ city.id }> { city.name } </option>
    );
  }) : [];

  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <ul>
        <li>
          <div className={styles.heading}>Branch Contact Details</div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>Branch Address</label>
            <textarea data-field-name="branch_address" data-field-type="text" rows="4" cols="10" value={ currState.branch_address }></textarea>
          </div>
          <div className={styles.wd_50}>
            <label>State</label>
            <select data-field-name="state_id" data-field-type="int" value={ currState.state_id } >
              <option value="0">Select State</option>
              { stateObj }
            </select>
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>Pincode</label>
            <input type="number" data-field-name="pincode" data-field-type="text" value={ currState.pincode } />
          </div>
          <div className={styles.wd_50}>
            <label>City</label>
            <select data-field-name="city_id" data-field-type="int" value={ currState.city_id }>
              <option value="0">Select City</option>
              { cityObj }
            </select>
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>Mobile Number</label>
            <input type="number" data-field-name="mobile_number" data-field-type="text" />
          </div>
          <div className={styles.wd_50}>
            <label>Email</label>
            <input type="text" data-field-name="email" data-field-type="text"/>
          </div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <label>Gps Coordinates</label>
            <input type="text" data-field-name="gps_cordinates" data-field-type="text"/>
          </div>
          <div className={styles.wd_50}>
            <label>Landline Number</label>
            <input type="text" data-field-name="landline_number" data-field-type="text"/>
          </div>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BranchContectDetails, 'data-field-name', 'data-field-type', BRANCH_CONTACT_CHANGED);

export default decoratedOne;
