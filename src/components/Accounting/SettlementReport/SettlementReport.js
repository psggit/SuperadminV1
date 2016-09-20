import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';
class SettlementReport extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Accounting',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Settlement Report',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./SettlementReport.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            SETTLEMENT REPORT
          </div>
          <DisableInformation label = "Select From Date" val = "21-4-2016" />
          <DisableInformation label = "Select To Date" val = "21-4-2016" />
          <div className={styles.disable_device_btn}>
            <button> Generate </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SettlementReport;
