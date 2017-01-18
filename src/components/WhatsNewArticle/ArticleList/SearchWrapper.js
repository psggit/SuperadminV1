import React from 'react';

import Endpoints from '../../../Endpoints';

const SearchWrapper = ( {data, onClickActivate} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    if (updatedAt !== null) {
      updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
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

    let articleStatus = 'Deactivate';
    let buttonClass = 'btn btn-danger';
    if (dat.is_active === false) {
      articleStatus = 'Activate';
      buttonClass = 'btn btn-success';
    }

    return (
          <tr key={index}>
            <td>
                <button className={buttonClass} data-article-id={dat.id} data-is-active={dat.is_active} onClick={onClickActivate}>
                {articleStatus}
                </button>
            </td>
            <td> { dat.id } </td>
            <td> { dat.title } </td>
            <td> { dat.description } </td>
            <td> { dat.content } </td>
            <td> { cities } </td>
            <td> <img src={ Endpoints.file_get + dat.image }></img> </td>
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
