import React from 'react';

/*

  componentDidMount:
    //Create async function:
        //Emit fetchData action
        //Fetch the data
          //On success: Emit the successData action
          //On error: Emit the errorData action
*/

const Users = ({userColumns, users, ongoingRequest, lastError}) => {
  const styles = require('./Users.scss');
  const table = {
    headings: userColumns,
    rows: users
  };
  const tableHeadings = table.headings.map((heading) => (<th>{heading}</th>));
  const tableRows = table.rows.map((row) => (
    <tr>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.age}</td>
    </tr>));
  return (
    <div className="container-fluid">
      <div className={styles.filterOptions}>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table + ' table table-bordered'}>
          <tr>
            {tableHeadings}
          </tr>
          {tableRows}
        </table>
      </div>
    </div>
  );
};

export default Users;
