import React from 'react';
import {setRegionCities, setViewCities, updateRegionSelection, updateSelectedBrandsList} from './CreateBMActions';

/*
TODO: Cancel, Delete and Create Brand Manager
*/

const brandHtml = (companyBrands) => {
  return companyBrands.map((brand, index) => (
    <option key={index} value={brand.id}>{brand.brand_name}</option>
  ));
};

const onViewCities = (region, dispatch) => {
  dispatch(setViewCities(region));
};

const onRegionCheck = (dispatch, sb, e) => {
  dispatch(updateRegionSelection(parseInt(e.target.value, 10), {...sb}));
};

const regionsHtml = (styles, selectedBrand, dispatch) => {
  console.log('received');
  console.log(selectedBrand);
  return (selectedBrand.regions === undefined ) ? (<li></li>) : selectedBrand.regions.map((region) => (
    <li>
      <label>
        <input type="checkbox" defaultChecked={(region.is_selected === undefined | region.is_selected === false) ? false : true} value={region.id} data-field-name="selected_region_id" onClick={onRegionCheck.bind(this, dispatch, selectedBrand)}/> {region.region_name}
      </label>
      <p className={styles.pointer_click} onClick={onViewCities.bind(this, region, dispatch)}>{region.cities.length} {(region.cities.length > 1) ? 'Cities' : 'City'}</p>
    </li>
  ));
};

const citiesHtml = (region) => {
  return (region.cities === undefined) ? (<li></li>) : region.cities.map((city) => (
      <li>
        <label>{city.city.name}</label>
      </li>
  ));
};

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

const onChangeBrand = (companyBrands, dispatch) => {
  const brandId = parseInt(document.querySelectorAll('[data-field-name="selected_brand_id"] option:checked')[0].value, 10);
  companyBrands.forEach((b) => {
    if (b.id === brandId) {
      dispatch(setRegionCities({...b}));
    }
  });
};

const onSave = (selectedBrand, selectedBrandsList, dispatch) => {
  dispatch(updateSelectedBrandsList({...selectedBrand}, selectedBrandsList));
};

const onUpdate = (selectedBrand, selectedBrandsList, dispatch) => {
  dispatch(updateSelectedBrandsList({...selectedBrand}, selectedBrandsList));
};

const actionHtml = (isExistingBrand, styles, selectedBrand, selectedBrandsList, dispatch) => {
  return (isExistingBrand) ? (
      <div className={styles.user_actions}>
        <button>Delete</button>
        <button onClick={onUpdate.bind(this, selectedBrand, selectedBrandsList, dispatch)}>Update</button>
      </div> ) : (
      <div className={styles.user_actions}>
        <button>Cancel</button>
        <button onClick={onSave.bind(this, selectedBrand, selectedBrandsList, dispatch)}>Save</button>
      </div>
      );
};

const brandOptions = (isExistingBrand, selectedBrand, companyBrands, dispatch) => {
  return (!isExistingBrand) ? (
  <select name="selected_brand_id" data-field-name="selected_brand_id" onChange={onChangeBrand.bind(this, companyBrands, dispatch)}>
    <option disabled selected value > -- Select Brand -- </option>
    { brandHtml(companyBrands) }
  </select>) : (
  <select name="selected_brand_id" data-field-name="selected_brand_id" onChange={onChangeBrand.bind(this, companyBrands, dispatch)}>
    <option value={selectedBrand.id}>{selectedBrand.brand_name}</option>
  </select>);
};

const BrandContainer = ({props}) => {
  const { companyBrands
      , showBrandContainer
      , selectedBrand
      , regionCitiesView
      , isExistingBrand
      , selectedBrandsList
      , dispatch } = props;
  const styles = require('./CreateBrandManager.scss');
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
      { actionHtml(isExistingBrand, styles, selectedBrand, selectedBrandsList, dispatch) }
    </div>
    );
  return (html);
};

export default BrandContainer;
