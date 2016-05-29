import React from 'react';

const StateCity = ({ viewedState, cityRetailerMapping, onCityCheck, onCityView}) => {
  const styles = require('./CreateSku.scss');

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
                        <input type="checkbox" data-city-id={city.id} type="checkbox" checked={ cityRetailerMapping[city.id].is_selected } onClick={onCityCheck} />
                        { city.name }
                      </label>
                      <p onClick={ onCityView } data-view-city-id={city.id}>
                        ({ Object.keys(cityRetailerMapping[city.id].selected_retailers).length }) of { city.retailers.length } { city.retailers.length <= 1 ? 'Outlet' : 'Outlets' }
                      </p>
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
        <div className={styles.cities_container}>
          { cityHtml }
        </div>
      );
};

export default StateCity;
