import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routeActions } from 'redux-simple-router';

const PageContainer = ({schema, location, children, dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./PageContainer.scss');
  const tableLinks = schema.map((table) => {
    return (
      <ul>
        <li className={styles.sidebar_title}><input type="checkbox" id="cb2"/><label for="cb2">{table.name.toUpperCase()}</label></li>
        <li className={styles.sidebar_list}><label><Link to={'/tables/' + table.name + '/view'}>View all</Link></label></li>
        <li className={styles.sidebar_list}><label><Link to={'/tables/' + table.name + '/insert'}>Insert</Link></label></li>
      </ul>
    );
  });
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.flexRow + ' row'}>
        <div className={styles.sidebar + ' col-md-3'}>
          <div className={styles.account}>
            Logged in: <b>admin</b>
          </div>
          <hr/>
          <br/><br/>
          <button className={styles.addBtn + ' btn btn-primary'} onClick={(e) => {
            e.preventDefault();
            dispatch(routeActions.push('/upload_file'));
          }}>Upload File</button>
          <br/><br/>
          <ul id="sideheading"><li> <input type="checkbox" id="cb1"/><label for="cb1">
          CUSTOMER MANAGEMENT
          </label>
          </li>
            <li className={styles.sidebar_list}><a href="#"> KYC Functions </a></li>
            <li className={styles.sidebar_list}><a href="#"> Profile</a> </li>
            <li className={styles.sidebar_list}><a href="#"> Customer Transactions</a></li>
            <li className={styles.sidebar_list}><a href="#"> Support </a></li>
          </ul>
          <ul id="sideheading"><li> <input type="checkbox" id="cb3"/><label for="cb3">
          USER MANAGEMENT
          </label>
          </li>
          </ul>
          <ul id="sideheading"><li> <input type="checkbox" id="cb3"/><label for="cb3">
          SKU MANAGEMENT
          </label>
          </li>
          </ul><ul id="sideheading"><li> <input type="checkbox" id="cb3"/><label for="cb3">
          RETAILER MANAGEMENT
          </label>
          </li>
          </ul><ul id="sideheading"><li> <input type="checkbox" id="cb3"/><label for="cb3">
          BRAND MANAGER
          </label>
          </li>
          </ul>
        </div>
        <div className={styles.main + ' col-md-9'}>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>);
};

const mapStateToProps = (state) => {
  return {
    schema: state.tables.allSchemas,
    location: state.routing.location
  };
};

export default connect(mapStateToProps)(PageContainer);
