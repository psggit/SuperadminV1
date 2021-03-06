import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TableHeader from '../../Common/TableHeader';

const Support = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./Support.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <TableHeader title={'Customer Management'} />
            <div className="clearfix"></div>
            <div className={styles.customer_transaction_links}>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'#'}>Instant Callback History</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                              <Link to={'/hadmin/customer_support/freshdesk_ticketlist'}>Freshdesk Issue History</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                              <Link to={'/hadmin/customer_support/customer_profile'}>Take Calls</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className ="clearfix"></div>
            </div>
        </div>
        );
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(Support);
