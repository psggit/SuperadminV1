import React from 'react';
import OrganizationInput from './OrganizationInput';

import OrganizationSelect from './OrganizationSelect';

import OrganizationTextarea from './OrganizationTextarea';

import formValidator from '../../Common/CommonFormValidator';

import {
  ORGANIZATION_REGISTERED_CHANGED
} from './OrganizationData';

const OrganizationRegisteredDetails = ( { stateData, currState } ) => {
  const styles = require('./OrganizationRegisteredDetails.scss');
  let stateObj = [];

  stateObj = (stateData) ? stateData.states.map( ( state ) => {
    const s = {};
    s.label = state.state_name;
    s.value = state.id;
    return s;
  }) : [];

  const filteredCities = ( stateData && currState.state ) ? stateData.cities.filter( ( city ) => {
    return ( city.state_short_name === stateData.stateIdMap[currState.state] );
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
        Organisation Registered Address
      </div>
      <OrganizationTextarea labelVal = "Organization Address" fieldName="orgAddress" fieldType="text" />
      <OrganizationSelect label = "State" defaultValue="Select State" selectOptions = { stateObj } fieldName="state" fieldType="int" />
      <OrganizationSelect label = "City" defaultValue="Select City" selectOptions = { cityObj } fieldName="city" fieldType="int" />
      <OrganizationInput labelVal = "Pincode" Val = "600018" fieldName="pinCode" fieldType="int"/>
    </div>
  );
};

const decoratedOne = formValidator(OrganizationRegisteredDetails, 'data-field-name', 'data-field-type', ORGANIZATION_REGISTERED_CHANGED );
export default decoratedOne;
