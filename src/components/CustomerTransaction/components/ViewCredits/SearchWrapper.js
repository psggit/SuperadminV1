import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/consumer/profile/' + dat.consumer_id}>
                { dat.consumer_id }
              </Link>
            </td>
            <td>
                { dat.amount }
            </td>
            <td>
                { dat.reason }
            </td>
            <td>
                { dat.transaction_code ? dat.transaction_code.code : 'N/A' }
            </td>
            <td>
              <Link to={'/hadmin/consumer_transactions/view_credits/' + dat.batch_number }>
                { dat.batch_number }
              </Link>
            </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no credits
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> Consumer ID </th>
                  <th> Amount </th>
                  <th> Reason </th>
                  <th> Transaction Code </th>
                  <th> Batch Number</th>
                  <th> Created At </th>
                  <th> Updated At </th>
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
        <div className={styles.list_of_states_wrapper}>
          <label>
            Customer Credits
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
