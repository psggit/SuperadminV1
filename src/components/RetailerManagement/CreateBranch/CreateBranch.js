import React from 'react';
import BrandDetailsComponent from './BrandDetailsComponent';
import { connect } from 'react-redux';

const CreateBrand = () => { // eslint-disable-line no-unused-vars
  const styles = require('./CreateBrand.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.brand_wrapper}>
        <div className={styles.wd_100}>
          <BrandDetailsComponent />
        </div>
        <div className="clearfix"></div>
        <div className={styles.select_sku_wrapper}>
          <div className={styles.sku_container}>
            <div className={styles.heading}>SKUS</div>
            <p className={styles.add_sku_lab}>+ Add SKUs</p>
            <div className={styles.brands_container}>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.select_sku_container}>
            <div className={styles.heading}>
              select available skus
            </div>
            <div className={styles.copy_sku}>
              <p>Copy SKUs From</p>
              <select>
                <option>select</option>
              </select>
            </div>
            <div className={styles.brands_ml_container}>
              <div className={styles.heading}>
                Brands
              </div>
              <ul>
                <li>
                  <label>Tamil nadu</label>
                  <p>3 Cities</p>
                </li>
              </ul>
            </div>
            <div className={styles.product_ml_container}>
              <div className={styles.heading}>
                Chevas Regal 12y
              </div>
              <ul>
                <li>
                  <label>
                    <input type="checkbox"/> 120ml
                  </label>
                </li>
              </ul>
            </div>
            <div className={styles.user_actions}>
              <button>Delete</button>
              <button>Update</button>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className={styles.device_container}>
          <div className={styles.device_items_container}>
            <div className={styles.device_lab}>
              Devices
              <p>10 Items</p>
            </div>
            <p className={styles.add_promo_lab}>+ Add Device</p>
            <div className={styles.items_list_container}>
              <div className={styles.indiv_item}>
                <div className={styles.heading_container}>
                  <p className={styles.heading_lab}>
                    Chevas Regular 12Y
                  </p>
                  <p className={styles.edit_lab}>
                    Edit
                  </p>
                </div>
                <div className="clearfix"></div>
                <div className={styles.custom_table_th + ' ' + 'row'}>
                  <div className={styles.table_th + ' ' + 'col-md-6'}>
                    Mobile Number
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-6'}>
                    Operator
                  </div>
                </div>
                <div className={styles.custom_table_td + ' ' + 'row'}>
                  <div className={styles.table_td + ' ' + 'col-md-6'}>
                    INR 3000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-6'}>
                    2000
                  </div>
                </div>
              </div>
              <div className={styles.indiv_item}>
                <div className={styles.heading_container}>
                  <p className={styles.heading_lab}>
                    Chevas Regular 12Y
                  </p>
                  <p className={styles.edit_lab}>
                    Edit
                  </p>
                </div>
                <div className={styles.custom_table_th + ' ' + 'row'}>
                  <div className={styles.table_th + ' ' + 'col-md-6'}>
                    Mobile Number
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-6'}>
                    Operator
                  </div>
                </div>
                <div className={styles.custom_table_td + ' ' + 'row'}>
                  <div className={styles.table_td + ' ' + 'col-md-6'}>
                    INR 3000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-6'}>
                    2000
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.promo_details_container}>
            <div className={styles.heading}>
              Add Device
            </div>
            <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
              <label className={styles.success_msg_lab}>
                Device IMEI(1)
              </label>
              <input type="text"/>
            </div>
            <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
              <label className={styles.success_msg_lab}>
                Mobile Number
              </label>
              <input type="text"/>
            </div>
            <div className={styles.wd_100 + ' ' + styles.margin_bottom}>
              <label className={styles.success_msg_lab}>
                Mobile Operator
              </label>
              <input type="text"/>
            </div>
            <div className={styles.user_actions}>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        </div>
        <button className={styles.edit_brand_btn}>
          Save Branch
        </button>
      </div>
    </div>);
};

export default connect()(CreateBrand);
