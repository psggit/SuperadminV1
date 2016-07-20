import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import AddBeneficiaryInput from '../../RetailerManagement/CreateOrganization/AddBeneficiaryInput';
import EmailTextarea from './EmailTextarea';
class FreshdeskTicket extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'CUSTOMER MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Support',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Profile',
      sequence: 3,
      link: '#'
    });
    this.breadCrumbs.push({
      title: '32',
      sequence: 4,
      link: '#'
    });
  }
  render() {
    const styles = require('./FreshdeskTicket.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.assigned_issue_container}>
          <div className = {styles.close_issue_wrapper}>
            <div className = {styles.close_issue_head}>
              Ticket Id: 234
            </div>
            <AddBeneficiaryInput labelVal = "Customer Email"/>
            <AddBeneficiaryInput labelVal = "Support personal Email"/>
            <AddBeneficiaryInput labelVal = "Priority"/>
            <AddBeneficiaryInput labelVal = "Status"/>
            <AddBeneficiaryInput labelVal = "Created At"/>
            <AddBeneficiaryInput labelVal = "Updated At"/>
          </div>
          <div className = {styles.account_create_noted_container}>

            <div className = {styles.create_noted_wrapper}>
              <div className = {styles.create_noted_head}>
                Email 20 Items
              </div>
              <EmailTextarea labelVal = "From" />
              <EmailTextarea labelVal = "To" />
              <EmailTextarea labelVal = "CC" />
              <EmailTextarea labelVal = "Subject" />
              <EmailTextarea labelVal = "Discription" />
              <AddBeneficiaryInput labelVal = "Time"/>
              <div className = {styles.divider_bottom}>
              </div>
              <EmailTextarea labelVal = "From" />
              <EmailTextarea labelVal = "To" />
              <EmailTextarea labelVal = "CC" />
              <EmailTextarea labelVal = "Subject" />
              <EmailTextarea labelVal = "Discription" />
              <AddBeneficiaryInput labelVal = "Time"/>
              <div className = {styles.divider_bottom}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FreshdeskTicket;
