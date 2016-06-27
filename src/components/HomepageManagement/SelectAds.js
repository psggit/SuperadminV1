import React from 'react';
import { connect } from 'react-redux';

const SelectAds = () => { // eslint-disable-line no-unused-vars
  const styles = require('./SelectAds.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.ads_wrapper}>
        <p className={styles.heading}>Ads</p>
        <div className={styles.select_wrapper}>
          <table>
            <thead>
              <tr>
                <th>S NO</th>
                <th>Select AD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <select>
                    <option>Ad Titles</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <select>
                    <option>Ad Titles</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <select>
                    <option>Ad Titles</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.user_actions}>
          <button className={styles.common_btn}>Save Order</button>
        </div>
      </div>
    </div>);
};

export default connect()(SelectAds);
