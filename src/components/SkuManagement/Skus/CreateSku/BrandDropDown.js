import React from 'react';

const BrandDropDown = ( { brandData } ) => {
  const brandOptions = (brandData.length > 0) ? brandData.map( (brand, index) => {
    return (
        <option key={index} value={brand.id}>
          { brand.brand_name.toUpperCase() }
        </option>
      );
  }) : () => {
    return ( <option value="No Brands"> No Brands </option> );
  };
  return (
        <select data-field-name="brand_id" data-field-type="int">
          { brandOptions }
        </select>
      );
};

export default BrandDropDown;
