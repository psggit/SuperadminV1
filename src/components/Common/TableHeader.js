import React from 'react';

const TableHeader = ({title}) => {
  const styles = require('./Table.scss');
  const titleSplit = title.split('/');
  let breadCrumbs;
  if (titleSplit.length > 0) {
    breadCrumbs = titleSplit.map((titl, index) => {
      let isTitle;
      if (index === titleSplit.length - 1) {
        isTitle = true;
      } else {
        isTitle = false;
      }
      return (
              <li key={index} className={(isTitle) ? 'active' : ''}> {titl} </li>
          );
    });
  } else {
    breadCrumbs = () => {
      return (
            <li>
              Wrong input to bread crumb
            </li>
          );
    }();
  }
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
        <ol className = "breadcrumb">
          {breadCrumbs}
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
