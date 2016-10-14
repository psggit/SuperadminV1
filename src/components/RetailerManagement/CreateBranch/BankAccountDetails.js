import React from 'react';

import formValidator from '../../Common/CommonFormValidator';

import {
  BRANCH_ACCOUNT_CHANGED
} from './BranchData';

const BankAccountDetails = () => { // eslint-disable-line no-unused-vars
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
                <input type="text" data-field-name="bank_name" data-field-type="text" />
              </li>
              <li>
                <label>IFSC Code</label>
                <input type="text" data-field-name="ifsc_code" data-field-type="text"/>
              </li>
              <li>
                <label>Account Number</label>
                <input type="number" data-field-name="account_number" data-field-type="text"/>
              </li>
              <li>
                <label>Branch Name</label>
                <input type="number" data-field-name="branch" data-field-type="text"/>
              </li>
            </ul>
          </div>
          <div className={styles.wd_50}>
            <div className={styles.cheque_upload_container}>
              <div className={styles.check_upload}>
                <div className={styles.check_lab}>
                  Cancelled Cheque Copy
                </div>
                <div className={styles.upload_container}>
                  <input type="file" className={styles.input_upload}/>
                  <div className={styles.wd_100}>
                    <button className={styles.upload_btn}>Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const decoratedOne = formValidator(BankAccountDetails, 'data-field-name', 'data-field-type', BRANCH_ACCOUNT_CHANGED);

export default decoratedOne;
