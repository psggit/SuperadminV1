import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import AdsList from './AdsList';
import { getBrandManagerData, getAllBrandManagerData, toggleActivation } from './AdsListActions';

// import SearchWrapper from './SearchWrapper';
import PaginationWrapper from '../../Common/PaginationWrapper.js';
import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';
import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import {
  TOGGLE_SEARCH,
} from '../../Common/SearchComponentGen/FilterState';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/*
 1. Required Components
  a) Loading Screen
  b) Search
  c) Header
 2. Required Data
  a. All Companies with brands and regions
*/

class AdsListing extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Brand Manager Management',
      sequence: 1,
      link: '#' // TODO
    });
    this.breadCrumbs.push({
      title: 'Ads',
      sequence: 2,
      link: '#' // TODO
    });
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllBrandManagerData(page, limit));
  }
  activation(e) {
    const type = e.target.getAttribute('data-state-type');
    const id = e.target.getAttribute('data-state-id');
    const status = e.target.getAttribute('data-state-active');
    console.log('asdf');
    this.props.dispatch(toggleActivation(id, type, status));
  }

  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getBrandManagerData(clickedPage, limit));
  }

  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getBrandManagerData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }

  // Here goes all the data fetching stuff
  render() {
    const styles = require('./AdsListing.scss');
    console.log(this.props.lastSuccess);
    const { lastSuccess } = this.props;

    const fields = [ 'id', 'name', 'address', 'city.name' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'name': ['$eq', '$like', '$ilike'],
      'address': ['$eq', '$like', '$ilike'],
      'city.name': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'name': 'text',
      'address': 'text',
      'city.name': 'text',
      'id': 'number'
    };
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.profile_wrapper}>
            <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
          <AdsList activation = {this.activation.bind(this)} data={lastSuccess}/>
        </div>
          <PaginationWrapper
            {...this.props}
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/brands_offers_and_promos/view_all_ads"
          />
      </div>);
  }
}

// To be done
AdsListing.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};


const mapStateToProps = (state) => {
  return {...state.page_data, ...state.adslist_data };
};

const decoratedConnectedComponent = commonDecorator(AdsListing);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
