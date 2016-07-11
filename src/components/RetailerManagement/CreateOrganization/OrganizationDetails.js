import React from 'react';
import OrganizationCheckbox from './OrganizationCheckbox';
import OrganizationInput from './OrganizationInput';
const OrganizationDetails = () => {
  const styles = require('./OrganizationDetails.scss');
  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <div className = {styles.constitution_organisation_head}>
        Constitution Or Type Of Organisation
      </div>
      <OrganizationCheckbox labelVal = "Proprietorship" checkVal = "proprietorship"/>
      <OrganizationCheckbox labelVal = "Partnership" checkVal = "partnership"/>
      <OrganizationCheckbox labelVal = "Pvt Ltd" checkVal = "pvtltd"/>
      <OrganizationCheckbox labelVal = "Public Ltd" checkVal = "publicltd"/>
      <OrganizationCheckbox labelVal = "Public Sector" checkVal = "publicsector"/>
      <OrganizationCheckbox labelVal = "Government" checkVal = "government"/>
      <OrganizationCheckbox labelVal = "Clubs" checkVal = "clubs"/>
      <OrganizationCheckbox labelVal = "HUF" checkVal = "huf"/>
      <OrganizationInput labelVal = "Organization Name" Val = "Ape's Ale"/>
      <OrganizationInput labelVal = "Date of Incorporation" Val = "34528752484"/>
      <OrganizationInput labelVal = "PAN Number" Val = "F128ABC37"/>
      <OrganizationInput labelVal = "TIN Number" Val = "102016"/>
      <OrganizationInput labelVal = "Annual Turnover" Val = "74902834"/>
      <OrganizationInput labelVal = "TAN Number" Val = "102016"/>
    </div>
  );
};
export default OrganizationDetails;
