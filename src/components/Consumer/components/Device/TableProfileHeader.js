import React from 'react';
import { Link } from 'react-router';

const TableProfileHeader = ({title}) => {
  const styles = require('./Table.scss');
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
      <ol className = "breadcrumb">
        <li><a href = "#">Customer Management</a></li>
          <li><Link to ={'/hadmin/consumer/profiles'}>Consumer Profile</Link></li>
          <li><Link to = {'/hadmin/consumer/profile/' + title} >{title}</Link></li>
        <li className = "active">Device History</li>
        </ol>
        <div className="clearfix"></div>
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
export default TableProfileHeader;
