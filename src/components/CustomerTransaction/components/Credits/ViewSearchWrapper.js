import React from 'react';
// import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./ViewSearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td> { dat.consumer ? dat.consumer.full_name : 'N/A'} </td>
            <td>
                { dat.consumer ? dat.consumer.email : 'N/A'}
            </td>
            <td> { dat.amount} </td>
            <td> { dat.id} </td>
            <td> { dat.batch_number} </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no credits added yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Amount </th>
                  <th> Transaction ID </th>
                  <th> Batch Number </th>
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
            View Credits
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
