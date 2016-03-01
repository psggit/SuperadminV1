import React from 'react';

const TableHeader = ({title}) => {
  const styles = require('./Table.scss');
  return (
    <div>
      <div className={styles.header}>
        <h3> {title} </h3>
        <div className="clearfix"></div>
      </div>
      <br/>
      <div className="container-fluid">
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
