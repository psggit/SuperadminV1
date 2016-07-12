import React from 'react';
import { connect } from 'react-redux';

const CreateNotepadEntry = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateNotepadEntry.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.create_notepad_container}>
        <label className={styles.heading}>Create Notepad Entry</label>
        <div className={styles.create_form}>
          <div className={styles.indiv_element + ' ' + styles.wd_100}>
            <label>Issue Code</label>
            <select>
              <option>N/A</option>
              <option>A102 Description: Faulty used device</option>
            </select>
          </div>
          <div className={styles.indiv_element + ' ' + styles.wd_100}>
            <label>Comment</label>
            <textarea rows="4" cols="40"></textarea>
          </div>
          <button className={styles.create_btn}>Create</button>
        </div>
      </div>
    </div>);
};

export default connect()(CreateNotepadEntry);
