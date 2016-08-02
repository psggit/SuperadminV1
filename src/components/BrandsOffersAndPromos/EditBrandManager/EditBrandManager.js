import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { fetchBManager, brandContainerVisibility, setContainerType, updateBrandManager} from './EditBMActions';
import BrandContainer from './BrandContainer';
import BrandManagerInfo from './BrandManagerInfo';
/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';


class EditBrandManager extends Component { // eslint-disable-line no-unused-vars
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
      this.props.dispatch(fetchBManager(parseInt(this.props.params.Id, 10)))
    ]);
  }
  onClickShowBrandContainer() {
    Promise.all([
      this.props.dispatch(brandContainerVisibility()),
      this.props.dispatch(setContainerType(false))
    ]);
  }

  onClickExistingBrand(bid) {
    let brand = {};
    const sbl = [...this.props.selectedBrandsList];
    sbl.forEach((b) => {
      if (b.id === bid) {
        brand = {...b};
      }
    });
    const cbl = [...this.props.companyBrands];
    let cbrand = {};
    cbl.forEach((b) => {
      if (b.id === bid) {
        cbrand = b;
      }
    });
    const fregions = [];
    let isp = false;
    cbrand.regions.forEach((cr) => {
      isp = false;
      brand.regions.forEach((sr) => {
        if (sr.in_db) {
          if (cr.id === sr.oid) {
            isp = true;
            fregions.push({...sr});
          }
        } else {
          if (cr.id === sr.id) {
            isp = true;
            fregions.push({...sr});
          }
        }
      });
      if (isp === false) {
        fregions.push({...cr});
      }
    });
    brand.regions = [...fregions];
    Promise.all([
      this.props.dispatch(setContainerType(true)),
      this.props.dispatch(brandContainerVisibility(brand))
    ]);
  }
  onSaveBrandManager() {
    Promise.all([
      this.props.dispatch(updateBrandManager())
    ]);
  }
  render() {
    const styles = require('./EditBrandManager.scss');

    const { brandManagerInfo, selectedBrandsList } = this.props;
    const props_ = { ...this.props };

    const getActiveRegionCount = (regions) => {
      let count = 0;
      regions.map((region) => {
        count = (region.is_selected) ? count + 1 : count;
      });
      return count;
    };

    const selectedBrandsHtml = selectedBrandsList.map((sb) => {
      const count = getActiveRegionCount([...sb.regions]);
      return (sb.is_deleted) ? ('') : (
        <li>
          <label>{sb.brand_name}</label>
          <p className={styles.pointer_click} onClick={this.onClickExistingBrand.bind(this, sb.id)}>{count} {(count !== 1) ? 'Regions' : 'Region' }</p>
        </li>
      );
    });

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <BrandManagerInfo brandManagerInfo={brandManagerInfo} dispatch={this.props.dispatch} />
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

EditBrandManager.propTypes = {
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
  isExistingBrand: PropTypes.bool.isRequired,
  brandManagerInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.edit_bm_data};
};

const decoratedConnectedComponent = commonDecorator(EditBrandManager);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
