import React from 'react';
import { Link } from 'react-router';

const AdsList = ( {data} ) => {
  const styles = require('./AdsList.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <Link to={'#'}>
                <button className={styles.edit_btn} data-state-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.type }
            </td>
            <td>
                { dat.ad_title }
            </td>
            <td>
                { dat.ad_location }
            </td>
            <td>
                { dat.status }
            </td>
            <td>
                { dat.active_from }
            </td>
            <td>
                { dat.active_to }
            </td>
            <td>
                { dat.created_at }
            </td>
            <td>
                { dat.updated_at }
            </td>
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
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID </th>
                  <th> Type </th>
                  <th> Title</th>
                  <th> Ad Location</th>
                  <th> Status</th>
                  <th> Active From</th>
                  <th> Active To</th>
                  <th> Created At</th>
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
            List of Ads
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default AdsList;
