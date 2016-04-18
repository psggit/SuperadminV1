import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllBrandData, getBrandData } from './BrandAction';
import SearchWrapper from './SearchWrapper';

import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';

/*
 * Decorator which adds couple of use ful features like
 * 1. Clearing the state on component unmount
 * 2. Displaying/Hiding Loading icon on ajax fetch/complete
*/
import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../../Common/BreadCrumb';

/*
function resetPreviousState(Component) {
  const FeaturedComponent = React.createClass({
    propTypes: {
      dispatch: PropTypes.func.isRequired
    },
    componentWillUnmount() {
      this.props.dispatch({ type: RESET });
    },
    render() {
      console.log('I am inside this decorated Component');
      return (
          <Component {...this.props} {...this.states} />
        );
    }
  });
  return FeaturedComponent;
}
*/

/*
 1. Required Components:
      a) Pagination
      b) Loading Screen
      c) Search
      d) Header
      e) Listing Component
*/


class BrandManagement extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'SKU Management',
      sequence: 1,
      link: '#',
      disabled: true
    });
    this.breadCrumbs.push({
      title: 'Manage Brand',
      sequence: 2,
      link: '#',
      disabled: true
    });
  }
  componentDidMount() {
    /* Fetch the state data */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    this.props.dispatch(getAllBrandData(page));
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      this.props.dispatch(getBrandData(currentPage));
    }
  }
  render() {
    const styles = require('./BrandManagement.scss');
    const { lastSuccess, count } = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <BreadCrumb breadCrumbs={this.breadCrumbs} />
          {/*
          <div className={styles.head_container}>
         		SKU Management / Manage Brand
         	</div>
          */}
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
            <p>Create Brand</p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>Brand Name</label>
              	<input type="text" />
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn }>Create Brand</button>
            </div>
          </div>
          <div className={styles.create_layout + ' ' + styles.wd_100}>
            <Link to={'/hadmin/brand_management/create'}>
              <button className={styles.common_btn}>Create Brand</button>
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
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/brand_management" />
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

/*
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators([() => { return {type: RESET}; }], dispatch) };
};*/

const decoratedConnectedComponent = commonDecorator(BrandManagement);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
// export default decoratedConnectedComponent(BrandManagement);

// export default resetPreviousState(connectedComponent);
