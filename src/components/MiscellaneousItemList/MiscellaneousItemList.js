import React, {Component, PropTypes} from 'react';

import TableHeader from '../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import {
  getAllBarSkusData,
  getBarSkuReservations,
  toggleBarSkuStatus
} from './Actions';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../Common/Actions/Actions';

import BarSearchWrapper from './SearchWrapper';
import PaginationContainer from './Pagination';

import commonDecorator from '../Common/CommonDecorator';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../Common/SearchComponentGen/FilterState';

import SearchComponent from '../Common/SearchComponentGen/SearchComponent';

class MiscellaneousItemList extends Component {
  componentWillMount() {
    console.log('Will mount called');
  }
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllBarSkusData(page, ( consumerId ? consumerId : '') )),
      this.props.dispatch(getBarSkuReservations())
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
    /*
    this.props.dispatch(getBarCount())
      .then(() => {
        console.log('Here is the fuck up');
      });
    this.props.dispatch(getBarData(page, 16));
    */
  }
  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    console.log('Unmounted');
    Promise.all([
      this.props.dispatch({ type: RESET_FILTER }),
      this.props.dispatch({ type: RESET })
    ]);
  }

  onToggleStatus( e, id, isActive, pricingId, barId ) {
    const {query} = this.props.location;
    const currentPage = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(toggleBarSkuStatus(id, isActive, currentPage, pricingId, barId ))
    ])
    .then( () => {
      console.log('Then called');
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
      console.log('Catch called');
    });
  }

  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);

    const { userId: consumerId } = this.props.params;
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getAllBarSkusData(currentPage, ( consumerId ? consumerId : '') ))
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
      this.props.dispatch(getAllBarSkusData(page, 10))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./ManageBarSku.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;

    const paginationUrl = '/hadmin/miscellaneous_item/list';

    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);

    const fields = [ 'id', 'name', 'volume'];
    // const operator = ['$eq'];
    const fieldOperatorMap = {
      'name': ['$eq', '$like', '$ilike'],
      'volume': ['$eq', '$gt', '$lt'],
      'id': ['$eq', '$gt', '$lt']
    };
    const fieldTypeMap = {
      'name': 'text',
      'volume': 'text',
      'id': 'number'
    };
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Miscellaneous Item/List'} />
            <SearchComponent configuredFields={ fields } fieldOperatorMap={ fieldOperatorMap } fieldTypeMap={ fieldTypeMap }>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
            <BarSearchWrapper data={lastSuccess} onClickHandler={ this.onToggleStatus.bind(this) }/>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={ paginationUrl } />
          </div>
        );
  }
}

MiscellaneousItemList.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data, ...state.all_bar_skus };
};


const decoratedConnectedComponent = commonDecorator(MiscellaneousItemList);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
