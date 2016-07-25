import React from 'react';
const CreatedAt = ( { labelname, labelnameval, labeltime, labeltimeval } ) => {
  const styles = require('./CreatedAt.scss');
  return (
    <div className = {styles.makername_container}>
      <div className = {styles.makersname_information}>
        <div className = {styles.makersname_leftpanel}>
          {labelname}
        </div>
        <div className = {styles.makersname_rightpanel}>
          {labelnameval}
        </div>
      </div>
      <div className = {styles.makername_time_information}>
        <div className = {styles.makersname_time_leftpanel}>
          {labeltime}
        </div>
        <div className = {styles.makersname_time_rightpanel}>
          {labeltimeval}
        </div>
      </div>
    </div>
  );
};
export default CreatedAt;
