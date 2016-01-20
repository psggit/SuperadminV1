import React from 'react';

const Users = () => {
  const styles = require('./Users.scss');
  const table = {
    headings: ['id', 'name', 'age'],
    rows: [
      { id: 1, name: 'Tanmai', age: 4},
      { id: 2, name: 'Tanmai', age: 4},
      { id: 3, name: 'Tanmai', age: 4},
      { id: 4, name: 'Tanmai', age: 4},
      { id: 5, name: 'Tanmai', age: 4},
      { id: 6, name: 'Tanmai', age: 4},
      { id: 7, name: 'Tanmai', age: 4},
      { id: 8, name: 'Tanmai', age: 4},
      { id: 9, name: 'Tanmai', age: 4},
      { id: 4, name: 'Tanmai', age: 4},
      { id: 2, name: 'Tanmai', age: 4}
    ]
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
