import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

import {
  getAllReservationData
  , RESET
} from '../../actions/Action';
import SearchWrapper from './SearchWrapper';
import PaginationContainer from '../Recharge/Pagination';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

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
