import React from 'react';
const SettlementInformation = ( { label, val, benId, loadBeneficiary } ) => {
  const styles = require('./SettlementInformation.scss');
  return (
    <div className = {styles.settlement_details_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = { styles.information_right_color } data-ben-id={ benId } onClick={ ( e ) => { loadBeneficiary.call(undefined, e.target.getAttribute('data-ben-id')); }} >
        {val}
      </div>
    </div>
  );
};
export default SettlementInformation;
