import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import TransactionsInformation from './TransactionsInformation';
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
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./Transactions.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.transactions_wrapper}>
          <div className = {styles.transactions_head}>
            Retailer Debit & Credit
          </div>
          <TransactionsInformation label = "Select Branch" val = "Name" />
          <TransactionsInformation label = "Transaction Code" val = "A1011" />
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Amount
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" value="2000"/>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Comment
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea></textarea>
            </div>
          </div>
          <div className={styles.transactions_btn}>
            <button> Confirm </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Transactions;
