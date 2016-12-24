import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { fetchConsumer, fetchConsumerCount } from './KycVerifyAction';
import SearchWrapper from './SearchWrapper';

import PaginationContainer from '../../CustomerTransaction/components/Recharge/Pagination';
import commonDecorator from '../../Common/CommonDecorator';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../../Common/Actions/Actions';

class VerifyKyc extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* Fetch the state data */
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(fetchConsumer(page)),
      this.props.dispatch(fetchConsumerCount())
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickHandle(e) {
    // e.preventDefault();
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);
    if (currentPage) {
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(fetchConsumer(currentPage))
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED});
      });
    }
  }
  render() {
    const styles = require('./VerifyKyc.scss');
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
         		Consumer Management / Verify KYC
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
          <SearchWrapper data={lastSuccess ? lastSuccess : []}/>
          <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={count} parentUrl="/hadmin/consumer/kycfunctions/verify_kyc" />
        </div>
      );
  }
}

VerifyKyc.propTypes = {
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


const decoratedComponent = commonDecorator(VerifyKyc);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedComponent);
