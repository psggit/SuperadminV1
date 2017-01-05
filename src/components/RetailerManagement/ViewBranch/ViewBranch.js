import React, {Component, PropTypes} from 'react';

import TableHeader from '../../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import {
  getAllBranchData
} from './Actions';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import BranchSearchWrapper from './SearchWrapper';
import PaginationContainer from './Pagination';

import commonDecorator from '../../Common/CommonDecorator';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../Common/SearchComponentGen/FilterState';

import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';

class Branch extends Component {
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllBranchData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
    /*
    this.props.dispatch(getBranchCount())
      .then(() => {
        console.log('Here is the fuck up');
      });
    this.props.dispatch(getBranchData(page, 16));
    */
  }

  shouldComponentUpdate() {
    return true;
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

    const { userId: consumerId } = this.props.params;
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getAllBranchData(currentPage, ( consumerId ? consumerId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  enableSearch() {
    const page = 1;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllBranchData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./ViewBranch.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;

    const paginationUrl = '/hadmin/retailer_management/view_branches';

    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const fields = [ 'id', 'org_name' ];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'org_name': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'org_name': 'text',
      'id': 'number'
    };
    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Retailer Management/ View Branches'} />
            <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
            <BranchSearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={ paginationUrl } />
          </div>
        );
  }
}

Branch.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data };
};


const decoratedConnectedComponent = commonDecorator(Branch);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
