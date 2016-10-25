import React from 'react';

import SkuComponent from './SkuComponent';
import SkuSelectWrapper from './SkuSelectWrapper';
const SkuWrapper = ( props ) => { // eslint-disable-line no-unused-vars
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
      <SkuComponent { ...props } />
      <SkuSelectWrapper { ...props } />
    </div>);
};

export default SkuWrapper;
