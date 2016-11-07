import React from 'react';
import { connect } from 'react-redux';
const SkuSelectBrandsItems = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <div className={styles.product_ml_container}>
        <div className={styles.heading}>
          Chevas Regal 12y
        </div>
        <ul>
          <li>
            <label>
              <input type="checkbox"/> 120ml
            </label>
          </li>
        </ul>
      </div>
      <div className={styles.user_actions}>
        <button>Delete</button>
        <button>Update</button>
      </div>
    </div>);
};

export default connect()(SkuSelectBrandsItems);
