import React, { Component, PropTypes } from 'react';

import SettlementWrapper from './SettlementWrapper';

import BeneficiaryAdd from './BeneficiaryAdd';

import {
  TOGGLE_BENEFICIARY_DETAIL,
  LOAD_BENEFICIARY,
  UNLOAD_BENEFICIARY,
  LOAD_LOCAL_BENEFICIARY
} from './BeneficiaryAction';

class Beneficiary extends Component {
  toggleBeneficiaryDetail() {
    this.props.dispatch( { type: TOGGLE_BENEFICIARY_DETAIL } );
  }
  loadBeneficiary( id ) {
    this.props.dispatch( { type: LOAD_BENEFICIARY, data: parseInt(id, 10) });
  }
  loadLocalBeneficiary( id ) {
    this.props.dispatch( { type: LOAD_LOCAL_BENEFICIARY, data: parseInt(id, 10) });
  }
  unloadBeneficiary() {
    this.props.dispatch( { type: UNLOAD_BENEFICIARY });
  }
  render() {
    const styles = require('./CreateOrganization.scss');
    const {
      beneficiaryData,
      genStateData,
      dispatch,
      createBeneficiary,
      updateBeneficiary,
      deleteBeneficiary,
      createBeneficiaryLocal,
      updateBeneficiaryLocal,
      deleteBeneficiaryLocal,
      organizationData
    } = this.props;

    const { showDetail, beneficiaries, localBens} = beneficiaryData;

    return (
      <div className = {styles.beneficiaries_container}>
        <div className = {styles.beneficiaries_wrapper}>
          <div className = {styles.beneficiaries_head}>
            beneficiaries
          </div>
          <div className = {styles.beneficiaries_subhead} onClick={ this.toggleBeneficiaryDetail.bind(this) } >
            + Add New
          </div>
          <SettlementWrapper beneficiaries={ beneficiaries } loadBeneficiary={ this.loadBeneficiary.bind(this) } localBens = { localBens } loadLocalBeneficiary= { this.loadLocalBeneficiary.bind(this) } />
        </div>
        <BeneficiaryAdd
      dispatch = { dispatch }
      isShow = { !showDetail ? 'hide' : '' }
      stateData = { Object.assign({}, genStateData ) }
      currState= { Object.assign({}, ...beneficiaryData) }

      createBeneficiary = { createBeneficiary }
      updateBeneficiary = { updateBeneficiary }
      deleteBeneficiary = { deleteBeneficiary }

      createBeneficiaryLocal = { createBeneficiaryLocal }
      updateBeneficiaryLocal = { updateBeneficiaryLocal }
      deleteBeneficiaryLocal = { deleteBeneficiaryLocal }

      unloadBeneficiary={ this.unloadBeneficiary.bind(this) }
      isOrgEdit = { organizationData.isOrgEdit }
        />
      </div>
    );
  }
}

Beneficiary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  beneficiaryData: PropTypes.object.isRequired,
  organizationData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired,
  createBeneficiary: PropTypes.func.isRequired,
  updateBeneficiary: PropTypes.func.isRequired,
  deleteBeneficiary: PropTypes.func.isRequired,
  createBeneficiaryLocal: PropTypes.func.isRequired,
  updateBeneficiaryLocal: PropTypes.func.isRequired,
  deleteBeneficiaryLocal: PropTypes.func.isRequired
};

export default Beneficiary;
