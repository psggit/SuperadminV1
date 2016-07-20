import React from 'react';

const TopPicks = ({ label, children }) => {
  const styles = require('./Toppicks.scss');
  return (
    <div className={styles.container}>
      <div className={styles.genres_container}>
        <label className={styles.hd}>{ label }</label>
        <div className={styles.genres_list}>
          <ul>
            { children }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
