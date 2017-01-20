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
              <Link to={'/hadmin/retailer_management/edit_organization/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td>
              { dat.id }
            </td>
            <td> { dat.organisation_name } </td>
            <td> { dat.type_of_organisation } </td>
            <td> { dat.bars.length } </td>
            <td> { dat.retailers.length } </td>
            <td> { dat.kyc_status === 'true' ? 'Verified' : 'Not Verified' } </td>
            <td> { dat.status === 'true' ? 'Active' : 'Inactive' } </td>
            <td> { dat.pan_number } </td>
            <td> { dat.tin_number } </td>
            <td> { dat.tan_number } </td>
            <td> { dat.annual_turnover } </td>
            <td> { createdAt } </td>
            <td> { updatedAt} </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Organisations
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
                  <th> Organisation Name </th>
                  <th> Type of Organisation </th>
                  <th> Bar Outlets </th>
                  <th> Retail Outlets </th>
                  <th> Kyc Status </th>
                  <th> Organisation Status </th>
                  <th> Pan Number </th>
                  <th> Tin Number </th>
                  <th> Tan Number </th>
                  <th> Annual Turnover </th>
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
            Organisations
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
