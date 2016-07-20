import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data, state, genre, handleDelete} ) => {
  const styles = require('../../Brand/SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    const brandUrl = '/hadmin/brand_management/edit/' + dat.sku.brand.id;

    return (
          <tr key={index}>
            <td>
              <button className={styles.edit_btn} data-sku-id={dat.id} data-brand-id={ dat.sku.brand.id } onClick={ handleDelete }>
                Delete
              </button>
            </td>
            <td> { dat.id } </td>
            <td>
              <Link to={ brandUrl }>
                { dat.sku.brand.brand_name}
              </Link>
            </td>
            <td>
              { dat.sku.volume } ml
            </td>
            <td>
              SKU
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
          Sorry no Top Picks Available
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
                  <th> Title </th>
                  <th> Volume </th>
                  <th> Type </th>
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
            List of Top Picks in { state } for { genre }
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
