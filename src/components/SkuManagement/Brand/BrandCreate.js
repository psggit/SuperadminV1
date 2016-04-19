import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenre, fetchCategory, fetchCompany, insertBrand } from './BrandAction.js';

// import TableHeader from '../../Common/TableHeader';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

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
      this.props.dispatch(fetchGenre())
    ]);
  }
  onClickCreateBrand() {
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

    /* Inserting brand */
    this.props.dispatch(insertBrand(brandObj));
  }
  render() {
    const styles = require('./BrandCreate.scss');

    const { ongoingRequest, genreList, categoryList, companyList } = this.props;

    const genreHtml = genreList.map((genre, index) => {
      return (
          <option key={index} value={genre.id}>{genre.genre_name}</option>
        );
    });

    const categoryHtml = categoryList.map((category, index) => {
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
                <input data-field-name="brand_name" type="text" />
              </li>
              <li>
                <label>Company Name</label>
                <select data-field-name="company_id">
                  <option>Select Company</option>
                  { companyHtml }
                </select>
              </li>
              <li>
                <label>Category</label>
                <select data-field-name="category_id">
                  <option>Select Category</option>
                  { categoryHtml }
                </select>
              </li>
              <li>
                <label>Genre</label>
                <select data-field-name="genre_id">
                  <option>Select Genre</option>
                  { genreHtml }
                </select>
              </li>
              {/*
              <li>
                <label>Brand Manager</label>
                <input type="email" />
              </li>
              */}
              <li>
                <label>Status</label>
                <select data-field-name="status">
                  <option>Select Status</option>
                  <option data-field-name="status" data-field-value="active">Active</option>
                  <option data-field-name="status" data-field-value="inactive">InActive</option>
                </select>
              </li>
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
        <div className={styles.region_wrapper}>
          <div className={styles.regions_container}>
            <div className={styles.heading}>Regions</div>
            <div className={styles.add_lab}>+ Add New</div>
            <ul>
              <li>
                <label>South</label>
                <p>3 Cities</p>
              </li>
            </ul>
          </div>
          <div className={styles.add_regions_container}>
            <div className={styles.heading}>Add new Regions</div>
            <div className={styles.wd_100}>
              <label className={styles.region_lab}>Region name</label>
              <input type="text" />
            </div>
            <div className={styles.wd_100 + ' ' + styles.select_city}>
              <label className={styles.cites_lab}>
                SELECT CITIES
                <span className={styles.selected}>1 Selected</span>
              </label>
            </div>
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
            <div className="clearfix"></div>
            <div className={styles.user_actions}>
              <button>Delete</button>
              <button>Update</button>
            </div>
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
  companyList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.brand_data};
};


const decoratedConnectedComponent = commonDecorator(BrandCreate);
export default connect(mapStateToProps)(decoratedConnectedComponent);
