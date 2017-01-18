import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
            </td>
            <td> { dat.cart_id } </td>
            <td>
              <Link to={'/hadmin/consumer/profile/' + dat.consumer_id}>
                { dat.consumer_id }
              </Link>
            </td>
            <td>
                { dat.type.toUpperCase() }
            </td>
            <td>
                { dat.volume }
            </td>
            <td>
                { dat.price }
            </td>
            <td>
                { dat.offer_price }
            </td>
            <td> { createdAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no cart data
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th></th>
                  <th> ID </th>
                  <th> Consumer ID </th>
                  <th> Offer Type </th>
                  <th> Volume </th>
                  <th> MRP </th>
                  <th> Discount Price </th>
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
            User Cart
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
