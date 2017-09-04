import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RESET,
  getAllBrandListing
} from './ViewBrandListingAction';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../../Common/SearchComponentGen/FilterState';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

import PaginationWrapper from '../../../Common/PaginationWrapper.js';

import SearchWrapper from './SearchWrapper';

import SearchComponent from '../../../Common/SearchComponentGen/SearchComponent';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../../Common/CommonDecorator';
import BreadCrumb from '../../../Common/BreadCrumb';

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen *Done*
      c) Search
      d) Header *Done*
      e) Listing Component
*/

class ViewBrandListing extends Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Brand',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Brand Listing',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch( { type: RESET } ),
      this.props.dispatch({ type: RESET_FILTER })
    ]);
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllBrandListing(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getAllBrandListing(clickedPage, limit));
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllBrandListing(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const { lastSuccess } = this.props;
    const styles = require('./ViewBrandListing.scss');

    /* Search Parameters */

    const fields = [ 'full_name', 'id', 'email', 'mobile_number', 'device.device_num', 'level_id' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'full_name': ['$eq', '$like', '$ilike'],
      'mobile_number': ['$eq', '$like', '$ilike'],
      'device.device_num': ['$eq', '$like', '$ilike'],
      'level_id': ['$eq', '$gt', '$lt'],
      'email': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'full_name': 'text',
      'email': 'text',
      'id': 'number',
      'level_id': 'number',
      'mobile_number': 'text',
      'device.device_num': 'text'
    };

    /* End of it */

    return (
          <div className={styles.container}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
            {/*
            <div className={styles.create_layout + ' ' + styles.wd_100}>
              <Link to={'/hadmin/brand_management/create'}>
                <button className={styles.common_btn}>Create Brand</button>
              </Link>
            </div>
            */}
            <SearchWrapper props={this.props } data={lastSuccess}/>
            <PaginationWrapper
              {...this.props }
              fetchInitialData = { this.fetchInitialData.bind(this) }
              limit = "10"
              triggerPageChange={ this.triggerPageChange.bind(this) }
              showMax="5"
              parentUrl="/hadmin/users/list"
            />
          </div>
        );
  }
}

ViewBrandListing.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

const decoratedConnectedComponent = commonDecorator(ViewBrandListing);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
