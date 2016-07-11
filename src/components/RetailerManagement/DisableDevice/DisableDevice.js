import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';
class DisableDevice extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'RETAILER MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Disable Device',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./DisableDevice.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            Disable Device
          </div>
          <DisableInformation label = "Activation Status" val = "Active" />
          <DisableInformation label = "Deactivation Code" val = "Null" />
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Comment
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea></textarea>
            </div>
          </div>
          <div className={styles.disable_device_btn}>
            <button> Save </button>
          </div>
        </div>
      </div>
    );
  }
}
export default DisableDevice;
