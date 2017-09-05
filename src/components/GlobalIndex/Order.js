import React from 'react';

const Order = ({allTypes, allList, orderChange}) => {
  const styles = require('./PositionList.scss');
  const allListHtml = allTypes.map((list) => {
    let value = null;
    let id = null;
    allList.forEach((item) => {
      if (item.type_id === list.id) { value = item.volume; id = item.id;}
    });
    return (
      <li>
        <label>{list.name}</label>
        <input type="number" value={value} data-value={value} id={id} data-type-id={list.id} onChange={orderChange}/>
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
