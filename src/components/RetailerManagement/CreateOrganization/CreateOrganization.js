import React, { PropTypes } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import OrganizationDetails from './OrganizationDetails';
import OrganizationRegisteredDetails from './OrganizationRegisteredDetails';
import OrganizationContactDetails from './OrganizationContactDetails';

import { connect } from 'react-redux';

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
  render() {
    const styles = require('./CreateOrganization.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.create_organization_container}>
          <div className = {styles.create_organization_wrapper}>
            <div className = {styles.create_organization_head}>
              Organisation Details
            </div>
            <OrganizationDetails />
            <OrganizationRegisteredDetails />
            <OrganizationContactDetails />
          </div>
        </div>
        <Beneficiary { ...this.props } />
        <div className = {styles.organisation_details_btn}>
          <button>Save</button>
        </div>
      </div>
    );
  }
}

CreateOrganization.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(CreateOrganization);
