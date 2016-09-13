import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
class UploadPayUReport extends React.Component {
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
      title: 'EOD Report',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./UploadPayUReport.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            UPLOAD PAYU REPORT
          </div>
          <div className={styles.upload_file_container}>
            <input type="file"> </input>
          </div>
          <div className={styles.disable_device_btn}>
            <button> Upload </button>
          </div>
        </div>
      </div>
    );
  }
}
export default UploadPayUReport;
