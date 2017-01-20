import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllTransactionData, getTransactionData } from './ViewDebitCreditAction';
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
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../../../Common/Actions/Actions';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../../Common/SearchComponentGen/FilterState';

import SearchComponent from '../../../Common/SearchComponentGen/SearchComponent';

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen *Done*
      c) Search
      d) Header *Done*
      e) Listing Component
*/

class ViewDebitCredit extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Retailer Transactions',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Debits & Credits',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET }),
      this.props.dispatch({ type: RESET_FILTER })
    ]);
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllTransactionData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getTransactionData(clickedPage, limit));
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllTransactionData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./ViewDebitCredit.scss');
    const { lastSuccess } = this.props;

    const fields = [ 'id', 'retailer.org_name', 'retailer_credits_and_debit_code.code', 'amount', 'comment' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'retailer.org_name': ['$eq', '$like', '$ilike'],
      'retailer_credits_and_debit_code.code': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt'],
      'amount': ['$eq', '$gt', '$lt'],
      'comment': ['$eq', '$like', '$ilike'],
    };
    const fieldTypeMap = {
      'retailer.org_name': 'text',
      'retailer_credits_and_debit_code.code': 'text',
      'comment': 'text',
      'id': 'number',
      'amount': 'number'
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
            <Link to={'/hadmin/retailer_management/debit_credit_transactions'}>
              <button className={styles.common_btn}>Create D/C Txn</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/retailer_management/debits_credits_landing"
          />
        </div>
      );
  }
}

ViewDebitCredit.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(ViewDebitCredit);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
