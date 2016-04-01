import React from 'react';
import { connect } from 'react-redux';

const Skus = () => { // eslint-disable-line no-unused-vars
  const styles = require('./Skus.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.skus_link}>
            <div className={styles.skus_wrapper}>
                <div className={styles.indiv_link + ' ' + styles.margin_right}>
                    <p>All SKUs</p>
                </div>
                <div className={styles.indiv_link}>
                    <p>Top Picks List</p>
                </div><br/>
            </div>
        </div>
    </div>);
};

export default connect()(Skus);
