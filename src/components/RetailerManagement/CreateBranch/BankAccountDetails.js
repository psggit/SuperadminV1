import React from 'react';

import formValidator from '../../Common/CommonFormValidator';

import ImageUpload from './ImageUpload';

import {
  BRANCH_ACCOUNT_CHANGED,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  CANCEL_IMAGE
} from './BranchData';

const BankAccountDetails = ( { currState } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <ul>
        <li>
          <div className={styles.heading}>Bank Account Details</div>
        </li>
        <li>
          <div className={styles.wd_50}>
            <ul>
              <li>
                <label>Name of the Bank</label>
                <input type="text" data-field-name="bank_name" data-field-type="text" value={ currState.bank_name } />
              </li>
              <li>
                <label>IFSC Code</label>
                <input type="text" data-field-name="ifsc_code" data-field-type="text"value={ currState.ifsc_code } />
              </li>
              <li>
                <label>Account Number</label>
                <input type="text" data-field-name="account_number" data-field-type="text"value={ currState.account_number } />
              </li>
              <li>
                <label>Branch Name</label>
                <input type="text" data-field-name="branch" data-field-type="text" value={ currState.branch }/>
              </li>
            </ul>
          </div>
          <div className={styles.wd_50}>
            <ImageUpload imageUrl={currState.canceled_cheque_image ? currState.canceled_cheque_image : ''} requestSuccess={IMAGE_UPLOAD_SUCCESS} requestError={ IMAGE_UPLOAD_ERROR } cancelImage={ CANCEL_IMAGE }/>
          </div>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BankAccountDetails, 'data-field-name', 'data-field-type', BRANCH_ACCOUNT_CHANGED);

export default decoratedOne;
