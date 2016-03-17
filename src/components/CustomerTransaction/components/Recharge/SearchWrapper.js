import React from 'react';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    return (
          <tr key={index}>
            <td> { dat.id } </td>
            <td> { dat.consumer_id } </td>
            <td> { dat.payment_detail.txn_id } </td>
            <td> { dat.payment_detail.pay_mih_id } </td>
            <td> { dat.payment_detail.bank_ref_num } </td>
            <td> { dat.payment_detail.amount } </td>
            <td> { (dat.payment_detail.is_success) ? 'Successful' : 'Failed'} </td>
            <td> { dat.payment_detail.mode } </td>
            <td> { dat.payment_detail.bank_code} </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no recharges
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th> ID </th>
              <th> Consumer ID </th>
              <th> Transaction ID</th>
              <th> PayU Txn ID </th>
              <th> Bank Ref ID </th>
              <th> Amount </th>
              <th> Status </th>
              <th> Mode </th>
              <th> Bank Code </th>
              <th> Updated At </th>
              <th> Created At </th>
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
            Recharges
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
