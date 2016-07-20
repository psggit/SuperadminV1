import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { getAllTransactionByBatch, getTransactionByBatch} from '../../actions/Action';
import ViewSearchWrapper from './ViewSearchWrapper';

import PaginationContainer from '../../../CustomerTransaction/components/Recharge/Pagination';

class ViewCredits extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* Fetch the state data */
    let batchId;

    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    batchId = this.props.params.batchNumber;
    this.props.dispatch(getAllTransactionByBatch(page, batchId));
  }
  onClickHandle(e) {
    console.log('asc');
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    const batchId = this.props.params.batchNumber;
    if (currentPage) {
      this.props.dispatch(getTransactionByBatch(currentPage, batchId));
    }
  }
  render() {
    const styles = require('./ViewCredits.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    const batchId = this.props.params.batchNumber;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);
    console.log(count);
    console.log(page);
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <div className={styles.head_container}>
         		Consumer Transactions / View Credits
         	</div>
         	<div className={styles.search_wrapper + ' ' + styles.wd_100}>
         		<p>Search</p>
         		<div className={styles.search_form + ' ' + styles.wd_100}>
         			<input type="text" placeholder="Mobile Number" />
         			<input type="text" placeholder="Contains" />
         			<input type="number" />
         			<button className={styles.common_btn}>Search</button>
         		</div>
         	</div>
          <ViewSearchWrapper data={lastSuccess}/>
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl={'/hadmin/consumer_transactions/view_credits/' + batchId} />
        </div>
      );
  }
}

ViewCredits.propTypes = {
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

export default connect(mapStateToProps)(ViewCredits);
