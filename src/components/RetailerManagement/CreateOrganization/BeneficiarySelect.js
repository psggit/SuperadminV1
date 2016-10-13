import React from 'react';

const BeneficiarySelect = ({label, defaultValue, fieldType, fieldName, selectOptions, value}) => {
  const styles = require('./BeneficiarySelect.scss');
  const selectObj = selectOptions.map( ( option, index ) => {
    return (
          <option value={ option.value } key={ index }>
            { option.label}
          </option>
        );
  });
  return (
    <div className = {styles.add_beneficiary_select_container }>
      <div className = {styles.add_beneficiary_select_label}>
        {label}
      </div>
      <div className = {styles.add_beneficiary_select_box_wrapper }>
      <select data-field-name={ fieldName } data-field-type={ fieldType } value={ value }>
        <option value={ defaultValue }>
          { defaultValue }
        </option>
        { selectObj }
      </select>
      </div>
    </div>
  );
};
export default BeneficiarySelect;
