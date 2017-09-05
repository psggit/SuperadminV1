import React from 'react';

const PriorityOrder = ({allList, orderChange, removeFromFeatured}) => {
  const styles = require('./FeaturedList.scss');
  const allListHtml = allList.map((list) => {
    if (list.is_featured === true) {
      return (
        <li>
          <label>{list.brand_name} Order:{list.featured_order}</label>
          <input data-brand-id={list.brand_id} type="number" data-value={list.brand_id} id={list.id} onChange={orderChange}/>
          <span data-brand-id={list.brand_id} data-id={list.id} className={styles.action} onClick={removeFromFeatured}> Remove From Featured </span>
        </li>
      );
    }
  });
  return (
      <div className={styles.priority_campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>FEATURED ORDER</div>
          <ul>
            {allListHtml}
          </ul>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default PriorityOrder;
// Change emitter is the function
