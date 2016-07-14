import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { fetchCompany, fetchBrands, brandContainerVisibility, setContainerType, createBrandManager} from './CreateBMActions';
import BrandContainer from './BrandContainer';

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
    Promise.all([
      this.props.dispatch(brandContainerVisibility()),
      this.props.dispatch(setContainerType(false))
    ]);
  }
  onSelectCompany() {
    const companyId = parseInt(document.querySelectorAll('[data-field-name="company_id"] option:checked')[0].value, 10);
    this.props.dispatch(fetchBrands(companyId));
  }

  onClickExistingBrand(bid) {
    let brand = {};
    const sbl = [...this.props.selectedBrandsList];
    sbl.map((b) => {
      if (b.id === bid) {
        brand = {...b};
      }});
    Promise.all([
      this.props.dispatch(setContainerType(true)),
      this.props.dispatch(brandContainerVisibility(brand))
    ]);
  }
  onSaveBrandManager() {
    Promise.all([
      this.props.dispatch(createBrandManager())
    ]);
  }
  render() {
    const styles = require('./CreateBrandManager.scss');

    const { companyList, selectedBrandsList } = this.props;
    const props_ = { ...this.props };

    const getActiveRegionCount = (regions) => {
      let count = 0;
      regions.map((region) => {
        count = (region.is_selected) ? count + 1 : count + 0;
      });
      return count;
    };

    const selectedBrandsHtml = selectedBrandsList.map((sb) => {
      const count = getActiveRegionCount([...sb.regions]);
      return (
        <li>
          <label>{sb.brand_name}</label>
          <p className={styles.pointer_click} onClick={this.onClickExistingBrand.bind(this, sb.id)}>{count} {(count !== 1) ? 'Regions' : 'Region' }</p>
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
                    <option disable selected value> -- select status -- </option>
                    <option data-field-name="status" data-field-value="active">Active</option>
                    <option data-field-name="status" data-field-value="inactive">InActive</option>
                  </select>
                </li>
                <li>
                  <label>KYC Status</label>
                  <select data-field-name="kyc_status">
                    <option disable selected value> -- select -- </option>
                    <option>Verified</option>
                    <option>Pending</option>
                  </select>
                </li>
              </ul>
          </div>
          <div className="clearfix"></div>
          <div className={styles.brands_wrapper}>
            <div className={styles.brand_container}>
              <div className={styles.heading}>Brands</div>
              <div className={styles.add_lab} onClick={this.onClickShowBrandContainer.bind(this)}>+ Add Brand</div>
              <ul>
                { selectedBrandsHtml }
              </ul>
            </div>
            <BrandContainer props={props_}/>
          </div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onSaveBrandManager.bind(this)}>
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
  selectedBrandsList: PropTypes.array.isRequired,
  showBrandContainer: PropTypes.bool.isRequired,
  selectedBrand: PropTypes.object.isRequired,
  regionCitiesView: PropTypes.object.isRequired,
  isExistingBrand: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.createbrandmanager_data};
};

const decoratedConnectedComponent = commonDecorator(CreateBrandManager);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
