import React from 'react';

import formValidator from '../../Common/CommonFormValidator';

import {
  BRANCH_INPUT_CHANGED
} from './BranchData';

const BranchDetails = ( { currState, organisationData } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  let orgObj = [];

  orgObj = (organisationData) ? organisationData.map( ( organisation, index ) => {
    return (
      <option key={ index } value={ organisation.id }> { organisation.organisation_name } </option>
    );
  }) : [];

  return (
    <div>
      <div className={styles.heading + ' ' + styles.wd_100}>Branch Details</div>
      <ul>
        <li>
          <label>Select Organisation</label>
          <select data-field-name="organisation_id" data-field-type="int" value={ currState.organisation_id } >
            <option value="0">Select Organisation </option>
            { orgObj }
          </select>
        </li>
        <li>
          <label>Application Number</label>
          <input data-field-name="name" type="text" data-field-name="application_number" data-field-type="text"/>
        </li>
        <li>
          <label>Branch Name</label>
          <input data-field-name="name" type="text" data-field-name="org_name" data-field-type="text"/>
        </li>
        <li>
          <label>Excise License Number</label>
          <input type="text" data-field-name="excise_licence_number" data-field-type="text"/>
        </li>
        <li>
          <label>CST Number</label>
          <input type="text" data-field-name="cst_number" data-field-type="text"/>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BranchDetails, 'data-field-name', 'data-field-type', BRANCH_INPUT_CHANGED);

export default decoratedOne;
