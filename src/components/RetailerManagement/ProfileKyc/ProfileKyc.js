import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TableHeader from '../../Common/TableHeader';

const ProfileKyc = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./ProfileKyc.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={ styles.entry_point_wrapper }>
            <TableHeader title={'Retailer Management/ Profile And KYC'} />
            <div className="clearfix"></div>
            <div className={styles.entry_point_links}>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/create_organization'}> Create Organization </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/create_branch'}> Create Branch </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/view_organizations'}> View Organizations </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/view_branches'}> View Branches </Link>
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

export default connect(mapStateToProps)(ProfileKyc);
