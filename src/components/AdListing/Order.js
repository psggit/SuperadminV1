import React from 'react';

const Order = ({allList, orderChange, adType}) => {
  const styles = require('./CreateBarAd.scss');
  const allListHtml = allList.map((list) => {
    return (
      <li>
        <label>[{list.table}] {list.title} (Order:{list.listing_order}) ({list.ad_location})</label>
        <input className={(adType === list.table ? '' : 'hide')} id={list.id} onChange={orderChange}/>
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
