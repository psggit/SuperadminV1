import React from 'react';
import OrganizationInput from './OrganizationInput';
import OrganizationTextarea from './OrganizationTextarea';
const OrganizationRegisteredDetails = () => {
  const styles = require('./OrganizationRegisteredDetails.scss');
  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <div className = {styles.constitution_organisation_head}>
        Organisation Registered Address
      </div>
      <OrganizationTextarea labelVal = "Organization Address" />
      <OrganizationInput labelVal = "State" Val = "Tamil Nadu"/>
      <OrganizationInput labelVal = "City" Val = "Chennai"/>
      <OrganizationInput labelVal = "Pincode" Val = "600018"/>
    </div>
  );
};
export default OrganizationRegisteredDetails;
