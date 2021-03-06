import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Kycfunctions = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./kycfunctions.scss');

  const lastPathname = location.pathname.split('/');
  console.log('path');
  console.log(lastPathname);
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.container + ' container-fluid'}>
            <div className = {styles.leftsquarebox}>
                <div className={styles.squarecontent}>
                    <div>
                        <span>
                            <Link to={'/hadmin/consumer/kycfunctions/verify_kyc'}>Verify KYC</Link>
                        </span>
                    </div>
                </div>
            </div>
            <div className = {styles.rightsquarebox}>
                    <div>
                    <div className={styles.squarecontent}>
                      <div>
                        <span>
                            <Link to={'/hadmin/consumer/kycfunctions/upload_kyc'}>Upload KYC</Link>
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

export default connect(mapStateToProps)(Kycfunctions);
