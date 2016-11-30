import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import {
  getAllRechargeData,
  downloadRechargeCSV
} from '../../actions/Action';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';


import {
  ADD_DELETE_FILTER,
  TOGGLE_SEARCH
} from './FilterState';

import RechargeSearchWrapper from './SearchWrapper';
import PaginationContainer from './Pagination';

import commonDecorator from '../../../Common/CommonDecorator';

class ConsumerRecharge extends Component {
  componentWillMount() {
    console.log('Will mount called');
  }
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllRechargeData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
    /*
    this.props.dispatch(getRechargeCount())
      .then(() => {
        console.log('Here is the fuck up');
      });
    this.props.dispatch(getRechargeData(page, 16));
    */
  }

  shouldComponentUpdate() {
    return true;
  }
  componentWillUnmount() {
    console.log('Unmounted');
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);

    const { userId: consumerId } = this.props.params;
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getAllRechargeData(currentPage, ( consumerId ? consumerId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  filterChange(e) {
    const parentNode = e.target.parentNode;
    const filterValue = parentNode.querySelectorAll('[data-field-name="value"]')[0].value;
    const filterOperator = parentNode.querySelectorAll('select[data-field-name=operator]')[0].selectedOptions[0].value;
    const filterField = parentNode.querySelectorAll('select[data-field-name=field]')[0].selectedOptions[0].value;

    if ( filterValue.length && filterOperator !== 'Select' && filterField !== 'Select' ) {
      const dateString = new Date(filterValue);
      try {
        const filterObj = {
          [filterField]: {
            [filterOperator]: dateString.toISOString()
          }
        };
        this.props.dispatch({ type: ADD_DELETE_FILTER, data: { 'filter': parentNode.getAttribute('data-field-name'), data: filterObj } });
      } catch (err) {
        console.log(err);
        alert('invalid Date');
      }
    }
  }
  enableSearch() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllRechargeData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  genCsv() {
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(downloadRechargeCSV( consumerId ));
  }
  render() {
    const styles = require('./Recharge.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;

    const { userId: consumerId } = this.props.params;

    const paginationUrl = ( consumerId ) ? '/hadmin/consumer_transactions/' + parseInt(consumerId, 10) + '/recharges' : '/hadmin/consumer_transactions/recharges';

    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Customer Management/Customer Recharges'} />
           	<div className={styles.search_wrapper + ' ' + styles.wd_100}>
           		<p>Search</p>
           		<div className={styles.search_form + ' ' + styles.wd_100} data-field-name="filter1" onChange={ this.filterChange.bind(this) } >
                <select data-field-name="field">
                  <option value="created_at"> Date </option>
                </select>
                <select data-field-name="operator">
                  <option value="$gt"> Greater </option>
                </select>
           			<input type="text" placeholder="Contains" data-field-name="value"/>
           		</div>
           		<div className={styles.search_form + ' ' + styles.wd_100} data-field-name="filter2" onChange={ this.filterChange.bind(this) }>
                <select data-field-name="field">
                  <option value="created_at"> Date </option>
                </select>
                <select data-field-name="operator">
                  <option value="$lt"> Less Than </option>
                </select>
           			<input type="text" placeholder="Contains" data-field-name="value"/>
           			<button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>Search</button>
           		</div>
           	</div>
            <div className={ styles.export_as_csv + ' ' + styles.wd_100 }>
              <button className={ styles.common_btn } onClick={ this.genCsv.bind(this) }>
                Export as CSV
              </button>
            </div>
            <RechargeSearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={ paginationUrl } />
          </div>
        );
  }
}

ConsumerRecharge.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data, ongoingRequest: state.page_data.ongoingRequest, filterData: { ...state.filter_data }};
};


const decoratedConnectedComponent = commonDecorator(ConsumerRecharge);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
