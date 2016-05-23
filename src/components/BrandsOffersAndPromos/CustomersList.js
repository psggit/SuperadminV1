import React from 'react';
import { Link } from 'react-router';

const CustomersList = ( {data} ) => {
  const styles = require('./CustomersList.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/state_management/edit/' + dat.id}>
                <button className={styles.edit_btn} data-state-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.name }
            </td>
            <td>
                { dat.email }
            </td>
            <td>
                { dat.mobile }
            </td>
            <td>
                { dat.company }
            </td>
            <td>
                { dat.created }
            </td>
            <td>
                { dat.updated }
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
                  <th> Name </th>
                  <th> Email </th>
                  <th> Mobile </th>
                  <th> Company </th>
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
            List of States
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default CustomersList;
