import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

import SearchComponent from '../../../Common/SearchComponent/SearchComponent';

import {
  getAllReservationData
  , downloadReservationCSV
  , RESET
} from '../../actions/Action';
import SearchWrapper from './SearchWrapper';
import PaginationContainer from '../Recharge/Pagination';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

import {
  TOGGLE_SEARCH,
  RESET_FILTER
} from '../../../Common/SearchComponent/FilterState';

import commonDecorator from '../../../Common/CommonDecorator';

class ConsumerReservation extends Component {
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllReservationData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    console.log('Unmounted');
    this.props.dispatch( { type: RESET } );
    this.props.dispatch({ type: RESET_FILTER });
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    const { userId: consumerId } = this.props.params;
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(getAllReservationData(currentPage, ( consumerId ? consumerId : '') ))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  enableSearch() {
    const page = 1;

    const { userId: consumerId } = this.props.params;

    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch({ type: TOGGLE_SEARCH }),
      this.props.dispatch(getAllReservationData(page, ( consumerId ? consumerId : '') ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  genCsv() {
    const { userId: consumerId } = this.props.params;
    this.props.dispatch(downloadReservationCSV( consumerId ));
  }
  render() {
    const styles = require('./Reservation.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const { userId: consumerId } = this.props.params;

    const paginationUrl = ( consumerId ) ? '/hadmin/consumer_transactions/' + parseInt(consumerId, 10) + '/reservations' : '/hadmin/consumer_transactions/reservations';

    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.reservation_container}>
            <TableHeader title={'Customer Management/Customer Reservations'} />
            <SearchComponent>
              <button className={styles.common_btn} onClick={ this.enableSearch.bind(this) }>
                Search
              </button>
            </SearchComponent>
            <div className={ styles.export_as_csv + ' ' + styles.wd_100 }>
              <button className={ styles.common_btn } onClick={ this.genCsv.bind(this) }>
                Export as CSV
              </button>
            </div>
            <SearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={ paginationUrl } />
          </div>
        );
  }
}

ConsumerReservation.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data, ongoingRequest: state.page_data.ongoingRequest };
};

const decoratedConnectedComponent = commonDecorator( ConsumerReservation );// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
