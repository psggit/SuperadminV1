import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchStates, fetchGenres, fetchListing, fetchSKU, fetchProducts, fetchBrands, citiesViewHandler, finalUpdate, IMAGE_CANCEL, UPDATE_LIST, UPDATE_INDEX} from './FeaturedListingActions';
import { checkState, unCheckState, RESET } from './FeaturedListingActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

/* Components */
import AdInfo from './AdInfo';
import Order from './Order';

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
      this.props.dispatch(fetchStates()),
      this.props.dispatch(fetchGenres())
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
  // Update store updatedList with Passed Value (id, display_order)
  orderChange(e) {
    const id = e.target.id;
    const displayOrder = e.target.value;
    const data = {};
    data[id] = displayOrder;
    console.log('Enter Here');
    const indexData = parseInt(e.target.dataset.value, 10);
    this.props.dispatch({type: UPDATE_LIST, data});
    this.props.dispatch({type: UPDATE_INDEX, indexData});
  }
  displayList() {
    const state = document.getElementById('state_short').value;
    const genre = document.getElementById('genre_short').value;
    this.props.dispatch(fetchListing(state, genre));
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./CreateBarAd.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <AdInfo allState={this.props.allState} allGenre={this.props.allGenre} displayList={this.displayList.bind(this)} dispatch={this.props.dispatch} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <Order orderChange={this.orderChange.bind(this)} allList={this.props.allList}/>
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
  allGenre: PropTypes.array.isRequired,
  allList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.brandListingState};
};

const decoratedConnectedComponent = commonDecorator(FeaturedListing);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
