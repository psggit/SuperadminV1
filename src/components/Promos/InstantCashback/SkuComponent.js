import React from 'react';
import { connect } from 'react-redux';

const SkuComponent = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
    <div className={styles.sku_container}>
      <div className={styles.heading}>SKUS</div>
      <p className={styles.add_sku_lab}>+ Add SKUs</p>
      <div className={styles.brands_container}>
        <ul>
          <li>
            <label>Tamil nadu</label>
            <p>3 Cities</p>
          </li>
        </ul>
      </div>
    </div>

    </div>);
};

export default connect()(SkuComponent);
