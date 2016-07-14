import React from 'react';
const OrganizationTextarea = ({labelVal}) => {
  const styles = require('./OrganizationTextarea.scss');
  return (
    <div className = {styles.constitution_organisation_textarea_container}>
      <div className = {styles.constitution_organisation_textarea_left}>
        {labelVal}
      </div>
      <div className = {styles.constitution_organisation_textarea_right}>
        <textarea></textarea>
      </div>
    </div>
  );
};
export default OrganizationTextarea;
