import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( { data } ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/miscellaneous_item/update/' + dat.id}>
                <button className={styles.edit_btn}>
                  Edit
                </button>
              </Link>
            </td>
            <td>
              <Link to={'/hadmin/miscellaneous_item/' + dat.id + '/map'}>
                <button className={styles.edit_btn}>
                  View
                </button>
              </Link>
            </td>
            <td>
              { dat.id }
            </td>
            <td>
              { dat.name }
            </td>
            <td>
              { dat.volume}
            </td>
            <td>
              { dat.short_description }
            </td>

          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Miscellaneous Yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th></th>
                  <th> Bar Mapping </th>
                  <th> Id </th>
                  <th> Item</th>
                  <th> Volume</th>
                  <th> Short Description </th>
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
            Manage Miscellaneous Environment
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
