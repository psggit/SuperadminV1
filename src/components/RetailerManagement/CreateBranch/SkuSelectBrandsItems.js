import React from 'react';
import { connect } from 'react-redux';
const SkuSelectBrandsItems = ( {
  selectedBrandId,
  brands,
  skuToggled,
  skus,
  unsavedSkus,
  serverSkus,
  saveSkuLocal,
  inactiveSkus,
  clearSkuLocal,
  isBrEdit,
  saveInventoryEdit,
  stateIdentifier
} ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const selectedBrand = brands.filter( ( brand ) => {
    return brand.id === selectedBrandId;
  });

  console.log('skus');
  console.log(skus);

  let filteredSkus = ( selectedBrand.length > 0 ) ? selectedBrand[0].skus.filter( ( sku ) => {
    return ( sku.pricings.length > 0 && !( sku.id in serverSkus || sku.id in inactiveSkus ));
  }) : [];

  if ( stateIdentifier ) {
    const temp = [ ...filteredSkus ];
    filteredSkus = [];
    temp.forEach( ( t ) => {
      const pricings = t.pricings.filter( ( p ) => {
        return p.state_short_name === stateIdentifier;
      });
      if ( pricings.length > 0 ) {
        filteredSkus.push(t);
      }
    });
  }

  const skuHtml = ( filteredSkus.length > 0 ) ? filteredSkus.map( ( sku, index ) => {
    return (
      <li key={ index } data-sku-id={ sku.id }>
        <label>
          <input type="checkbox" onChange = { ( e ) => { return skuToggled.call( undefined, sku.id, e); } } checked= { sku.id in unsavedSkus }/> { sku.volume } ml
        </label>
      </li>
    );
  }) : 'Sorry no skus for the selected brand';

  const actionButton = ( isBrEdit ) ?
    (
      <button onClick={ saveInventoryEdit } > Save </button>
    )
  :
    (
      <button onClick={ saveSkuLocal } > Save </button>
    );
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
      <div className={styles.user_actions}>
        <button onClick={ clearSkuLocal } > Cancel </button>
        { actionButton }
      </div>
    </div>);
};

export default connect()(SkuSelectBrandsItems);
