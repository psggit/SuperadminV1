import React from 'react';

const SkuComponent = ( {
  skus,
  unSelectSKU
}) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const skuHtml = ( Object.keys(skus).length > 0 ) ? Object.keys(skus).map( ( sku, index ) => {
    return (
      <li key={ index } >
        <label>{ skus[sku].brand_name } - { skus[sku].volume } ML </label>
        <p onClick={ () => { return unSelectSKU.call( undefined, skus[sku].id ); } }>
          Delete
        </p>
      </li>
    );
  }) : ' No Skus Selected Yet ';
  return (
    <div>
    <div className={styles.sku_container}>
      <div className={styles.heading}>SKUS</div>
      {/*
      <p className={styles.add_sku_lab}>+ Add SKUs</p>
        */}
      <div className={styles.brands_container}>
        <ul>
          { skuHtml }
        </ul>
      </div>
    </div>

    </div>);
};

export default SkuComponent;
