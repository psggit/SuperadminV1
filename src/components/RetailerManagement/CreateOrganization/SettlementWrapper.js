import React from 'react';
import SettlementInformation from '../RedemptionHistory/SettlementInformation';
const SettementWrapper = () => {
  const ArrayCount = [ { 'labelVal': 'Suree', 'val': 'Edit'}, {'labelVal': 'karthik', 'val': 'Edit'}, {'labelVal': 'Harshit', 'val': 'Edit' } ];
  const content = ArrayCount.map((name, index) => {
    return (
      <SettlementInformation key = {index} label = { name.labelVal } val = {name.val}/>
    );
  });
  return (
    <div>
      {content}
    </div>
  );
};
export default SettementWrapper;
