import React from 'react';
const OrganizationInput = ({labelVal, Val, fieldName, fieldType }) => {
  const styles = require('./OrganizationInput.scss');
  return (
    <div className = {styles.constitution_organisation_input_container}>
      <div className = {styles.constitution_organisation_input_left}>
        {labelVal}
      </div>
      <div className = {styles.constitution_organisation_input_right}>
        <input type={ fieldType } placeholder = {Val} data-field-name={ fieldName } data-field-type = { fieldType } />
      </div>
    </div>
  );
};
export default OrganizationInput;
