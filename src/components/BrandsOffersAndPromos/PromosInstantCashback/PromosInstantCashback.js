import React from 'react';
import { connect } from 'react-redux';

const PromosInstantCashback = () => { // eslint-disable-line no-unused-vars
  const styles = require('./PromosInstantCashback.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.complete_container}>
        <div className={styles.compaign_details}>
          <div className={styles.heading + ' ' + styles.wd_100}>Campaign details</div>
            <ul>
              <li>
                <label>Brand Manager Email</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Compaign Name</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Budgeted Amount</label>
                <input type="number" />
              </li>
              <li>
                <label>Funds Credited</label>
                <input type="number" />
              </li>
              <li>
                <label>Active From</label>
                <input type="date" />
              </li>
              <li>
                <label>Active To</label>
                <input type="date" />
              </li>
              <li>
                <label>Campaign Status</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
            </ul>
        </div>
      </div>
    </div>);
};

export default connect()(PromosInstantCashback);
