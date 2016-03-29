import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { fetchConsumer, fetchConsumerCount } from './KycUploadAction';
import SearchWrapper from './SearchWrapper';

import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';

class UploadKyc extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* Fetch the state data */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;

    this.props.dispatch(fetchConsumer(page));
    this.props.dispatch(fetchConsumerCount());
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      this.props.dispatch(fetchConsumer(currentPage));
    }
  }
  render() {
    const styles = require('./UploadKyc.scss');
    const { ongoingRequest, lastError, lastSuccess, count} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    console.log(lastError);
    console.log(ongoingRequest);
    console.log(lastSuccess);
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <div className={styles.head_container}>
         		Consumer Management / Upload KYC
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
          <SearchWrapper data={lastSuccess}/>
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/consumer/kycfunctions/upload_kyc" />
        </div>
      );
  }
}

UploadKyc.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.page_data};
};

export default connect(mapStateToProps)(UploadKyc);
