import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAllTransactionData, getTransactionData } from './DevicesAction';
import SearchWrapper from './SearchWrapper';

import PaginationWrapper from '../../../Common/PaginationWrapper.js';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../../Common/CommonDecorator';
import BreadCrumb from '../../../Common/BreadCrumb';

import {
  RESET
} from '../../../Common/Actions/Actions';

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen *Done*
      c) Search
      d) Header *Done*
      e) Listing Component
*/

class Devices extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Customer Transactions',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'View Devices ',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(getAllTransactionData(page, limit, consumerId ? consumerId : '' ));
  }
  triggerPageChange(clickedPage, limit) {
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(getTransactionData(clickedPage, limit, consumerId ? consumerId : ''));
  }
  render() {
    const styles = require('./Devices.scss');
    const { lastSuccess } = this.props;

    const { userId: consumerId } = this.props.params;

    const paginationUrl = ( consumerId ) ? '/hadmin/consumer_transactions/devices/' + parseInt(consumerId, 10) : '/hadmin/consumer_transactions/devices';

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

          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl={ paginationUrl }
          />
        </div>
      );
  }
}

Devices.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(Devices);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
