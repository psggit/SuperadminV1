import React from 'react';

const SkuSelectBrands = ( { brands, viewBrand } ) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  const brandHtml = brands.map( ( brand, index ) => {
    return (
      <li key={ index } >
        <label> { brand.brand_name } </label>
        <p
      onClick = { () => { return viewBrand.call(undefined, brand.id ); } }
        >
        { brand.skus.length } SKU{ brand.skus.length === 1 ? '' : 's' }
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
