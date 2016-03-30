import React from 'react';
import { connect } from 'react-redux';

const Toppicks = () => { // eslint-disable-line no-unused-vars
  const styles = require('./Toppicks.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.genres_container}>
            <label className={styles.hd}>genres</label>
            <div className={styles.genres_list}>
                <ul>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                    <li>
                        <label className={styles.genres_hd}>Whisket</label>
                        <p>10 times</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>);
};

export default connect()(Toppicks);
