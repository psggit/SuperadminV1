import React from 'react';
const OrganizationTextarea = ({labelVal, fieldName, fieldType, value}) => {
  const styles = require('./OrganizationTextarea.scss');
  return (
    <div className = {styles.constitution_organisation_textarea_container}>
      <div className = {styles.constitution_organisation_textarea_left}>
        {labelVal}
      </div>
      <div className = {styles.constitution_organisation_textarea_right}>
        <textarea data-field-name={ fieldName } data-field-type={ fieldType } data-field-value={ value } value={ value } ></textarea>
      </div>
    </div>
  );
};
export default OrganizationTextarea;
