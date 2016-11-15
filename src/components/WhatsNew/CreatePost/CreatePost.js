import React from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';
import UploadSettlementReport from './UploadSettlementReport';
class CreatePost extends React.Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Whats New ',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Create Post',
      sequence: 2,
      link: '#'
    });
  }
  render() {
    const styles = require('./CreatePost.scss');

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.disable_device_wrapper}>
          <div className = {styles.disable_device_head}>
            What{'\''}s New
          </div>
          <DisableInformation label = "Author" val = "Author" />
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Title
            </div>
            <div className = {styles.information_rightpanel}>
              <textarea></textarea>
            </div>
          </div>
        </div>
        <UploadSettlementReport />
        <div className = {styles.whats_new_left_wrapper}>
        </div>
        <div className = {styles.whats_new_right_wrapper}>
        </div>
      </div>
    );
  }
}
export default CreatePost;
