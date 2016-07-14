import React from 'react';
const SettlementInformation = ( { label, val, isactive } ) => {
  const styles = require('./SettlementInformation.scss');
  return (
    <div className = {styles.settlement_details_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = {(isactive === 'true') ? styles.information_right_color : styles.information_rightpanel}>
        {val}
      </div>
    </div>
  );
};
export default SettlementInformation;
