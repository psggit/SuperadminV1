import React from 'react';

const StateCity = ({ viewedState, onCityCheck}) => {
  const styles = require('./BrandCreate.scss');

  const cityHtml = ( Object.keys(viewedState).length > 0) ?
    () => {
      return (
          viewedState.cities.length > 0 ?
          (
            <div>
              <div className={styles.heading}>Cities in: <span> { viewedState.stateInfo.state_name }</span></div>
              <ul>
              {
                viewedState.cities.map((city, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input type="checkbox" data-city-id={city.id} type="checkbox" checked={ viewedState.selected_cities[city.id] ? true : false } onClick={onCityCheck} />
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
