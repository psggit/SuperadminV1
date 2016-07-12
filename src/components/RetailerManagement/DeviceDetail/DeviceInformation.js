import React from 'react';
const DeviceInformation = ( { label, val, isactive } ) => {
  const styles = require('./DeviceInformation.scss');
  return (
    <div className = {styles.device_details_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = {(isactive === 'true') ? styles.information_right_color : styles.information_rightpanel}>
        {val}
      </div>
    </div>
  );
};
export default DeviceInformation;
