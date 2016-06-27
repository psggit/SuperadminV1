import React from 'react';
import { connect } from 'react-redux';

const Ads = () => { // eslint-disable-line no-unused-vars
  const styles = require('./Ads.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.states_cities_wrapper}>
        <div className={styles.states_wrapper}>
          <p className={styles.heading}>States</p>
          <ul>
            <li>
              <label>Lakshadeep</label>
              <p>2 Cities</p>
            </li>
          </ul>
        </div>
        <div className={styles.city_wrapper}>
          <p className={styles.heading}>Cities in tamil nadu</p>
          <ul>
            <li>
              <label>Lakshadeep</label>
              <p>2 Cities</p>
            </li>
          </ul>
        </div>
      </div>
    </div>);
};

export default connect()(Ads);
