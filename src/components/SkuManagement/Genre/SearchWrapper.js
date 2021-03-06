import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    const imageUrl = dat.image ? ( <a target="_blank" href={ dat.image }> <img src={ dat.image } width="40px" height="40px" /> </a> ) : 'N/A';

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/genre_management/edit/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
              { imageUrl }
            </td>
            <td>
                { dat.genre_name}
            </td>
            <td>
                { dat.display_name }
            </td>
            <td>
                { dat.ordinal_position }
            </td>
            <td>
                { dat.is_active ? 'Active' : 'Inactive' }
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
          Sorry no genres added
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
                  <th> Image </th>
                  <th> Genre Name </th>
                  <th> Display Name </th>
                  <th> Display Order </th>
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
            List of Genres
          </label>
          <div className={'table-responsive ' + styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
