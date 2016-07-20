import React from 'react';
const MakerName = ( { labelname, labelnameval, labeltime, labeltimeval, maker, makerid } ) => {
  const styles = require('./MakerName.scss');
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
      <div className = {styles.makers_id_container}>
        <div className = {styles.makers_id_name}>
          {maker}
        </div>
        <div className = {styles.makers_id}>
          {makerid}
        </div>
      </div>
    </div>
  );
};
export default MakerName;
