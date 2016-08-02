import React from 'react';

const CityRetailer = ({ viewedCity, onRetailerCheck } ) => {
  const styles = require('./CreateSku.scss');

  const retailerHtml = ( Object.keys(viewedCity).length > 0) ?
    () => {
      return (
          viewedCity.retailers.length > 0 ?
          (
            <div>
              <div className={styles.heading}>Retailers in: <span> { viewedCity.cityInfo.name }</span></div>
              <ul>
              {
                viewedCity.retailers.map((retailer, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input type="checkbox" data-retailer-id={retailer.id} type="checkbox" checked = { viewedCity.selected_retailers[retailer.id] ? true : false } onChange = { onRetailerCheck }/>
                        { retailer.org_name }
                      </label>
                    </li>
                  );
                })
              }
              </ul>
            </div>
          ) : (
            <div>
              <div className={styles.heading}>Retailers in: <span> { viewedCity.cityInfo.name}</span></div>
              Sorry no retailers for the selected city available
            </div>
          )
        );
    }() : (
      <div>
        Please select city on the left to view its retailers
      </div>
    );
  return (
        <div className={styles.cities_container}>
          { retailerHtml}
        </div>
      );
};

export default CityRetailer;
