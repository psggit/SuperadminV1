import React from 'react';
import { Link } from 'react-router';

const ConsumerSearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/consumer/profile/' + dat.consumer_id }>
                { dat.consumer_id }
              </Link>
            </td>
            <td> { createdAt } </td>
            <td> { (dat.type ) ? dat.type : 'N/A' } </td>
            <td> { (dat.order_id ) ? dat.order_id : 'N/A' } </td>
            <td> { (dat.amount ) ? dat.amount : 'N/A' } </td>
            <td> Rs. { (dat.opening_balance) ? dat.opening_balance : 0 } </td>
            <td> Rs. { (dat.closing_balance ) ? dat.closing_balance : 0 } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no consumers Transactions yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={styles.table_fixed_layout + ' table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> CreatedAt </th>
                  <th> Type </th>
                  <th> Order Id </th>
                  <th> Amount </th>
                  <th> Opening Balance </th>
                  <th> Closing Balance </th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
      );
    }();
  }

  return (
        <div className={styles.search_wrapper}>
          <div className={styles.header_element}>
            Consumer Transactions
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default ConsumerSearchWrapper;
