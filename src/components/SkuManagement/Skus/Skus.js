import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Skus = () => { // eslint-disable-line no-unused-vars
  const styles = require('./Skus.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.skus_link}>
            <div className={styles.skus_wrapper}>
                <div className={styles.indiv_link + ' ' + styles.margin_right}>
                  <p>
                    <Link to={'/hadmin/skus/list_sku'}>
                      All SKUs
                    </Link>
                  </p>
                </div>
                <div className={styles.indiv_link}>
                    <p>Top Picks List</p>
                </div><br/>
            </div>
        </div>
    </div>);
};

export default connect()(Skus);
