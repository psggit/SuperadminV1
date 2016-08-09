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
              <Link to={'/hadmin/skus/edit_sku/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.brand.brand_name}
            </td>
            <td>
              Active
            </td>
            <td>
                { (dat.volume) ? dat.volume : 'N/A'}
            </td>
            <td>
                { (dat.alcohol_per) ? dat.alcohol_per : 'N/A'}
            </td>
            <td>
                { (dat.test_vol ) ? dat.test_vol : 'N/A'}
            </td>
            <td>
                { (dat.barcode ) ? dat.barcode : 'N/A'}
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
          Sorry no Skus
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
                  <th> Brand Name </th>
                  <th> Status </th>
                  <th> Volume </th>
                  <th> Alcohol Percentage </th>
                  <th> Test Volume </th>
                  <th> Bar Code </th>
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
            List of Skus
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
