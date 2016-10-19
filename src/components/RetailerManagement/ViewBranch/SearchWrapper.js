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
              <Link to={'/hadmin/retailer_management/edit_branch/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td>
              { dat.id }
            </td>
            <td> { dat.org_name } </td>
            <td> { dat.org_address } </td>
            <td> { dat.type } </td>
            <td> { dat.kyc_status ? dat.kyc_status : 'N/A' } </td>
            <td> { dat.branch_status ? dat.branch_status : 'N/A'} </td>
            <td> { createdAt } </td>
            <td> { updatedAt} </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Retailers
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
                  <th> Retailer Name </th>
                  <th> Address </th>
                  <th> Type of Retailer </th>
                  <th> Kyc Status </th>
                  <th> Branch Status </th>
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
            Retailers
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
