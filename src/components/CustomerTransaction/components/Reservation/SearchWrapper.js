import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;
    const isGift = (dat.is_gift) ? 'Yes' : 'No';

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    return (
          <tr key={index}>
            <td> { dat.id } </td>
            <td>
              <Link to={'/consumer/profile/' + dat.consumer_id}>
                { dat.consumer_id }
              </Link>
            </td>
            <td> { dat.amount } </td>
            <td> { isGift } </td>
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
        <table className={styles.table_fixed_layout + ' table table-hover'}>
          <thead>
            <tr>
              <th> ID </th>
              <th> Consumer ID </th>
              <th> Amount </th>
              <th> Is Gift </th>
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
            Reservations
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
