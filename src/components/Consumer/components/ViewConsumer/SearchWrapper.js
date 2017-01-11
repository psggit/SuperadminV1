import React from 'react';
import { Link } from 'react-router';

const ConsumerSearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let createdAt = dat.created_at;
    let updatedAt = dat.updated_at;

    createdAt = new Date(new Date(createdAt).getTime()).toLocaleString('en-GB');
    updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/consumer/profile/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  View
                </button>
              </Link>
            </td>
            <td>
              { dat.id}
            </td>
            <td> { (dat.full_name ) ? dat.full_name : '' } </td>
            <td> { (dat.email ) ? dat.email : '' } </td>
            <td> { (dat.mobile_number) ? dat.mobile_number : '' } </td>
            <td> { (dat.gender) ? dat.gender : '' } </td>
            <td> { (dat.dob) ? dat.dob : '' } </td>
            <td> { (dat.level_id ) ? dat.level_id : '' } </td>
            <td> { (dat.device) ? dat.device.device_num : '' } </td>
            <td> { createdAt } </td>
            <td> { updatedAt } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry no consumers yet
        </div>
        );
    }();
  } else {
    objHtml = () => {
      return (
            <table className={styles.table_fixed_layout + ' table table-striped'}>
              <thead>
                <tr>
                  <th> </th>
                  <th> Consumer ID </th>
                  <th> Consumer Name </th>
                  <th> Email </th>
                  <th> Mobile Number </th>
                  <th> Gender </th>
                  <th> DOB </th>
                  <th> Level </th>
                  <th> IMEI </th>
                  <th> Updated At </th>
                  <th> CreatedAt </th>
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
            Consumer
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default ConsumerSearchWrapper;
