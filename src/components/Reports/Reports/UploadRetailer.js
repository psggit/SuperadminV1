import React from 'react';
import { connect } from 'react-redux';

import TableHeader from '../../Common/TableHeader';
import Endpoints from '../../../Endpoints';


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
                <input type = "submit"></input>
              </form>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(Report);
