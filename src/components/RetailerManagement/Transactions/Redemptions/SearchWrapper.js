import React from 'react';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td> { dat.order_id } </td>
            <td>
                { dat.reservation_id}
            </td>
            <td>
                { dat.retailer_id}
            </td>
            <td>
                { dat.retailer_pos_id}
            </td>
            <td> Rs { dat.amount} </td>
            <td> { dat.brand_name } </td>
            <td> { dat.sku_volume} </td>
            <td> { dat.itemtype} </td>
            <td> { dat.cashback_amount} </td>
            <td> { dat.status} </td>
            <td> { dat.cancelled_by} </td>
            <td> { createdAt } </td>
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
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> Order ID </th>
                  <th> Reservation Id </th>
                  <th> Retailer ID </th>
                  <th> Retailer POS Id </th>
                  <th> Amount </th>
                  <th> Brand Name </th>
                  <th> Sku Volume </th>
                  <th> Item Type </th>
                  <th> Cashback Amount </th>
                  <th> Status </th>
                  <th> Cancelled By </th>
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
        <div className={styles.list_of_states_wrapper}>
          <label>
            Retailer Redemptions
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
