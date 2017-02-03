import React from 'react';

const BrandDropDown = ( { brandData, value, page} ) => {
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
        <select data-field-name="brand_id" data-field-type="text" disabled ={ ( page === 'edit_page' ) ? true : false } data-field-value = { value ? value : ''} value = { value ? value : '' }>
          <option> select </option>
          { brandOptions }
        </select>
      );
};

export default BrandDropDown;
