import React from 'react';
class UploadSettlementReport extends React.Component {
  render() {
    const styles = require('./UploadSettlementReport.scss');

    return (
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            UPLOAD SETTLEMENT REPORT
          </div>
          <div className={styles.upload_file_container}>
            <input type="file"> </input>
          </div>
          <div className={styles.disable_device_btn}>
            <button> Upload </button>
          </div>
        </div>
    );
  }
}
export default UploadSettlementReport;
