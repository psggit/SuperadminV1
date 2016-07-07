import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllCategoryData, getCategoryData} from '../Action';
import SearchWrapper from './SearchWrapper';

// import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';
//

import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

import PaginationWrapper from '../../Common/PaginationWrapper.js';

class CategoryManagement extends React.Component { // eslint-disable-line no-unused-vars
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
      title: 'Manage Category',
      sequence: 2,
      link: '#'
    });
  }
  // Hook used by pagination wrapper to fetch the initial data
  fetchInitialData(page, limit) {
    this.props.dispatch(getAllCategoryData(page, limit));
  }
  triggerPageChange(clickedPage, limit) {
    this.props.dispatch(getCategoryData(clickedPage, limit));
  }

  render() {
    const styles = require('./CategoryManagement.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    // const {query} = this.props.location;
    // const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);
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
          <div className={styles.create_state_wrapper + ' ' + 'hide'}>
            <p>Create Category</p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Category Name</label>
              	<input type="text" />
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn }>Create Category</button>
            </div>
          </div>
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/category_management/create'}>
              <button className={styles.common_btn}>Create Category</button>
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
          {/*
          <SearchWrapper data={lastSuccess}/>
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/category_management" />
          */}
          <SearchWrapper data={lastSuccess}/>
          <PaginationWrapper
            {...this.props }
            fetchInitialData = { this.fetchInitialData.bind(this) }
            limit = "10"
            triggerPageChange={ this.triggerPageChange.bind(this) }
            showMax="5"
            parentUrl="/hadmin/category_management"
          />

        </div>
      );
  }
}

CategoryManagement.propTypes = {
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

const decoratedConnectedComponent = commonDecorator(CategoryManagement);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
