import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

import {getAllDevicesData} from '../../actions/Action';
import SearchWrapper from './SearchWrapper';
import PaginationContainer from '../Recharge/Pagination';

class ConsumerDevices extends Component {
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    this.props.dispatch(getAllReservationData(page));
  }
  componentWillUnmount() {
    console.log('Unmounted');
  }
  render() {
    const styles = require('./Devices.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.reservation_container}>
            <TableHeader title={'Customer Management/Customer Devices'} />
            <SearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" currentPage={page} showMax="5" count={count} parentUrl="/consumer_transactions/devices" />
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
  return {...state.transaction_data};
};

export default connect(mapStateToProps)(ConsumerReservation);
