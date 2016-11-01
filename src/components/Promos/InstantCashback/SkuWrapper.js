import React from 'react';
import { connect } from 'react-redux';
import SkuComponent from './SkuComponent';
import SkuSelectWrapper from './SkuSelectWrapper';
const SkuWrapper = () => { // eslint-disable-line no-unused-vars
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div>
    <SkuComponent />
    <SkuSelectWrapper />
    </div>);
};

export default connect()(SkuWrapper);
