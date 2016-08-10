import React from 'react';
const OrganizationSelect = ({label, defaultValue, fieldType, fieldName, selectOptions}) => {
  const styles = require('./OrganizationSelect.scss');
  const selectObj = selectOptions.map( ( option, index ) => {
    return (
          <option value={ option.value } key={ index }>
            { option.label}
          </option>
        );
  });
  return (
    <div className = {styles.constitution_organisation_input_container}>
      <div className = {styles.constitution_organisation_input_left}>
        {label}
      </div>
      <div className = {styles.constitution_organisation_input_right}>
      <select data-field-name={ fieldName } data-field-type={ fieldType }>
        <option value={ defaultValue }>
          { defaultValue }
        </option>
        { selectObj }
      </select>
      </div>
    </div>
  );
};
export default OrganizationSelect;
