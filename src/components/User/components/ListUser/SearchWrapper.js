import React from 'react';
import { Link } from 'react-router';

const UserSearchWrapper = ( {data} ) => {
  const styles = require('./SearchWrapper.scss');
  let tableBody;
  let objHtml;

  tableBody = data.map((dat, index) => {
    let lastLogin = dat.last_login;
    let dateJoined = dat.date_joined;

    lastLogin = new Date(new Date(lastLogin).getTime()).toLocaleString('en-GB');
    dateJoined = new Date(new Date(dateJoined).getTime()).toLocaleString('en-GB');
    return (
          <tr key={index}>
            <td>
              <Link to={'/hadmin/user/profile/' + dat.id}>
                <button className={styles.edit_btn} data-genre-id={dat.id}>
                  view/edit
                </button>
              </Link>
            </td>
            <td>
              { dat.id}
            </td>
            <td> { (dat.email ) ? dat.email : '' } </td>
            <td> { (dat.username) ? dat.username : '' } </td>
            <td> { (dat.roles) ? dat.roles[0] : '' } </td>
            <td> { (dat.mobile_number) ? dat.mobile_number : '' } </td>
            <td> { (dat.is_active) ? dat.is_active : '' } </td>
            <td> { (dat.email_verified) ? dat.email_verified : '' } </td>
            <td> { (dat.mobile_verified) ? dat.mobile_verified : '' } </td>
            <td> { (dat.is_admin) ? dat.is_admin : '' } </td>
            <td> { (lastLogin) ? lastLogin : '' } </td>
            <td> { (dateJoined) ? dateJoined : '' } </td>
            <td> { (dat.extra_info) ? dat.extra_info : '' } </td>
          </tr>
        );
  });

  if (tableBody.length === 0) {
    objHtml = () => {
      return (
        <div className={styles.error_message}>
          Sorry, no users present.
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
                  <th> Hasura id </th>
                  <th> Email </th>
                  <th> User name </th>
                  <th> Roles </th>
                  <th> Mobile </th>
                  <th> Active </th>
                  <th> Email verified </th>
                  <th> Mobile verified </th>
                  <th> Admin </th>
                  <th> Last login </th>
                  <th> Date joined </th>
                  <th> Extra info</th>
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
            List of Users
          </div>
          <div className={styles.wd_80}>
            {objHtml}
          </div>
        </div>
      );
};

export default UserSearchWrapper;
