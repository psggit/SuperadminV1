import React from 'react';
import { connect } from 'react-redux';

// import Checkboxes from './Checkboxes';
import OrganizationInput from './OrganizationInput';
import OrganizationSelect from './OrganizationSelect';

import formValidator from '../../Common/CommonFormValidator';

import {
  ORGANIZATION_INPUT_CHANGED
} from './OrganizationData';

const OrganizationDetails = ({ stateData } ) => {
  const styles = require('./OrganizationDetails.scss');

  const selectOptions = [
    {
      'label': 'Proprietorship',
      'value': 'proprietorship'
    },
    {
      'label': 'Partnership',
      'value': 'partnership'
    },
    {
      'label': 'Pvt Ltd',
      'value': 'pvtltd'
    },
    {
      'label': 'Public Ltd',
      'value': 'publicltd'
    },
    {
      'label': 'Public Sector',
      'value': 'publicsector'
    },
    {
      'label': 'Government',
      'value': 'government'
    },
    {
      'label': 'Clubs',
      'value': 'clubs'
    },
    {
      'label': 'HUF',
      'value': 'huf'
    }
  ];
  const kycSelectObj = [
    {
      'label': 'True',
      'value': true
    },
    {
      'label': 'False',
      'value': false
    }
  ];
  const statusSelectObj = [
    {
      'label': 'Active',
      'value': true
    },
    {
      'label': 'InActive',
      'value': false
    }
  ];

  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <OrganizationSelect fieldName="type_of_organisation" fieldType="text" defaultValue="Select type of organization" selectOptions={ selectOptions } label="Type of organisation" value={ stateData.type_of_organisation } />
      {/*
          Return a single selected 'type of organisation'
      */}
      {/*
      <Checkboxes fieldName="type_of_organisation" fieldType="text" checkBoxes={ checkBoxes } options="single" />
      */}
      <OrganizationInput labelVal = "Organization Name" Val = "Ape's Ale" fieldName="organisation_name" fieldType="text" value={ stateData.organisation_name } />
      <OrganizationInput labelVal = "Date of Incorporation" Val = "34528752484" fieldName="date_of_incorporation" fieldType="date" value = { stateData.date_of_incorporation }/>
      <OrganizationInput labelVal = "PAN Number" Val = "F128ABC37" fieldName="pan_number" fieldType="text" value={ stateData.pan_number } />
      <OrganizationInput labelVal = "TIN Number" Val = "102016" fieldName="tin_number" fieldType="text" value={ stateData.tin_number } />
      <OrganizationInput labelVal = "Annual Turnover" Val = "74902834" fieldName="annual_turnover" fieldType="int" value={ stateData.annual_turnover }/>
      <OrganizationInput labelVal = "TAN Number" Val = "102016"fieldName="tan_number" fieldType="text" value={ stateData.tan_number }/>
      <OrganizationSelect label = "KYC Verified" defaultValue="Select KYC Status" selectOptions={ kycSelectObj } fieldName="kyc_status" fieldType="text" value={ stateData.kyc_status }/>
      <OrganizationSelect label = "Status" defaultValue="Select Status" selectOptions={ statusSelectObj } fieldName="status" fieldType="text" value={ stateData.status }/>
    </div>
  );
};

const decoratedComponent = formValidator(OrganizationDetails, 'data-field-name', 'data-field-type', ORGANIZATION_INPUT_CHANGED);

export default connect()(decoratedComponent);
// export default OrganizationDetails;
