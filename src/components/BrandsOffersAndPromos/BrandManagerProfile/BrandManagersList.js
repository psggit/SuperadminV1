import React from 'react';
import { Link } from 'react-router';

const BrandManagersList = ( {data} ) => {
  const styles = require('./BrandManagersList.scss');
  console.log('amazing bullshit!');
  console.log(data);
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/brands_offers_and_promos/brand_manager_view/' + dat.id}>
                <button className={styles.edit_btn} data-state-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td> { dat.id } </td>
            <td>
                { dat.name }
            </td>
            <td>
                { dat.email }
            </td>
            <td>
                { dat.mobile_number }
            </td>
            <td>
                { dat.company.name}
            </td>
            <td>
                { (dat.is_disabled) ? 'Disabled' : 'Active' }
            </td>
            <td>
                { (dat.kyc_status) ? 'Done' : 'Pending' }
            </td>
            <td>
                { dat.created_at }
            </td>
            <td>
                { dat.updated_at }
            </td>
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
            <table className={'table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> ID </th>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Mobile </th>
                  <th> Company </th>
                  <th> Status </th>
                  <th> KYC Status </th>
                  <th> Created At </th>
                  <th> Updated At </th>
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
            List of Brand Managers
          </label>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default BrandManagersList;
