import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';
class ConsumerDisableAccountCreateCode extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Parameter Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Consumer Disable Account Codes',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Create Code',
      sequence: 3,
      link: '#'
    });
  }
  render() {
    const styles = require('./ConsumerDisableAccountCreateCode.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            CREATE NEW CODE
          </div>
          <div className = {styles.code_wrapper}>
            <div className = {styles.information_leftpanel}>
              Code
            </div>
            <div className = {styles.information_rightpanel}>
              <input></input>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Descripition
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea></textarea>
            </div>
          </div>
          <DisableInformation label = "Status" val = "Enabled" />
          <div className={styles.disable_device_btn}>
            <button> Create </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ConsumerDisableAccountCreateCode;
