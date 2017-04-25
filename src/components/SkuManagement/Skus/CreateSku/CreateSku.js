import React from 'react';
// import { connect } from 'react-redux';
import StatesWrapper from './StatesWrapper';
import StateOutlet from './StateOutlet';
import StateCity from './StateCity';
import CityRetailer from './CityRetailer';

import SkuInfo from './SkuInfo';

const CreateSku = ({ brandList
    , stateList
    , stateCityMapping
    , showConsumer
    , cityRetailerMapping
    , toggleConsumerInfo
    , onStateSelect
    , onStatePriceEntered
    , onStateView
    , onCityView
    , viewedState
    , viewedCity
    , onCityCheck
    , onRetailerCheck
    , dispatch
    , onSave
    , onUpdate
    , skuReqObj
    , page
    , reservedItems
    , disableSKUs
    , toggleSkuStatus
    , toggleState
  }) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateSku.scss');
  const submitButton = ( page !== 'edit_page' ) ? (
        <button className={styles.save_btn} onClick = { onSave } >Save</button>
      ) : (
          <button className={styles.save_btn} onClick = { onUpdate } >Update</button>
        );
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      {
        /* Shows entry form for entering sku infomation */
      }
      <SkuInfo toggleConsumerInfo = {toggleConsumerInfo} showConsumer = {showConsumer} dispatch={ dispatch } brandList={brandList} skuReqObj = { skuReqObj } reservedItems = { reservedItems } page = { page } disableSKUs = { disableSKUs }/>
      {
        /* Component to display the list of states and their corresponding prices */
      }
      <StatesWrapper toggleState={toggleState} stateData={stateList} stateCityMapping={stateCityMapping} onStateSelect={onStateSelect} onStatePriceEntered={onStatePriceEntered}/>
      {
        /* Some CSS Gotcha */
      }
      <div className="clearfix"></div>
      {
        /*
         Image Upload Component
         Takes in two events
          1. OnImageUploadSuccess
          2. OnImageUploadFailure
        */
      }
      <div className={styles.outlets_lab}>Select Outlets</div>
      {
        /* Component to render states and its corresponding information */
      }
      <StateOutlet stateCityMapping={stateCityMapping} onStateView={ onStateView } />
      {
        /* Similar to the above component to render city and its corresponding information */
      }
      <StateCity viewedState={ viewedState } cityRetailerMapping={ cityRetailerMapping } onCityCheck={onCityCheck} onCityView={onCityView} page = { page } />
      {
        /* Component to render retailers of a particular city */
      }
      <CityRetailer viewedCity={ viewedCity } onRetailerCheck={ onRetailerCheck } page = { page } toggleSkuStatus = { toggleSkuStatus } />

      {
        /* Again some CSS Gotcha */
      }
      <div className="clearfix"></div>
      {
        /* Self Explaining */
      }
      { submitButton }
    </div>);
};

export default CreateSku;
// export default connect()(CreateSku);
