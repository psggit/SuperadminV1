import React from 'react';
const DisableInformation = ( { label, val, options, fieldName, fieldType, currVal, disable } ) => {
  const styles = require('./DisableInformation.scss');
  return (
    <div className = {styles.disable_details_information}>
      <div className = {styles.information_leftpanel}>
        {label}
      </div>
      <div className = {styles.information_rightpanel}>
        <select data-field-name={ fieldName } data-field-type={ fieldType } value={ currVal } disabled={ disable }>
          <option value="default">{val}</option>
          { options }
        </select>
      </div>
    </div>
  );
};
export default DisableInformation;
