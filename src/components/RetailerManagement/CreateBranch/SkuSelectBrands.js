import React from 'react';

const SkuSelectBrands = ( {
  brands,
  viewBrand,
  serverSkus,
  inactiveSkus,
  stateIdentifier
} ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

  const brandHtml = brands.map( ( brand, index ) => {
    let validSkus = brand.skus.filter( ( sku ) => {
      return ( sku.pricings.length > 0 && !( sku.id in serverSkus || sku.id in inactiveSkus ) );
    });

    if ( stateIdentifier ) {
      const temp = [ ...validSkus ];
      validSkus = [];
      temp.forEach( ( t ) => {
        const pricings = t.pricings.filter( ( p ) => {
          return p.state_short_name === stateIdentifier;
        });
        if ( pricings.length > 0 ) {
          validSkus.push(t);
        }
      });
    }
    return (
      <li key={ index } >
        <label> { brand.brand_name } </label>
        <p
      onClick = { () => { return viewBrand.call(undefined, brand.id ); } }
        >
        { validSkus.length } SKU{ validSkus.length === 1 ? '' : 's' }
        </p>
      </li>
    );
  });

  return (
    <div>
      <div className={styles.brands_ml_container}>
        <div className={styles.heading}>
          Brands
        </div>
        <ul >
          { brandHtml }
        </ul>
      </div>
    </div>);
};

export default SkuSelectBrands;
