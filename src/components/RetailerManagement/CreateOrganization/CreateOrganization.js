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
  saveOrganizationDetail
} from './OrganizationData';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import Beneficiary from './Beneficiary';

class CreateOrganization extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'RETAILER MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Create Organization',
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() )
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  saveOrganization() {
    this.props.dispatch(saveOrganizationDetail());
  }
  render() {
    const styles = require('./CreateOrganization.scss');

    const {
      genStateData,
      beneficiaryData,
      organizationData
    } = this.props;

    const { orgDetail, orgContact, orgRegistered } = organizationData;

    console.log( beneficiaryData );

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.create_organization_container}>
          <div className = {styles.create_organization_wrapper}>
            <div className = {styles.create_organization_head}>
              Organisation Details
            </div>
            <OrganizationDetails { ...this.props } triggerDispatch={ ORGANIZATION_INPUT_CHANGED } currState={ orgDetail } />
            <OrganizationRegisteredDetails { ...this.props } stateData = { Object.assign({}, genStateData ) } triggerDispatch={ ORGANIZATION_REGISTERED_CHANGED } currState = { orgRegistered } />
            <OrganizationContactDetails { ...this.props } stateData = { Object.assign( {}, genStateData ) } triggerDispatch={ ORGANIZATION_CONTACT_CHANGED } currState={ orgContact } />
          </div>
        </div>
        <Beneficiary { ...this.props } />
        <div className = {styles.organisation_details_btn}>
          <button onClick={ this.saveOrganization.bind(this) } >Save</button>
        </div>
      </div>
    );
  }
}

CreateOrganization.propTypes = {
  dispatch: PropTypes.func.isRequired,
  beneficiaryData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired,
  organizationData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.organization_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateOrganization);

export default connect(mapStateToProps)(decoratedComponent);
