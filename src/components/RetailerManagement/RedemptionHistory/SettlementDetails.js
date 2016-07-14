import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import SettlementInformation from './SettlementInformation';
class SettlementDetails extends React.Component {
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
      title: 'Redemtion History',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: '32',
      sequence: 3,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Settlement Details',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./SettlementDetails.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.settlement_details_wrapper}>
          <div className = {styles.settlement_details_head}>
            Settement Details
          </div>
          <SettlementInformation label = "Retailer ID" val="32" isactive="true" />
          <SettlementInformation label = "Net Amount" val="445834" />
          <SettlementInformation label = "Total Customer Credits" val="400000" />
          <SettlementInformation label = "Total Manual Credits" val="2000" isactive="true" />
          <SettlementInformation label = "Total Manual Debits" val="1600" isactive="true" />
          <SettlementInformation label = "Brands Amount" val="50000" />
          <SettlementInformation label = "Discount" val="20000" />
          <SettlementInformation label = "Service Tax" val="2000" />
          <SettlementInformation label = "Voucher Number" val="2394823098" />
          <SettlementInformation label = "Bank Name" val="ICICI Bank" />
          <SettlementInformation label = "Branch Name" val="Nungambakkam" />
          <SettlementInformation label = "Account Number" val="21039382957281" />
          <SettlementInformation label = "Opening Balance" val="445000" />
          <SettlementInformation label = "Closing Balance" val="0" />
        </div>
      </div>
    );
  }
}
export default SettlementDetails;
