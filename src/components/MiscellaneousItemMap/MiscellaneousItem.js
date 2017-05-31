import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { definePage, fetchSKU, fetchProducts, fetchBrands, citiesViewHandler, IMAGE_CANCEL} from './MiscellaneousItemActions';
import { checkState, unCheckState, finalSave } from './MiscellaneousItemActions';
import { RESET } from './MiscellaneousItemActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';
import SearchWrapper from '../../RetailerManagement/CreateBranch/SearchWrapper';

/* Components */
import AdInfo from './MiscInfo';

class CreateWelcomeDrink extends Component { // eslint-disable-line no-unused-vars
  constructor(props) {
    super();
    const barId = props.params.id;
    const miscId = props.params.Mid;
    this.breadCrumbs = [];
    if (barId !== undefined) {
      this.breadCrumbs.push({
        title: 'Bar',
        sequence: 1,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: barId,
        sequence: 2,
        link: '/hadmin/bar_management/edit_bar/' + barId // TODO
      });
    }
    if (miscId !== undefined) {
      this.breadCrumbs.push({
        title: 'Update',
        sequence: 3,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: 'Miscellaneous Item',
        sequence: 4,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: miscId,
        sequence: 5
      });
    } else {
      this.breadCrumbs.push({
        title: 'Create',
        sequence: 3,
        link: '#' // TODO
      });
      this.breadCrumbs.push({
        title: 'Miscellaneous Item',
        sequence: 4,
        link: '#' // TODO
      });
    }
  }
  componentWillMount() {
    const barId = this.props.params.id;
    const miscId = this.props.params.Mid;
    Promise.all([
      this.props.dispatch(definePage(barId, miscId))
    ]);
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickCitiesView(stateObj) {
    Promise.all([
      this.props.dispatch(citiesViewHandler(stateObj))
    ]);
  }
  onCancelClick() {
    this.props.dispatch({ type: IMAGE_CANCEL});
  }
  onChangeStateCheck(state, e) {
    if (e.target.checked) {
      Promise.all([
        this.props.dispatch(checkState(state))
      ]);
    } else {
      Promise.all([
        this.props.dispatch(unCheckState(state))
      ]);
    }
  }
  onBrandChange(e) {
    this.props.dispatch(fetchSKU(e.target.value));
  }
  onStateChange(e) {
    this.props.dispatch(fetchBrands(e.target.value));
  }
  onSkuChange(e) {
    this.props.dispatch(fetchProducts(e.target.value));
  }

  onClickSave() {
    Promise.all([
      this.props.dispatch(finalSave())
    ]);
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./CreateBarAd.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <AdInfo type={this.props.page} data={this.props.detail} dispatch={this.props.dispatch}/>
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <button className={styles.edit_brand_btn} onClick={this.onClickSave.bind(this)}>
            Save
          </button>
        </div>
        <SearchWrapper title = { 'Miscellaneous Mappings' } body = { ['date', 'consumer_amount', 'bar_discount', 'manual_credits', 'manual_debits', 'pay_by_wallet', 'service_tax', 'service_charge', 'net_amount', 'account_number', 'bank_name', 'cashback_amount'] } head = { ['Date', 'Consumer Amount', 'Bar Discount', 'Manual Credits', 'Manual Debits', 'Pay By Wallet', 'Service Tax', 'Service Charge', 'Net Amount', 'Account Number', 'Bank', 'Cashback Amount'] } data={barSettlementReport} />
        <Lister limit="10" onClickHandler={this.onClickHandleSettlementReport.bind(this)} currentPage={barSettlementReportPage} showMax="5" count={barSettlementReportCount} />
      </div>
    );
  }
}

CreateWelcomeDrink.propTypes = {
  params: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  selectedCity: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.miscellaneousItemState};
};

const decoratedConnectedComponent = commonDecorator(CreateWelcomeDrink);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
