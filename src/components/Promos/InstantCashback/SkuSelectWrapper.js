import React from 'react';
import { connect } from 'react-redux';
import SkuSelectBrands from './SkuSelectBrands';
import SkuSelectBrandsItems from './SkuSelectBrandsItems';
const SkuSelectWrapper = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <div className={styles.select_sku_container}>
        <div className={styles.heading}>
          select available skus
        </div>
        <div className={styles.copy_sku}>
          <p>Copy SKUs From</p>
          <select>
            <option>select</option>
          </select>
        </div>
        <SkuSelectBrands />
        <SkuSelectBrandsItems />
      </div>
    </div>);
};

export default connect()(SkuSelectWrapper);
