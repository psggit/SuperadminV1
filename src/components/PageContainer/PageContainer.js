import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routeActions } from 'redux-simple-router';

const PageContainer = ({schema, location, children, dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./PageContainer.scss');
  const tableLinks = schema.map((table) => {
    return (
      <ul>
        <p className={styles.sidebar_title}>{table.name.toUpperCase()}</p>
        <li className={styles.sidebar_list}><Link to={'/tables/' + table.name + '/view'}>View all</Link></li>
        <li className={styles.sidebar_list}><Link to={'/tables/' + table.name + '/insert'}>Insert</Link></li>
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
          <ul>
          <button className={styles.addBtn + ' btn btn-primary'} onClick={(e) => {
            e.preventDefault();
            dispatch(routeActions.push('/upload_file'));
          }}>Upload File</button>
          <br/><br/>
            {tableLinks}
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
