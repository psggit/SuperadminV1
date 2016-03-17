import React, {Component, PropTypes} from 'react';

// import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

import {getRechargeData} from '../../actions/Action';
import RechargeSearchWrapper from './SearchWrapper';

class ConsumerRecharge extends Component {
  componentDidMount() {
    this.props.dispatch(getRechargeData());
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUnmount() {
    console.log('Unmounted');
  }
  render() {
    const styles = require('./Recharge.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(lastError);
    console.log(ongoingRequest);
    return (
          <div className={styles.recharge_container}>
            <ol className = "breadcrumb">
              <li><a href = "#">Customer Management </a></li>
              <li><a href = "/consumer_transactions/"> Customer Transactions</a></li>
              <li className = "active"> Recharges </li>
              </ol>
            <SearchWrapper data={lastSuccess}/>
          </div>
        );
  }
}

ConsumerRecharge.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data};
};

export default connect(mapStateToProps)(ConsumerRecharge);
