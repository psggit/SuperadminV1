import React from 'react';
import { connect } from 'react-redux';

const PromosInstantCashback = () => { // eslint-disable-line no-unused-vars
  const styles = require('./PromosInstantCashback.scss');
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  return (
    <div className={styles.container}>
      <div className={styles.complete_container}>
        <div className={styles.compaign_details}>
          <div className={styles.heading + ' ' + styles.wd_100}>Campaign details</div>
            <ul>
              <li>
                <label>Brand Manager Email</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Compaign Name</label>
                <input data-field-name="name" type="text" />
              </li>
              <li>
                <label>Budgeted Amount</label>
                <input type="number" />
              </li>
              <li>
                <label>Funds Credited</label>
                <input type="number" />
              </li>
              <li>
                <label>Active From</label>
                <input type="date" />
              </li>
              <li>
                <label>Active To</label>
                <input type="date" />
              </li>
              <li>
                <label>Campaign Status</label>
                <select data-field-name="">
                  <option>Select</option>
                </select>
              </li>
            </ul>
        </div>
        <div className={styles.upload_report_container}>
          <div className={styles.heading}>
            upload report
          </div>
          <div className={styles.upload_report}>
            <input type="text" className={styles.input_title} placeholder="Report Title"/>
            <input type="file" className={styles.input_upload}/>
            <button className={styles.upload_btn}>upload</button>
          </div>
          <div className={styles.report_history_container}>
            <div className={styles.heading}>
              Report History
            </div>
            <div className={styles.report_list}>
              <div className={styles.indiv_report}>
                <p>
                  Budget Report for Chivas regal
                </p>
                <p>
                  <label>Dowload</label>
                </p>
                <div className="clearfix"></div>
                <label className={styles.upload_lab}>Uploaded at:<span></span></label>
              </div>
              <div className={styles.indiv_report}>
                <p>
                  Budget Report for Chivas regal
                </p>
                <p>
                  <label>Dowload</label>
                </p>
                <div className="clearfix"></div>
                <label className={styles.upload_lab}>Uploaded at:<span></span></label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.promo_container}>
          <div className={styles.promo_items_container}>
            <div className={styles.heading}>
              Promo items
            </div>
            <p className={styles.add_promo_lab}>+ Add Promo</p>
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
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Cashback
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Total Bottles
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Total Amount
                  </div>
                </div>
                <div className={styles.custom_table_td + ' ' + 'row'}>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    INR 3000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    2000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    INR 6000
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
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Cashback
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Total Bottles
                  </div>
                  <div className={styles.table_th + ' ' + 'col-md-4'}>
                    Total Amount
                  </div>
                </div>
                <div className={styles.custom_table_td + ' ' + 'row'}>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    INR 3000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    2000
                  </div>
                  <div className={styles.table_td + ' ' + 'col-md-4'}>
                    INR 6000
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.promo_details_container}>
            <div className={styles.heading}>
              promo details
            </div>
            <div className={styles.wd_100}>
              <label className={styles.success_msg_lab}>
                Success Message
              </label>
              <textarea rows="4" cols="10" className={styles.text_msg}></textarea>
            </div>
            <div className={styles.wd_100 + ' ' + styles.padding_top}>
              <label className={styles.success_msg_lab}>
                Cashback Amount
              </label>
              <div className={styles.custom_select}>
                <input type="text" className={styles.input_cash}/>
                <select>
                  <option>INR</option>
                </select>
              </div>
            </div>
            <div className={styles.select_container}>
              <div className={styles.heading}>
                select sku
              </div>
              <div className={styles.brand_container}>
                <div className={styles.heading}>
                    <label>Brands</label>
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
                  <span className={styles.state}>Tamil Nadu</span>
                </div>
                <ul>
                  <li>
                    <label>
                      <input type="checkbox"/> Tamil nadu
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.quantity_container}>
              <div className={styles.heading}>
                select quantity for city
              </div>
              <div className={styles.brand_container}>
                <div className={styles.heading}>
                    <label>Regions</label>
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
                  Cities
                </div>
                <ul>
                  <li>
                    <label>
                      <input type="checkbox"/> Tamil nadu
                      <input type="text" className={styles.input_val}/>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.user_actions}>
              <button>Delete</button>
              <button>Update</button>
            </div>
          </div>
          <div className={styles.save_promo_lay}>
            <button>Save Promo</button>
          </div>
        </div>
      </div>
    </div>);
};

export default connect()(PromosInstantCashback);
