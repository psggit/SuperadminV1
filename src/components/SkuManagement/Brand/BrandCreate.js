import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenre,
  fetchCategory,
  fetchCompany,
  insertBrand,
  fetchState,
  viewState,
  TOGGLE_REGION_VISIBILITY,
  REGION_INPUT_CHANGED,
  MARK_CITY_SELECTED,
  UNMARK_CITY_SELECTED,
  SAVE_TO_LOCAL,
  VIEW_REGION,
  DELETE_REGION,
  INPUT_VALUE_CHANGED
} from './BrandAction.js';

// import TableHeader from '../../Common/TableHeader';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import BrandState from './BrandState';
import StateCity from './StateCity';

class BrandCreate extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Manage Brand',
      sequence: 2,
      link: '/hadmin/brand_management'
    });
    this.breadCrumbs.push({
      title: 'Create Brand',
      sequence: 3,
      link: '#'
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchCompany()),
      this.props.dispatch(fetchCategory()),
      this.props.dispatch(fetchGenre()),
      this.props.dispatch(fetchState())
    ]);
  }
  onClickCreateBrand() {
    /*
    const brandObj = {};
    const companyId = document.querySelectorAll('[data-field-name="company_id"] option:checked')[0].value;
    const categoryId = document.querySelectorAll('[data-field-name="category_id"] option:checked')[0].value;
    const genreId = document.querySelectorAll('[data-field-name="genre_id"] option:checked')[0].value;
    const brandName = document.querySelectorAll('[data-field-name="brand_name"]')[0].value;

    brandObj.created_at = new Date().toISOString();
    brandObj.updated_at = new Date().toISOString();
    brandObj.company_id = parseInt(companyId, 10);
    brandObj.category_id = parseInt(categoryId, 10);
    brandObj.genre_id = parseInt(genreId, 10);
    brandObj.brand_name = brandName;
    */

    /* Inserting brand */
    this.props.dispatch(insertBrand());
  }
  onStateView(e) {
    const element = (e.target.tagName !== 'P') ? e.target.parentNode : e.target;
    const stateId = element.getAttribute('data-view-state-id');
    this.props.dispatch( viewState(parseInt(stateId, 10)));
    console.log(stateId);
  }
  onCityCheck(e) {
    const cityId = parseInt(e.target.getAttribute('data-city-id'), 10);
    const regionId = parseInt(e.target.getAttribute('data-viewed-region'), 10);
    this.props.dispatch(( e.target.checked ) ? { type: MARK_CITY_SELECTED, data: { cityId: cityId, regionId: regionId }} : { type: UNMARK_CITY_SELECTED, data: { cityId: cityId, regionId: regionId}});
  }
  onRegionInput(e) {
    e.preventDefault();
    const regionId = parseInt(e.target.getAttribute('data-current-region'), 10);
    this.props.dispatch( { type: REGION_INPUT_CHANGED, data: { id: regionId, value: e.target.value }});
  }
  toggleRegion(e) {
    /* Create a new Region data structure */
    const regionId = parseInt(e.target.getAttribute('data-current-region'), 10);
    this.props.dispatch({ type: TOGGLE_REGION_VISIBILITY, data: { id: regionId }});
  }
  deleteRegion(e) {
    /* Create a new Region data structure */
    const regionId = parseInt(e.target.getAttribute('data-current-region'), 10);
    this.props.dispatch({ type: DELETE_REGION, data: { id: regionId }});
  }
  saveToLocal(e) {
    const regionId = parseInt(e.target.getAttribute('data-current-region'), 10);
    this.props.dispatch({ type: SAVE_TO_LOCAL, data: { id: regionId }});
  }
  viewRegion(e) {
    const element = e.target.tagName === 'P' ? e.target : e.target.parentNode;
    const regionId = parseInt(element.getAttribute('data-region-id'), 10);
    this.props.dispatch({ type: VIEW_REGION, data: parseInt(regionId, 10) });
  }
  render() {
    const styles = require('./BrandCreate.scss');

    const { ongoingRequest,
      genreList,
      categoryList,
      companyList,
      stateCityMapping,
      viewedState,
      showRegionState,
      viewedRegionId,
      regionCity,
      region,
      isEdit,
      brandName,
      companyId,
      genreId,
      categoryId
    } = this.props;

    let regionHtml = Object.keys(region).map( (reg, index) => {
      return (
            <li key={ index }>
              <label>{ region[reg] } </label>
              <p data-region-id={ reg } onClick={ this.viewRegion.bind(this) }>{ (regionCity[reg]) ? Object.keys(regionCity[reg]).length : 0 } Cities</p>
            </li>
          );
    });

    regionHtml = ( regionHtml.length > 0) ? regionHtml : '';

    const genreHtml = genreList.map((genre, index) => {
      return (
          <option key={index} value={genre.id}>{genre.genre_name}</option>
        );
    });

    const filteredCategoryList = categoryList.filter( (category) => {
      return (genreId ) ? ( category.genre_id === genreId ) : true;
    });
    const categoryHtml = filteredCategoryList.map((category, index) => {
      return (
          <option key={index} value={category.id}>{category.name}</option>
        );
    });

    const companyHtml = companyList.map((company, index) => {
      return (
          <option key={index} value={company.id}>{company.name}</option>
        );
    });
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.create_brand_container}>
          <div className={styles.heading + ' ' + styles.wd_100}>Create Brand</div>
            <ul>
              <li>
                <label>Brand Name</label>
                <input data-field-name="brandName" type="text" data-field-type="text" value={ brandName } />
              </li>
              <li>
                <label>Company Name</label>
                <select data-field-name="companyId" data-field-type="int" value={ companyId }>
                  <option>Select Company</option>
                  { companyHtml }
                </select>
              </li>
              <li>
                <label>Genre</label>
                <select data-field-name="genreId" data-field-type="int" value={ genreId }>
                  <option>Select Genre</option>
                  { genreHtml }
                </select>
              </li>
              <li>
                <label>Category</label>
                <select data-field-name="categoryId" data-field-type="int" value={ categoryId } >
                  <option>Select Category</option>
                  { categoryHtml }
                </select>
              </li>
              {/*
              <li>
                <label>Brand Manager</label>
                <input type="email" />
              </li>
              */}
              {/*
              <li>
                <label>Status</label>
                <select data-field-name="status">
                  <option>Select Status</option>
                  <option data-field-name="status" data-field-value="active">Active</option>
                  <option data-field-name="status" data-field-value="inactive">InActive</option>
                </select>
              </li>
              */}
            </ul>
        </div>
        {/*
        <div className={styles.states_container}>
          <div className={styles.heading + ' ' + styles.wd_100}>
            Select Available States
          </div>
          <ul>
            <li>
                <label>
                  <input type="checkbox"/>Jharkhand
                </label>
            </li>
            <li>
                <label>
                  <input type="checkbox"/>Jharkhand
                </label>
            </li>
            <li>
                <label>
                  <input type="checkbox"/>Jharkhand
                </label>
            </li>
          </ul>
        </div>
        */}
        <div className="clearfix"></div>
        <div className={styles.region_wrapper }>
          <div className={styles.regions_container}>
            <div className={styles.heading}>Regions</div>
            <div className={styles.add_lab} onClick = { this.toggleRegion.bind(this) } data-current-region= { viewedRegionId } disabled={ (isEdit ) ? 'disabled' : ''}>+ Add New</div>
            <ul>
              { regionHtml }
            {/*
              <li>
                <label>South</label>
                <p>3 Cities</p>
              </li>
            */}
            </ul>
          </div>
          <div className={styles.add_regions_container + ' ' + ( showRegionState ? '' : 'hide' )}>
            <div className={styles.heading}>Add new Regions</div>
            <div className={styles.wd_100}>
              <label className={styles.region_lab}>Region name</label>
              <input type="text" onChange={ this.onRegionInput.bind(this) } data-current-region = { viewedRegionId } value = { region[viewedRegionId] } />
            </div>
            <div className={styles.wd_100 + ' ' + styles.select_city}>
              <label className={styles.cites_lab}>
                SELECT CITIES
                <span className={styles.selected}>1 Selected</span>
              </label>
            </div>
            {/*
            <StateOutlet stateCityMapping={ stateCityMapping } onStateView = { this.onStateView.bind(this) } />
            */}
            { console.log( viewedRegionId) }
            <BrandState stateCityMapping={ stateCityMapping } onStateView = { this.onStateView.bind(this) } regionObj={ regionCity[viewedRegionId] } />
            <StateCity viewedState = { viewedState } onCityCheck = { this.onCityCheck.bind(this) } viewedRegionId={ viewedRegionId } regionObj={ regionCity[viewedRegionId] }/>
            {/*
            <div className={styles.available_states_container}>
              <div className={styles.heading}>
                  <label>Available states</label>
                  <p>20 Items</p>
              </div>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
            */}
            {/*
            <div className={styles.cities_in_container}>
              <div className={styles.heading}>
                Cities in: <span className={styles.state}>Tamil Nadu</span>
              </div>
              <ul>
                <li>
                  <label>
                    <input type="checkbox"/> Tamil nadu
                  </label>
                </li>
              </ul>
            </div>
            */}
            <div className="clearfix"></div>
            { (!isEdit) ?
              (
                <div className={styles.user_actions}>
                  <button data-current-region={ viewedRegionId } onClick={ this.deleteRegion.bind(this) } >Cancel</button>
                  <button data-current-region={ viewedRegionId } onClick={ this.saveToLocal.bind(this) } >Save</button>
                </div>
              )
            :
              (
                <div className={styles.user_actions}>
                  <button data-current-region={ viewedRegionId } onClick={ this.deleteRegion.bind(this) } >Delete</button>
                  <button data-current-region={ viewedRegionId } onClick={ this.saveToLocal.bind(this) } >Update</button>
                </div>
              )
            }
          </div>
        </div>
        <div className="clearfix"></div>
        <button className={styles.edit_brand_btn} disabled={ ongoingRequest ? true : false} onClick={this.onClickCreateBrand.bind(this)}>
          Create Brand
        </button>
      </div>);
  }
}

BrandCreate.propTypes = {
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  genreList: PropTypes.array.isRequired,
  companyList: PropTypes.array.isRequired,
  stateCityMapping: PropTypes.object.isRequired,
  viewedState: PropTypes.object.isRequired,
  showRegionState: PropTypes.bool.isRequired,
  viewedRegionId: PropTypes.number.isRequired,
  region: PropTypes.object.isRequired,
  regionCity: PropTypes.object.isRequired,
  regionCityUpdated: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  brandName: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
  genreId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.brand_data};
};

const decoratedOne = formValidator(BrandCreate, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);
const decoratedConnectedComponent = commonDecorator(decoratedOne);
export default connect(mapStateToProps)(decoratedConnectedComponent);
