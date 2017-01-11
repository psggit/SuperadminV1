import React from 'react';
import { Link } from 'react-router';

const SearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let from = dat.active_from;
    let to = dat.active_to;

    from = new Date(new Date(from).getTime()).toLocaleString('en-GB');
    to = new Date(new Date(to).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'#'}>
                <button className={styles.edit_btn} data-campaign-id={dat.id}>
                  Disable
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td> { dat.name } </td>
            <td> { dat.brand_manager ? dat.brand_manager.name : 'N/A' } </td>
            <td> { dat.brand_manager ? dat.brand_manager.email : 'N/A' } </td>
            <td> { dat.status } </td>
            <td>
              { dat.cashback_promos.length > 0 ? dat.cashback_promos[0].skus[0].sku_pricing.sku.brand.brand_name : 'N/A' }
            </td>
            <td>
              { dat.cashback_promos.length > 0 ? dat.cashback_promos[0].skus[0].sku_pricing.sku.volume : 'N/A' }
            </td>
            <td>
              Rs { dat.budgeted_amount }
            </td>
            <td>
              Rs { dat.funds_credited }
            </td>
            <td>
              { dat.type }
            </td>
            <td>
              { from }
            </td>
            <td>
              { to }
            </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no Campaigns
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID </th>
                  <th> Campaign Name </th>
                  <th> Brand Manager Name </th>
                  <th> Brand Manager Email </th>
                  <th> Campaign Status </th>
                  <th> Brand Name </th>
                  <th> Volume </th>
                  <th> Budgeted Amount </th>
                  <th> Funds Credited </th>
                  <th> Campaign Type </th>
                  <th> Active From </th>
                  <th> Active To </th>
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
            List of Campaigns
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
