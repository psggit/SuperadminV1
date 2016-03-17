import React from 'react';

const TableProfileHeader = ({title}) => {
  const styles = require('./Table.scss');
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
      <ol className = "breadcrumb">
        <li><a href = "#">KYC </a></li>
        <li><a href = "/consumer/kycfunctions"> KYC Functions </a></li>
        <li><a href = "/consumer/kycfunctions/upload_kyc"> Upload KYC </a></li>
        <li className = "active"> {title} </li>
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
