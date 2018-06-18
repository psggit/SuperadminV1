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
  const sIn = new Date(document.getElementById('start_date').value).getTime() - 19800000;
  const eIn = new Date(document.getElementById('end_date').value).getTime() - 19800000;
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

const sendRequest1 = (e) => {
  // Json Creator
  e.preventDefault();
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const a = document.getElementById('roletap');
  const role = a.getAttribute('value');
  const option = document.getElementById('option');
  const data = option.options[option.selectedIndex].value;
  url += data;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const disposition = xhr.getResponseHeader('content-disposition');
      const matches = /"([^"]*)"/.exec(disposition);
      const filename = (matches !== null && matches[1] ? matches[1] : 'export.csv');

      const blob = new Blob([xhr.response], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  };

  // const formData = new FormData();

  const sIn = new Date(document.getElementById('sstart_date').value).getTime();
  const eIn = new Date(document.getElementById('eend_date').value).getTime();
  // formData.append('start_date', sIn);
  // formData.append('start_date', sIn);
  // formData.append('end_date', eIn);
  const dat = 'start_date=' + sIn + '&end_date=' + eIn;
  xhr.open('POST', url);
  xhr.withCredentials = true;
  xhr.setRequestHeader('X-HASURA-ROLE', role);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(dat);
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
            <div className={styles.parent}>
                <label> Select Type of Report</label>
                <div>
                  <select onChange = {changeUrl} id = "option">
                      <option value = "bar_settlement_report">Bar Settlement Report</option>
                      <option value = "retailer_settlement_report">Retailer Settlement Report</option>
                      <option value = "horeca_sales_report">Horeca Sales Report</option>
                      <option value = "bars_reservations">Bars Reservation</option>
                      <option value = "retailers_reservations">Retailers Reservation</option>
                      <option value = "retailer_redemption_report">Retailer Redemption Report</option>
                      <option value = "bm_adv_settlement_report">BM ADV Settlement Report</option>
                      <option value = "brand_sales_report">Brand Sales Report</option>
                      <option value = "bar_manual_credits_and_debits_report">Bar Manual Credits And Debits Report</option>
                      <option value = "brand_manager_promo_settlement_report">Brand Manager Promo Settlement Report</option>
                      <option value = "retailer_manual_credits_and_debits_report">Retailer Manual Credits and Debits Report</option>
                      <option value = "consumer_manual_credits_and_debits_view">Consumer Manual Credit and Debit View</option>
                      <option value = "bars_redeem_and_cancellation_report">Bars Redeem and Cancellation Report</option>
                      <option value = "loading_cash_into_wallet">Loading Cash Into Wallet</option>
                      <option value = "customer_outstanding_in_ppi">Consumer Outstanding In PPI</option>
                      <option value = "delivery_boy_report">Delivery Person Report</option>
                  </select>
                  <input name = "start_date" onChange = {convertStartDate} id = "sstart_date" type="date"></input>
                  <input name = "end_date" onChange = {convertEndDate} id = "eend_date" type="date"></input>
                  <form id = "download_form" action= {url} content-type="application/json" method="post">
                    <input className = "hide" name = "start_date" id = "start_date" type="int"></input>
                    <input className = "hide" name = "end_date" id = "end_date" type="int"></input>
                    <input className = "hide" type = "submit"></input>
                  </form>
                  <button className = "hide" onClick={sendRequest}>Download</button>
                  <button onClick={sendRequest1}>Download</button>
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
