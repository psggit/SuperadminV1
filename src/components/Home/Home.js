import React from 'react';
import { connect } from 'react-redux';


const Home = () => {
  const styles = require('./Home.scss');
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.header}>
        <h3>Hipbar Superadmin</h3>
        <div className={styles.account}>
          admin <i className="fa fa-caret-down"></i>
        </div>
        <div className="clearfix"></div>
      </div>
      <div className={styles.sidebar + ' col-md-3'}>
        <ul>
          <li>App Users</li>
          <li>Inventory</li>
        </ul>
      </div>
      <div className={styles.main + ' col-md-9'}>
        Main area
      </div>
    </div>);
};

export default connect()(Home);
