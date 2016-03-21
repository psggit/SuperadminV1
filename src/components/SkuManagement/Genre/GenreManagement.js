import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllGenreData, getGenreData } from '../Action';
import SearchWrapper from './SearchWrapper';

import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';

class GenreManagement extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* Fetch the state data */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    this.props.dispatch(getAllGenreData(page));
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      this.props.dispatch(getGenreData(currentPage));
    }
  }
  render() {
    const styles = require('./GenreManagement.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <div className={styles.head_container}>
         		SKU Management / Manage Genre
         	</div>
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
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/genre_management" />
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

export default connect(mapStateToProps)(GenreManagement);
