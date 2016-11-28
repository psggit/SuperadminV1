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
    if (updatedAt !== null) {
      updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
    } else {
      updatedAt = 'NA';
    }

    let cities = '';
    for (let i = 0; i < dat.cities.length; i++) {
      if (i !== 0) {
        cities += ',';
      }
      cities += dat.cities[i].city.name;
    }

    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/whats_new/edit/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td> { dat.title } </td>
            <td> { dat.description } </td>
            <td> { dat.content } </td>
            <td> { cities } </td>
            <td> <img src={ dat.image }></img> </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no articles
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
                  <th> Description </th>
                  <th> Content </th>
                  <th> Cities </th>
                  <th> Image </th>
                  <th> Created </th>
                  <th> Updated </th>
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
            List of Articles
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
