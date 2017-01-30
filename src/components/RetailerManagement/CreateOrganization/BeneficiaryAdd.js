import React from 'react';

import AddBeneficiaryInput from './AddBeneficiaryInput';
import AddBeneficiaryTextarea from './AddBeneficiaryTextarea';

import BeneficiarySelect from './BeneficiarySelect';

import commonFormValidator from '../../Common/CommonFormValidator';

import {
  BENEFICIARY_INPUT_CHANGE
} from './BeneficiaryAction';

const BeneficiaryAdd = ( { isShow,
  currState,
  stateData,
  createBeneficiary,
  unloadBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  createBeneficiaryLocal,
  updateBeneficiaryLocal,
  deleteBeneficiaryLocal,
  isOrgEdit
} ) => {
  const styles = require('./CreateOrganization.scss');
  let stateObj = [];
  stateObj = (stateData) ? stateData.states.map( ( state ) => {
    const s = {};
    s.label = state.state_name;
    s.value = state.id;
    return s;
  }) : [];

  const filteredCities = ( stateData && currState.state_id ) ? stateData.cities.filter( ( city ) => {
    return ( city.state_short_name === stateData.stateIdMap[currState.state_id] );
  }) : [];

  let cityObj = [];
  cityObj = (stateData) ? filteredCities.map( ( city ) => {
    const s = {};
    s.label = city.name;
    s.value = city.id;
    return s;
  }) : [];

  const getActionButtonsNew = () => {
    return ( isOrgEdit ) ?
    (
      <div className = {styles.add_beneficiary_btn}>
        <button onClick={ unloadBeneficiary }>Cancel</button>
        <button onClick={ createBeneficiary } >Save</button>
      </div>
    ) : (
      <div className = {styles.add_beneficiary_btn}>
        <button onClick={ unloadBeneficiary }>Cancel</button>
        <button onClick={ createBeneficiaryLocal }>Save</button>
      </div>
    );
  };

  const getEditButtonsNew = () => {
    return ( isOrgEdit ) ?
      (
        <div className = {styles.add_beneficiary_btn}>
          <button onClick={ unloadBeneficiary }>Cancel</button>
          <button onClick={ deleteBeneficiary }>Delete</button>
          <button onClick={ updateBeneficiary }>Update</button>
        </div>
      ) : (
        <div className = {styles.add_beneficiary_btn}>
          <button onClick={ unloadBeneficiary }>Cancel</button>
          <button onClick={ deleteBeneficiaryLocal } >Delete</button>
          <button onClick={ updateBeneficiaryLocal }>Update</button>
        </div>
      );
  };

  const actionButtons = ( currState.isEditing ) ? (
    getEditButtonsNew()
  )
  : (
    getActionButtonsNew()
  );

  return (
    <div className = {styles.add_beneficiaries_wrapper + ( isShow ? ' hide' : '' )}>
      <div className = {styles.add_beneficiaries_head}>
        beneficiaries
      </div>
      <AddBeneficiaryInput labelVal = "Name*" fieldName="name" fieldType="text" value={ currState.name } />
      <AddBeneficiaryTextarea labelVal = "Address*" fieldName="address" fieldType="text" value={ currState.address } />
      <AddBeneficiaryInput labelVal = "Pincode*" fieldName="pincode" fieldType="text" value={ currState.pincode } />
      <BeneficiarySelect label = "State*" defaultValue="" selectOptions = { stateObj } fieldName="state_id" fieldType="int" value={ currState.state_id } />
      <BeneficiarySelect label = "City*" defaultValue="" selectOptions = { cityObj } fieldName="city_id" fieldType="int" value={ currState.city_id }/>
      <AddBeneficiaryInput labelVal = "Landline Number*" fieldName="landline_number" fieldType="text" value={ currState.landline_number } />
      <AddBeneficiaryInput labelVal = "Email*" fieldName="email" fieldType="text" value={ currState.email } />
      { actionButtons }
    </div>
  );
};

const decoratedOne = commonFormValidator(BeneficiaryAdd, 'data-field-name', 'data-field-type', BENEFICIARY_INPUT_CHANGE);
export default decoratedOne;
