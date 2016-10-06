import React from 'react';

import StateElement from './StateElement';

const StatesWrapper = ( { stateData, stateCityMapping, onStateSelect, onStatePriceEntered} ) => {
  const styles = require('./CreateSku.scss');
  const stateOptions = (stateData.length > 0) ? stateData.map( (state, index) => {
    return (
            <StateElement key={ index } stateInfo={ state } onStateSelect={onStateSelect} stateCityMapping={ stateCityMapping[ state.short_name ] } onStatePriceEntered={ onStatePriceEntered }/>
      );
  }) : () => {
    return ( <div > No State </div> );
  };
  return (
        <div className={styles.available_states_wrapper} >
          <div className={styles.heading}>Select Available states</div>
          <div className={styles.states_list}>
            { stateOptions}
          </div>
        </div>
      );
};

export default StatesWrapper;
