import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchTypes, fetchStates, fetchListing, fetchSKU, fetchProducts, citiesViewHandler, finalUpdate, IMAGE_CANCEL, UPDATE_LIST, CREATE_LIST, UPDATE_INDEX} from './PositionListingActions';
import { checkState, unCheckState, RESET, STATE_CHANGE } from './PositionListingActions';
/*
  Decorator which adds couple of use ful features like
  1. Clearing the state on component unmount
  2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

/* Components */
import PositionInfo from './PositionInfo';
import Order from './Order';

class PositionListing extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Position Listing',
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
      this.props.dispatch(fetchTypes())
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
  onPositionChange(e) {
    this.props.dispatch(fetchSKU(e.target.value));
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
    const typeId = e.target.getAttribute('data-type-id');
    const displayOrder = e.target.value;
    const data = {};
    data[id] = displayOrder;
    const createData = {};
    createData[typeId] = displayOrder;
    console.log('Enter Here');
    const indexData = parseInt(e.target.dataset.value, 10);
    if ( id === '') {
      this.props.dispatch({type: CREATE_LIST, data: createData});
    } else {
      this.props.dispatch({type: UPDATE_LIST, data});
    }
    this.props.dispatch({type: UPDATE_INDEX, indexData});
  }
  displayList(e) {
    this.props.dispatch({type: STATE_CHANGE, data: e.target.value});
    const state = document.getElementById('state_short').value;
    this.props.dispatch(fetchListing(state));
  }
  // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
  render() {
    const styles = require('./PositionList.scss');
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.brand_wrapper}>
          <PositionInfo allState={this.props.allState} displayList={this.displayList.bind(this)} dispatch={this.props.dispatch} />
          <div className="clearfix"></div>
          <div className="clearfix"></div>
          <Order orderChange={this.orderChange.bind(this)} allTypes={this.props.allTypes} allList={this.props.allList}/>
        </div>
        <button className={styles.edit_brand_btn} displayList={this.displayList.bind(this)} onClick={this.onClickSave.bind(this)}>
          Save
        </button>
      </div>
    );
  }
}

PositionListing.propTypes = {
  allState: PropTypes.array.isRequired,
  allList: PropTypes.array.isRequired,
  allTypes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data, ...state.positionLimitsState};
};

const decoratedConnectedComponent = commonDecorator(PositionListing);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
