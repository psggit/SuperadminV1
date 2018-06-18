import React from 'react';
import { connect } from 'react-redux';

import TableHeader from '../../Common/TableHeader';
import Endpoints from '../../../Endpoints';

const sendRequest1 = (e) => {
  // Json Creator
  e.preventDefault();
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const file = document.getElementById('file');
  const option = 'retailer_settlements/upload';
  const a = document.getElementById('roletap');
  const role = a.getAttribute('value');
  url += option;
  const data = new FormData();
  data.append('file', file.files[0], file.files[0].name);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('success');
    }
  };

  xhr.open('POST', url);
  xhr.withCredentials = true;
  xhr.setRequestHeader('X-HASURA-ROLE', role);
  // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary="thisistheboundary"');
  xhr.send(data);
};


const Report = ({stateData}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Reports.scss');
  let url = Endpoints.reportUrl + '/reports/admin_reports/';
  const option = 'retailer_settlements/upload';
  url += option;
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <TableHeader title={'Report Generation'} />
            <div className="clearfix"></div>
            <div>
              <form encType="multipart/form-data" action={url} method="post">
                <input id = "file" name = "file" type = "file"></input>
                <input className="hide" type = "submit"></input>
              </form>
              <button onClick={sendRequest1}>Upload</button>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(Report);
