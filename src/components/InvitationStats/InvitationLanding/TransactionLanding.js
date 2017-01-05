import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {LandingBlock} from '../../Common/CommonComponent/LandingBlock';
import TableHeader from '../../Common/TableHeader';

const TransactionLanding = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./TransactionLanding.scss');
  const content = JSON.stringify({'title': 'Invitation Stats', 'content': [{'name': 'PONGA DA', 'title': 'Adhe Dhaan'}]});
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={ styles.entry_point_wrapper }>
            <LandingBlock content={content} />
            <TableHeader title={'Retailer Management/ Transactions'} />
            <div className="clearfix"></div>
            <div className={styles.entry_point_links}>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/retailer_settlement_reports'}> Settlement Report </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/redemptions'}> Redemptions </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/retailer_reports'}> Daily Reports </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/retailer_settlement_status'}> Settlement Status </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/retailer_management/debits_credits_landing'}> Debits and Credits </Link>
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

export default connect(mapStateToProps)( TransactionLanding );
