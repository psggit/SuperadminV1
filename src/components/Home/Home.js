import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const Home = ({children}) => {
  const styles = require('./Home.scss');
  const anImage = require('./logo-big-fs8.png');
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.sidebar + ' col-md-3'}>
        <div className={styles.account}>
          Logged in: <b>admin</b>
        </div>
        <hr/>
        <ul>
          <li><Link to="/appusers">App Users</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
        </ul>
        <img src={anImage} />
      </div>
      <div className={styles.main + ' col-md-9'}>
        <div className={styles.header}>
          <h3>Hipbar Superadmin</h3>
          <div className="clearfix"></div>
        </div>
        {children}
      </div>
    </div>);
};

export default connect()(Home);
