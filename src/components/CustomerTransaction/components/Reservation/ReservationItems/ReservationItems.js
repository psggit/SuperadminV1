import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../../Common/TableHeader';

import {connect} from 'react-redux';

import { getReservedItems, RESET } from '../../../actions/Action';
import SearchWrapper from './SearchWrapper';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../../Common/Actions/Actions';

import commonDecorator from '../../../../Common/CommonDecorator';

class ConsumerReservationItems extends Component {
  componentDidMount() {
    const { cartId: cartId } = this.props.params;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getReservedItems( cartId ))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    this.props.dispatch( { type: RESET });
  }

  render() {
    const styles = require('./ReservationItems.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;

    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.reservation_container}>
            <TableHeader title={'Customer Management/Customer Reservations'} />
            <SearchWrapper data={lastSuccess}/>
          </div>
        );
  }
}

ConsumerReservationItems.propTypes = {
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

const decoratedConnectedComponent = commonDecorator( ConsumerReservationItems );// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
