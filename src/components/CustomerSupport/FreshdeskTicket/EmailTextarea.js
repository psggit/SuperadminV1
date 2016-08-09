import React from 'react';
const EmailTextarea = ({labelVal, Val}) => {
  const styles = require('./EmailTextarea.scss');
  return (
    <div className = {styles.add_beneficiary_textarea_container}>
      <div className = {styles.add_beneficiary_textarea_left}>
        {labelVal}
      </div>
      <div className = {styles.add_beneficiary_textarea_right}>
        <textarea value={Val}></textarea>
      </div>
    </div>
  );
};
export default EmailTextarea;
