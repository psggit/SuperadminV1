import React from 'react';
import {setRegionCities, setViewCities, updateRegionSelection, updateSelectedBrandsList, brandContainerVisibility, setContainerType} from './EditBMActions';

/*
TODO: Cancel, 0Bug, Create Brand Manager
*/


const brandHtml = (companyBrands, selectedBrandsList) => {
  const finalBrands = [];
  if (selectedBrandsList.length < 1) {
    companyBrands.forEach((brand) => {
      finalBrands.push(brand);
    });
  } else {
    companyBrands.forEach((cb) => {
      let inSb = false;
      let isDeleted = false;
      selectedBrandsList.forEach((sb) => {
        if (sb.id === cb.id) {
          inSb = true;
        }
        if (sb.id === cb.id && sb.is_deleted) {
          isDeleted = true;
        }
      });
      if (!inSb) {
        finalBrands.push(cb);
      } else if (isDeleted) {
        finalBrands.push(cb);
      }
    });
  }
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

const onDelete = (selectedBrand, selectedBrandsList, companyBrands, dispatch) => {
  Promise.all([
    dispatch(updateSelectedBrandsList({...selectedBrand}, [...selectedBrandsList], true))
  ]);
};

const onSave = (selectedBrand, selectedBrandsList, companyBrands, dispatch) => {
  Promise.all([
    dispatch(updateSelectedBrandsList({...selectedBrand}, [...selectedBrandsList]))
  ]);
};

const onUpdate = (selectedBrand, selectedBrandsList, dispatch) => {
  dispatch(updateSelectedBrandsList({...selectedBrand}, [...selectedBrandsList]));
};

const onCancel = (dispatch) => {
  Promise.all([
    dispatch(brandContainerVisibility()),
    dispatch(setContainerType(false))
  ]);
};

const actionHtml = (isExistingBrand, styles, selectedBrand, selectedBrandsList, companyBrands, dispatch) => {
  return (isExistingBrand) ? (
      <div className={styles.user_actions}>
        <button onClick={onDelete.bind(this, selectedBrand, selectedBrandsList, companyBrands, dispatch)}>Delete</button>
        <button onClick={onUpdate.bind(this, selectedBrand, selectedBrandsList, dispatch)}>Update</button>
      </div> ) : (
      <div className={styles.user_actions}>
        <button onClick={onCancel.bind(this, dispatch)}>Cancel</button>
        <button onClick={onSave.bind(this, selectedBrand, selectedBrandsList, companyBrands, dispatch)}>Save</button>
      </div>
      );
};


const brandOptions = (isExistingBrand, selectedBrand, companyBrands, selectedBrandsList, dispatch) => {
  return (!isExistingBrand) ? (
  <select name="selected_brand_id" data-field-name="selected_brand_id" onChange={onChangeBrand.bind(this, companyBrands, dispatch)}>
    <option disabled selected value > -- Select Brand -- </option>
    { brandHtml(companyBrands, selectedBrandsList) }
  </select>) : (
  <select name="selected_brand_id" data-field-name="selected_brand_id" onChange={onChangeBrand.bind(this, companyBrands, dispatch)}>
    <option value={selectedBrand.id}>{selectedBrand.brand_name}</option>
  </select>);
};

const BrandContainer = ({props}) => {
  const { companyBrands
      , showBrandContainer
      , selectedBrand
      , selectedBrandsList
      , regionCitiesView
      , isExistingBrand
      , dispatch } = props;
  const styles = require('./EditBrandManager.scss');
  console.log('selected brand');
  console.log(selectedBrand);
  const html = (!showBrandContainer) ? (<div></div>) : (
    <div className={styles.select_brands_container}>
      <div className={styles.heading}>Select Brand</div>
      <div className={styles.wd_100}>
        <label className={styles.region_lab}>Brand name</label>
        {brandOptions(isExistingBrand, selectedBrand, companyBrands, selectedBrandsList, dispatch)}
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
      { actionHtml(isExistingBrand, styles, selectedBrand, selectedBrandsList, companyBrands, dispatch) }
    </div>
    );
  return (html);
};

export default BrandContainer;
