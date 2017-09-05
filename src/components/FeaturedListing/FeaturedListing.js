import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchStates, fetchListing, ADD_TO_FEATURED, SEARCH_ITEMS, REMOVE_FROM_FEATURED, fetchSKU, fetchProducts, fetchBrands, citiesViewHandler, finalUpdate, IMAGE_CANCEL, UPDATE_LIST, UPDATE_INDEX} from './FeaturedListingActions';
import { checkState, unCheckState, RESET } from './FeaturedListingActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

/* Components */
import FeaturedInfo from './FeaturedInfo';
import Order from './Order';
import PriorityOrder from './PriorityOrder';

class FeaturedListing extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Featured Listing',
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
      this.props.dispatch(fetchStates())
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
  onFeaturedChange(e) {
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
  addToFeatured(e) {
    const value = e.target.getAttribute('data-id');
    this.props.dispatch({ type: ADD_TO_FEATURED, data: value});
    this.props.dispatch({type: UPDATE_INDEX, data: e.target.getAttribute('data-brand-id')});
  }
  removeFromFeatured(e) {
    const value = e.target.getAttribute('data-id');
    this.props.dispatch({ type: REMOVE_FROM_FEATURED, data: value});
    this.props.dispatch({type: UPDATE_INDEX, data: e.target.getAttribute('data-brand-id')});
  }
  searchBrands(e) {
    const value = e.target.value;
    this.props.dispatch({ type: SEARCH_ITEMS, data: value});
  }
  // Update store updatedList with Passed Value (id, display_order)
  orderChange(e) {
    const id = e.target.id;
    const displayOrder = e.target.value;
    const data = {};
    data[id] = displayOrder;
    this.props.dispatch({type: UPDATE_LIST, data: {id: parseInt(id, 10), value: parseInt(displayOrder, 10)}});
    this.props.dispatch({type: UPDATE_INDEX, data: e.target.getAttribute('data-brand-id')});
  }
  displayList() {
    const state = document.getElementById('state_short').value;
    this.props.dispatch(fetchListing(state));
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./FeaturedList.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <FeaturedInfo allState={this.props.allState} displayList={this.displayList.bind(this)} dispatch={this.props.dispatch} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <Order orderChange={this.orderChange.bind(this)} searchList={this.searchBrands.bind(this)} addToFeatured={this.addToFeatured.bind(this)} allList={this.props.allList}/>
          <PriorityOrder orderChange={this.orderChange.bind(this)} removeFromFeatured={this.removeFromFeatured.bind(this)} allList={this.props.featuredList}/>
        </div>
        <button className={styles.edit_brand_btn} displayList={this.displayList.bind(this)} onClick={this.onClickSave.bind(this)}>
          Save
        </button>
      </div>
    );
  }
}

FeaturedListing.propTypes = {
  allState: PropTypes.array.isRequired,
  allList: PropTypes.array.isRequired,
  featuredList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.featuredListingState};
};

const decoratedConnectedComponent = commonDecorator(FeaturedListing);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
