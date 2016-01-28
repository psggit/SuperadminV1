import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const Home = ({schema, location, children}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Home.scss');
  const tableLinks = schema.map((table, i) => {
    return (
      <li><Link key={i} to={'/tables/' + table.name + '/view'}>{table.name}</Link></li>
    );
  });
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.sidebar + ' col-md-3'}>
        <div className={styles.account}>
          Logged in: <b>admin</b>
        </div>
        <hr/>
        <ul>
          {tableLinks}
        </ul>
      </div>
      <div className={styles.main + ' col-md-9'}>
        <div>
          {children}
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

export default connect(mapStateToProps)(Home);
