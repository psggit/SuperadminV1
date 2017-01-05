import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllGenreData, getGenreData } from '../Action';
import SearchWrapper from './SearchWrapper';

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import PaginationWrapper from '../../Common/PaginationWrapper.js';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../Common/SearchComponentGen/FilterState';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';

class GenreManagement extends React.Component { // eslint-disable-line no-unused-vars
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
      title: 'Manage Genre',
      sequence: 2,
      link: '#'
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch({ type: RESET_FILTER })
    ]);
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllGenreData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getGenreData(clickedPage, limit));
  }

  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllGenreData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./GenreManagement.scss');
    const { ongoingRequest, lastError, lastSuccess} = this.props;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);
    /* Search Parameters */

    const fields = [ 'id', 'genre_name', 'short_name', 'display_name' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'genre_name': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt'],
      'short_name': ['$eq', '$like', '$ilike'],
      'display_name': ['$eq', '$like', '$ilike']
    };
    const fieldTypeMap = {
      'genre_name': 'text',
      'display_name': 'text',
      'short_name': 'text',
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
            <p>Create Genre</p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Genre Name</label>
              	<input type="text" />
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn }>Create Genre</button>
            </div>
          </div>
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/genre_management/create'}>
              <button className={styles.common_btn}>Create Genre</button>
            </Link>
          </div>
          {/*
          <div className={styles.list_of_states_wrapper}>
            <label>List of States</label>
            <table className={'table' + ' ' + 'table-striped'}>
              <thead>
                <th></th>
                <th>ID</th>
                <th>State Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </thead>
              <tbody>
              	<tr>
              		<td><button className={styles.edit_btn}>Edit</button></td>
              		<td className={styles.id}>1</td>
              		<td>Tamil Nadu</td>
              		<td>Active</td>
              		<td>01-03-2016</td>
              		<td>05-04-2016</td>
              	</tr>
              	<tr>
              		<td><button className={styles.edit_btn}>Edit</button></td>
              		<td className={styles.id}>2</td>
              		<td>Tamil Nadu</td>
              		<td>Active</td>
              		<td>01-03-2016</td>
              		<td>05-04-2016</td>
              	</tr>
              	<tr>
              		<td><button className={styles.edit_btn}>Edit</button></td>
              		<td className={styles.id}>3</td>
              		<td>Tamil Nadu</td>
              		<td>Active</td>
              		<td>01-03-2016</td>
              		<td>05-04-2016</td>
              	</tr>
              	<tr>
              		<td><button className={styles.edit_btn}>Edit</button></td>
              		<td className={styles.id}>4</td>
              		<td>Tamil Nadu</td>
              		<td>Active</td>
              		<td>01-03-2016</td>
              		<td>05-04-2016</td>
              	</tr>
              	<tr>
              		<td><button className={styles.edit_btn}>Edit</button></td>
              		<td className={styles.id}>5</td>
              		<td>Tamil Nadu</td>
              		<td>Active</td>
              		<td>01-03-2016</td>
              		<td>05-04-2016</td>
              	</tr>
              </tbody>
     		  	</table>
            <div className={styles.pagination_wrapper + ' ' + styles.wd_100}>
              <ul className={styles.custom_pagination}>
                	<li>
                  		<a href="#">
                    		<span aria-hidden="true">&laquo;</span>
                  		</a>
                	</li>
                	<li className={styles.active}><a href="#">1</a></li>
                	<li><a href="#">2</a></li>
                	<li><a href="#">3</a></li>
                	<li><a href="#">4</a></li>
                	<li><a href="#">5</a></li>
                	<li>
                  		<a href="#">
                    		<span aria-hidden="true">&raquo;</span>
                  		</a>
                	</li>
              </ul>
            </div>
          </div>
          */}
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/genre_management"
          />
        </div>
      );
  }
}

GenreManagement.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

const decoratedConnectedComponent = commonDecorator(GenreManagement);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
