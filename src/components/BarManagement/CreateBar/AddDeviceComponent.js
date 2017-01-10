import React from 'react';

import commonFormValidator from '../../Common/CommonFormValidator';

import {
  DEVICE_INPUT_CHANGE
} from './DeviceAction';

const AddDeviceComponent = ( {
  isShow,
  currState,
  createDevice,
  unloadDevice,
  updateDevice,
  deleteDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  isBrEdit,
  isEditing
} ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBar.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

  const getActionButtonsNew = () => {
    return ( isBrEdit ) ?
    (
      <div className = {styles.user_actions}>
        <button onClick={ unloadDevice }>Cancel</button>
        <button onClick={ createDevice } >Save</button>
      </div>
    ) : (
      <div className = {styles.user_actions}>
        <button onClick={ unloadDevice }>Cancel</button>
        <button onClick={ createDeviceLocal }>Save</button>
      </div>
    );
  };

  const getEditButtonsNew = () => {
    return ( isBrEdit ) ?
      (
        <div className = {styles.user_actions}>
          <button onClick={ unloadDevice }>Cancel</button>
          <button onClick={ deleteDevice }>Delete</button>
          <button onClick={ updateDevice }>Update</button>
        </div>
      ) : (
        <div className = {styles.user_actions}>
          <button onClick={ unloadDevice }>Cancel</button>
          <button onClick={ deleteDeviceLocal } >Delete</button>
          <button onClick={ updateDeviceLocal }>Update</button>
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
    <div className={ ( isShow ? ' hide' : '' ) } >
      <div className={styles.promo_details_container}>
        <div className={styles.heading}>
          Add Device
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Consumer Email
          </label>
          <input type="text" data-field-name="email" data-field-type="text" value={ currState.email } disabled = { isEditing }/>
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Consumer Password
          </label>
          <input type="password" data-field-name="password" data-field-type="text" value={ currState.password } disabled = { isEditing }/>
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Device IMEI(1)
          </label>
          <input type="text" data-field-name="device_num" data-field-type="text" value={ currState.device_num } />
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Mobile Number
          </label>
          <input type="text" data-field-name="mobile_number" data-field-type="text" value={ currState.mobile_number } disabled = { isEditing }/>
        </div>
        <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
          <label className={styles.success_msg_lab}>
            Mobile Operator
          </label>
          <input type="text" data-field-name="operator" data-field-type="text" value={ currState.operator } />
        </div>
        { actionButtons }
      </div>
    </div>);
};

const decoratedOne = commonFormValidator(AddDeviceComponent, 'data-field-name', 'data-field-type', DEVICE_INPUT_CHANGE);
export default decoratedOne;
