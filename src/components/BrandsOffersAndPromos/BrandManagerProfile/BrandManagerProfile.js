import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BrandManagersList from './BrandManagersList';
import { getBrandManagerData, getAllBrandManagerData } from './BrandManagerProfileActions';

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
  e) Some wierd Shit
 2. Required Data
  a. All Companies with brands and regions
*/

class BrandManagerProfile extends Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Brand Manager Management',
      sequence: 1,
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
    const styles = require('./BrandManagerProfile.scss');
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
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/brands_offers_and_promos/create_brand_manager'}>
              <button className={styles.brand_manager_btn}>Create New Brand Manager</button>
            </Link>
          </div>
          <BrandManagersList data={lastSuccess}/>
        </div>
          <PaginationWrapper
            {...this.props}
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/brands_offers_and_promos/brand_managers_list"
          />
      </div>);
  }
}

// To be done
BrandManagerProfile.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};


const mapStateToProps = (state) => {
  return {...state.page_data, ...state.brandmanagerprofile_data};
};

const decoratedConnectedComponent = commonDecorator(BrandManagerProfile);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
