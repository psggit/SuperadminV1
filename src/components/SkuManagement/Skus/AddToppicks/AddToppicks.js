import React from 'react';
import { connect } from 'react-redux';

const AddToppicks = () => { // eslint-disable-line no-unused-vars
  const styles = require('./AddToppicks.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.add_top_picks_wrapper}>
            <div className={styles.indiv_field + ' ' + styles.display_block}>
                <label className={styles.heading}>
                    Order
                </label>
                <input type="text"/>
            </div>
            <div className={styles.indiv_field + ' ' + styles.display_inline_block}>
                <label className={styles.heading}>
                    SKU ID
                </label>
                <input type="text"/>
            </div>
            <div className={styles.or_label}>OR</div>
            <div className={styles.indiv_field + ' ' + styles.display_inline_block}>
                <label className={styles.heading}>
                    Brand
                </label>
                <select>
                    <option>Brand Name</option>
                    <option>Brand Name</option>
                    <option>Brand Name</option>
                </select>
            </div>
            <div className={styles.indiv_field + ' ' + styles.display_inline_block}>
                <label className={styles.heading}>
                    SKU Volume
                </label>
                <select>
                    <option>Brand Name</option>
                    <option>Brand Name</option>
                    <option>Brand Name</option>
                </select>
            </div>
            <button className={styles.add_btn}>Add Top Pick</button>
        </div>
    </div>);
};

export default connect()(AddToppicks);
