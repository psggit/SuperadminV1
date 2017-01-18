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
  const sIn = new Date(document.getElementById('start_date').value).getTime();
  const eIn = new Date(document.getElementById('end_date').value).getTime();
  const queryObj = {'start_date': sIn, 'end_date': eIn};
  let insertObj = {};
  insertObj = {
    method: 'POST',
    body: JSON.stringify(queryObj),
    headers: { 'Content-Type': 'application/json', 'X-HASURA-ROLE': 'admin'},
    credentials: globalCookiePolicy
  };
  requestAction(url, insertObj, REQUEST_SUCCESS, REQUEST_ERROR);
};

const changeUrl = () => {
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const option = document.getElementById('option');
  const data = option.options[option.selectedIndex].value;
  url += data;
  document.getElementById('download_form').setAttribute('action', url);
};
const convertStartDate = () => {
  const sIn = new Date(document.getElementById('sstart_date').value).getTime();
  document.getElementById('start_date').value = sIn;
};
const convertEndDate = () => {
  const sIn = new Date(document.getElementById('eend_date').value).getTime();
  document.getElementById('end_date').value = sIn;
};

const Report = ({stateData}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Reports.scss');
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const data = 'bar_settlement_report';
  url += data;
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <TableHeader title={'Report Generation'} />
            <div className="clearfix"></div>
            <div className={styles.customer_transaction_links}>
                <label> Select Type of Report</label>
                <div>
                  <select onChange = {changeUrl} id = "option">
                      <option value = "bar_settlement_report">Bar Settlement Report</option>
                      <option value = "retailer_settlement_report">Retailer Settlement Report</option>
                  </select>
                  <input name = "start_date" onChange = {convertStartDate} id = "sstart_date" type="date"></input>
                  <input name = "end_date" onChange = {convertEndDate} id = "eend_date" type="date"></input>
                  <form id = "download_form" action= {url} content-type="application/json" method="post">
                    <input className = "hide" name = "start_date" id = "start_date" type="int"></input>
                    <input className = "hide" name = "end_date" id = "end_date" type="int"></input>
                    <input type = "submit"></input>
                  </form>
                  <button className = "hide" onClick={sendRequest}>Download</button>
                </div>
            </div>
            <div>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(Report);
