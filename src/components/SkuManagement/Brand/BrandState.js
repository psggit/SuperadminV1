import React from 'react';

const BrandState = ({ stateCityMapping, onStateView}) => {
  const styles = require('./BrandCreate.scss');
  const selectedStates = [];
  const stateIds = Object.keys(stateCityMapping);
  let i = 0;
  while ( i < stateIds.length ) {
    if ( stateCityMapping[stateIds[i]].is_selected ) {
      selectedStates.push(stateCityMapping[stateIds[i]]);
    }
    i += 1;
  }
  const selectedStatesHtml = selectedStates.map((selectedState, index) => {
    return (
        <li key={index}>
          <label>
            {selectedState.stateInfo.state_name}
          </label>
          <p data-view-state-id={selectedState.stateInfo.id} onClick={ onStateView }>
            ({ Object.keys(selectedState.selected_cities).length }) of {selectedState.stateInfo.cities.length} { selectedState.stateInfo.cities.length <= 1 ? 'City' : 'Cities'}
          </p>
        </li>
      );
  });
  const finalHtml = selectedStates.length > 0 ? (
        <ul>
          { selectedStatesHtml }
        </ul>
      ) : (
        <div className={ styles.empty_states }>
          Please select states to choose retailers
        </div>
      );
  return (
        <div className={styles.available_states_container}>
          <div className={styles.heading}>
              <label>Available states</label>
              <p>{ selectedStates.length } Items</p>
          </div>
          { finalHtml }
        </div>
      );
};

export default BrandState;
