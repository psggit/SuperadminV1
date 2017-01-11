import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;
  let allRedemptions = [];

  if ( data.length > 0 ) {
    allRedemptions = [ ...data[0].bar_redemptions.map( ( item ) => {
      const it = { ...item, 'type': 'bar'};
      return it;
    }), ...data[0].cashback_redemptions.map( ( item ) => {
      const it = { ...item, 'type': 'cashback'};
      return it;
    }), ...data[0].normal_redemptions.map( ( item ) => {
      const it = { ...item, 'type': 'normal'};
      return it;
    })];
  }

  tableBody = allRedemptions.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');

    const productIndex = dat.type === 'normal' ? dat.item.cart.product : dat.item.cart.product.sku_pricing;

    return (
          <tr key={index}>
            <td> { dat.id } </td>
            <td>
              <Link to={'/hadmin/consumer/profile/' + data[0].consumer_id}>
                { data[0].consumer_id }
              </Link>
            </td>
            <td> { productIndex.sku.brand.brand_name } </td>
            <td> { productIndex.sku.volume } ml </td>
            <td> Rs. { data[0].amount } </td>
            <td> Rs. { data[0].itemtype === 'cashback' ? dat.item.cashback : '0' } </td>
            <td> Rs. { data[0].itemtype === 'bar' ? dat.item.cart.product.menuPrice : 0 } </td>
            <td> { data[0].itemtype.toUpperCase() } </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no redemptions
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
        <table className={styles.table_fixed_layout + ' table table-striped'}>
          <thead>
            <tr>
              <th> ID </th>
              <th> Consumer ID </th>
              <th> Brand </th>
              <th> Volume </th>
              <th> Amount </th>
              <th> Cashback </th>
              <th> Menu Price </th>
              <th> Type </th>
              <th> Updated At </th>
              <th> Created At </th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      );
    }();
  }

  return (
        <div className={styles.search_wrapper}>
          <div className={styles.header_element}>
            Redemptions
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
