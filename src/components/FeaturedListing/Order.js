import React from 'react';

const Order = ({allList, addToFeatured, searchList}) => {
  const styles = require('./FeaturedList.scss');
  const allListHtml = allList.map((list) => {
    if ((list.is_featured === false) && (list.is_invisible !== true)) {
      return (
        <li>
          <label>{list.brand_name}</label>
          <span data-brand-id={list.brand_id} data-id={list.id} className="action" onClick={addToFeatured}> Add to Featured >>> </span>
        </li>
      );
    }
  });
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>ALL BRANDS LIST</div>
          <input className={styles.input} placeholder="Search..." type="text" onChange={searchList}/>
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
