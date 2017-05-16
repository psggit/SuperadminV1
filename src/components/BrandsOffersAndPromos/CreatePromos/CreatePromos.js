import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const CreatePromos = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreatePromos.scss');

  // TODO: Remove this alert when other offers are handled.
  const unAvailableAlert = () => {
    alert('Sorry, not available yet');
  };

  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.promos_wrapper}>
        <div className={styles.promos_links}>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <a onClick={unAvailableAlert.bind(this)}>Instant Cashback</a>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                        <Link to={'/hadmin/brands_offers_and_promos/promos/cashback_redeem'}>Cashback On Redeem</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                        <Link to={'/hadmin/brands_offers_and_promos/promos/on_pack'}>On Pack</Link>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <a onClick={unAvailableAlert.bind(this)}>Double Reserve</a>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <a onClick={unAvailableAlert.bind(this)}>Merchandise Promo</a>
                      </span>
                  </div>
              </div>
          </div>
          <div className = {styles.box_wrapper}>
              <div className={styles.squarecontent}>
                  <div>
                      <span>
                          <a onClick={unAvailableAlert.bind(this)}>Offline Promo</a>
                      </span>
                  </div>
              </div>
          </div>
          <div className ="clearfix"></div>
        </div>
      </div>
    </div>);
};

export default connect()(CreatePromos);
