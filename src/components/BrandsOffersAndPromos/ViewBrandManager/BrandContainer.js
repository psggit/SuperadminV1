import React from 'react';
import {setViewCities} from './ViewBMActions';

/*
TODO: Cancel, 0Bug, Create Brand Manager
*/

// Remains same ?? no drop down
const brandHtml = (companyBrands) => {
  return companyBrands.map((brand, index) => (
    <option key={index} value={brand.id}>{brand.brand_name}</option>
  ));
};

// Remains same
const onViewCities = (region, dispatch) => {
  dispatch(setViewCities(region));
};

// Remains same. no actions though....
const regionsHtml = (styles, selectedBrand, dispatch) => {
  console.log('received');
  console.log(selectedBrand);
  return (selectedBrand.regions === undefined ) ? (<li></li>) : selectedBrand.regions.map((region) => (
    <li>
      <label>
        <input type="checkbox" checked={(region.is_selected === undefined | region.is_selected === false) ? false : true} value={region.id} data-field-name="selected_region_id" /> {region.region_name}
      </label>
      <p className={styles.pointer_click} onClick={onViewCities.bind(this, region, dispatch)}>{region.cities.length} {(region.cities.length > 1) ? 'Cities' : 'City'}</p>
    </li>
  ));
};

// WTF??
const citiesHtml = (region) => {
  return (region.cities === undefined) ? (<li></li>) : region.cities.map((city) => (
      <li>
        <label>{city.city.name}</label>
      </li>
  ));
};
// Remains same
const citiesContainer = (region, styles) => {
  return (region.region_name === undefined) ? ('') : (
  <div className={styles.cities_in_container}>
    <div className={styles.heading}>
      Cities in: <span className={styles.state}>{region.region_name}</span>
    </div>
    <ul>
      {citiesHtml(region)}
    </ul>
  </div>
  );
};
// Careful here.. Consider Edit..!!
const brandOptions = (isExistingBrand, selectedBrand, companyBrands) => {
  return (!isExistingBrand) ? (
  <select name="selected_brand_id" data-field-name="selected_brand_id" >
    <option disabled selected value > -- Select Brand -- </option>
    { brandHtml(companyBrands) }
  </select>) : (
  <select name="selected_brand_id" data-field-name="selected_brand_id" >
    <option value={selectedBrand.id}>{selectedBrand.brand_name}</option>
  </select>);
};
// Figure out!!
const BrandContainer = ({props}) => {
  const { companyBrands
      , showBrandContainer
      , selectedBrand
      , regionCitiesView
      , isExistingBrand
      , dispatch } = props;
  const styles = require('./ViewBrandManager.scss');
  console.log('selected brand');
  console.log(selectedBrand);
  const html = (!showBrandContainer) ? (<div></div>) : (
    <div className={styles.select_brands_container}>
      <div className={styles.heading}>Select Brand</div>
      <div className={styles.wd_100}>
        <label className={styles.region_lab}>Brand name</label>
        {brandOptions(isExistingBrand, selectedBrand, companyBrands, dispatch)}
      </div>
      <div className={styles.wd_100 + ' ' + styles.select_city}>
        <label className={styles.cites_lab}>
          SELECT REGIONS
          <span className={styles.selected}>1 Selected</span>
        </label>
      </div>
      <div className={styles.available_states_container}>
        <div className={styles.heading}>
            <label>Available regions</label>
        </div>
        <ul>
          { regionsHtml(styles, selectedBrand, dispatch)}
        </ul>
      </div>
      {citiesContainer(regionCitiesView, styles)}
      <div className="clearfix"></div>
    </div>
    );
  return (html);
};

export default BrandContainer;
