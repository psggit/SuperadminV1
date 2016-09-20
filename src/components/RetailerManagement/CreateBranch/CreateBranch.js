import React from 'react';
import BrandDetailsComponent from './BrandDetailsComponent';
import SkuWrapper from './SkuWrapper';
import { connect } from 'react-redux';
import DeviceWrapper from './DeviceWrapper';
const CreateBrand = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.brand_wrapper}>
        <div className={styles.wd_100}>
          <BrandDetailsComponent />
        </div>
        <div className="clearfix"></div>
        <div className={styles.select_sku_wrapper}>
          <SkuWrapper />
        </div>
        <div className="clearfix"></div>
        <DeviceWrapper />
        <button className={styles.edit_brand_btn}>
          Save Branch
        </button>
      </div>
    </div>);
};

export default connect()(CreateBrand);
