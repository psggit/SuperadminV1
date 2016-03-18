import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getCartData} from '../../ProfileActions';
import TableHeader from '../../TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewCart extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getCartData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const styles = require('../../Table.scss');

    /* */
    /* */
    const { ongoingRequest, lastError, lastSuccess } = this.props;

    /* End of it */

    let getHtml;
    let getButtons;
    let getHeader = <TableHeader title={'Initial'}/>;

    const breadcrumbText = 'Consumer Management/Profile/' + this.props.params.Id + '/Cart';

    const objToHtml = (response) => {
      /* Getting the first element from the response */
      const cartData = response;
      const cart = cartData.carts[0];
      const allItems = [];
      let normalHtml;
      /* Aggregation of all possible cart items */
      Object.keys(cart).forEach((item) => {
        if (typeof(cart[item]) === 'object') {
          cart[item].forEach((i) => {
            allItems.push(i);
          });
        }
      });

      normalHtml = allItems.map((item, index) => {
        let createdAt = item.created_at;
        let updatedAt = item.updated_at;
        let itemObj;
        let offerType;
        offerType = 'N/A';

        if ('cash_back_offer_sku' in item) {
          itemObj = item.cash_back_offer_sku;
          offerType = 'CASHBACK';
        } else if ('discount_offer_sku' in item) {
          itemObj = item.discount_offer_sku;
          offerType = 'DISCOUNT';
        } else if ('on_pack_offer_sku' in item) {
          itemObj = item.on_pack_offer_sku;
          offerType = 'ON PACK';
        } else {
          itemObj = item;
        }

        createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
        updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
        return (
                  <tr key={index}>
                    <td> {item.id} </td>
                    <td> { (cart.consumer_id) ? cart.consumer_id : '' } </td>
                    <td> {(itemObj.sku_pricing) ? itemObj.sku_pricing.sku.brand.brand_name : ''} </td>
                    <td> {offerType} </td>
                    <td> { (itemObj.sku_pricing) ? itemObj.sku_pricing.sku.volume : '' } ML </td>
                    <td> { (itemObj.sku_pricing) ? itemObj.sku_pricing.duty_paid : '' } Rs </td>
                    <td> N/A </td>
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
                          <th> Name </th>
                          <th> Offer Type </th>
                          <th> Volume </th>
                          <th> MRP </th>
                          <th> Discount Price </th>
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
                   Sorry no cart items yet
                 </div>
               );
      };
      return normalHtml();
    };
    /* If Last error is set */
    if (Object.keys(lastError).length > 0) {
      getHeader = <TableHeader title={'Error'} breadcrumb={breadcrumbText} />;
      getHtml = (
                  <div className={styles.profile_information}>
                    <div className={styles.error_message}>
                      <h4> Something went wrong while fetching the data </h4>
                    </div>
                  </div>
                );
    } else if (lastSuccess.length > 0) { /* If its an object */
      getHeader = <TableHeader title={breadcrumbText}/>;
      getHtml = objToHtml(lastSuccess[0]);
    } else if (ongoingRequest) {
      getHeader = <TableHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }


    return (
      <div className={styles.profile_wrapper}>
        {getHeader}
        <div className={styles.white_width}>
        </div>
        <div className={styles.profile_view_wrapper}>
            <p className={styles.cart_view_header}>
                Cart
            </p>
            <div className={styles.cart_view_left}>
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
ViewCart.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(ViewCart);
