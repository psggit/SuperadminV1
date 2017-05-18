import React from 'react';
// import { Link } from 'react-router';

const SearchWrapper = ( {data, onToggle } ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  console.log(data);
  tableBody = data.map((dat, index) => {
    let from = dat.active_from;
    let to = dat.active_to;

    from = new Date(new Date(from).getTime()).toLocaleString('en-GB');
    to = new Date(new Date(to).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <button className={styles.edit_btn} data-campaign-status={dat.is_active} data-campaign-id={dat.id} data-campaign-type="status" onClick={ onToggle }>
                { (dat.is_active) ? 'Disable' : 'Enable' }
              </button>
            </td>
            <td> { dat.id } </td>
            <td className={(dat.product.sku.brand.is_active) ? 'active' : 'inactive'}> { dat.product.sku.brand.brand_name } </td>
            <td className={(dat.product.sku.is_active) ? 'active' : 'inactive'}> { dat.product.sku.volume } </td>
            <td className={(dat.product.is_active) ? 'active' : 'inactive'}> { dat.product.price } </td>
            <td> { dat.active_from } </td>
            <td> { dat.active_to } </td>
            <td> { dat.store_type } </td>
            <td> { dat.state_short_name } </td>
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
                  <th> Brand </th>
                  <th> Volume </th>
                  <th> Price </th>
                  <th> Active From </th>
                  <th> Active To </th>
                  <th> State Short Name </th>
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
            List of Welcome Drinks
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default SearchWrapper;
