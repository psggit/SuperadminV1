import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchBars, fetchCities, fetchListing, fetchSKU, fetchProducts, fetchBrands, citiesViewHandler, finalUpdate, UPDATE_AD_TYPE, IMAGE_CANCEL, UPDATE_LIST} from './AdListingActions';
import { RESET, checkState, unCheckState } from './AdListingActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

/* Components */
import AdInfo from './AdInfo';
import AdType from './AdType';
import Order from './Order';

class AdListing extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Ad Listing',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Update',
      sequence: 2,
      link: '#' // TODO
    });
  }
  componentWillMount() {
    Promise.all([
      this.props.dispatch(fetchCities())
     // this.props.dispatch(fetchGenres())
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
      this.props.dispatch(finalUpdate())
    ]);
  }
  // Update store updatedList with Passed Value (id, display_order)
  orderChange(e) {
    const id = e.target.id;
    const displayOrder = e.target.value;
    const data = {};
    data[id] = displayOrder;
    this.props.dispatch({type: UPDATE_LIST, data});
  }
  displayOption() {
    const type = document.getElementById('ad_type').value;
    this.props.dispatch({type: UPDATE_AD_TYPE, data: type});
  }

  // Function displayList()
  /* If ad_bar is selected fetch Bars;
     else Display list
  */
  displayList() {
    const type = document.getElementById('ad_type').value;
    const city = document.getElementById('city').value;
    const bar = document.getElementById('bar').value;
    if (( type === 'ad_bar') && (bar === 'null')) {
      this.props.dispatch(fetchBars(city));
    } else {
      this.props.dispatch(fetchListing(city, type, bar));
    }
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./CreateBarAd.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <AdType displayOption={this.displayOption.bind(this)} dispatch={this.props.dispatch} />
          <AdInfo adType={this.props.adType} allCity={this.props.allCity} allBar={this.props.allBar} displayList={this.displayList.bind(this)} dispatch={this.props.dispatch} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <Order adType={this.props.adType} orderChange={this.orderChange.bind(this)} allList={this.props.allList}/>
        </div>
        <button className={styles.edit_brand_btn} displayList={this.displayList.bind(this)} onClick={this.onClickSave.bind(this)}>
          Save
        </button>
      </div>
    );
  }
}

AdListing.propTypes = {
  allCity: PropTypes.array.isRequired,
  allBar: PropTypes.array.isRequired,
  allList: PropTypes.array.isRequired,
  adType: PropTypes.string.isReuired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.adListingState};
};

const decoratedConnectedComponent = commonDecorator(AdListing);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
