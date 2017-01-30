import React from 'react';
const AddBeneficiaryTextarea = ({labelVal, fieldName, fieldType, value}) => {
  const styles = require('./AddBeneficiaryTextarea.scss');
  return (
    <div className = {styles.add_beneficiary_textarea_container}>
      <div className = {styles.add_beneficiary_textarea_left}>
        {labelVal}
      </div>
      <div className = {styles.add_beneficiary_textarea_right}>
        <textarea data-field-name={ fieldName } data-field-type={ fieldType } data-field-value={ value } value={ value } ></textarea>
      </div>
    </div>
  );
};
export default AddBeneficiaryTextarea;
