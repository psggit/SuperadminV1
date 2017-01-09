import React from 'react';

// import { Link } from 'react-router';

const CityRetailer = ({ viewedCity, onRetailerCheck, toggleSkuStatus } ) => {
  const styles = require('./CreateSku.scss');

  const getStatus = ( retailerInfo ) => {
    return ( retailerInfo.is_selected && retailerInfo.is_fetched ? 'Active' : 'InActive' );
  };

  const getStatusInfo = ( retailerInfo ) => {
    if ( retailerInfo ) {
      return ('is_fetched' in retailerInfo ? ' ( ' + getStatus(retailerInfo) + ' ) ' : '' );
    }
    return '';
  };

  const getCurrStatus = ( retailerInfo ) => {
    if ( retailerInfo ) {
      return ('is_fetched' in retailerInfo ? retailerInfo.is_selected && retailerInfo.is_fetched : false );
    }
    return false;
  };

  const getToggleInfo = ( retailerInfo ) => {
    if ( retailerInfo ) {
      return ('is_fetched' in retailerInfo ? 'Click to toggle' : '' );
    }
    return '';
  };

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
                        <input type="checkbox" disabled = { viewedCity.selected_retailers[ retailer.id ] ? ( 'is_fetched' in viewedCity.selected_retailers[ retailer.id ] ) : false } data-retailer-id={ retailer.id } type="checkbox" checked = { viewedCity.selected_retailers[ retailer.id ] ? true : false } onChange = { onRetailerCheck }/>
                        { retailer.org_name }
                      </label>
                      <p onClick={ () => { return toggleSkuStatus.call(null, retailer.id, ( getCurrStatus(viewedCity.selected_retailers[retailer.id]) )); } }>
                        { getStatusInfo(viewedCity.selected_retailers[retailer.id]) }
                        { getToggleInfo(viewedCity.selected_retailers[retailer.id]) }
                      </p>
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
