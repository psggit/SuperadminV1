import React from 'react';
import { connect } from 'react-redux';
import BranchDetails from './BranchDetails';
import BankAccountDetails from './BankAccountDetails';
import BranchContectDetails from './BranchContectDetails';
const BrandDetailsComponent = ( { dispatch, organisationData, genStateData, branchContact, branchDetail, branchAccountRegistered}) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.brand_component}>
      <div className={styles.brand_details_container}>
        <BranchDetails
    organisationData = { organisationData }
    stateData = { genStateData }
    currState = { branchDetail }
    dispatch = { dispatch }
      />
        <BankAccountDetails
    dispatch = { dispatch }
    currState = { branchAccountRegistered }
      />
        <BranchContectDetails
    stateData = { genStateData }
    currState = { branchContact }
    dispatch = { dispatch }
      />
      </div>
    </div>
  );
};

export default connect()(BrandDetailsComponent);
