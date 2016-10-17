import React from 'react';
import { connect } from 'react-redux';
const SkuSelectBrandsItems = ( { selectedBrandId, brands, skuToggled, skus} ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const selectedBrand = brands.filter( ( brand ) => {
    return brand.id === selectedBrandId;
  });

  const skuHtml = ( selectedBrand.length > 0 ) ? selectedBrand[0].skus.map( ( sku, index ) => {
    return (
      <li key={ index } data-sku-id={ sku.id }>
        <label>
          <input type="checkbox" onChange = { ( e ) => { return skuToggled.call( undefined, sku.id, e); } } checked= { sku.id in skus }/> { sku.volume } ml
        </label>
      </li>
    );
  }) : 'Sorry no skus for the selected brand';
  return (
    <div className={ selectedBrand.length > 0 ? '' : 'hide' } >
      <div className={styles.product_ml_container}>
        <div className={styles.heading}>
          { selectedBrand.length > 0 ? selectedBrand[0].brand_name : '' }
        </div>
        <ul>
          { skuHtml }
        </ul>
      </div>
      {/*
      <div className={styles.user_actions}>
        <button>Delete</button>
        <button>Update</button>
      </div>
        */}
    </div>);
};

export default connect()(SkuSelectBrandsItems);
