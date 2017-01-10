import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import AdsList from './AdsList';
import { getBrandManagerData, getAllBrandManagerData } from './AdsListActions';

// import SearchWrapper from './SearchWrapper';
import PaginationWrapper from '../../Common/PaginationWrapper.js';

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
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getBrandManagerData(clickedPage, limit));
  }
  // Here goes all the data fetching stuff
  render() {
    const styles = require('./AdsListing.scss');
    console.log(this.props.lastSuccess);
    const { lastSuccess } = this.props;
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.profile_wrapper}>
          <div className={styles.search_wrapper + ' ' + styles.wd_100}>
              <p>Search</p>
              <div className={styles.search_form + ' ' + styles.wd_100}>
                <input type="text" placeholder="Mobile Number" />
                <input type="text" placeholder="Contains" />
                <input type="number" />
                <button className={styles.common_btn}>Search</button>
              </div>
          </div>
          <AdsList data={lastSuccess}/>
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
