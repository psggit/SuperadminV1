import React from 'react';

const BrandState = ({ stateCityMapping, onStateView, regionObj, regionCityUpdated, viewedRegionId, updatedRegions}) => {
  const styles = require('./BrandCreate.scss');
  const selectedStates = [];
  const stateIds = Object.keys(stateCityMapping);
  const myRegionObj = (!regionObj) ? {} : regionObj;
  const stateMapping = {};
  let i = 0;
  while ( i < stateIds.length ) {
    if ( stateCityMapping[stateIds[i]].is_selected ) {
      selectedStates.push(stateCityMapping[stateIds[i]]);
    }
    i += 1;
  }

  const citiesSelected = [ ...Object.keys(myRegionObj) ];
  citiesSelected.forEach( (city) => {
    if (myRegionObj[city].state_id in stateMapping) {
      stateMapping[myRegionObj[city].state_id].push(myRegionObj[city].id);
    } else {
      stateMapping[myRegionObj[city].state_id] = [ myRegionObj[city].id ];
    }
  });

  /* Function to append the selected/deselected states while updating */
  () => {
    if ( updatedRegions && updatedRegions[viewedRegionId] && regionCityUpdated[updatedRegions[viewedRegionId]] ) {
      const region = updatedRegions[viewedRegionId];
      Object.keys( regionCityUpdated[region].insertedCities ).forEach( ( city ) => {
        if ( regionCityUpdated[region].insertedCities[city] in stateMapping) {
          stateMapping[ regionCityUpdated[region].insertedCities[city] ].push(city);
        } else {
          stateMapping[ regionCityUpdated[region].insertedCities[city] ] = [ city];
        }
      });
      Object.keys( regionCityUpdated[region].deletedCities ).forEach( ( city ) => {
        const indexCity = stateMapping[ regionCityUpdated[region].deletedCities[city] ].indexOf(parseInt(city, 10));
        if ( indexCity !== -1) {
          stateMapping[ regionCityUpdated[region].deletedCities[city] ].splice(indexCity, 1);
        }
      });
    }
  }();

  /* Now the same HTML is used for editing/Inserting
   * Finding out right number of cities selected based on updation
   * */

  const selectedStatesHtml = selectedStates.map((selectedState, index) => {
    return (
        <li key={index}>
          <label>
            {selectedState.stateInfo.state_name}
          </label>
          <p data-view-state-id={selectedState.stateInfo.id} onClick={ onStateView }>
            ({ stateMapping[selectedState.stateInfo.id] ? stateMapping[selectedState.stateInfo.id].length : 0 }) of {selectedState.stateInfo.cities.length} { selectedState.stateInfo.cities.length <= 1 ? 'City' : 'Cities'}
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
