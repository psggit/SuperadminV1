import React from 'react';
import OrganizationInput from './OrganizationInput';
import OrganizationTextarea from './OrganizationTextarea';
import OrganizationSelect from './OrganizationSelect';
const OrganizationContactDetails = () => {
  const styles = require('./OrganizationContactDetails.scss');
  const kycSelectObj = [
    {
      'label': 'True',
      'value': true
    },
    {
      'label': 'False',
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
      <OrganizationSelect label = "KYC Verified" defaultValue="Select KYC Status" selectOptions={ kycSelectObj } fieldName="kyc_status" fieldType="bool" />
      <OrganizationSelect label = "Status" defaultValue="Select Status" selectOptions={ statusSelectObj } fieldName="organization_status" fieldType="bool" />
    </div>
  );
};
export default OrganizationContactDetails;
