import React, { Component } from 'react';

import AddBeneficiaryInput from './AddBeneficiaryInput';
import AddBeneficiaryTextarea from './AddBeneficiaryTextarea';

class BeneficiaryAdd extends Component {
  render() {
    const styles = require('./CreateOrganization.scss');
    return (
      <div className = {styles.add_beneficiaries_wrapper}>
        <div className = {styles.add_beneficiaries_head}>
          beneficiaries
        </div>
        <AddBeneficiaryInput labelVal = "Name"/>
        <AddBeneficiaryTextarea labelVal = "Address" />
        <AddBeneficiaryInput labelVal = "Pincode"/>
        <AddBeneficiaryInput labelVal = "City"/>
        <AddBeneficiaryInput labelVal = "State"/>
        <AddBeneficiaryInput labelVal = "Landline Number"/>
        <AddBeneficiaryInput labelVal = "Email"/>
        <div className = {styles.add_beneficiary_btn}>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    );
  }
}

export default BeneficiaryAdd;
