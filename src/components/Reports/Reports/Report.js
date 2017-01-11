import React from 'react';
import { connect } from 'react-redux';

import TableHeader from '../../Common/TableHeader';
import requestAction from '../../Common/Actions/simpleRequest';
import Endpoints, { globalCookiePolicy } from '../../../Endpoints';
import { REQUEST_SUCCESS,
  REQUEST_ERROR } from '../../Common/Actions/Actions';

const sendRequest = (e) => {
  // Json Creator
  e.preventDefault();
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const option = document.getElementById('option');
  const data = option.options[option.selectedIndex].value;
  url += data;
  const startInput = document.getElementById('start_date').value;
  const endInput = document.getElementById('end_date').value;
  const queryObj = {'data': {'start_date': startInput, 'end_date': endInput}};
  let insertObj = {};
  insertObj = {
    method: 'POST',
    body: JSON.stringify(queryObj),
    headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
    credentials: globalCookiePolicy
  };
  requestAction(url, insertObj, REQUEST_SUCCESS, REQUEST_ERROR);
};

const Report = ({stateData}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Reports.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <TableHeader title={'Report Generation'} />
            <div className="clearfix"></div>
            <div className={styles.customer_transaction_links}>
                <label> Select Type of Report</label>
                <select id = "option">
                    <option value = "bar_settlement_report">Bar Settlement Report</option>
                    <option value = "retailer_settlement_report">Retailer Settlement Report</option>
                </select>
                <input id = "start_date" type="date"></input>
                <input id = "end_date" type="date"></input>
                <button onClick={sendRequest}>Download</button>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(Report);
