import React from 'react';
const EmailTextarea = ({labelVal}) => {
  const styles = require('./EmailTextarea.scss');
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
export default EmailTextarea;
