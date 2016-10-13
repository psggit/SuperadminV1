import React from 'react';
import SettlementInformation from '../RedemptionHistory/SettlementInformation';
const SettementWrapper = ( { beneficiaries, loadBeneficiary, localBens, loadLocalBeneficiary } ) => {
  const content = beneficiaries.map((beneficiary, index) => {
    return (
      <SettlementInformation key = {index} label = { beneficiary.name } val = { 'Edit' } benId = { beneficiary.id } loadBeneficiary={ loadBeneficiary } />
    );
  });
  const contentLocal = Object.keys(localBens).map((beneficiary, index) => {
    return (
      <SettlementInformation key = {index} label = { localBens[beneficiary].name } val = { 'Edit' } benId = { beneficiary } loadBeneficiary={ loadLocalBeneficiary } />
    );
  });
  return (
    <div>
      {content}
      {contentLocal}
    </div>
  );
};
export default SettementWrapper;
