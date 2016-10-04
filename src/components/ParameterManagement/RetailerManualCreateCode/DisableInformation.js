import React from 'react';
const DisableInformation = ( { label, val } ) => {
  const styles = require('./DisableInformation.scss');
  return (
    <div className = {styles.disable_details_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = {styles.information_rightpanel}>
        <select>
          <option value="Select">{val}</option>
        </select>
      </div>
    </div>
  );
};
export default DisableInformation;
