import React, { PropTypes } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import OrganizationDetails from './OrganizationDetails';
import OrganizationRegisteredDetails from './OrganizationRegisteredDetails';
import OrganizationContactDetails from './OrganizationContactDetails';

import { connect } from 'react-redux';

import { fetchStateCity } from '../../Common/Actions/StateCityData';

import commonDecorator from '../../Common/CommonDecorator';

import {
  ORGANIZATION_INPUT_CHANGED,
  ORGANIZATION_CONTACT_CHANGED,
  ORGANIZATION_REGISTERED_CHANGED,
  saveOrganizationDetail,
  updateOrganizationDetail,
  getOrganizationData,
  RESET_ORGANIZATION
} from './OrganizationData';

import {
  fetchBeneficiaries,
  deleteBeneficiary,
  updateBeneficiary,
  createBeneficiary,
  createBeneficiaryLocal,
  updateBeneficiaryLocal,
  deleteBeneficiaryLocal,
  RESET_BENEFICIARY
} from './BeneficiaryAction';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import Beneficiary from './Beneficiary';

class CreateOrganization extends React.Component {
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
      title: ( props.params.orgId ? 'Edit ' : 'Create ' ) + 'Organization',
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
    const orgId = this.props.params.orgId;
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() ),
      ( orgId ? ( this.props.dispatch(getOrganizationData( orgId ) )) : Promise.resolve() ),
      ( orgId ? ( this.props.dispatch(fetchBeneficiaries( orgId ) )) : Promise.resolve() )
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET_ORGANIZATION }),
      this.props.dispatch({ type: RESET_BENEFICIARY })
    ]);
  }

  saveOrganization() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(saveOrganizationDetail())
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  updateOrganization() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(updateOrganizationDetail())
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  createBeneficiary() {
    this.props.dispatch(createBeneficiary());
  }
  deleteBeneficiary() {
    this.props.dispatch(deleteBeneficiary());
  }
  updateBeneficiary() {
    this.props.dispatch(updateBeneficiary());
  }

  createBeneficiaryLocal() {
    this.props.dispatch(createBeneficiaryLocal());
  }
  deleteBeneficiaryLocal() {
    this.props.dispatch(deleteBeneficiaryLocal());
  }
  updateBeneficiaryLocal() {
    this.props.dispatch(updateBeneficiaryLocal());
  }
  render() {
    const styles = require('./CreateOrganization.scss');

    const {
      genStateData,
      beneficiaryData,
      organizationData,
      ongoingRequest
    } = this.props;

    const { orgDetail, orgContact, orgRegistered } = organizationData;

    const actionButton = !this.props.params.orgId ? (
      <button onClick={ this.saveOrganization.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Saving' : 'Save' ) }
      </button>
    ) : (
      <button onClick={ this.updateOrganization.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Updating' : 'Update' )}
      </button>
    );

    console.log( beneficiaryData );

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.create_organization_container}>
          <div className = {styles.create_organization_wrapper}>
            <div className = {styles.create_organization_head}>
              Organisation Details
            </div>
            <OrganizationDetails { ...this.props } triggerDispatch={ ORGANIZATION_INPUT_CHANGED } stateData={ orgDetail } />
            <OrganizationRegisteredDetails { ...this.props } stateData = { Object.assign({}, genStateData ) } triggerDispatch={ ORGANIZATION_REGISTERED_CHANGED } currState = { orgRegistered } />
            <OrganizationContactDetails { ...this.props } stateData = { Object.assign( {}, genStateData ) } triggerDispatch={ ORGANIZATION_CONTACT_CHANGED } currState={ orgContact } />
          </div>
        </div>
        <Beneficiary
      { ...this.props }
      createBeneficiary={ this.createBeneficiary.bind(this) }
      updateBeneficiary={ this.updateBeneficiary.bind(this) }
      deleteBeneficiary={ this.deleteBeneficiary.bind(this) }
      createBeneficiaryLocal = { this.createBeneficiaryLocal.bind(this) }
      updateBeneficiaryLocal = { this.updateBeneficiaryLocal.bind(this) }
      deleteBeneficiaryLocal = { this.deleteBeneficiaryLocal.bind(this) }
        />
        <div className = {styles.organisation_details_btn}>
          { actionButton }
        </div>
      </div>
    );
  }
}

CreateOrganization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  beneficiaryData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired,
  organizationData: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.organization_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateOrganization);

export default connect(mapStateToProps)(decoratedComponent);
