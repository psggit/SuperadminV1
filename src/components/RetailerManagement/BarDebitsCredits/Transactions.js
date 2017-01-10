import React, { PropTypes } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import TransactionsInformation from './TransactionsInformation';

import commonDecorator from '../../Common/CommonDecorator';

import formValidator from '../../Common/CommonFormValidator';

import { connect } from 'react-redux';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../../Common/Actions/Actions';

import {
  INPUT_CHANGED,
  getInitData,
  saveTransaction,
  updateTransaction,
  RESET_TXN_INFO
} from './Actions';

class Transactions extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'BAR MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Transactions',
      sequence: 2,
      link: '/hadmin/bar_management/debits_credits_landing'
    });
    this.breadCrumbs.push({
      title: 'Debits & Credits',
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    const { Id } = this.props.params;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch( getInitData(Id) )
    ])
    .then( ( ) => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( ( ) => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET }),
      this.props.dispatch({ type: RESET_TXN_INFO })
    ]);
  }
  saveTransaction() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch( saveTransaction() )
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  updateTransaction() {
    const { Id } = this.props.params;
    if ( Id ) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch( updateTransaction(Id) )
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  render() {
    const styles = require('./Transactions.scss');

    const { Id } = this.props.params;

    const {
      bars,
      transactionCode,
      amount,
      comment,
      bar_id: barId,
      bar_credits_and_debit_codes_id: codeId,
      ongoingRequest
    } = this.props;

    const submitButton = ( !Id ) ? (
      <button onClick={ this.saveTransaction.bind(this) } disabled={ ongoingRequest ? true : false }> Confirm </button>
    ) : (
      <button onClick={ this.updateTransaction.bind(this) } disabled={ ongoingRequest ? true : false }> Update </button>
    );

    const barOptions = bars.map( ( bar, index ) => {
      return (
        <option key={ index } value={ bar.id } >{ bar.name }</option>
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
            Bar Debit & Credit
          </div>
          <TransactionsInformation label = "Select Bar" currentVal = { barId } options={ barOptions } fieldName="bar_id" fieldType="int" placeholder="Select Bar"/>
          <TransactionsInformation label = "Transaction Code" currentVal = { codeId } options={ bankCodeOptions } fieldName="bar_credits_and_debit_codes_id" fieldType="int" placeholder="Select Code"/>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Amount
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="number" data-is-negative="0" min="0" data-field-name="amount" data-field-type="int" value = { amount } /> </div>
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
            { submitButton }
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
  bars: PropTypes.array.isRequired,
  transactionCode: PropTypes.array.isRequired,
  bar_id: PropTypes.number.isRequired,
  bar_credits_and_debit_codes_id: PropTypes.number.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.bar_debit_credit, ...state.page_data };
};


const decoratedOne = formValidator(Transactions, 'data-field-name', 'data-field-type', INPUT_CHANGED);

const decoratedComponent = commonDecorator(decoratedOne);

export default connect(mapStateToProps)(decoratedComponent);
