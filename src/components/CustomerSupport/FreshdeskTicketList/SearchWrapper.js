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
              <Link to={'/hadmin/brand_management/edit/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.brand_name}
            </td>
            <td>
              Active
            </td>
            <td>
                { (dat.category) ? dat.category.name : 'N/A'}
            </td>
            <td>
                { (dat.genre) ? dat.genre.genre_name : 'N/A'}
            </td>
            <td>
                { (dat.company) ? dat.company.name : 'N/A'}
            </td>
            <td>
                { (dat.company) ? dat.company.name : 'N/A'}
            </td>
            <td>
                { (dat.company) ? dat.company.name : 'N/A'}
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
          Sorry no Brands
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
                  <th> Customer Email </th>
                  <th> Subject </th>
                  <th> Description </th>
                  <th> Status </th>
                  <th> Freshdesk ID </th>
                  <th> Priority </th>
                  <th> No of emails in thread </th>
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
            Freshdesk ticket list
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
