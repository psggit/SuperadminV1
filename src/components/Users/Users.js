import React, {Component, PropTypes} from 'react';
import {makeRequest} from './Actions';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

/*

  componentDidMount:
    //Create async function:
        //Emit fetchData action
        //Fetch the data
          //On success: Emit the successData action
          //On error: Emit the errorData action
*/

class Users extends Component {

  componentDidMount() {
    this.props.dispatch(makeRequest('Fetching ma shit'));
  }

  render() {
    const {userColumns, users, ongoingRequest, lastError} = this.props;
    const styles = require('./Users.scss');
    const table = {
      headings: userColumns,
      rows: users
    };
    const tableHeadings = table.headings.map((heading, i) => (<th key={i}>{heading}</th>));
    const tableRows = table.rows.map((row, i) => (
      <tr key={i}>
        <td>{row.name}</td>
        <td>{row.age}</td>
        <td>{row.email}</td>
      </tr>));
    return (
      <div className="container-fluid">
        <Helmet title="Appusers | Hipbar Superadmin" />
        <div className={styles.filterOptions}>
          Ongoing Request: {ongoingRequest ? 'true' : 'false'} <br/>
          Last Error: {lastError ? lastError : ''}
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table + ' table table-bordered'}>
            <thead>
              <tr>
                {tableHeadings}
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

Users.propTypes = {
  userColumns: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.userState};
};

export default connect(mapStateToProps)(Users);
