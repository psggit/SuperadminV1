import React from 'react';
import { Link } from 'react-router';

const TableHeader = ({tableName, tabName}) => {
  const styles = require('./Table.scss');
  return (
    <div>
      <div className={styles.header}>
        <h3>{tableName}</h3>
        <div className="clearfix"></div>
      </div>
      <br/>
      <div className="container-fluid">
        <ul className="nav nav-tabs">
          <li role="presentation" className={(tabName === 'view') ? 'active' : ''}>
            <Link to={'/tables/' + tableName + '/view'}>Browse rows</Link>
          </li>
          <li role="presentation" className={(tabName === 'insert') ? 'active' : ''}>
            <Link to={'/tables/' + tableName + '/insert'}>Insert row</Link>
          </li>
          <li role="presentation" className={(tabName === 'modify') ? 'active' : ''}>
            <Link to={'/tables/' + tableName + '/modify'}>Modify table</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
/*
   <ul class="nav nav-tabs">
     <li role="presentation" class="active"><a href="#">Home</a></li>
       <li role="presentation"><a href="#">Profile</a></li>
         <li role="presentation"><a href="#">Messages</a></li>
         </ul>
*/
export default TableHeader;
