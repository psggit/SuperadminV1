import React from 'react';
import OrganizationInput from './OrganizationInput';
import OrganizationTextarea from './OrganizationTextarea';
import OrganizationSelect from './OrganizationSelect';

import formValidator from '../../Common/CommonFormValidator';

import {
  ORGANIZATION_CONTACT_CHANGED
} from './OrganizationData';

const OrganizationContactDetails = ( { stateData, currState } ) => {
  const styles = require('./OrganizationContactDetails.scss');
  let stateObj = [];
  stateObj = (stateData) ? stateData.states.map( ( state ) => {
    const s = {};
    s.label = state.state_name;
    s.value = state.id;
    return s;
  }) : [];

  const filteredCities = ( stateData && currState.state_id ) ? stateData.cities.filter( ( city ) => {
    return ( city.state_short_name === stateData.stateIdMap[currState.state_id] );
  }) : [];

  let cityObj = [];
  cityObj = (stateData) ? filteredCities.map( ( city ) => {
    const s = {};
    s.label = city.name;
    s.value = city.id;
    return s;
  }) : [];

  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <div className = {styles.constitution_organisation_head}>
        Organisation Contact Details
      </div>
      <OrganizationTextarea labelVal = "Organization Address" fieldName="address" fieldType="text" value={ currState.address } />
      <OrganizationSelect label = "State" defaultValue="Select State" selectOptions = { stateObj } fieldName="state_id" fieldType="int" value={ currState.state_id }/>
      <OrganizationSelect label = "City" defaultValue="Select City" selectOptions = { cityObj } fieldName="city_id" fieldType="int" value={ currState.city_id } />
      <OrganizationInput labelVal = "Pincode" Val = "600018" fieldName="pincode" fieldType="text" value={ currState.pincode }/>
      <OrganizationInput labelVal = "Email" Val = "contact@apesale.com" fieldName="email" fieldType="text" value={ currState.email } />
      <OrganizationInput labelVal = "Mobile Number" Val = "8220645452" fieldName="mobile_number" fieldType="text" value={ currState.mobile_number } />
      <OrganizationInput labelVal = "Landline Number" Val = "8220645452" fieldName="landline_number" fieldType="text" value={ currState.landline_number }/>
    </div>
  );
};

const decoratedOne = formValidator(OrganizationContactDetails, 'data-field-name', 'data-field-type', ORGANIZATION_CONTACT_CHANGED);
export default decoratedOne;
