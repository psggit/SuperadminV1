import React from 'react';
import { Link } from 'react-router';

const CompaniesList = ( {data} ) => {
  const styles = require('./CompaniesList.scss');
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
              <Link to={'/hadmin/companies_management/edit/' + dat.id}>
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
                { dat.address }
            </td>
            <td>
                { dat.pin_code }
            </td>
            <td>
                { dat.status ? dat.status : 'N/A' }
            </td>
            <td>
                { createdAt }
            </td>
            <td>
                { updatedAt }
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no companies
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
                  <th> Company Name </th>
                  <th> Address </th>
                  <th> Pin Code </th>
                  <th> Status </th>
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
            List of Companies
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default CompaniesList;
