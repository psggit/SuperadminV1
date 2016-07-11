import React from 'react';
const OrganizationCheckbox = ( { labelVal, checkVal}) => {
  const styles = require('./OrganizationCheckbox.scss');
  return (
    <div className = {styles.constitution_organisation_checkbox}>
      <input type="checkbox" id= {checkVal}/>
      <label htmlFor = {checkVal}>{labelVal}</label>
    </div>
  );
};
export default OrganizationCheckbox;
