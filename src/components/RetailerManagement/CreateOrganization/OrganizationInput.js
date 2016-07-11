import React from 'react';
const OrganizationInput = ({labelVal, Val}) => {
  const styles = require('./OrganizationInput.scss');
  return (
    <div className = {styles.constitution_organisation_input_container}>
      <div className = {styles.constitution_organisation_input_left}>
        {labelVal}
      </div>
      <div className = {styles.constitution_organisation_input_right}>
        <input type="text" placeholder = {Val} />
      </div>
    </div>
  );
};
export default OrganizationInput;
