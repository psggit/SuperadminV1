import React, {Component, PropTypes} from 'react';

import { connect } from 'react-redux';
import {Link} from 'react-router';
import BreadCrumb from '../../Common/BreadCrumb';
import AddBeneficiaryInput from '../../RetailerManagement/CreateOrganization/AddBeneficiaryInput';
import EmailTextarea from './EmailTextarea';

import {getTicketData} from './FreshdeskTicketActions';


class FreshdeskTicket extends Component {
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

  componentWillMount() {
    this.props.dispatch(getTicketData(this.props.params.Id));
  }

  render() {
    const styles = require('./FreshdeskTicket.scss');
    const estyles = require('./EmailTextarea.scss');
    const {freshdeskTicketData} = this.props;

    const getAttachementHtml = (attachments) => {
      return attachments.map((attachment) => {
        return (
          <div>
            <Link to={attachment.attachment_url} target="_blank"> {attachment.name} </Link>
          </div>
        );
      });
    };

    const getAttachementsHtml = (attachments) => {
      return (
          <div className = {estyles.add_beneficiary_textarea_container}>
            <div className = {estyles.add_beneficiary_textarea_left}>
              Attachments
            </div>
            <div className = {estyles.add_beneficiary_textarea_right}>
              { getAttachementHtml(attachments)}
            </div>
          </div>
      );
    };

    const getConversationsHtml = freshdeskTicketData.conversations.map((conversation) => {
      return (
        <div>
          <AddBeneficiaryInput labelVal = "From" Val={conversation.from_email}/>
          <AddBeneficiaryInput labelVal = "To" Val={conversation.to_emails.toString()}/>
          <EmailTextarea labelVal = "Body" Val = {conversation.body_text} />
          <AddBeneficiaryInput labelVal = "Created At" Val={conversation.created_at}/>
          <AddBeneficiaryInput labelVal = "Updated At" Val={conversation.updated_at}/>
          {getAttachementsHtml(conversation.attachments)}
          <div className = {styles.divider_bottom}>
          </div>
        </div>
      );
    });
    const priorityMap = ['', 'Low', 'Medium', 'High', 'Urgent'];
    const statusMap = ['', '', 'Open', 'Pending', 'Resolved', 'Closed'];
    const toEmails = this.props.freshdeskTicketData.to_emails;
    const descriptionText = this.props.freshdeskTicketData.description_text;

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.assigned_issue_container}>
          <div className = {styles.close_issue_wrapper}>
            <div className = {styles.close_issue_head}>
              Ticket Id: {this.props.freshdeskTicketData.id}
            </div>
            <AddBeneficiaryInput labelVal = "From Email" Val="aaaa"/>
            <AddBeneficiaryInput labelVal = "To Emails" Val={(toEmails) ? toEmails.toString() : ''}/>
            <AddBeneficiaryInput labelVal = "Subject" Val={this.props.freshdeskTicketData.subject}/>
            <EmailTextarea labelVal = "Body" Val = {descriptionText} />
            <AddBeneficiaryInput labelVal = "Status" Val={statusMap[this.props.freshdeskTicketData.status]}/>
            <AddBeneficiaryInput labelVal = "Priority" Val={priorityMap[this.props.freshdeskTicketData.priority]}/>
            <AddBeneficiaryInput labelVal = "Created At" Val={this.props.freshdeskTicketData.created_at}/>
            <AddBeneficiaryInput labelVal = "Updated At" Val={this.props.freshdeskTicketData.updated_at}/>
            {getAttachementsHtml(this.props.freshdeskTicketData.attachments)}
          </div>
          <div className = {styles.account_create_noted_container}>

            <div className = {styles.create_noted_wrapper}>
              <div className = {styles.create_noted_head}>
                Conversations: {this.props.freshdeskTicketData.conversations.length} Items
              </div>
              {getConversationsHtml}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FreshdeskTicket.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  freshdeskTicketData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.freshdesk_ticket};
};

export default connect(mapStateToProps)(FreshdeskTicket);
