import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TableHeader from '../../Common/TableHeader';

const AdsMain = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./AdsMain.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <TableHeader title={'Ads Management'} />
            <div className="clearfix"></div>
            <div className={styles.customer_transaction_links}>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/brands_offers_and_promos/view_all_ads'}>View Ads</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/brands_offers_and_promos/create_ad'}>Create Ad</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(AdsMain);
