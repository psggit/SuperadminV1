import React, {Component, PropTypes} from 'react';

import TableHeader from '../../../Common/TableHeader';

import {connect} from 'react-redux';

// import {getRechargeData, getRechargeCount} from '../../actions/Action';
import { initialState, updatePageData, insertCredits, DELETE_CREDIT_AND_UPDATE_DATA, UPDATE_CREDIT_DATA} from '../../actions/Action';
import CreditsSearchWrapper from './SearchWrapper';
import FeedbackComponent from './FeedbackComponent';
import PaginationContainer from '../../../CustomerTransaction/components/Recharge/Pagination';

class ConfirmCredits extends Component {
  componentDidMount() {
    this.props.dispatch(initialState(this.props.creditData));
  }
  onDeleteHandle(e) {
    const creditId = parseInt(e.target.getAttribute('data-id'), 10);// Basically it will be index of the element + 1
    // const currentPage = 1;
    /* Compute the current page number */
    const { query } = this.props.location;
    const currentPage = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    /* End of It */
    const pageLimit = 10;
    let pageOffset;
    let dataIndex = 0;
    this.props.creditData.data.forEach((c, i) => {
      if (c.id === creditId) {
        dataIndex = i;
      }
    });
    pageOffset = ((currentPage - 1) * pageLimit);
    this.props.dispatch({type: DELETE_CREDIT_AND_UPDATE_DATA, data: {dataIndex, pageOffset, limit: (pageOffset + pageLimit)}});
    // // Give the first 10 data
    // pageData = this.props.creditData.data.slice(pageOffset, (pageOffset) + pageLimit);
    /* Updating the count and the actual page data */
    // this.props.dispatch({type: UPDATE_CURRENT_PAGE_DATA, data: pageData});
    // this.props.dispatch({type: UPDATE_CURRENT_COUNT, data: this.props.creditData.data.length});
  }
  onClickHandle(e) {
    const currentPage = parseInt(e.target.href.split('?p=')[1], 10);

    this.props.dispatch(updatePageData(currentPage, this.props.creditData));
  }
  onPriceEditHandler(e) {
    let dataIndex = 0;
    const pageLimit = 10;
    let pageOffset;
    const { query } = this.props.location;
    const currentPage = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    const value = parseInt(e.target.value.innerHTML, 10);
    this.props.creditData.data.forEach((c, i) => {
      if (c.id === e.target.dataId) {
        dataIndex = i;
      }
    });

    pageOffset = ((currentPage - 1) * pageLimit);
    this.props.dispatch({type: UPDATE_CREDIT_DATA, data: {dataIndex, value, pageOffset, limit: (pageOffset + pageLimit)}});
  }
  confirmHandler() {
    /* Form insert Object */
    const objs = [];
    let batchNumber;

    this.props.creditData.data.forEach((dat) => {
      const currentObj = {};
      if (dat.is_valid) {
        currentObj.consumer_id = parseInt(dat.actual_id, 10);
        currentObj.amount = parseFloat(dat.amount, 10);
        currentObj.reason = dat.comment;
        currentObj.updated_at = new Date().toISOString();
        currentObj.created_at = new Date().toISOString();
        currentObj.transaction_code_id = parseInt(dat.transaction_id, 10);
        currentObj.batch_number = dat.batch_number;
        currentObj.transaction_id = 'RANDOM TRANSACTION ID';
        batchNumber = currentObj.batch_number;
        objs.push(currentObj);
      }
    });
    if (objs.length === 0) {
      alert('None of the customers selected are valid');
    } else {
      this.props.dispatch(insertCredits(objs, batchNumber));
    }
  }
  render() {
    const styles = require('./ConfirmCredits.scss');
    const { pageData, pagesCount, creditData} = this.props;
    const {query} = this.props.location;
    const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    // const {query} = this.props.location;
    // const page = (Object.keys(query).length > 0) ? parseInt(query.p, 10) : 1;
    return (
          <div className={styles.recharge_container}>
            <TableHeader title={'Customer Transactions/Confirm Credits'} />
            <CreditsSearchWrapper data={pageData} onDelete={this.onDeleteHandle.bind(this)} onPriceEdit={this.onPriceEditHandler.bind(this)} />
            <PaginationContainer limit="10" onClickHandler={this.onClickHandle.bind(this)} currentPage={page} showMax="5" count={pagesCount} parentUrl="/hadmin/consumer_transactions/confirm_credits" />
            <FeedbackComponent data={creditData} onClickHandler={this.confirmHandler.bind(this)} />
          </div>
        );
  }
}

ConfirmCredits.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  creditData: PropTypes.object.isRequired,
  pagesCount: PropTypes.number.isRequired,
  pageData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.transaction_data};
};

export default connect(mapStateToProps)(ConfirmCredits);
