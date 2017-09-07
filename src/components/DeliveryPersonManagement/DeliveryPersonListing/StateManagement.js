import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllStateData, getStateData } from './StateActions';
import SearchWrapper from './SearchWrapper';


import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from './StateActions';

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
      title: 'Delivery Person Management',
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
      this.props.dispatch(getAllStateData(page))
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
      this.props.dispatch(getStateData(currentPage));
    }
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllStateData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./StateManagement.scss');
    const { ongoingRequest, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log('ongoingRequest');
    console.log(ongoingRequest);

    /* Search Parameters */

    const fields = [ 'id', 'name', 'employee_id', 'city' ];
    const fieldOperatorMap = {
      'id': ['$eq', '$gt', '$lt'],
      'name': ['$eq', '$like', '$ilike'],
      'city': ['$eq', '$like', '$ilike'],
      'employee_id': ['$eq', '$like', '$ilike']
    };
    const fieldTypeMap = {
      'city': 'text',
      'name': 'text',
      'employee_id': 'text',
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
            <p>Create State</p>
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
            <Link to={'/hadmin/state_management/create'}>
              <button className={styles.common_btn}>Create State</button>
            </Link>
          </div>
          <SearchWrapper data={lastSuccess}/>
          <div className={styles.pagination_wrapper}>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/state_management" />
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
  return {...state.sku_data, ongoingRequest: state.page_data.ongoingRequest };
};

const decoratedConnectedComponent = commonDecorator(StateManagement);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
