import React from 'react';
import OrganizationInput from './OrganizationInput';
import OrganizationTextarea from './OrganizationTextarea';
import OrganizationSelect from './OrganizationSelect';
const OrganizationContactDetails = () => {
  const styles = require('./OrganizationContactDetails.scss');
  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <div className = {styles.constitution_organisation_head}>
        Organisation Contact Details
      </div>
      <OrganizationTextarea labelVal = "Organization Address" />
      <OrganizationInput labelVal = "State" Val = "Tamil Nadu"/>
      <OrganizationInput labelVal = "City" Val = "Chennai"/>
      <OrganizationInput labelVal = "Pincode" Val = "600018"/>
      <OrganizationInput labelVal = "Email" Val = "contact@apesale.com"/>
      <OrganizationInput labelVal = "Mobile Number" Val = "8220645452"/>
      <OrganizationInput labelVal = "Mobile Number" Val = "0441234567"/>
      <OrganizationSelect labelVal = "KYC Verified" Val = "True" />
      <OrganizationSelect labelVal = "Status" Val = "Active" />
    </div>
  );
};
export default OrganizationContactDetails;
