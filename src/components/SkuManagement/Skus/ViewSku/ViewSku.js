import React from 'react';
import { connect } from 'react-redux';

const SkuManagementViewSkus = () => { // eslint-disable-line no-unused-vars
  const styles = require('./ViewSku.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
        <div className={styles.create_sku_wrapper}>
            <div className={styles.heading}>create sku</div>
            <div className={styles.indiv_element}>
                <label>Brand Name</label>
                <select>
                    <option>Hoist</option>
                </select>
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
        <div className={styles.available_states_wrapper}>
            <div className={styles.heading}>Available states</div>
            <div className={styles.mrp_hd}>MRP</div>
            <div className={styles.dutyfree_hd}>Dutyfree</div>
            <ul>
                <li>
                    <p>Tamil Namdu</p>
                    <p>2000</p>
                    <p>120</p>
                </li>
            </ul>
        </div>
        <div className="clearfix"></div>
        <div className={styles.upload_container}>
            <div className={styles.upload_lab}>Upload Images</div>
            <div className={styles.upload_images}>
                <div className={styles.upload_id}>Upload New</div>
                <div className={styles.file_upload}>
                    <img src="" className={styles.upload_img}/>
                </div>
            </div>
        </div>
        <div className={styles.outlets_lab}>Select Outlets</div>
        <div className={styles.states_container}>
            <div className={styles.heading}>Available states</div>
            <ul>
                <li>
                    <label>Tamil Nadu</label>
                    <p>10 Cites</p>
                </li>
                <li>
                    <label>Tamil Nadu</label>
                    <p>10 Cites</p>
                </li>
            </ul>
        </div>
        <div className={styles.cities_container}>
            <div className={styles.heading}>Cities in: <span>tamil nadu</span></div>
            <ul>
                <li>
                    <label>Tamil Nadu</label>
                    <p>10 Outlets</p>
                </li>
                <li>
                    <label>Tamil Nadu</label>
                    <p>10 Outlets</p>
                </li>
            </ul>
        </div>
        <div className={styles.outlets_container}>
            <div className={styles.heading}>outlets in: <span>tamil nadu</span></div>
            <ul>
                <li><label>Tamil Nadu</label></li>
                <li><label>Tamil Nadu</label></li>
            </ul>
        </div>
        <div className="clearfix"></div>
        <button className={styles.edit_btn}>Edit</button>
    </div>);
};

export default connect()(SkuManagementViewSkus);
