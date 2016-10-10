import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;
  let allProducts = [];

  if ( data.length > 0 ) {
    allProducts = [ ...data[0].normal_items.map( ( item ) => {
      const it = { ...item, 'type': 'normal'};
      return it;
    }), ...data[0].cashback_items.map( ( item ) => {
      const it = { ...item, 'type': 'cashback'};
      return it;
    }), ...data[0].bar_items.map( ( item ) => {
      const it = { ...item, 'type': 'bars'};
      return it;
    })];
  }

  tableBody = allProducts.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();

    const productIndex = dat.type === 'normal' ? dat.product : dat.product.sku_pricing;

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
            <td> Rs. { ( dat.type !== 'bars' ? dat.product.price : dat.product.hipbarPrice ) } </td>
            <td> { dat.type.toUpperCase() } </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no recharges
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
            Reservations
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
