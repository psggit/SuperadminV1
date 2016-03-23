import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TableHeader from '../../../Consumer/TableHeader';

import { getTransactionCode, checkValidity} from '../../actions/Action';

// ,
class CreateCredit extends Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    this.props.dispatch(getTransactionCode());
  }
  onAddCredit() {
    /* Validate the email ids */
    /* Check for spaces inside the text box */
    /* If yes raise an error */
    /* Variable Declaration */
    const addCreditObjs = [];
    const creditObjs = {};
    let objId = 1;
    let emailIds;
    let transactionCode;
    let transactionId;
    let transactionObj;
    let batchNumber;
    let amount;
    let comment;
    /* End of It */
    emailIds = document.querySelectorAll('[data-field-name="email_ids"]')[0].value;
    transactionObj = document.querySelectorAll('[data-field-name="transaction_code"] option:checked')[0];
    transactionId = transactionObj.getAttribute('data-trans-id');
    transactionCode = transactionObj.getAttribute('data-trans-code');

    batchNumber = document.querySelectorAll('[data-field-name="batch_number"]')[0].value;
    amount = document.querySelectorAll('[data-field-name="amount"]')[0].value;
    comment = document.querySelectorAll('[data-field-name="comment"]')[0].value;

    /* Removing all the white spaces in the email */
    emailIds = emailIds.replace(/\s/g, '');
    emailIds = emailIds.split(',');
    /* Check for empty email addresses occur due to the email address text area ending with a comma (,) */
    emailIds.forEach((email, i) => {
      if (email.length > 0) {
        const emailObj = {};
        emailObj.id = objId++;
        emailObj.email_id = email;
        emailObj.actual_id = '';
        emailObj.full_name = '';
        emailObj.transaction_code = transactionCode;
        emailObj.transaction_id = transactionId;
        emailObj.batch_number = batchNumber;
        emailObj.amount = amount;
        emailObj.comment = comment;
        emailObj.is_deleted = false;
        emailObj.is_valid = false;
        addCreditObjs.push(emailObj);
        creditObjs[email] = i;
      }
    });

    creditObjs.data = addCreditObjs;
    creditObjs.is_confirmed = false;
    /* Save the state for comfirmation and fetches the valid emailids */
    this.props.dispatch(checkValidity(emailIds, creditObjs));
    // this.props.dispatch(checkValidity(emailIds));
  }
  render() {
    const styles = require('./CreateCredit.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(lastError);
    let transactionCodeHtml = ( <option> Loading </option> );
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    if (lastSuccess.length > 0) {
      transactionCodeHtml = lastSuccess.map((data, index) => {
        return (
                <option key={index} data-trans-id={data.id} data-trans-code={data.code}>{data.code} Description: {data.description}</option>
            );
      });
    }
    return (
      <div className={styles.container}>
        <TableHeader title={'Customer Transactions/Add Credits'} />
        <div className={styles.create_notepad_container}>
          <label className={styles.heading}>Add Credits</label>
          <div className={styles.create_form}>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label>
                Consumer Email Ids
                <br/>
                <span className={styles.label_description}> comma seperated email addresses </span>
              </label>
              <textarea rows="4" cols="40" data-field-name="email_ids"></textarea>
            </div>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label>Transaction Code</label>
              <select data-field-name="transaction_code">
                <option>Select Trans Code</option>
                {transactionCodeHtml}
              </select>
            </div>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label className={styles.label_float_left}>Batch Number</label>
              <input className={styles.constrained_input + ' form-control'} type="text" data-field-name="batch_number" />
            </div>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label className={styles.label_float_left}>Amount</label>
              <input className={styles.constrained_input + ' form-control'} type="text" data-field-name="amount" />
            </div>
            <div className={styles.indiv_element + ' ' + styles.wd_100}>
              <label>Comment</label>
              <textarea data-field-name="comment" rows="4" cols="40"></textarea>
            </div>
            <button className={styles.create_btn} disabled={ongoingRequest} onClick={this.onAddCredit.bind(this)}>Create</button>
          </div>
        </div>
      </div>);
  }
}

CreateCredit.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data};
};

export default connect(mapStateToProps)(CreateCredit);
