import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const Home = ({username, children}) => {
  const styles = require('./Home.scss');
  const anImage = require('./logo-big-fs8.png');
  return (
    <div className={styles.container + ' container-fluid'}>
      <div className={styles.sidebar + ' col-md-3'}>
        <div className={styles.account}>
          Logged in: <b>{username}</b>
        </div>
        <hr/>
        <ul>
          <li><Link to="/appusers">App Users</Link></li>
          <li><Link to="/bills">Bills</Link></li>
        </ul>
        <img src={anImage} />
      </div>
      <div className={styles.main + ' col-md-9'}>
        <div className={styles.header}>
          <h3>HasuraDB</h3>
          <div className="clearfix"></div>
        </div>
        {children}
      </div>
    </div>);
};

const mapStateToProps = (state) => {
  return {...state.homeState};
};

export default connect(mapStateToProps)(Home);
