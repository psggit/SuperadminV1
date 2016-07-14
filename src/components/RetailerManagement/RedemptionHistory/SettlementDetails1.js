import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
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
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Retailer ID
            </div>
            <div className = {styles.information_right_color}>
              32
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Net Amount
            </div>
            <div className = {styles.information_rightpanel}>
              445834
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Customer Credits
            </div>
            <div className = {styles.information_rightpanel}>
              400000
            </div>
          </div>

          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Manual Credits
            </div>
            <div className = {styles.information_right_color}>
              2000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Manual Debits
            </div>
            <div className = {styles.information_right_color}>
              1600
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Brands Amount
            </div>
            <div className = {styles.information_rightpanel}>
              50000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Discount
            </div>
            <div className = {styles.information_rightpanel}>
              20000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Service Tax
            </div>
            <div className = {styles.information_rightpanel}>
              3745
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Voucher Number
            </div>
            <div className = {styles.information_rightpanel}>
              2394823098
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Bank Name
            </div>
            <div className = {styles.information_rightpanel}>
              ICICI Bank
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Customer Credits
            </div>
            <div className = {styles.information_rightpanel}>
              400000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Customer Credits
            </div>
            <div className = {styles.information_rightpanel}>
              400000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Customer Credits
            </div>
            <div className = {styles.information_rightpanel}>
              400000
            </div>
          </div>
          <div className = {styles.settlement_details_information}>
            <div className = {styles.information_leftpanel}>
              Total Customer Credits
            </div>
            <div className = {styles.information_rightpanel}>
              400000
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default SettlementDetails;
