import React, {Component, PropTypes} from 'react';

import BreadCrumb from '../../Common/BreadCrumb';
import SettlementInformation from '../../RetailerManagement/RedemptionHistory/SettlementInformation';
import TransactionsInformation from '../../RetailerManagement/DebitsCredits/TransactionsInformation';
import AddBeneficiaryInput from '../../RetailerManagement/CreateOrganization/AddBeneficiaryInput';
import AddBeneficiaryTextarea from '../../RetailerManagement/CreateOrganization/AddBeneficiaryTextarea';
import HistoryInformation from './HistoryInformation';
import MakerName from './MakerName';
import StatusViewTicket from './StatusViewTicket';
import CreatedAt from './CreatedAt';

import { connect } from 'react-redux';

import { getIssueData } from './CustomerProfileActions';

class CustomerProfile extends Component {
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
  }

  componentWillMount() {
    this.props.dispatch(getIssueData(this.props.params.Id));
  }

  render() {
    const styles = require('./CustomerProfile.scss');
    const toLocalDate = (dateString) => {
      return (new Date(new Date(dateString).getTime() + 19800000).toLocaleString('en-GB'));
    };
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.assigned_issue_container}>
          <div className = {styles.assigned_issue_wrapper}>
            <div className = {styles.assign_issue_head}>
              Close Issue
            </div>
            <SettlementInformation label="Customer Name" val={this.props.issueData.consumer.full_name} />
            <SettlementInformation label="Mobile Number" val={this.props.issueData.consumer.mobile_number}/>
            <SettlementInformation label="Issue" val={this.props.issueData.reason}/>
            <SettlementInformation label="Issue Raised At" val={toLocalDate(this.props.issueData.created_at)}/>
            <div className = {styles.start_call_btn}>
              <button> Start Call </button>
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
                <SettlementInformation label="test" val="testing"/>
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

CustomerProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  issueData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.customer_support_data};
};

export default connect(mapStateToProps)(CustomerProfile);
