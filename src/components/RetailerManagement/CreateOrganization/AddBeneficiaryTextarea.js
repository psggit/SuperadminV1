import React from 'react';
const AddBeneficiaryTextarea = ({labelVal}) => {
  const styles = require('./AddBeneficiaryTextarea.scss');
  return (
    <div className = {styles.add_beneficiary_textarea_container}>
      <div className = {styles.add_beneficiary_textarea_left}>
        {labelVal}
      </div>
      <div className = {styles.add_beneficiary_textarea_right}>
        <textarea></textarea>
      </div>
    </div>
  );
};
export default AddBeneficiaryTextarea;
