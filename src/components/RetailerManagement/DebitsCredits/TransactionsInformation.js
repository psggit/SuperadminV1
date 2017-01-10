import React from 'react';
const TransactionsInformation = ( { label, currentVal, options, fieldName, fieldType, placeholder } ) => {
  const styles = require('./TransactionsInformation.scss');
  return (
    <div className = {styles.transactions_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = {styles.information_rightpanel}>
        <select value={ currentVal } data-field-name = { fieldName } data-field-type = { fieldType } >
          <option value="Select">{ placeholder }</option>
          { options }
        </select>
      </div>
    </div>
  );
};
export default TransactionsInformation;
