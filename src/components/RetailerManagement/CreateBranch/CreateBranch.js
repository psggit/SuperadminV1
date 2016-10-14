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
  getOrganisation
} from './BranchData';

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
      this.props.dispatch(getOrganisation() )
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./CreateBrand.scss');

    const {
      branchData,
      genStateData,
      dispatch
    } = this.props;

    const { organisationData, branchContact, branchAccountRegistered, branchDetail } = branchData;
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
            <SkuWrapper />
          </div>
          <div className="clearfix"></div>
          <DeviceWrapper />
          <button className={styles.edit_brand_btn}>
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
  genStateData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.branch_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateBrand);

export default connect(mapStateToProps)(decoratedComponent);
