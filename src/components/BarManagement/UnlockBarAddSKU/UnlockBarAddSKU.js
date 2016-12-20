import React, { PropTypes, Component } from 'react';
import BreadCrumb from '../../Common/BreadCrumb';
import DisableInformation from './DisableInformation';

import { connect } from 'react-redux';

import formValidator from '../../Common/CommonFormValidator';

import commonDecorator from '../../Common/CommonDecorator';

import {
  fetchInitials,
  TOGGLE_SKU_DIV,
  RESET_BAR_SKU,
  INPUT_VALUE_CHANGED,
  saveSku,
  VIEW_SKU,
  CANCEL_SKU,
  updateSku
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
      showSku,
      barCityInfo,
      addedInventory,
      newSkuData,
      isEdit
    } = this.props;

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

    const filteredSkuData = ( barData[0] && !isEdit ) ? skuData.filter( ( sku ) => {
      return (
        addedInventory.indexOf(sku.id) === -1
      );
    }) : skuData;

    const skuHtml = filteredSkuData.map( ( sku, index ) => {
      return (
        <option key={ index } value={ sku.id }> { sku.sku.brand.brand_name } - { sku.sku.volume } ML </option>
      );
    });

    const barHtml = ( barData[0] ) ? ( barData[0].inventories.map( ( invent, index ) => {
      return (
        <div className={styles.unlock_listing} key={ index }>
          <div className={styles.unlock_listing_name}>
            Name: { invent.sku_pricing.sku.brand.brand_name } - { invent.sku_pricing.sku.volume } ML
          </div>
          <div className={styles.unlock_listing_name}>
            Hipbar Price: { invent.hipbarPrice }
          </div>
          <div className={styles.unlock_active_container}>
            <div className={styles.unlock_active}>
              { invent.is_active ? 'Active' : 'InActive' }
            </div>
            <div className={styles.unlock_view} onClick={ () => {
              return this.viewSku.call(this, invent.sku_pricing_id );
            } }>
              View
            </div>
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

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className = {styles.device_details_head}>
          { barData[0] ? ( barData[0].name + ' - ' + barCityInfo.name ) : '' }
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
        <div className={styles.add_sku_wrapper + ( showSku ? '' : ' hide' )}>
          <div className={styles.add_sku_head}>
            SKU
          </div>
          <DisableInformation label = "Select SKU" val = "Select" options={ skuHtml } fieldName="sku_pricing_id" fieldType="int" currVal = { newSkuData.sku_pricing_id ? newSkuData.sku_pricing_id : 0} disable = { isEdit } />
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Base SKU  Price
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="base_sku_price" data-field-type="string" value={ newSkuData.bar_menu_price}/>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Negotiated SKU Price
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="negotiated_sku_price" data-field-type="string" value={ newSkuData.negotiated_sku_price}/>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Charges And Tax percentage at Bar
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="charges_and_tax_percentage" data-field-type="string" value={ newSkuData.charges_and_tax_percentage}/>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              Quantity
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="quantity" data-field-type="int" value={ newSkuData.quantity }/>
            </div>
          </div>
          <div className = {styles.command_wrapper}>
            <div className = {styles.information_leftpanel}>
              ListingOrder
            </div>
            <div className = {styles.information_rightpanel}>
              <input type="text" data-field-name="listingOrder" data-field-type="int" value={ newSkuData.listingOrder }/>
            </div>
          </div>
          <DisableInformation label = "Status" val = "Status" options={ statusHtml } fieldName = "is_active" fieldType = "boolean" currVal = { newSkuData.is_active ? 1 : 0 }/>
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
    );
  }
}

UnlockBarAddSKU.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  skuData: PropTypes.array.isRequired,
  barData: PropTypes.array.isRequired,
  addedInventory: PropTypes.array.isRequired,
  barCityInfo: PropTypes.object.isRequired,
  showSku: PropTypes.bool.isRequired,
  newSkuData: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.page_data, ...state.bar_sku_create_data };
};


const decoratedOne = formValidator(UnlockBarAddSKU, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

export default connect( mapStateToProps )(commonDecorator(decoratedOne));
