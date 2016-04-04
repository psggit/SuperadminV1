import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.consumer ? dat.consumer.created_at : new Date().toISOString();
    let updatedAt = dat.consumer ? dat.consumer.updated_at : new Date().toISOString();

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/consumer/kycfunctions/upload_kyc/upload_kyc_profile/' + dat.consumer.id } >
                <button className={styles.edit_btn} data-state-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td>
              { dat.consumer ? dat.consumer.id : 'N/A'}
            </td>
            <td>
                { dat.consumer ? dat.consumer.full_name : 'N/A'}
            </td>
            <td>
                { dat.consumer ? dat.consumer.email : 'N/A'}
            </td>
            <td>
                { dat.consumer ? dat.consumer.mobile_number : 'N/A'}
            </td>
            <td>
                { dat.consumer ? dat.consumer.level_id : 'N/A'}
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
          Sorry no consumers available
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
                  <th> Name </th>
                  <th> Email </th>
                  <th> Mobile Number </th>
                  <th> KYC Level </th>
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
        <div className={styles.list_of_states_wrapper}>
          <label>
            All Users
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
