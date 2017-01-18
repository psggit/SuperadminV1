import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;
    // consumer/profile/:ID

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/customer_support/freshdesk_ticket/' + dat.freshdesk_token_id} target="_blank">
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
              <Link to={ (dat.consumer_email) ? '/hadmin/consumer/profile/' + dat.consumer_id : ''}>
                { (dat.consumer_id) ? dat.consumer_id : 'N/A'}
              </Link>
            </td>
            <td>
                { (dat.freshdesk_token_id) ? dat.freshdesk_token_id : 'N/A'}
            </td>
            <td>
                { (dat.status) ? dat.status : 'N/A'}
            </td>
            <td>
                { (dat.status) ? dat.status : 'N/A'}
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          No Tickets found!
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
                  <th> Code </th>
                  <th> Descripition </th>
                    <th> Type </th>
                  <th> Status </th>
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
          <div className={styles.list_of_states_btn}>
            <button>Create Code </button>
          </div>
          <label>
            List of Consumer Device Disable Codes
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
