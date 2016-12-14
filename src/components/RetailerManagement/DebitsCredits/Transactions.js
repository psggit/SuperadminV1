import React, { PropTypes } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import TransactionsInformation from './TransactionsInformation';

import commonDecorator from '../../Common/CommonDecorator';

import formValidator from '../../Common/CommonFormValidator';

import { connect } from 'react-redux';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import {
  INPUT_CHANGED,
  getInitData,
  saveTransaction
} from './Actions';

class Transactions extends React.Component {
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
      title: 'Transactions',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Debits & Credits',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch( getInitData() )
    ])
    .then( ( ) => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( ( ) => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  saveTransaction() {
    this.props.dispatch( saveTransaction() );
  }
  render() {
    const styles = require('./Transactions.scss');

    const {
      retailers,
      transactionCode,
      amount,
      comment,
      retailer_id: retailerId,
      retailer_credits_and_debit_codes_id: codeId
    } = this.props;

    const retailerOptions = retailers.map( ( retailer, index ) => {
      return (
        <option key={ index } value={ retailer.id } >{ retailer.org_name }</option>
      );
    });

    const bankCodeOptions = transactionCode.map( ( bankCode, index ) => {
      return (
        <option key = { index } value={ bankCode.id } >{ bankCode.code } - { bankCode.code_type } </option>
      );
    });

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.transactions_wrapper}>
          <div className = {styles.transactions_head}>
            Retailer Debit & Credit
          </div>
          <TransactionsInformation label = "Select Branch" currentVal = { retailerId } options={ retailerOptions } fieldName="retailer_id" fieldType="int" placeholder="Select Branch"/>
          <TransactionsInformation label = "Transaction Code" currentVal = { codeId } options={ bankCodeOptions } fieldName="retailer_credits_and_debit_codes_id" fieldType="int" placeholder="Select Code"/>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Amount
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="amount" data-field-type="int" value = { amount } /> </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Comment
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea data-field-name="comment" data-field-type="text" value={ comment } ></textarea>
            </div>
          </div>
          <div className={styles.transactions_btn}>
            <button onClick={ this.saveTransaction.bind(this) }> Confirm </button>
          </div>
        </div>
      </div>
    );
  }
}

Transactions.propTypes = {
  params: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  retailers: PropTypes.array.isRequired,
  transactionCode: PropTypes.array.isRequired,
  retailer_id: PropTypes.number.isRequired,
  retailer_credits_and_debit_codes_id: PropTypes.number.isRequired

};

const mapStateToProps = ( state ) => {
  return { ...state.retailer_debit_credit, ...state.page_data };
};


const decoratedOne = formValidator(Transactions, 'data-field-name', 'data-field-type', INPUT_CHANGED);

const decoratedComponent = commonDecorator(decoratedOne);

export default connect(mapStateToProps)(decoratedComponent);
