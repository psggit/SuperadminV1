import React, {Component, PropTypes} from 'react';
// import { Link } from 'react-router';
import {connect} from 'react-redux';
import {getReservationData} from './ProfileActions';
import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewReservation extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getReservationData(parseInt(this.props.params.Id, 10)));
  }

  render() {
    const styles = require('./Table.scss');
    let getHtml;
    let getButtons;
    let getHeader = <TableHeader title={'Initial'}/>;

    const breadcrumbText = this.props.params.Id;

    const { ongoingRequest, lastError, lastSuccess } = this.props;

    const objToHtml = (response) => {
      /* Getting the first element from the response */
      const resData = response;

      const reservationdata = resData.reservations;
      console.log('Hello world');
      console.log(reservationdata);
      console.log(reservationdata.consumer_id);
      // const cart = resData.carts[0];
      // const normalItems = cart.normal_items;

      const allItems = [];
//      let normalHtml;
      /* Aggregation of all possible cart items */

      console.log('All items');
      console.log(allItems);
      const normalHtml = reservationdata.map((item, index) => {
        let createdAt = item.created_at;
        let updatedAt = item.updated_at;
        console.log(createdAt);
        createdAt = new Date(new Date(createdAt).getTime() + 19800000).toLocaleString();
        updatedAt = new Date(new Date(updatedAt).getTime() + 19800000).toLocaleString();
        let isgift = item.is_gift;
        if (isgift === true) {
          isgift = 'true';
        } else if (isgift === false) {
          isgift = 'false';
        }
        return (
                  <tr key={index}>
                    <td> {item.id} </td>
                    <td> {item.consumer_id } </td>
                    <td> {item.amount } </td>
                    <td> {isgift}</td>
                    <td> { createdAt } </td>
                    <td> { updatedAt } </td>
                  </tr>
            );
      });

      return (
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Item Id </th>
                        <th> Consumer ID </th>
                        <th> Amount </th>
                        <th> is_gift </th>
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
                  RESERVATION
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
ViewReservation.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.resprofile};
};

export default connect(mapStateToProps)(ViewReservation);
