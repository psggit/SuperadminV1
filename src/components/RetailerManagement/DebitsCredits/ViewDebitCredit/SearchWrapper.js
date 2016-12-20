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
              <Link to={'/hadmin/retailer_management/debit_credit_transactions/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.retailer.org_name}
            </td>
            <td>
                { (dat.retailer_credits_and_debit_code) ? dat.retailer_credits_and_debit_code.code : 'N/A'}
            </td>
            <td>
                { dat.amount }
            </td>
            <td>
                { dat.comment }
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
          Sorry no Debits And Credits
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID </th>
                  <th> Branch Name </th>
                  <th> Code </th>
                  <th> Amount </th>
                  <th> Comment </th>
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
            Retailer Debits and Credits
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
