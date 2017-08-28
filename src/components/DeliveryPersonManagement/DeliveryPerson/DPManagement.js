import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllDPData, getDPData } from './DPActions';
import SearchWrapper from './SearchWrapper';


import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from './DPActions';

import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';

/* Decorator which adds couple of useful features like
 * 1. Clearing the state of the Component on unmount
 * 2. Displaying/Hiding loading icon on ajax fetch/complete
 * */
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../Common/SearchComponentGen/FilterState';

import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';

class StateManagement extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'DP Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Manage Delivery Person',
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    /* Fetch the state data */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch(getDPData(page))
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch({ type: RESET_FILTER })
    ]);
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      this.props.dispatch(getDPData(currentPage));
    }
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllDPData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./DPManagement.scss');
    const { ongoingRequest, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log('ongoingRequest');
    console.log(ongoingRequest);

    /* Search Parameters */

    const fields = [ 'id', 'state_name', 'short_name' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'name': ['$eq', '$like', '$ilike'],
      'employee_id': ['$eq', '$gt', '$lt'],
      'short_name': ['$eq', '$like', '$ilike']
    };
    const fieldTypeMap = {
      'name': 'text',
      'city_id': 'text',
      'id': 'number'
    };

    /* End of it */

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
            <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
              Search
            </button>
          </SearchComponent>
          <div className={styles.create_state_wrapper + ' ' + 'hide'}>
            <p>Create</p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>State Name</label>
              	<input type="text" />
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn }>Create state</button>
            </div>
          </div>
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/delivery_person/create'}>
              <button className={styles.common_btn}>Create</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <div className={styles.pagination_wrapper}>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/deliveryPersonList" />
          </div>
        </div>
      );
  }
}

StateManagement.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.deliveryPersonState, ongoingRequest: state.page_data.ongoingRequest };
};

const decoratedConnectedComponent = commonDecorator(StateManagement);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
