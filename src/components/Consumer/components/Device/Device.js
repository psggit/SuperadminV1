import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getDeviceData} from '../../ProfileActions';
import TableProfileHeader from './TableProfileHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewDevice extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getDeviceData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const styles = require('../../Table.scss');

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
      const deviceData = response.old_consumer_device_history;
      let normalHtml;

      normalHtml = deviceData.map((item, index) => {
        let createdAt = item.created_at;
        let updatedAt = item.updated_at;

        createdAt = new Date(new Date(createdAt).getTime()).toLocaleString();
        updatedAt = new Date(new Date(updatedAt).getTime()).toLocaleString();
        return (
                  <tr key={index}>
                    <td> { item.id} </td>
                    <td> { (item.device) ? item.device.device_num : ''} </td>
                    <td> { item.ip } </td>
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
                          <th> Device ID </th>
                          <th> IP </th>
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
                Devices
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
ViewDevice.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(ViewDevice);
