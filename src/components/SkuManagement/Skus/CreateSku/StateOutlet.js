import React from 'react';

const StateOutlet = ({ stateCityMapping, onStateView}) => {
  const styles = require('./CreateSku.scss');
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
          <p>
            <span data-view-state-id={selectedState.stateInfo.short_name } onClick={ onStateView }>
              ({ Object.keys(selectedState.selected_cities).length }) of {selectedState.stateInfo.cities.length} { selectedState.stateInfo.cities.length <= 1 ? 'City' : 'Cities'}
            </span>
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
        <div className={styles.states_container}>
          <div className={styles.heading}>Available states</div>
          { finalHtml }
        </div>
      );
};

export default StateOutlet;
