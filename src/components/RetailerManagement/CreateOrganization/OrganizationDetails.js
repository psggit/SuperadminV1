import React from 'react';
import { connect } from 'react-redux';

// import Checkboxes from './Checkboxes';
import OrganizationInput from './OrganizationInput';
import OrganizationSelect from './OrganizationSelect';

import commonFormValidator from '../../Common/CommonFormValidator';

const STORE_ORGANISATION_DETAILS = '@create_organisation/STORE_ORGANISATION_DETAILS';

const OrganizationDetails = () => {
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

  return (
    <div className = {styles.constitution_organisation_wrapper}>
      <OrganizationSelect fieldName="type_of_organisation" fieldType="text" defaultValue="Select type of organization" selectOptions={ selectOptions } label="Type of organisation"/>
      {/*
          Return a single selected 'type of organisation'
      */}
      {/*
      <Checkboxes fieldName="type_of_organisation" fieldType="text" checkBoxes={ checkBoxes } options="single" />
      */}
      <OrganizationInput labelVal = "Organization Name" Val = "Ape's Ale" fieldName="organisation_name" fieldType="text" />
      <OrganizationInput labelVal = "Date of Incorporation" Val = "34528752484" fieldName="date_of_incorporation" fieldType="date" />
      <OrganizationInput labelVal = "PAN Number" Val = "F128ABC37" fieldName="pan_number" fieldType="int" />
      <OrganizationInput labelVal = "TIN Number" Val = "102016" fieldName="tin_number" fieldType="int" />
      <OrganizationInput labelVal = "Annual Turnover" Val = "74902834" fieldName="annual_turnover" fieldType="int" />
      <OrganizationInput labelVal = "TAN Number" Val = "102016"fieldName="tan_number" fieldType="int" />
    </div>
  );
};

const decoratedComponent = commonFormValidator(OrganizationDetails, 'data-field-name', 'data-field-type', STORE_ORGANISATION_DETAILS );

export default connect()(decoratedComponent);
// export default OrganizationDetails;
