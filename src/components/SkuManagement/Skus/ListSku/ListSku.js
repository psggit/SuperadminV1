import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSkuData, getSkuData } from './ListSkuAction';
import SearchWrapper from './SearchWrapper';

import PaginationWrapper from '../../../Common/PaginationWrapper.js';

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

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../../Common/SearchComponentGen/FilterState';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

import SearchComponent from '../../../Common/SearchComponentGen/SearchComponent';

class ListSku extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Manage SKU',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch({ type: RESET_FILTER })
    ]);
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllSkuData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getSkuData(clickedPage, limit));
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllSkuData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  get myName() {
    return 'Karthik Venkateswaran';
  }
  render() {
    const styles = require('./ListSku.scss');
    const { lastSuccess } = this.props;

    console.log('my name is ');
    console.log(this.myName);
    const fields = [ 'id', 'volume', 'brand.brand_name', 'brand.category.name', 'brand.category.genre_short_name', 'brand.company.name' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'brand.brand_name': ['$eq', '$like', '$ilike'],
      'brand.category.name': ['$eq', '$like', '$ilike'],
      'brand.category.genre_short_name': ['$eq', '$like', '$ilike'],
      'brand.company.name': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt'],
      'volume': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'brand.brand_name': 'text',
      'brand.category.name': 'text',
      'brand.category.genre_short_name': 'text',
      'brand.company.name': 'text',
      'id': 'number',
      'volume': 'number'
    };
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />

          <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
            <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
              Search
            </button>
          </SearchComponent>

          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/skus/create_sku'}>
              <button className={styles.common_btn}>Create Sku</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/skus/list_sku"
          />
        </div>
      );
  }
}

ListSku.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(ListSku);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
