import React, { PropTypes, Component } from 'react';
import BrandDetailsComponent from './BrandDetailsComponent';
import SkuWrapper from './SkuWrapper';
import { connect } from 'react-redux';
import DeviceWrapper from './DeviceWrapper';

import BreadCrumb from '../../Common/BreadCrumb';

import commonDecorator from '../../Common/CommonDecorator';

import { fetchStateCity } from '../../Common/Actions/StateCityData';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import {
  getOrganisation,
  saveBranchDetail,
  RESET_BRANCH
} from './BranchData';

import {
  fetchBrand,
  BRAND_SELECTED,
  SKU_SELECTED,
  SKU_UNSELECTED,
  RESET_BRAND
} from './SkuAction';

import {
  deleteDevice,
  updateDevice,
  createDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  RESET_DEVICE
} from './DeviceAction';

class CreateBrand extends Component { // eslint-disable-line no-unused-vars
  constructor( props ) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Retailer Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: ( props.params.orgId ? 'Edit ' : 'Create ' ) + ' Branch',
      sequence: 2,
      link: '#'
    });

    if ( props.params.orgId ) {
      this.breadCrumbs.push({
        title: props.params.orgId,
        sequence: 3,
        link: '#'
      });
    }
  }
  componentDidMount() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() ),
      this.props.dispatch( getOrganisation() ),
      this.props.dispatch( fetchBrand() )
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET_BRANCH }),
      this.props.dispatch({ type: RESET_DEVICE }),
      this.props.dispatch({ type: RESET_BRAND }),
    ]);
  }
  saveBranch() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( saveBranchDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  createDevice() {
    this.props.dispatch(createDevice());
  }

  deleteDevice() {
    this.props.dispatch(deleteDevice());
  }
  updateDevice() {
    this.props.dispatch(updateDevice());
  }

  createDeviceLocal() {
    this.props.dispatch(createDeviceLocal());
  }
  deleteDeviceLocal() {
    this.props.dispatch(deleteDeviceLocal());
  }
  updateDeviceLocal() {
    this.props.dispatch(updateDeviceLocal());
  }

  viewBrand( id ) {
    this.props.dispatch({ type: BRAND_SELECTED, data: id });
  }

  skuToggled( id, e) {
    console.log(e.target);
    const actionConst = ( e.target.checked ) ? SKU_SELECTED : SKU_UNSELECTED;
    this.props.dispatch({ type: actionConst, data: id });
  }

  unSelectSKU( id ) {
    const actionConst = SKU_UNSELECTED;
    this.props.dispatch({ type: actionConst, data: id });
  }
  render() {
    const styles = require('./CreateBrand.scss');

    const {
      branchData,
      genStateData,
      dispatch,
      brandData
    } = this.props;

    const { organisationData
      , branchContact
      , branchAccountRegistered
      , branchDetail
    } = branchData;
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <div className={styles.wd_100}>
            <BrandDetailsComponent
      organisationData = { organisationData }
      branchContact = { branchContact }
      branchAccountRegistered = { branchAccountRegistered }
      branchDetail = { branchDetail }
      genStateData = { genStateData }
      dispatch = { dispatch }
        />
          </div>
          <div className="clearfix"></div>
          <div className={styles.select_sku_wrapper}>
            <SkuWrapper
      { ...brandData }
      viewBrand = { this.viewBrand.bind(this) }
      skuToggled = { this.skuToggled.bind(this) }
      unSelectSKU = { this.unSelectSKU.bind(this) }
        />
          </div>
          <div className="clearfix"></div>
          <DeviceWrapper
      { ...this.props }
      createDevice={ this.createDevice.bind(this) }
      updateDevice={ this.updateDevice.bind(this) }
      deleteDevice={ this.deleteDevice.bind(this) }
      createDeviceLocal = { this.createDeviceLocal.bind(this) }
      updateDeviceLocal = { this.updateDeviceLocal.bind(this) }
      deleteDeviceLocal = { this.deleteDeviceLocal.bind(this) }
        />
          <button className={styles.edit_brand_btn} onClick={ this.saveBranch.bind(this) } >
            Save Branch
          </button>
        </div>
      </div>);
  }
}

CreateBrand.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  branchData: PropTypes.object.isRequired,
  brandData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.branch_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateBrand);

export default connect(mapStateToProps)(decoratedComponent);
