import React from 'react';
import { Link } from 'react-router';

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
            <td>
              <Link to={ '/hadmin/consumer_transactions/redemptions/' + dat.id + '/items' }>
                { dat.id }
              </Link>
            </td>
            <td>
              <Link to={'/hadmin/consumer/profile/' + dat.consumer_id}>
                { dat.consumer_id }
              </Link>
            </td>
            <td>
              { dat.retailer_pos.retailer ? dat.retailer_pos.retailer.id : dat.retailer_pos.bar.id }
            </td>
            <td>
              { dat.retailer_pos.retailer ? dat.retailer_pos.retailer.org_name : dat.retailer_pos.bar.name }
            </td>
            <td> { dat.amount } </td>
            <td> { dat.rating } </td>
            <td> { dat.itemtype } </td>
            <td> { dat.feedback } </td>
            <td> { dat.status } </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no redemptions yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
        <table className={styles.table_fixed_layout + ' table table-striped'}>
          <thead>
            <tr>
              <th> ID </th>
              <th> Consumer ID </th>
              <th> ID </th>
              <th> Retailer/Bar Name </th>
              <th> Amount </th>
              <th> Rating </th>
              <th> Item Type </th>
              <th> Feedback </th>
              <th> Status </th>
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
            Redemptions
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
