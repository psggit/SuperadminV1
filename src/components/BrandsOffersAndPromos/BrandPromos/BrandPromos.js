import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const BrandPromos = () => { // eslint-disable-line no-unused-vars
  const styles = require('./BrandPromos.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.promos_wrapper}>
        <div className={styles.promos_links}>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <Link to={'/hadmin/brands_offers_and_promos/campaigns'}>View Campaigns</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <Link to={'/hadmin/brands_offers_and_promos/promos/all'}>Create Campaign</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <Link to={'#'}>Featured List</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <Link to={'#'}>View Promos</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className ="clearfix"></div>
        </div>
      </div>
    </div>);
};

export default connect()(BrandPromos);
