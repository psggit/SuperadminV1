import React, {Component, PropTypes} from 'react';

import TableHeader from '../../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import {
  getAllOrganizationData
} from './Actions';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import OrganizationSearchWrapper from './SearchWrapper';
import PaginationContainer from './Pagination';

import commonDecorator from '../../Common/CommonDecorator';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../Common/SearchComponentGen/FilterState';

import SearchComponent from '../../Common/SearchComponentGen/SearchComponent';

class Organization extends Component {
  componentWillMount() {
    console.log('Will mount called');
  }
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllOrganizationData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
    /*
    this.props.dispatch(getOrganizationCount())
      .then(() => {
        console.log('Here is the fuck up');
      });
    this.props.dispatch(getOrganizationData(page, 16));
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
        this.props.dispatch(getAllOrganizationData(currentPage, ( consumerId ? consumerId : '') ))
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
      this.props.dispatch(getAllOrganizationData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./ViewOrganization.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;

    const paginationUrl = '/hadmin/retailer_management/view_organizations';

    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const fields = [ 'id', 'organisation_name', 'type_of_organisation', 'pan_number', 'tin_number', 'tan_number'];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'organisation_name': ['$eq', '$like', '$ilike'],
      'type_of_organisation': ['$eq', '$like', '$ilike'],
      'pan_number': ['$eq', '$like', '$ilike'],
      'tin_number': ['$eq', '$like', '$ilike'],
      'tan_number': ['$eq', '$like', '$ilike'],
      'id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'organisation_name': 'text',
      'type_of_organisation': 'text',
      'id': 'number',
      'pan_number': 'text',
      'tin_number': 'text',
      'tan_number': 'text'
    };
    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Retailer Management/ View Organizations'} />
            <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
            <OrganizationSearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={ paginationUrl } />
          </div>
        );
  }
}

Organization.propTypes = {
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


const decoratedConnectedComponent = commonDecorator(Organization);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
