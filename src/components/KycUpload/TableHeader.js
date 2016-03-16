import React from 'react';

const TableHeader = () => {
  const styles = require('./Table.scss');
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
      <ol className = "breadcrumb">
        <li><a href = "#">KYC </a></li>
        <li><a href = "/consumer/kycfunctions"> KYC Functions </a></li>
        <li className = "active"> Upload KYC </li>
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
export default TableHeader;
