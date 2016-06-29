import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { fetchCompany, fetchBrands } from './CreateBMActions';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';


class CreateBrandManager extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Brand Manager Management',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Create Brand Manager',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchCompany())
    ]);
  }
  onClickShowBrandContainer() {
  }
  onSelectCompany() {
    const companyId = parseInt(document.querySelectorAll('[data-field-name="company_id"] option:checked')[0].value, 10);
    this.props.dispatch(fetchBrands(companyId));
    console.log('dispatched');
  }

  render() {
    const styles = require('./CreateBrandManager.scss');

    const { companyList, companyBrands, selectedBrandsList } = this.props;

    const brandHtml = companyBrands.map((brand, index) => {
      return (
          <option key={index} value={brand.id}>{brand.brand_name}</option>
      );
    });

    const selectedBrandsHtml = selectedBrandsList.map((sb) => {
      return (
        <li>
          <label>{sb.name}</label>
          <p>{sb.regions.length} Regions</p>
        </li>
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
        <div className={styles.brand_wrapper}>
          <div className={styles.create_brand_container}>
            <div className={styles.heading + ' ' + styles.wd_100}>Create Brand</div>
              <ul>
                <li>
                  <label>Name</label>
                  <input data-field-name="name" type="text" />
                </li>
                <li>
                  <label>Company Name</label>
                  <select data-field-name="company_id" onChange={this.onSelectCompany.bind(this)}>
                    <option disabled selected value> -- select an option -- </option>
                    { companyHtml }
                  </select>
                </li>
                <li>
                  <label>Email</label>
                  <input type="text"/>
                </li>
                <li>
                  <label>Mobile Number</label>
                  <input type="number"/>
                </li>
                <li>
                  <label>Status</label>
                  <select data-field-name="status">
                    <option>Select Status</option>
                    <option data-field-name="status" data-field-value="active">Active</option>
                    <option data-field-name="status" data-field-value="inactive">InActive</option>
                  </select>
                </li>
                <li>
                  <label>KYC Status</label>
                  <select data-field-name="">
                    <option>Select</option>
                  </select>
                </li>
              </ul>
          </div>
          <div className="clearfix"></div>
          <div className={styles.brands_wrapper}>
            <div className={styles.brand_container}>
              <div className={styles.heading}>Brands</div>
              <div className={styles.add_lab} onClick={this.onClickShowBrandContainer.bind(this)}>+ Select Brand</div>
              <ul>
                { selectedBrandsHtml }
              </ul>
            </div>
            <div className={styles.select_brands_container}>
              <div className={styles.heading}>Select Brand</div>
              <div className={styles.wd_100}>
                <label className={styles.region_lab}>Brand name</label>
                <select data-field-name="selected_brand_id">
                  <option disabled selected value > -- Select Brand -- </option>
                  { brandHtml }
                </select>
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
                  <li>
                    <label>
                      <input type="checkbox"/> Tamil nadu
                    </label>
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
                    <label> Chennai </label>
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
          <button className={styles.edit_brand_btn}>
            Save BM
          </button>
        </div>
      </div>);
  }
}

CreateBrandManager.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  companyList: PropTypes.array.isRequired,
  companyBrands: PropTypes.array.isRequired,
  selectedBrandsList: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.createbrandmanager_data };
};


const decoratedConnectedComponent = commonDecorator(CreateBrandManager);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
