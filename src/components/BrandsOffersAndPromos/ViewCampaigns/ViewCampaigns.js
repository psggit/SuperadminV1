import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllCampaignsData, getCampaignData } from './ListCampaignsAction';
import SearchWrapper from './SearchWrapper';

import PaginationWrapper from '../../Common/PaginationWrapper.js';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

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
} from '../../Common/SearchComponentGen/FilterState';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../../Common/Actions/Actions';

import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';

class ViewCampaigns extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Brand Offers and Promos',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'List Campaigns',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch({ type: RESET_FILTER }),
      this.props.dispatch({ type: RESET })
    ]);
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllCampaignsData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getCampaignData(clickedPage, limit));
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllCampaignsData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  get myName() {
    return 'Karthik Venkateswaran';
  }
  render() {
    const styles = require('./ViewCampaigns.scss');
    const { lastSuccess } = this.props;

    console.log('my name is ');
    console.log(this.myName);
    const fields = [ 'id', 'name', 'brand_manager.name', 'brand_manager.email', 'cashback_promos.skus.sku_pricing.sku.brand.brand_name', 'active_to', 'active_from' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'id': ['$eq', '$gt', '$lt'],
      'cashback_promos.skus.sku_pricing.sku.brand.brand_name': ['$eq', '$like', '$ilike'],
      'name': ['$eq', '$like', '$ilike'],
      'brand_manager.name': ['$eq', '$like', '$ilike'],
      'brand_manager.email': ['$eq', '$like', '$ilike'],
      'active_to': ['$eq', '$lt', '$gt'],
      'active_from': ['$eq', '$lt', '$gt']
    };
    const fieldTypeMap = {
      'id': 'number',
      'cashback_promos.skus.sku_pricing.sku.brand.brand_name': 'text',
      'name': 'text',
      'brand_manager.name': 'text',
      'brand_manager.email': 'text',
      'active_to': 'date',
      'active_from': 'date'
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
            <Link to={'/hadmin/brands_offers_and_promos/promos/all'}>
              <button className={styles.common_btn}>Create Campaigns </button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/brands_offers_and_promos/campaigns"
          />
        </div>
      );
  }
}

ViewCampaigns.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(ViewCampaigns);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
