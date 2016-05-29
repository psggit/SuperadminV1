import React from 'react';

const BrandDropDown = ( { brandData } ) => {
  const brandOptions = (brandData.length > 0) ? brandData.map( (brand, index) => {
    return (
        <option key={index} value={brand.brand_name}>
          { brand.brand_name.toUpperCase() }
        </option>
      );
  }) : () => {
    return ( <option value="No Brands"> No Brands </option> );
  };
  return (
        <select>
          { brandOptions }
        </select>
      );
};

export default BrandDropDown;
