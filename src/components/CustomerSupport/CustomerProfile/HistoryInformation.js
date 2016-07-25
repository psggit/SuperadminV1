import React from 'react';
const HistoryInformation = ( { label, val } ) => {
  const styles = require('./HistoryInformation.scss');
  return (
    <div className = {styles.history_information}>
      <div className = {styles.history_leftpanel}>
        {label}
      </div>
      <div className = {styles.history_rightpanel}>
        {val}
      </div>
    </div>
  );
};
export default HistoryInformation;
