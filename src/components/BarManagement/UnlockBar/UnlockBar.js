import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
class UnlockBar extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'BAR SKU MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Add SKU for Bars',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Chennai',
      sequence: 3,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Unlock Bar',
      sequence: 4,
      link: '#'
    });
  }
  render() {
    const styles = require('./UnlockBar.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.device_details_head}>
          Unlock Bar
        </div>
        <div className = {styles.device_details_wrapper}>
          <div className={styles.unlock_add_head}>
            + Add SKU
          </div>
          <div className={styles.unlock_list_head}>
            List of Sku{'\''}s
          </div>
          <div className={styles.unlock_listing}>
            <div className={styles.unlock_listing_name}>
              Name
            </div>
            <div className={styles.unlock_listing_date_container}>
              <div className={styles.unlock_listing_fromdate}>
                From: 21-09-2016
              </div>
              <div className={styles.unlock_listing_todate}>
                To: 26-09-2016
              </div>
            </div>
            <div className={styles.unlock_active_container}>
              <div className={styles.unlock_active}>
                Active
              </div>
              <div className={styles.unlock_view}>
                View
              </div>
            </div>
          </div>
          <div className={styles.unlock_listing}>
            <div className={styles.unlock_listing_name}>
              Name
            </div>
            <div className={styles.unlock_listing_date_container}>
              <div className={styles.unlock_listing_fromdate}>
                From: 21-09-2016
              </div>
              <div className={styles.unlock_listing_todate}>
                To: 26-09-2016
              </div>
            </div>
            <div className={styles.unlock_active_container}>
              <div className={styles.unlock_active}>
                Scheduled
              </div>
              <div className={styles.unlock_view}>
                View
              </div>
            </div>
          </div>
          <div className={styles.unlock_listing}>
            <div className={styles.unlock_listing_name}>
              Name
            </div>
            <div className={styles.unlock_listing_date_container}>
              <div className={styles.unlock_listing_fromdate}>
                From: 21-09-2016
              </div>
              <div className={styles.unlock_listing_todate}>
                To: 26-09-2016
              </div>
            </div>
            <div className={styles.unlock_active_container}>
              <div className={styles.unlock_active}>
                Disabled
              </div>
              <div className={styles.unlock_view}>
                View
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UnlockBar;
