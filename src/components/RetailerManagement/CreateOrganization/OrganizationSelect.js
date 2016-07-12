import React from 'react';
const OrganizationSelect = ({labelVal, Val}) => {
  const styles = require('./OrganizationSelect.scss');
  return (
    <div className = {styles.constitution_organisation_input_container}>
      <div className = {styles.constitution_organisation_input_left}>
        {labelVal}
      </div>
      <div className = {styles.constitution_organisation_input_right}>
      <select>
        <option value="Select">{Val}</option>
      </select>
      </div>
    </div>
  );
};
export default OrganizationSelect;
