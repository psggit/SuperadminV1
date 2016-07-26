import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import AddBeneficiaryInput from '../../RetailerManagement/CreateOrganization/AddBeneficiaryInput';
import EmailTextarea from '../FreshdeskTicket/EmailTextarea';
class IssueHistory extends React.Component {
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
      title: 'Issue History',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: '123',
      sequence: 3,
      link: '#'
    });
  }
  render() {
    const styles = require('./IssueHistory.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.issue_history_container}>
          <div className = {styles.issue_history_wrapper}>
            <div className = {styles.issue_history_head}>
              Issue: 123
            </div>
            <AddBeneficiaryInput labelVal = "Customer Id"/>
            <AddBeneficiaryInput labelVal = "Support personal Id"/>
            <AddBeneficiaryInput labelVal = "Issue Status"/>
            <AddBeneficiaryInput labelVal = "Issue Code"/>
            <EmailTextarea labelVal = "Issue Description"/>
            <EmailTextarea labelVal = "comment"/>
            <AddBeneficiaryInput labelVal = "Created At"/>
            <AddBeneficiaryInput labelVal = "Updated At"/>
          </div>
        </div>
      </div>
    );
  }
}
export default IssueHistory;
