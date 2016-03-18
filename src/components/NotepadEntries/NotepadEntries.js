import React from 'react';
import { connect } from 'react-redux';

const NotepadEntries = () => { // eslint-disable-line no-unused-vars
  const styles = require('./NotepadEntries.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.notepad_entries_container}>
        <button className={styles.create_btn}>Create</button>
        <label className={styles.total_item_lab}>Total Items: <span>10</span></label>
        <div className={styles.indiv_item + ' ' + styles.wd_100}>
          <div className={styles.header + ' ' + styles.wd_100}>
            <label>Notepad ID: <span>127</span></label>
            <label>Updated At: <span>12-05-2016</span></label>
            <label>Created At: <span>12-04-2016</span></label>
          </div>
          <div className={styles.item_info + ' ' + styles.wd_100}>
            <ul>
              <li>
                <label>Customer ID</label>
                <p>21</p>
              </li>
              <li>
                <label>Marker ID</label>
                <p>21</p>
              </li>
              <li>
                <label>Issue Code</label>
                <p>A103</p>
              </li>
              <li>
                <label>Notepad Issue Description</label>
                <p>Customer unable to redeem usign nearbytes</p>
              </li>
              <li>
                <label>Comment</label>
                <p>Customer unable to redeem usign nearbytes Customer unable to redeem usign nearbytes
                Customer unable to redeem usign nearbytes Customer unable to redeem usign nearbytes</p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.indiv_item + ' ' + styles.wd_100}>
          <div className={styles.header + ' ' + styles.wd_100}>
            <label>Notepad ID: <span>127</span></label>
            <label>Updated At: <span>12-05-2016</span></label>
            <label>Created At: <span>12-04-2016</span></label>
          </div>
          <div className={styles.item_info + ' ' + styles.wd_100}>
            <ul>
              <li>
                <label>Customer ID</label>
                <p>21</p>
              </li>
              <li>
                <label>Marker ID</label>
                <p>21</p>
              </li>
              <li>
                <label>Issue Code</label>
                <p>A103</p>
              </li>
              <li>
                <label>Notepad Issue Description</label>
                <p>Customer unable to redeem usign nearbytes</p>
              </li>
              <li>
                <label>Comment</label>
                <p>Customer unable to redeem usign nearbytes Customer unable to redeem usign nearbytes
                Customer unable to redeem usign nearbytes Customer unable to redeem usign nearbytes</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
};

export default connect()(NotepadEntries);
