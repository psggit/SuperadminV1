import React from 'react';
// import { connect } from 'react-redux';
import BrandDropDown from './BrandDropDown';
import StatesWrapper from './StatesWrapper';
import StateOutlet from './StateOutlet';
import StateCity from './StateCity';
import CityRetailer from './CityRetailer';

const CreateSku = ({ brandList
    , stateList
    , stateCityMapping
    , cityRetailerMapping
    , onStateSelect
    , onStateView
    , onCityView
    , viewedState
    , viewedCity
    , onCityCheck
    , onRetailerCheck
  }) => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateSku.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.create_sku_wrapper}>
          <div className={styles.heading}>create sku</div>
          <div className={styles.indiv_element}>
            <label>Brand Name</label>
            <BrandDropDown brandData={ brandList } />
            {/*
            <select>
                <option>Hoist</option>
            </select>
            */}
          </div>
          <div className={styles.indiv_element}>
            <label>Volume in ml</label>
            <input type="number"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Alcohol Percentage</label>
            <input type="number"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Temperature</label>
            <input type="number"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Place of Origin</label>
            <input type="text"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Test Volume</label>
            <input type="number"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Barcode</label>
            <input type="text"/>
          </div>
          <div className={styles.indiv_element}>
            <label>Description</label>
            <textarea rows="4" cols="10"></textarea>
          </div>
          <div className={styles.indiv_element}>
            <label>Status</label>
            <select>
              <option>Active</option>
            </select>
          </div>
        </div>
        <StatesWrapper stateData={stateList} stateCityMapping={stateCityMapping} onStateSelect={onStateSelect} />
        <div className="clearfix"></div>
        <div className={styles.upload_container}>
          <div className={styles.upload_lab}>Upload Images</div>
          <div className={styles.upload_images}>
            <div className={styles.upload_id}>Upload New</div>
            <div className={styles.file_upload}>
              <img src="" className={styles.upload_img}/>
              <input type="file"/>
            </div>
          </div>
          <div className={styles.upload_btn_layout}>
            <button className={styles.upload_btn}>Upload</button>
          </div>
        </div>
        <div className={styles.outlets_lab}>Select Outlets</div>
        <StateOutlet stateCityMapping={stateCityMapping} onStateView={ onStateView } />
        <StateCity viewedState={ viewedState } cityRetailerMapping={ cityRetailerMapping } onCityCheck={onCityCheck} onCityView={onCityView} />
        <CityRetailer viewedCity={ viewedCity } onRetailerCheck={ onRetailerCheck }/>
        {/*
        <div className={styles.cities_container}>
          <div className={styles.heading}>Cities in: <span>tamil nadu</span></div>
          <ul>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
              <p>10 Outlets</p>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
              <p>10 Outlets</p>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
              <p>10 Outlets</p>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
              <p>10 Outlets</p>
            </li>
          </ul>
        </div>
        */}
        {/*
        <div className={styles.outlets_container}>
          <div className={styles.heading}>outlets in: <span>tamil nadu</span></div>
          <ul>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
            </li>
            <li>
                <label>
                    <input type="checkbox"/>
                    Tamil Nadu
                </label>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox"/>
                Tamil Nadu
              </label>
            </li>
          </ul>
        </div>
        */}
        <div className="clearfix"></div>
        <button className={styles.save_btn}>Save</button>
    </div>);
};

export default CreateSku;
// export default connect()(CreateSku);
