import React from 'react';
// import { connect } from 'react-redux';
import StatesWrapper from './StatesWrapper';
import StateOutlet from './StateOutlet';
import StateCity from './StateCity';
import CityRetailer from './CityRetailer';

import { IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, CANCEL_IMAGE} from './CreateSkuActions';

/* Image Upload component takes in two Actions OnResponseSuccess, OnResponseFailure */
import ImageUpload from './ImageUpload';

import SkuInfo from './SkuInfo';

const CreateSku = ({ brandList
    , stateList
    , stateCityMapping
    , cityRetailerMapping
    , onStateSelect
    , onStatePriceEntered
    , onStateView
    , onCityView
    , viewedState
    , viewedCity
    , onCityCheck
    , onRetailerCheck
    , skuImageUrl
    , dispatch
    , onSave
  }) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateSku.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      {
        /* Shows entry form for entering sku infomation */
      }
      <SkuInfo dispatch={ dispatch } brandList={brandList} />
      {
        /* Component to display the list of states and their corresponding prices */
      }
      <StatesWrapper stateData={stateList} stateCityMapping={stateCityMapping} onStateSelect={onStateSelect} onStatePriceEntered={onStatePriceEntered}/>
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
      <ImageUpload imageUrl={skuImageUrl} requestSuccess={IMAGE_UPLOAD_SUCCESS} requestError={ IMAGE_UPLOAD_ERROR } cancelImage={ CANCEL_IMAGE }/>
      <div className={styles.outlets_lab}>Select Outlets</div>
      {
        /* Component to render states and its corresponding information */
      }
      <StateOutlet stateCityMapping={stateCityMapping} onStateView={ onStateView } />
      {
        /* Similar to the above component to render city and its corresponding information */
      }
      <StateCity viewedState={ viewedState } cityRetailerMapping={ cityRetailerMapping } onCityCheck={onCityCheck} onCityView={onCityView} />
      {
        /* Component to render retailers of a particular city */
      }
      <CityRetailer viewedCity={ viewedCity } onRetailerCheck={ onRetailerCheck }/>

      {
        /* Again some CSS Gotcha */
      }
      <div className="clearfix"></div>
      {
        /* Self Explaining */
      }
      <button className={styles.save_btn} onClick = { onSave } >Save</button>
    </div>);
};

export default CreateSku;
// export default connect()(CreateSku);
