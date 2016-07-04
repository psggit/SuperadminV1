import React from 'react';
import { connect } from 'react-redux';

const StateManagement = () => { // eslint-disable-line no-unused-vars
  const styles = require('./StateManagement.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
       	<div className={styles.head_container}>
       		SKU Managemnt / Create State
       	</div>
       	<div className={styles.search_wrapper + ' ' + styles.wd_100}>
       		<p>Search</p>
       		<div className={styles.search_form + ' ' + styles.wd_100}>
       			<input type="text" placeholder="Mobile Number" />
       			<input type="text" placeholder="Contains" />
       			<input type="number" />
       			<button className={styles.common_btn}>Search</button>
       		</div>
       	</div>
    </div>);
};

export default connect()(StateManagement);
