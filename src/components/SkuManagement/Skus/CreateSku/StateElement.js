import React from 'react';

const StateElement = ({ stateInfo, stateCityMapping, onStateSelect}) => {
  const styles = require('./CreateSku.scss');
  const stateElement = ( Object.keys(stateInfo).length > 0) ? (
      <div>
        <label className={styles.check_box} data-state-id={stateInfo.id} >
          <input data-state-id={stateInfo.id} type="checkbox" checked={ stateCityMapping.is_selected } onClick={onStateSelect}/> { stateInfo.state_name }
        </label>
        <input type="number" placeholder="MRP"/>
        <input type="number" placeholder="Dutyfree"/>
      </div>
    ) : (
      <div className={styles.indiv_element}>
        Sorry something is wrong
      </div>
    );

  return (
        <div className={styles.indiv_element}>
          { stateElement }
        </div>
      );
};

export default StateElement;
