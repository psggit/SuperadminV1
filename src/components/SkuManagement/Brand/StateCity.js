import React from 'react';

const StateCity = ({ viewedState, onCityCheck, viewedRegionId, regionObj, regionCityObjs, updatedRegions }) => {
  const styles = require('./BrandCreate.scss');
  const myRegionObj = (!regionObj) ? {} : regionObj;

  const cityHtml = ( Object.keys(viewedState).length > 0) ?
    () => {
      const dummyRegionObj = (updatedRegions[viewedRegionId]) ? updatedRegions[viewedRegionId] : 0;
      const findNewInserted = (id) => {
        if ( regionCityObjs[dummyRegionObj] ) {
          if ( regionCityObjs[dummyRegionObj].insertedCities ) {
            return ( ( id in regionCityObjs[dummyRegionObj].insertedCities ) ) ? true : false;
          }
          return false;
        }
        return false;
      };
      const findOldDeleted = (id) => {
        if ( regionCityObjs[dummyRegionObj] ) {
          if ( regionCityObjs[dummyRegionObj].deletedCities) {
            return ( ( id in regionCityObjs[dummyRegionObj].deletedCities ) ) ? true : false;
          }
          return false;
        }
        return false;
      };
      return (
          viewedState.cities.length > 0 ?
          (
            <div>
              <div className={styles.heading}>Cities in: <span> { viewedState.stateInfo.state_name }</span></div>
              <ul>
              {
                viewedState.cities.map((city, index) => {
                  const checkedStatus = ( (myRegionObj[city.id] ? true : false ) ^ (findNewInserted(city.id) ^ findOldDeleted(city.id) ) );
                  return (
                    <li key={index}>
                      <label>
                        <input type="checkbox" data-viewed-region={ viewedRegionId } data-city-id={city.id} type="checkbox" checked={ ( checkedStatus ) ? true : false } onChange = {onCityCheck} />
                        { city.name }
                      </label>
                    </li>
                  );
                })
              }
              </ul>
            </div>
          ) : (
            <div>
              <div className={styles.heading}>Cities in: <span> { viewedState.stateInfo.state_name }</span></div>
              Sorry no cities for the selected state available
            </div>
          )
        );
    }() : (
      <div>
        Please select state on the left to view its cities
      </div>
    );
  return (
        <div className={styles.cities_in_container}>
          { cityHtml }
        </div>
      );
};

export default StateCity;
