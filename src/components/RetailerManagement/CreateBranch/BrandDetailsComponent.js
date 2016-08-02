import React from 'react';
import { connect } from 'react-redux';
import BranchDetails from './BranchDetails';
import BankAccountDetails from './BankAccountDetails';
import BranchContectDetails from './BranchContectDetails';
const BrandDetailsComponent = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
        <div className={styles.brand_component}>
          <div className={styles.brand_details_container}>
                <BranchDetails />
                <BankAccountDetails />
                <BranchContectDetails />
          </div>
        </div>);
};

export default connect()(BrandDetailsComponent);
