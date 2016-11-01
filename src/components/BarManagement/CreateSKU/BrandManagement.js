import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllBrandData, getBrandData } from './BrandAction';
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

class BrandManagement extends React.Component { // eslint-disable-line no-unused-vars
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
      title: 'Manage Brand',
      sequence: 2,
      link: '#'
    });
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllBrandData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getBrandData(clickedPage, limit));
  }
  get myName() {
    return 'Karthik Venkateswaran';
  }
  render() {
    const styles = require('./BrandManagement.scss');
    const { lastSuccess } = this.props;

    console.log('my name is ');
    console.log(this.myName);
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />

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
            <Link to={'/hadmin/brand_management/create'}>
              <button className={styles.common_btn}>Create Brand</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/brand_management"
          />
        </div>
      );
  }
}

BrandManagement.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(BrandManagement);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
