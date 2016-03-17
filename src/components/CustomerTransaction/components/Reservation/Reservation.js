import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

import {getReservationData} from '../../actions/Action';
import SearchWrapper from './SearchWrapper';

class ConsumerReservation extends Component {
  componentDidMount() {
    this.props.dispatch(getReservationData());
  }
  render() {
    const styles = require('./Reservation.scss');
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

ConsumerReservation.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data};
};

export default connect(mapStateToProps)(ConsumerReservation);
