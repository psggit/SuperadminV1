import React form 'react';

const ChildRels = ({tableName, query, rows, schemas, path, dispatch}) => { // eslint-disable-line no-unused-vars
  // For each element in the query's columns that are objects, 
  // show tabs
  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs">
        <li role="presentation" className={(tabName === 'view') ? 'active' : ''}>
          <Link to={'/consumer/' + tableName + '/view'}>Browse rows</Link>
        </li>
        <li role="presentation" className={(tabName === 'insert') ? 'active' : ''}>
          <Link to={'/consumer/' + tableName + '/insert'}>Insert row</Link>
        </li>
        <li role="presentation" className={(tabName === 'modify') ? 'active' : ''}>
          <Link to={'/consumer/' + tableName + '/modify'}>Modify table</Link>
        </li>
      </ul>
    </div>
  );

};

export default ChildRels;
