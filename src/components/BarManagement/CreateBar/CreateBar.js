import React, { PropTypes, Component } from 'react';
import BarDetailsComponent from './BarDetailsComponent';
import { connect } from 'react-redux';
import DeviceWrapper from './DeviceWrapper';

import BreadCrumb from '../../Common/BreadCrumb';

import commonDecorator from '../../Common/CommonDecorator';

import { fetchStateCity } from '../../Common/Actions/StateCityData';

import Lister from '../../RetailerManagement/CreateBranch/Lister';
import SearchWrapper from '../../RetailerManagement/CreateBranch/SearchWrapper';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import {
  getOrganisation,
  saveBarDetail,
  updateBarDetail,
  getBarData,
  RESET_BAR,
  getBarSettlementReport,
  getBarTransactionReport,
  getBarDailyReport,
} from './BarData';

import {
  deleteDevice,
  updateDevice,
  createDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  toggleDevice,
  RESET_DEVICE,
  fetchDevice,
  emailSmsDeviceCreation,
  emailSmsCredsCreation
} from './DeviceAction';

class CreateBar extends Component { // eslint-disable-line no-unused-vars
  constructor( props ) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Bar Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: ( props.params.brId ? 'Edit ' : 'Create ' ) + ' Bar',
      sequence: 2,
      link: '#'
    });

    if ( props.params.brId ) {
      this.breadCrumbs.push({
        title: props.params.brId,
        sequence: 3,
        link: '#'
      });
    }
  }
  componentDidMount() {
    const brId = this.props.params.brId;
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() ),
      this.props.dispatch( getOrganisation() ),
      ( brId ? ( this.props.dispatch(getBarData( brId ) )) : Promise.resolve() ),
      (
      brId ?
        Promise.all([
          this.props.dispatch( fetchDevice( brId ) )
        ])
        :
        Promise.resolve()
      )
    ])
    .then( () => {
      this.props.dispatch( getBarSettlementReport(1, brId) );
      this.props.dispatch( getBarDailyReport(1, brId) );
      this.props.dispatch( getBarTransactionReport(1, brId) );
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET_BAR }),
      this.props.dispatch({ type: RESET_DEVICE })
    ]);
  }
  onClickHandle(e) {
    e.preventDefault();
    const currentPage = parseInt(e.target.outerText, 10);
    const brId = this.props.params.brId;
    console.log(e.target.outerText);
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getBarTransactionReport(currentPage, ( brId ? brId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  onClickHandleDailyReport(e) {
    e.preventDefault();
    const currentPage = parseInt(e.target.outerText, 10);
    const brId = this.props.params.brId;
    console.log(e.target.outerText);
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getBarDailyReport(currentPage, ( brId ? brId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  onClickHandleSettlementReport(e) {
    e.preventDefault();
    const currentPage = parseInt(e.target.outerText, 10);
    const brId = this.props.params.brId;
    console.log(e.target.outerText);
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getBarSettlementReport(currentPage, ( brId ? brId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  emailSmsDeviceCreation( id, templateName ) {
    this.props.dispatch( emailSmsDeviceCreation(id, templateName ) );
  }
  emailSmsCredsCreation( id, templateName ) {
    this.props.dispatch( emailSmsCredsCreation(id, templateName ) );
  }
  saveBar() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( saveBarDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  updateBar() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( updateBarDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  createDevice() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(createDevice())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }

  deleteDevice() {
    this.props.dispatch(deleteDevice());
  }
  updateDevice() {
    this.props.dispatch(updateDevice());
  }
  toggleDevice(e) {
    console.log(e);
    this.props.dispatch(toggleDevice(parseInt(e.target.id, 10), e.target.dataset.option ));
  }
  createDeviceLocal() {
    this.props.dispatch(createDeviceLocal());
  }
  deleteDeviceLocal() {
    this.props.dispatch(deleteDeviceLocal());
  }
  updateDeviceLocal() {
    this.props.dispatch(updateDeviceLocal());
  }

  render() {
    const styles = require('./CreateBar.scss');

    const {
      ongoingRequest,
      genStateData,
      dispatch,
      barData
    } = this.props;

    const { organisationData
      , barContact
      , barAccountRegistered
      , barDetail
      , barSettlementReportCount
      , barSettlementReport
      , barSettlementReportPage
      , barTransactionReportCount
      , barTransactionReport
      , barTransactionReportPage
      , dailyBarReportCount
      , dailyBarReport
      , dailyBarReportPage
      , isBrEdit
    } = barData;

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

    const actionButton = !this.props.params.brId ? (
      <button className={styles.edit_bar_btn} onClick={ this.saveBar.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Saving' : 'Save' ) }
      </button>
    ) : (
      <button className={styles.edit_bar_btn} onClick={ this.updateBar.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Updating' : 'Update' )}
      </button>
    );

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.bar_wrapper}>
          <div className={styles.wd_100}>
            <BarDetailsComponent
      organisationData = { organisationData }
      barContact = { barContact }
      barAccountRegistered = { barAccountRegistered }
      barDetail = { barDetail }
      genStateData = { genStateData }
      dispatch = { dispatch }
        />
          </div>
          <div className="clearfix"></div>

          <div className={ isBrEdit ? '' : 'hide' }>
            <DeviceWrapper
        { ...this.props }
        createDevice={ this.createDevice.bind(this) }
        updateDevice={ this.updateDevice.bind(this) }
        toggleDevice={ this.toggleDevice.bind(this) }
        deleteDevice={ this.deleteDevice.bind(this) }
        createDeviceLocal = { this.createDeviceLocal.bind(this) }
        updateDeviceLocal = { this.updateDeviceLocal.bind(this) }
        deleteDeviceLocal = { this.deleteDeviceLocal.bind(this) }
        emailSmsDeviceCreation = { this.emailSmsDeviceCreation.bind(this) }
        emailSmsCredsCreation = { this.emailSmsCredsCreation.bind(this) }
          />
          </div>
          { actionButton }
        </div>
        <div className= { !this.props.params.brId ? 'hide' : '' }>
          <SearchWrapper title = { 'Bar Transactions' } body = { ['created_at', 'order_id', 'amount', 'brand_name', 'sku_volume', 'itemtype', 'status', 'cancelled_by'] } head = { ['Date', 'Order Id', 'Amount', 'Brand Name', 'Sku Volume', 'Item Type', 'Status', 'Cancelled By'] } data={barTransactionReport} />
          <Lister limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={barTransactionReportPage} showMax="5" count={barTransactionReportCount} />
          <SearchWrapper title = { 'Daily Bar Report' } body = { ['date', 'opening_balance', 'closing_balance', 'net_amount', 'net_payable_amount', 'settlement_for_the_day'] } head = { ['Date', 'Opening Balance', 'Closing Balance', 'Net Amount', 'Net Payable Amount', 'Settlement For The Day'] } data={dailyBarReport} />
          <Lister limit="10" onClickHandler={this.onClickHandleDailyReport.bind(this)} currentPage={dailyBarReportPage} showMax="5" count={dailyBarReportCount} />
          <SearchWrapper title = { 'Bar Settlement Report' } body = { ['date', 'consumer_amount', 'bar_discount', 'manual_credits', 'manual_debits', 'pay_by_wallet', 'service_tax', 'service_charge', 'net_amount', 'account_number', 'bank_name', 'cashback_amount'] } head = { ['Date', 'Consumer Amount', 'Bar Discount', 'Manual Credits', 'Manual Debits', 'Pay By Wallet', 'Service Tax', 'Service Charge', 'Net Amount', 'Account Number', 'Bank', 'Cashback Amount'] } data={barSettlementReport} />
          <Lister limit="10" onClickHandler={this.onClickHandleSettlementReport.bind(this)} currentPage={barSettlementReportPage} showMax="5" count={barSettlementReportCount} />
        </div>
      </div>);
  }
}

CreateBar.propTypes = {
  params: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  barData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.bar_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateBar);

export default connect(mapStateToProps)(decoratedComponent);
