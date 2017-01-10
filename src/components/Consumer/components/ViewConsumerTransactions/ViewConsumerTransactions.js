import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RESET,
 getAllConsumerTransactionsData
} from './ViewConsumerTransactionsAction';

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

class ViewConsumerTransactions extends Component {
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Consumer Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Consumer Transactions',
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
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(getAllConsumerTransactionsData(page, limit, consumerId ));
  }
  triggerPageChange(clickedPage, limit) {
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(getAllConsumerTransactionsData(clickedPage, limit, consumerId));
  }
  enableSearch() {
    const page = 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllConsumerTransactionsData(page, 10, consumerId))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const { lastSuccess } = this.props;
    const styles = require('./ViewConsumerTransactions.scss');

    const { userId: consumerId } = this.props.params;

    /* Search Parameters */

    const fields = [ 'type', 'amount', 'order_id' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'type': ['$eq', '$like', '$ilike'],
      'amount': ['$eq', '$gt', '$lt'],
      'order_id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'type': 'text',
      'amount': 'number',
      'order_id': 'number'
    };


    const paginationUrl = '/hadmin/consumer_transactions/history/' + parseInt(consumerId, 10);

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

ViewConsumerTransactions.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(ViewConsumerTransactions);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
