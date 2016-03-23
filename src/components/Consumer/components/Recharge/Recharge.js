import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getRechargeData} from '../../ProfileActions';
import TableProfileHeader from './TableProfileHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class RechargeHistory extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getRechargeData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const styles = require('./Table.scss');

    /* */
    /* */
    const { ongoingRequest, lastError, lastSuccess } = this.props;

    /* End of it */

    let getHtml;
    let getButtons;
    let getHeader = <TableProfileHeader title={'Initial'}/>;

    const breadcrumbText = this.props.params.Id;

    const objToHtml = (response) => {
      /* Getting the first element from the response */
      let allItems;
      allItems = [];

      Object.keys(response).forEach((item) => {
        if (typeof(response[item]) === 'object' && (response[item] && response[item].length)) {
          response[item].forEach((i) => {
            allItems.push(i);
          });
        }
      });
      let normalHtml;

      normalHtml = allItems.map((item, index) => {
        let createdAt = item.created_at;
        let updatedAt = item.updated_at;
        /* Check if the payment is being made for a gift */
        const productInfo = (item.payment_detail) ? item.payment_detail.productinfo : '';
        const isGift = (productInfo.toLowerCase() === 'gift') ? true : false;
        const giftText = (isGift) ? 'Yes' : 'No';
        const isSuccess = (item.payment_detail) ? item.payment_detail.is_success : false;

        createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
        updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
        return (
                  <tr key={index}>
                    <td> { item.id} </td>
                    <td> { item.consumer_id} </td>
                    <td> { (item.payment_detail) ? item.payment_detail.txn_id : ''} </td>
                    <td> { (item.payment_detail) ? item.payment_detail.pay_mih_id : ''} </td>
                    <td> { (item.payment_detail) ? item.payment_detail.bank_ref_num : '' } </td>
                    <td> { (item.payment_detail) ? item.payment_detail.amount : ''} </td>
                    <td> { giftText } </td>
                    <td> { (isSuccess) ? 'Successful' : 'Failed'} </td>
                    <td> { (item.payment_detail) ? item.payment_detail.mode : ''} </td>
                    <td> { (item.payment_detail) ? item.payment_detail.bank_code : ''} </td>
                    <td> { createdAt } </td>
                    <td> { updatedAt } </td>
                  </tr>
            );
      });

      if (normalHtml.length !== 0) {
        return (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th> Id </th>
                          <th> Consumer ID </th>
                          <th> Transaction ID</th>
                          <th> PayU Txn ID </th>
                          <th> Bank Ref ID </th>
                          <th> Amount </th>
                          <th> Is Gift </th>
                          <th> Status </th>
                          <th> Mode </th>
                          <th> Bank Code </th>
                          <th> Updated At </th>
                          <th> Created At </th>
                        </tr>
                      </thead>
                      <tbody>
                        {normalHtml}
                      </tbody>
                    </table>
                 );
      }
      normalHtml = () => {
        return (
                 <div className={styles.error_message}>
                   Sorry old devices yet
                 </div>
               );
      };
      return normalHtml();
    };
    /* If Last error is set */
    if (Object.keys(lastError).length > 0) {
      getHeader = <TableProfileHeader title={'Error'} breadcrumb={breadcrumbText} />;
      getHtml = (
                  <div className={styles.profile_information}>
                    <div className={styles.error_message}>
                      <h4> Something went wrong while fetching the data </h4>
                    </div>
                  </div>
                );
    } else if (lastSuccess.length > 0) { /* If its an object */
      getHeader = <TableProfileHeader title={breadcrumbText} breadcrumb={breadcrumbText}/>;
      getHtml = objToHtml(lastSuccess[0]);
    } else if (ongoingRequest) {
      getHeader = <TableProfileHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }


    return (
      <div className={styles.profile_wrapper}>
        {getHeader}
        <div className={styles.white_width}>
        </div>
        <div className={styles.profile_view_wrapper}>
            <p className={styles.cart_view_header}>
                Recharges
            </p>
            <div className={styles.recharge_history_left}>
                {getHtml}
            </div>
            <div className={styles.profile_view_right}>
            </div>
        </div>
        {getButtons}

      </div>
    );
  }
}

/* lastSuccess is an array in the beginning and it is populated as an array by the Hasura Response */
/* lastError is an object in the beginning and it is made an object in case of error conditions */
RechargeHistory.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(RechargeHistory);
