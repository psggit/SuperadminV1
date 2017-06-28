import React from 'react';

const Order = ({allList, orderChange}) => {
  const styles = require('./CreateBarAd.scss');
  const allListHtml = allList.map((list) => {
    return (
      <li>
        <label>{list.title} Order:{list.listing_order}</label>
        <input id={list.id} onChange={orderChange}/>
      </li>
    );
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>LISTING ORDER DETAILS</div>
          <ul>
            {allListHtml}
          </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default Order;
// Change emitter is the function
