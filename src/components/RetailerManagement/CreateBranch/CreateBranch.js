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
  updateBranchDetail,
  getBranchData,
  RESET_BRANCH,
  saveInventoryEdit
} from './BranchData';

import {
  fetchBrand,
  fetchSKUs,
  BRAND_SELECTED,
  SKU_SELECTED,
  SKU_UNSELECTED,
  TOGGLE_SKU_VISIBILITY,
  RESET_BRAND,
  SKU_CLEAR_LOCAL,
  SKU_SAVE_LOCAL,
  SKU_DELETE_LOCAL,
  disableSKUs,
  enableSKUs
} from './SkuAction';

import {
  deleteDevice,
  updateDevice,
  createDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  RESET_DEVICE,
  fetchDevice,
  emailSmsDeviceCreation,
  emailSmsCredsCreation
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
      title: ( props.params.brId ? 'Edit ' : 'Create ' ) + ' Branch',
      sequence: 2,
      link: '#'
    });

    if ( props.params.brId ) {
      this.breadCrumbs.push({
        title: props.params.brId,
        sequence: 3,
        link: '#'
      });
    }
  }
  componentDidMount() {
    const brId = this.props.params.brId;
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() ),
      this.props.dispatch( getOrganisation( brId ? true : false ) ),
      ( brId ? ( this.props.dispatch(getBranchData( brId ) )) : Promise.resolve() ),
      (
      brId ?
        Promise.all([
          this.props.dispatch( fetchSKUs( brId ) ),
          this.props.dispatch( fetchDevice( brId ) )
        ])
        :
        this.props.dispatch( fetchBrand() )
      )
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
  emailSmsDeviceCreation( id, templateName ) {
    this.props.dispatch( emailSmsDeviceCreation(id, templateName ) );
  }
  emailSmsCredsCreation( id, templateName ) {
    this.props.dispatch( emailSmsCredsCreation(id, templateName ) );
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
  updateBranch() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( updateBranchDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  createDevice() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(createDevice())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
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

  disableSKUs( id ) {
    this.props.dispatch( disableSKUs(id) );
  }

  enableSKUs( id ) {
    this.props.dispatch( enableSKUs(id) );
  }

  skuViewToggle() {
    this.props.dispatch( { type: TOGGLE_SKU_VISIBILITY } );
  }

  saveSkuLocal() {
    this.props.dispatch( { type: SKU_SAVE_LOCAL } );
  }

  deleteSkuLocal( id ) {
    this.props.dispatch( { type: SKU_DELETE_LOCAL, data: id} );
  }

  clearSkuLocal() {
    this.props.dispatch( { type: SKU_CLEAR_LOCAL } );
  }

  saveInventoryEdit( ) {
    const brId = this.props.params.brId;
    this.props.dispatch( saveInventoryEdit() )
    .then( ( ) => {
      return Promise.all([
        this.props.dispatch( fetchSKUs( brId ) ),
        this.props.dispatch( { type: SKU_CLEAR_LOCAL } )
      ]);
    });
  }

  render() {
    const styles = require('./CreateBrand.scss');

    const {
      ongoingRequest,
      branchData,
      genStateData,
      dispatch,
      brandData
    } = this.props;

    const { organisationData
      , branchContact
      , branchAccountRegistered
      , branchDetail
      , isBrEdit
    } = branchData;

    let stateIdentifier = '';

    if ( 'state_id' in branchContact ) {
      stateIdentifier = genStateData.stateIdMap[branchContact.state_id];
    }

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

    const actionButton = !this.props.params.brId ? (
      <button className={styles.edit_brand_btn} onClick={ this.saveBranch.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Saving' : 'Save' ) }
      </button>
    ) : (
      <button className={styles.edit_brand_btn} onClick={ this.updateBranch.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Updating' : 'Update' )}
      </button>
    );

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

          <div className={ styles.select_sku_wrapper + ( stateIdentifier.length > 0 ? '' : ' hide') }>
            <SkuWrapper
      { ...brandData }
      stateIdentifier = { stateIdentifier }
      isBrEdit = { isBrEdit }
      viewBrand = { this.viewBrand.bind(this) }
      skuToggled = { this.skuToggled.bind(this) }
      unSelectSKU = { this.unSelectSKU.bind(this) }
      skuViewToggle = { this.skuViewToggle.bind(this) }
      saveSkuLocal = { this.saveSkuLocal.bind(this) }
      deleteSkuLocal = { this.deleteSkuLocal.bind(this) }
      clearSkuLocal = { this.clearSkuLocal.bind(this) }
      disableSKUs = { this.disableSKUs.bind(this) }
      enableSKUs = { this.enableSKUs.bind(this) }
      saveInventoryEdit = { this.saveInventoryEdit.bind(this) }
        />
          </div>

          <div className={ styles.select_sku_wrapper + ( stateIdentifier.length > 0 ? ' hide' : '' ) }>
            <h3> Please select state to assign SKU's </h3>
          </div>

          <div className="clearfix"></div>

          <div className={ isBrEdit ? '' : 'hide' }>
            <DeviceWrapper
        { ...this.props }
        createDevice={ this.createDevice.bind(this) }
        updateDevice={ this.updateDevice.bind(this) }
        deleteDevice={ this.deleteDevice.bind(this) }
        createDeviceLocal = { this.createDeviceLocal.bind(this) }
        updateDeviceLocal = { this.updateDeviceLocal.bind(this) }
        deleteDeviceLocal = { this.deleteDeviceLocal.bind(this) }
        emailSmsDeviceCreation = { this.emailSmsDeviceCreation.bind(this) }
        emailSmsCredsCreation = { this.emailSmsCredsCreation.bind(this) }
          />
          </div>
          { actionButton }
        </div>
      </div>);
  }
}

CreateBrand.propTypes = {
  params: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
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
