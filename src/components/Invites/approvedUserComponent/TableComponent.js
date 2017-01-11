import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TableComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const { data,
    } = this.props;

    let tableBody;
    let objHtml;
    const styles = require('./SearchWrapper.scss');
    alert(data);
    tableBody = data.map((dat, index) => {
      let createdAt = dat.created_at;
      let updatedAt = dat.updated_at;

      createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
      updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
      return (
            <tr key={index}>
              <td>
                <Link to={'/hadmin/state_management/edit/' + dat.id}>
                  <button className={styles.edit_btn} data-state-id={dat.id}>
                    Edit
                  </button>
                </Link>
              </td>
              <td> { dat.id } </td>
              <td>
                  { dat.state_name}
              </td>
              <td>
                  { dat.short_name }
              </td>
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
              <table className={'table table-striped'}>
                <thead>
                  <tr>
                    <th> </th>
                    <th> ID </th>
                    <th> State Name </th>
                    <th> Short Name </th>
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
          <div>
            <label>
              List of all Approved Users
            </label>
            <div className={styles.wd_80}>
              {objHtml}
            </div>
          </div>
        );
  }
}
