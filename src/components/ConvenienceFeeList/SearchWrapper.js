import React from 'react';

const SearchWrapper = ( { data, onClickHandler } ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <button className={styles.edit_btn} data-inventory-id={dat.id} onClick={ () => { return onClickHandler(dat.id, dat.is_active); }}>
                { dat.is_active ? 'Disable' : 'Enable' }
              </button>
            </td>
            <td>
              { dat.id }
            </td>
            <td> { dat.state_short_name } </td>
            <td> { dat.percentage}</td>
            <td>
              { dat.valid_from }
            </td>
            <td>
              { dat.valid_to}
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          No Convenience Fees alloted
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
                  <th> Id </th>
                  <th> State</th>
                  <th> Percentage</th>
                  <th> Valid From</th>
                  <th> Valid To</th>
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
            Manage Conveince Fee
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
