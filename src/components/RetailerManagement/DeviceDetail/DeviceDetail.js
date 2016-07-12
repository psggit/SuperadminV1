import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import SettlementInformation from './DeviceInformation';
class DeviceDetail extends React.Component {
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
      title: 'Device Details',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./DeviceDetail.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.device_details_wrapper}>
          <div className = {styles.device_details_head}>
            Device Details
          </div>
          <SettlementInformation label = "Retailer ID" val="Elixr" />
          <SettlementInformation label = "Device ID" val="23-06-1993" />
          <SettlementInformation label = "Retailer Location" val="123.823746.7.452983" />
          <SettlementInformation label = "City" val="Chennai" />
          <SettlementInformation label = "Status" val="Active" />
          <SettlementInformation label = "Credited At" val="09-01-2016" />
          <SettlementInformation label = "Updated At" val="03-03-2016" />
        </div>
        <div className={styles.device_disable_btn}>
          <button> Disable Device</button>
        </div>
      </div>
    );
  }
}
export default DeviceDetail;
