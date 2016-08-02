import React from 'react';
import { connect } from 'react-redux';
const SkuSelectBrands = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <div className={styles.brands_ml_container}>
        <div className={styles.heading}>
          Brands
        </div>
        <ul>
          <li>
            <label>Tamil nadu</label>
            <p>3 Cities</p>
          </li>
        </ul>
      </div>
    </div>);
};

export default connect()(SkuSelectBrands);
