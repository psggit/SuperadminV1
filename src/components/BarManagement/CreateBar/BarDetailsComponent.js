import React from 'react';
import { connect } from 'react-redux';
import BarDetails from './BarDetails';
import BankAccountDetails from './BankAccountDetails';
import BarContectDetails from './BarContectDetails';
const BrandDetailsComponent = ( { dispatch, organisationData, genStateData, barContact, barDetail, barAccountRegistered}) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBar.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.bar_component}>
      <div className={styles.bar_details_container}>
        <BarDetails
    organisationData = { organisationData }
    stateData = { genStateData }
    currState = { barDetail }
    dispatch = { dispatch }
      />
        <BankAccountDetails
    dispatch = { dispatch }
    currState = { barAccountRegistered }
      />
        <BarContectDetails
    stateData = { genStateData }
    currState = { barContact }
    dispatch = { dispatch }
      />
      </div>
    </div>
  );
};

export default connect()(BrandDetailsComponent);
