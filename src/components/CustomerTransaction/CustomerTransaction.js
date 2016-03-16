import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const CustomerTransaction = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./customertransaction.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.customer_transaction_wrapper}>
            <div className={styles.customer_transaction_links}>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/consumer/kycfunctions/verify_kyc'}>Recharges</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/consumer/kycfunctions/upload_kyc'}>Redemptions</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/consumer/kycfunctions/verify_kyc'}>Reservations</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/consumer/kycfunctions/upload_kyc'}>Add Credits</Link>
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

export default connect(mapStateToProps)(CustomerTransaction);
