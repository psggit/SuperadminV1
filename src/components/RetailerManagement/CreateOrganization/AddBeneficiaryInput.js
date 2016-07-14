import React from 'react';
const AddBeneficiaryInput = ({labelVal, Val}) => {
  const styles = require('./AddBeneficiaryInput.scss');
  return (
    <div className = {styles.add_beneficiary_input_container}>
      <div className = {styles.add_beneficiary_input_left}>
        {labelVal}
      </div>
      <div className = {styles.add_beneficiary_input_right}>
        <input type="text" placeholder = {Val} />
      </div>
    </div>
  );
};
export default AddBeneficiaryInput;
