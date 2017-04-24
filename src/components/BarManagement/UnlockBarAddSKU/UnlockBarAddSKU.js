import React, { PropTypes, Component } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';

import { Link } from 'react-router';
import { connect } from 'react-redux';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';

import {
  fetchInitials,
  fetchConsumersWithOpenReservations,
  TOGGLE_SKU_DIV,
  CHANGE_LIST,
  RESET_BAR_SKU,
  INPUT_VALUE_CHANGED,
  saveSku,
  VIEW_SKU,
  CANCEL_SKU,
  CLOSE_SCREEN,
  updateSku,
  disableSku
} from './BarSkuAction';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

class UnlockBarAddSKU extends Component {
  constructor( ) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'BAR SKU MANAGEMENT',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Add SKU for Bars',
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    const { barId } = this.props.params;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch( fetchInitials( barId ) )
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    this.props.dispatch( { type: RESET_BAR_SKU });
  }

  toggleSkuVisibility() {
    this.props.dispatch( { type: TOGGLE_SKU_DIV } );
  }
  ifetchConsumersWithOpenReservation(e) {
    console.log(e);
    const skuId = e.target.closest('[data-sku-id]').getAttribute('data-sku-id');
    if (skuId !== null) {
      this.props.dispatch(fetchConsumersWithOpenReservations(parseInt(skuId, 10)));
    }
  }
  closeConsumerList() {
    this.props.dispatch( { type: CLOSE_SCREEN} );
  }
  changeList(e) {
    Promise.all([this.props.dispatch({type: CHANGE_LIST, data: e.target.getAttribute('data-type')})]).then(() => {
      const { barId } = this.props.params;
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch( fetchInitials( barId ) )
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    });
  }

  saveSku() {
    const { barId } = this.props.params;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch( saveSku( barId ) )
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  viewSku( id ) {
    this.props.dispatch({ type: VIEW_SKU, data: id });
  }

  cancelSku() {
    this.props.dispatch({ type: CANCEL_SKU });
  }
  disableSku() {
    this.props.dispatch(disableSku());
  }
  updateSku() {
    const { barId } = this.props.params;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(updateSku( barId ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./UnlockBarAddSKU.scss');

    const {
      skuData,
      barData,
      consumerInfo,
      showSku,
      barCityInfo,
      newSkuData,
      showData,
      showScreen,
      barSKUs,
      isEdit
    } = this.props;

    this.breadCrumbs = [];

    this.breadCrumbs.push({
      title: 'Bar SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Add SKU for Bars',
      sequence: 2,
      link: '#'
    });
    this.breadCrumbs.push({
      title: ( barData[0] ? barCityInfo.name : ''),
      sequence: 3,
      link: '#'
    });
    this.breadCrumbs.push({
      title: ( barData[0] ? barData[0].name : ''),
      sequence: 4,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Add SKU',
      sequence: 5,
      link: '#'
    });

    const statusArray = ['active', 'inactive'];

    const statusHtml = statusArray.map( ( stat, index ) => {
      return (
        <option key={ index } value={ stat === 'active' ? 1 : 0 }> { stat } </option>
      );
    });

    const skuHtml = skuData.map( ( sku, index ) => {
      return (
        <option key={ index } value={ sku.id }> { sku.sku.brand.brand_name } - { sku.sku.volume } ML </option>
      );
    });

    const barHtml = ( barData[0] ) ? ( barData[0].inventories.map( ( invent, index ) => {
      const days = Math.floor((new Date(invent.end_date) - new Date) / (1000 * 3600 * 24));
      const diff = ((new Date(invent.end_date) - new Date) / (1000 * 3600 * 24)) - Math.floor((new Date(invent.end_date) - new Date) / (1000 * 3600 * 24));
      const hours = Math.floor(diff * 24 );
      return (
        <div className={styles.unlock_listing} key={ index }>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Name:</span> { invent.sku_pricing.sku.brand.brand_name } - { invent.sku_pricing.sku.volume } ML
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Menu Price:</span> { invent.menuPrice }
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Negotiated price with tax:</span> { invent.negotiated_sku_price + (invent.negotiated_sku_price * invent.charges_and_tax_percentage / 100) }
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Hipbar Price:</span> { invent.hipbarPrice }
          </div>
          <div className={styles.listing_order}>
            { invent.listingOrder}
          </div>
          <div data-sku-id = { invent.sku_pricing_id in barSKUs ? invent.sku_pricing_id : null} onClick={this.ifetchConsumersWithOpenReservation.bind(this)} className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Open Reservations:</span> { invent.sku_pricing_id in barSKUs ? barSKUs[invent.sku_pricing_id].length : 0 } <span className={styles.unlock_view + (invent.sku_pricing_id in barSKUs ? '' : ' hide')}> (Show Customers)</span>
          </div>
          { ( days >= 0 ) ? (
          <div className={styles.expiry}>
            *Expires in: { days } Days, { hours } Hours
          </div>
          ) : (
          <div className={styles.expired}>
            *Expired : { days } Days, { hours } Hours Ago
          </div>
          )
          }
          <div className={styles.unlock_active_container}>
            <div className={invent.is_active ? styles.unlock_active : styles.unlock_inactive}>
              { invent.is_active ? 'Active' : 'InActive' }
            </div>
            <div className={styles.unlock_view} onClick={ () => {
              return this.viewSku.call(this, invent.id );
            } }>
              View
            </div>
          </div>
        </div>
      );
    })) : '';

    const consumerHtml = ( consumerInfo.length > 0 ) ? ( consumerInfo.map( ( consum, index ) => {
      return (
        <div className={styles.unlock_listing} key={ index }>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>ID:</span> { consum.cart.cart.customer.id }
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Full Name:</span> { consum.cart.cart.customer.full_name }
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Email:</span> { consum.cart.cart.customer.email }
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Mobile:</span> { consum.cart.cart.customer.mobile_number}
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Reservation ID:</span> { consum.reservation_id}
          </div>
          <div className={styles.unlock_listing_name}>
            <span className={styles.unlock_head}>Date Reserved:</span> { consum.created_at}
          </div>
          <div className={styles.unlock_listing_name}>
            ----------------------------------------
          </div>
        </div>
      );
    })) : '';


    const actionButton = ( isEdit ) ? (
      <div className={ styles.edit_sku }>
        <button className={ styles.edit_sku_cancel } onClick={ this.cancelSku.bind(this) } >
          Cancel
        </button>
        <button className={ styles.edit_sku_update } onClick={ this.updateSku.bind(this) } >
          Update
        </button>
      </div>
    ) : (
      <div className={ styles.save_sku }>
        <button onClick={ this.saveSku.bind(this) } >
          Save
        </button>
      </div>
    );

    const getValidDate = ( dat ) => {
      return ( new Date( dat ).toString() !== 'Invalid Date' ? new Date(dat).toISOString().slice(0, 16) : '' );
    };

    return (
      <div>
       {
        (barData.length > 0) ?
        (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          <Link to={'/hadmin/bar_management/edit_bar/' + barData[0].id}>
            <div className = {styles.device_details_head}>
              { barData[0] ? ( barData[0].name + ' ( ' + barCityInfo.name ) + ' )' : ' ' }
            </div>
          </Link>
          <div className = {styles.options}>
            <div className = {styles.optionLabel}>
              Show SKU's :
            </div>
            <ul>
                <li data-type= {'current'} onClick={this.changeList.bind(this)} className = { ( showData === 'current') ? styles.selected : '' }> Current </li>
                <li data-type= {'active'} onClick={this.changeList.bind(this)} className = { ( showData === 'active') ? styles.selected : '' }> Active </li>
                <li data-type= {'inactive'} onClick={this.changeList.bind(this)} className = { ( showData === 'inactive') ? styles.selected : '' }> InActive </li>
                <li data-type= {'expired'} onClick={this.changeList.bind(this)} className = { ( showData === 'expired') ? styles.selected : '' }> Expired </li>
                <li data-type= {'all'} onClick= {this.changeList.bind(this)}className = { ( showData === 'all') ? styles.selected : '' }> All </li>
            </ul>
          </div>
          <div className = {styles.device_details_wrapper}>
            <div className={styles.unlock_add_head} onClick={ this.toggleSkuVisibility.bind(this) }>
              + Add SKU
            </div>
            <div className={styles.unlock_list_head}>
              List of Sku{'\''}s
            </div>
            { barHtml.length ? barHtml :
              (
                <div className={ styles.unlock_listing }>
                  <div className={styles.unlock_listing_name}>
                    No SKUs yet
                  </div>
                </div>
              )
            }
          </div>
          <div className={styles.add_sku_wrapper + ( showScreen ? '' : ' hide' )}>
          <span onClick={this.closeConsumerList.bind(this)}>(x)Close </span>
            { consumerHtml.length ? consumerHtml :
              (
                <div className={ styles.unlock_listing }>
                  <div className={styles.unlock_listing_name}>
                    No Conumers
                  </div>
                </div>
              )
            }
          </div>
          <div className={styles.add_sku_wrapper + ( showSku ? '' : ' hide' )}>
            <div className={styles.add_sku_head}>
              SKU*
            </div>
            <DisableInformation label = "Select SKU*" val = "Select" options={ skuHtml } fieldName="sku_pricing_id" fieldType="int" currVal = { newSkuData.sku_pricing_id ? newSkuData.sku_pricing_id : 0} disable = { isEdit } />
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Base SKU  Price*
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="number" data-field-name="base_sku_price" data-field-type="float" data-field-value={ newSkuData.base_sku_price} value={ newSkuData.base_sku_price}/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Negotiated SKU Price*
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="number" data-field-name="negotiated_sku_price" data-field-type="float" data-field-value={ newSkuData.negotiated_sku_price} value={ newSkuData.negotiated_sku_price}/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Charges And Tax percentage at Bar*
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="number" min="0" max="100" data-field-name="charges_and_tax_percentage" data-field-type="float" data-field-value={ newSkuData.charges_and_tax_percentage} value={ newSkuData.charges_and_tax_percentage}/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Hip Bar Price
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="number" data-field-name="hipbar_price" data-field-type="float" data-field-value={ newSkuData.hipbarPrice} value={ newSkuData.hipbarPrice}/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Quantity*
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="text" data-field-name="quantity" data-field-type="int" data-field-value={ newSkuData.quantity } value={ newSkuData.quantity }/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                ListingOrder*
              </div>
              <div className = {styles.information_rightpanel}>
                <input type="text" data-field-name="listingOrder" data-field-type="int" data-field-value={ newSkuData.listingOrder } value={ newSkuData.listingOrder }/>
              </div>
            </div>
            <DisableInformation label = "Status*" val = "Status" options={ statusHtml } fieldName = "is_active" fieldType = "boolean" currVal = { newSkuData.is_active ? 1 : 0 }/>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                Start Date*
              </div>
              <div className = {styles.information_rightpanel}>
                <input data-field-name="start_date" data-field-type="text" type="datetime-local" data-field-value={ isEdit ? getValidDate(newSkuData.start_date) : newSkuData.start_date } value={ isEdit ? getValidDate(newSkuData.start_date) : newSkuData.start_date }/>
              </div>
            </div>
            <div className = {styles.command_wrapper}>
              <div className = {styles.information_leftpanel}>
                End Date*
              </div>
              <div className = {styles.information_rightpanel}>
                <input data-field-name="end_date" data-field-type="text" type="datetime-local" data-field-value={ isEdit ? getValidDate(newSkuData.end_date) : newSkuData.end_date } value={ isEdit ? getValidDate(newSkuData.end_date) : newSkuData.end_date }/>
              </div>
            </div>
            <div className={ styles.warning_block + ' ' + ( !newSkuData.is_active && !newSkuData.status ? '' : 'hide' ) }>
            </div>
            <div className={ styles.warning_block + ' ' + ( isEdit && !newSkuData.is_active && !newSkuData.status ? '' : 'hide' ) }>
              * Click on Disable button to cancel { newSkuData.sku_pricing_id in barSKUs ? barSKUs[newSkuData.sku_pricing_id].length : 0 } open reservations
              <button className={ styles.edit_sku_disable } onClick={ this.disableSku.bind(this) }>
                Disable
              </button>
            </div>
            <div className={ styles.warning_block + ' ' + ( isEdit && !newSkuData.is_active && newSkuData.status ? '' : ' hide ' ) }>
              * Click on Update to Deactivate an SKU
            </div>
            { actionButton }
            {/*
              <div className = {styles.command_wrapper}>
                <div className = {styles.information_leftpanel}>
                  From Date
                </div>
                <div className = {styles.information_rightpanel}>
                  <input type="text" />
                </div>
              </div>
              <div className = {styles.command_wrapper}>
                <div className = {styles.information_leftpanel}>
                  To Date
                </div>
                <div className = {styles.information_rightpanel}>
                  <input type="text" />
                </div>
              </div>
            */}
          </div>
        </div>
       ) : (
         <div>
           No bars Present
         </div>
       )
       }
      </div>
    );
  }
}

UnlockBarAddSKU.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  skuData: PropTypes.array.isRequired,
  showData: PropTypes.string.isRequired,
  barData: PropTypes.array.isRequired,
  consumerInfo: PropTypes.array.isRequired,
  showScreen: PropTypes.bool.isRequired,
  addedInventory: PropTypes.array.isRequired,
  barCityInfo: PropTypes.object.isRequired,
  showSku: PropTypes.bool.isRequired,
  newSkuData: PropTypes.object.isRequired,
  barSKUs: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.page_data, ...state.bar_sku_create_data };
};


const decoratedOne = formValidator(UnlockBarAddSKU, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

export default connect( mapStateToProps )(commonDecorator(decoratedOne));
