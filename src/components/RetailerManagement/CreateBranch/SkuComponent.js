import React from 'react';

const SkuComponent = ( {
  skus,
  serverSkus,
  skuViewToggle,
  deleteSkuLocal,
  disableSKUs,
  inactiveSkus,
  enableSKUs
}) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const skuServerHtml = ( Object.keys(serverSkus).length > 0 ) ? Object.keys(serverSkus).map( ( sku ) => {
    return (
      <li key={ serverSkus[sku].id } >
        <label>{ serverSkus[sku].brand_name } - { serverSkus[sku].volume } ML / ( { serverSkus[sku].inventory_status_name ? serverSkus[sku].inventory_status_name : 'N/A' } ) </label>
        <p onClick={ () => { return disableSKUs.call( undefined, serverSkus[sku].id ); } }>
          Delete
        </p>
      </li>
    );
  }) : '';
  const skuHtml = ( Object.keys(skus).length > 0 ) ? Object.keys(skus).map( ( sku ) => {
    return (
      <li key={ skus[sku].id } >
        <label>{ skus[sku].brand_name } - { skus[sku].volume } ML </label>
        <p onClick={ () => { return deleteSkuLocal.call( undefined, skus[sku].id ); } }>
          Delete
        </p>
      </li>
    );
  }) : '';

  const inactiveHtml = ( Object.keys(inactiveSkus).length > 0 ) ? Object.keys(inactiveSkus).map( ( sku ) => {
    return (
      <li key={ inactiveSkus[sku].id } >
        <label>{ inactiveSkus[sku].brand_name } - { inactiveSkus[sku].volume } ML / ( { inactiveSkus[sku].inventory_status_name ? inactiveSkus[sku].inventory_status_name : 'N/A' } )</label>
        <p onClick={ () => { return enableSKUs.call( undefined, inactiveSkus[sku].id ); } }>
          Activate
        </p>
      </li>
    );
  }) : ( <li> No inactive Sku's </li> );

  const finalHtml = (skuServerHtml.length === 0 && skuHtml.length === 0 ) ? ( <li> No active Sku's </li> ) : [ ...skuServerHtml, ...skuHtml];
  return (
    <div>
    <div className={styles.sku_container}>
      <div className={styles.heading}>SKUS</div>
      <p className={styles.add_sku_lab}
    onClick={ skuViewToggle }
      >+ Add SKUs
      </p>
      <div className={styles.brands_container}>
        <ul>
          <li className={ styles.sku_header } > Active SKU's </li>
          { finalHtml }
          <li className={ styles.sku_header }> Inactive SKU's </li>
          { inactiveHtml }
        </ul>
      </div>
    </div>

    </div>);
};

export default SkuComponent;
