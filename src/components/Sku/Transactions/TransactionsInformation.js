import React from 'react';
const TransactionsInformation = ( { label, val } ) => {
  const styles = require('./TransactionsInformation.scss');
  return (
    <div className = {styles.transactions_information}>
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
export default TransactionsInformation;
