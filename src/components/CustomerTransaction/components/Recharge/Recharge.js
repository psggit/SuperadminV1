import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import {getAllRechargeData} from '../../actions/Action';
import RechargeSearchWrapper from './SearchWrapper';
import PaginationContainer from './Pagination';

class ConsumerRecharge extends Component {
  componentDidMount() {
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    this.props.dispatch(getAllRechargeData(page));
    /*
    this.props.dispatch(getRechargeCount())
      .then(() => {
        console.log('Here is the fuck up');
      });
    this.props.dispatch(getRechargeData(page, 16));
    */
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUnmount() {
    console.log('Unmounted');
  }
  render() {
    const styles = require('./Recharge.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Customer Management/Customer Reservations'} />
            <RechargeSearchWrapper data={lastSuccess}/>
            <PaginationContainer limit="10" currentPage={page} showMax="5" count={count} parentUrl="/consumer_transactions/recharges" />
          </div>
        );
  }
}

ConsumerRecharge.propTypes = {
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

export default connect(mapStateToProps)(ConsumerRecharge);
