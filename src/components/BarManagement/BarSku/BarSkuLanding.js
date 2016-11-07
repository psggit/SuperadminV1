import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import TableHeader from '../../Common/TableHeader';

const BarSkuLanding = ({dispatch}) => { // eslint-disable-line no-unused-vars
  const styles = require('./BarSku.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={ styles.entry_point_wrapper }>
            <TableHeader title={'Bar Management/ Bar SKU Management '} />
            <div className="clearfix"></div>
            <div className={styles.entry_point_links}>
                {/*
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/bar_management/bar_sku_create_landing'}> Create A New SKU </Link>
                            </span>
                        </div>
                    </div>
                </div>
                */}
                <div className = {styles.box_wrapper}>
                    <div className={styles.squarecontent}>
                        <div>
                            <span>
                                <Link to={'/hadmin/bar_management/list_bars'}> Add SKU for Bars </Link>
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

export default connect(mapStateToProps)(BarSkuLanding);
