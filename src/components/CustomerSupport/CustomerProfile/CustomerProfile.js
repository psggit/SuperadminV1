import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import SettlementWrapper from '../../RetailerManagement/CreateOrganization/SettlementWrapper';
import TransactionsInformation from '../../Sku/Transactions/TransactionsInformation';
import AddBeneficiaryInput from '../../RetailerManagement/CreateOrganization/AddBeneficiaryInput';
import AddBeneficiaryTextarea from '../../RetailerManagement/CreateOrganization/AddBeneficiaryTextarea';
import HistoryInformation from './HistoryInformation';
import MakerName from './MakerName';
import StatusViewTicket from './StatusViewTicket';
import CreatedAt from './CreatedAt';
class CustomerProfile extends React.Component {
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
    const styles = require('./CustomerProfile.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.assigned_issue_container}>
          <div className = {styles.assigned_issue_wrapper}>
            <SettlementWrapper />
            <div className = {styles.start_call_btn}>
              <button> Start Call</button>
            </div>
          </div>
          <div className = {styles.close_issue_wrapper}>
            <div className = {styles.close_issue_head}>
              Close Issue
            </div>
            <TransactionsInformation label = "Code" val = "A1021" />
            <AddBeneficiaryInput labelVal = "Issue Discription"/>
            <AddBeneficiaryTextarea labelVal = "Comment" />
            <div className = {styles.close_issue_btn}>
              <button>Close Issue</button>
            </div>
          </div>
          <div className = {styles.account_create_noted_container}>
            <div className = {styles.account_details_container}>
              <div className = {styles.account_details_wrapper}>
                <div className = {styles.account_details_head}>
                  Account Details
                </div>
                <SettlementWrapper />
                <SettlementWrapper />
                <SettlementWrapper />
                <SettlementWrapper />
                <SettlementWrapper />
                <SettlementWrapper />
              </div>
              <div className = {styles.all_btns}>
                <button>Edit Profile</button>
                <button>Reset Pin</button>
                <button>Reset Password</button>
                <button>Disable User</button>
                <button>View on Map</button>
              </div>
            </div>
            <div className = {styles.create_noted_wrapper}>
              <div className = {styles.create_noted_head}>
                Create Noted Entry
              </div>
              <TransactionsInformation label = "Issue Code" val = "A1021" />
              <AddBeneficiaryInput labelVal = "Issue Discription"/>
              <AddBeneficiaryTextarea labelVal = "Comment" />
              <div className = {styles.close_issue_btn}>
                <button>Save</button>
              </div>
            </div>
            <div className = {styles.create_noted_wrapper}>
              <TransactionsInformation label = "Issue Code" val = "A1021" />
              <AddBeneficiaryInput labelVal = "Issue Discription"/>
              <AddBeneficiaryTextarea labelVal = "Comment" />
              <TransactionsInformation label = "Priority" val = "1" />
            </div>
          </div>
        </div>
        <div className = {styles.history_container}>
          <div className = {styles.notepad_history_wrapper}>
            <div className = {styles.notepad_history_head}>
              Noted History
            </div>
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
          </div>
          <div className = {styles.issue_history_wrapper}>
            <div className = {styles.issue_history_head}>
              Issue History
            </div>
            <HistoryInformation label = "Issue Code" val = "A1012" />
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
            <HistoryInformation label = "Issue Code" val = "A1012" />
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
            <HistoryInformation label = "Issue Code" val = "A1012" />
            <HistoryInformation label = "Issue discription" val = "Redemption failed due to pairing and internet problems" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <MakerName labelname = "Maker Name:" labelnameval = "Karthik Venkateshwaran" labeltime = "Time:" labeltimeval = "21-02-2016 13:45" maker = "Maker:" makerid = "22" />
          </div>
        </div>
        <div className = {styles.freshdesk_ticket_container}>
          <div className = {styles.freshdesk_ticket_wrapper}>
            <div className = {styles.freshdesk_ticket_head}>
              Freshdesk Ticket History
            </div>
            <HistoryInformation label = "Issue Subject" val = "A1001 Redemption issues" />
            <HistoryInformation label = "Priority" val = "1" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <StatusViewTicket label = "Status:" status = "Pending" val = "View Ticket" />
            <CreatedAt labelname = "Created At:" labelnameval = "21-02-2016 13:45" labeltime = "Updated At:" labeltimeval = "21-02-2016 13:45" />
            <HistoryInformation label = "Issue Subject" val = "A1001 Redemption issues" />
            <HistoryInformation label = "Priority" val = "1" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <StatusViewTicket label = "Status:" status = "Pending" val = "View Ticket" />
            <CreatedAt labelname = "Created At:" labelnameval = "21-02-2016 13:45" labeltime = "Updated At:" labeltimeval = "21-02-2016 13:45" />
            <HistoryInformation label = "Issue Subject" val = "A1001 Redemption issues" />
            <HistoryInformation label = "Priority" val = "1" />
            <HistoryInformation label = "Comment" val = "Customer's mobile has speakers problem. Suggested to use OTP insted redemption was successful" />
            <StatusViewTicket label = "Status:" status = "Pending" val = "View Ticket" />
            <CreatedAt labelname = "Created At:" labelnameval = "21-02-2016 13:45" labeltime = "Updated At:" labeltimeval = "21-02-2016 13:45" />
          </div>
        </div>
        <div className = {styles.organisation_details_btn}>
          <button>Complete Ticket</button>
        </div>
      </div>
    );
  }
}
export default CustomerProfile;
