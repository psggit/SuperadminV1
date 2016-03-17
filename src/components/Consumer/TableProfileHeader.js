import React from 'react';

const TableProfileHeader = ({title}) => {
  const styles = require('./Table.scss');
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
      <ol className = "breadcrumb">
        <li><a href = "#">CUSTOMER MANAGEMENT</a></li>
          <li><a href = "/consumer/profiles">Consumer Profile</a></li>
        <li className = "active">{title}</li>
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
