import React from 'react';
// import { Link } from 'react-router';

const SearchWrapper = ( { data, onClickHandler } ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <button className={styles.edit_btn} data-inventory-id={dat.id} onClick={ (e) => { return onClickHandler.call(undefined, e, dat.id, dat.is_active, dat.sku_pricing_id, dat.bar_id ); }}>
                { dat.is_active ? 'Disable' : 'Enable' }
              </button>
            </td>
            <td>
              { dat.id }
            </td>
            <td> { dat.sku_pricing.sku.brand.brand_name } - { dat.sku_pricing.sku.volume } ML </td>
            <td>
              { dat.bar.name }
            </td>
            <td>
              { dat.start_date}
            </td>
            <td>
              { dat.end_date}
            </td>

          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Bars Skus Yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> Sku Status </th>
                  <th> Id </th>
                  <th> SKU</th>
                  <th> Bar </th>
                  <th> Start Date</th>
                  <th> End Date</th>
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
            Manage Bars Skus
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
