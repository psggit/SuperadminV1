import React from 'react';

const BrandDropDown = ( { brandData, value} ) => {
  const brandOptions = (brandData.length > 0) ? brandData.map( (brand, index) => {
    return (
        <option key={index} value={brand.short_name}>
          { brand.brand_name.toUpperCase() }
        </option>
      );
  }) : () => {
    return ( <option value="No Brands"> No Brands </option> );
  };
  return (
        <select data-field-name="brand_id" data-field-type="text" value = { value ? value : '' }>
          { brandOptions }
        </select>
      );
};

export default BrandDropDown;
