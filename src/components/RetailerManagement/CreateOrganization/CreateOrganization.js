import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import OrganizationDetails from './OrganizationDetails';
import OrganizationRegisteredDetails from './OrganizationRegisteredDetails';
import OrganizationContactDetails from './OrganizationContactDetails';
import AddBeneficiaryInput from './AddBeneficiaryInput';
import AddBeneficiaryTextarea from './AddBeneficiaryTextarea';
import SettlementWrapper from './SettlementWrapper';
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
        <div className = {styles.beneficiaries_container}>
          <div className = {styles.beneficiaries_wrapper}>
            <div className = {styles.beneficiaries_head}>
              beneficiaries
            </div>
            <div className = {styles.beneficiaries_subhead}>
              + Add New
            </div>
            <SettlementWrapper />
          </div>
          <div className = {styles.add_beneficiaries_wrapper}>
            <div className = {styles.add_beneficiaries_head}>
              beneficiaries
            </div>
            <AddBeneficiaryInput labelVal = "Name"/>
            <AddBeneficiaryTextarea labelVal = "Address" />
            <AddBeneficiaryInput labelVal = "Pincode"/>
            <AddBeneficiaryInput labelVal = "City"/>
            <AddBeneficiaryInput labelVal = "State"/>
            <AddBeneficiaryInput labelVal = "Landline Number"/>
            <AddBeneficiaryInput labelVal = "Email"/>
            <div className = {styles.add_beneficiary_btn}>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </div>
        <div className = {styles.organisation_details_btn}>
          <button>Save</button>
        </div>
      </div>
    );
  }
}
export default CreateOrganization;
