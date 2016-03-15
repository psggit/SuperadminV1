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

    const breadcrumbText = this.props.params.Id + '/' + ' Cart';

    const objToHtml = (response) => {
      /* Getting the first element from the response */
      const cartData = response;

      const cart = cartData.carts[0];

      const normalItems = cart.normal_items;

      console.log('Normal Items');
      console.log('Normal Items');
      console.log(normalItems);

      const normalHtml = normalItems.map((item, index) => {
        let createdAt = item.created_at;
        let updatedAt = item.updated_at;

        createdAt = new Date(new Date(createdAt).getTime() + 19800000).toLocaleString();
        updatedAt = new Date(new Date(updatedAt).getTime() + 19800000).toLocaleString();
        return (
                  <tr key={index}>
                    <td> {item.id} </td>
                    <td> {cart.consumer_id } </td>
                    <td> {item.sku_pricing.sku.brand.brand_name } </td>
                    <td> N/A </td>
                    <td> { item.sku_pricing.sku.volume } ML </td>
                    <td> { item.sku_pricing.duty_paid } Rs </td>
                    <td> N/A </td>
                    <td> { createdAt } </td>
                    <td> { updatedAt } </td>
                  </tr>
            );
      });

      return (
                  <table className="table">
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
      getHeader = <TableHeader title={breadcrumbText} breadcrumb={breadcrumbText}/>;
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
