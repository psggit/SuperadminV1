import React from 'react';
import formValidator from '../../Common/CommonFormValidator';

import {AD_INFO} from './CreateArticleAction';

const AdInfo = () => {
  const styles = require('./CreateImage.scss');
  return (
      <div className={styles.campaign_container}>
        <div className={styles.heading + ' ' + styles.wd_100}>Whats New Article</div>
        <div className = {styles.information_leftpanel}>
          Title
        </div>
        <div className = {styles.information_rightpanel}>
          <textarea id="title"></textarea>
        </div>
        <div className = {styles.information_leftpanel}>
          Description
        </div>
        <div className = {styles.information_rightpanel}>
          <textarea id="description"></textarea>
        </div>
        <div className = {styles.information_leftpanel}>
          Content
        </div>
        <div className = {styles.information_rightpanel}>
          <textarea id="content_whatsnew"></textarea>
        </div>
        <div className = {styles.information_leftpanel}>
          Is Featured?
        </div>
        <div className = {styles.information_rightpanel}>
          <div>
            <input type="radio" value="yes" name="featured">Yes</input>
          </div>
          <div>
            <input type="radio" value="no" name="featured">No</input>
          </div>
        </div>
      </div>
  );
};

// Format
// formValidator( Component, Form Attribute for Models)
export default formValidator(AdInfo, 'data-field-name', 'data-field-type', AD_INFO);
// Change emitter is the function
