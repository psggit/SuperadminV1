import React, { Component, PropTypes } from 'react';

import SettlementWrapper from './SettlementWrapper';

import BeneficiaryAdd from './BeneficiaryAdd';

import { fetchInitial } from './BeneficiaryAction';

import {
  TOGGLE_BENEFICIARY_DETAIL
} from './BeneficiaryAdd';

class Beneficiary extends Component {
  componentDidMount() {
    this.props.dispatch(fetchInitial());
  }
  toggleBeneficiaryDetail() {
    this.props.dispatch( { type: TOGGLE_BENEFICIARY_DETAIL } );
  }
  render() {
    const styles = require('./CreateOrganization.scss');
    const {
      showDetail
    } = this.props;
    return (
      <div className = {styles.beneficiaries_container}>
        <div className = {styles.beneficiaries_wrapper}>
          <div className = {styles.beneficiaries_head}>
            beneficiaries
          </div>
          <div className = {styles.beneficiaries_subhead} onClick={ this.toggleBeneficiaryDetail.bind(this) } >
            + Add New
          </div>
          <SettlementWrapper className={ !showDetail ? 'hide' : '' } />
        </div>
        <BeneficiaryAdd />
      </div>
    );
  }
}

Beneficiary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showDetail: PropTypes.bool.isRequired
};

export default Beneficiary;
