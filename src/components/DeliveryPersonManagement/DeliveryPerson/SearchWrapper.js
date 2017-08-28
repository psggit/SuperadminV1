import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./DPManagement.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/state_management/edit/' + dat.id}>
                <button className={styles.edit_btn} data-state-id={dat.id}>
                  Edit
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.name}
            </td>
            <td>
                { dat.city_name }
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Delivery Person
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
                  <th> Employee Name </th>
                  <th> City </th>
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
            List of Delivery Person
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
