import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import {connect} from 'react-redux';
import {getUserData, resetPin, getBalance, resetPassword} from './ProfileActions';
import TableProfileHeader from './TableProfileHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class ViewConsumerProfile extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
    this.props.dispatch(getBalance(parseInt(this.props.params.Id, 10)));
  }
  clickHandler() {
    // Dispatch the event here
    this.props.dispatch(resetPin(parseInt(this.props.params.Id, 10)));
  }
  resetHandler() {
    // Dispatch the event here
    this.props.dispatch(resetPassword(this.props.lastSuccess[0].email, this.props.lastSuccess[0].dob));
  }
  render() {
    const styles = require('./Table.scss');
    /*
    const reservationHtml = () => {
      return (
        <button className="btn btn-default btn-xs" onClick={() =>{
          // this.props.dispatch(getSecondaryData(arr));
        }}> View All </button>
      );
    };
    */
    /*
    const funcMap = {
      'reservations': reservationHtml
    };
    */
    /* */
    /* */
    const { ongoingRequest, lastError, lastSuccess, balance} = this.props;
    let dbNamesPriority = {};
    let dbNamesDisplayMapping = {};
    let fieldFunctionMapping = {};
    let fieldObjectMapping = {};
    const { Id: userId } = this.props.params;

    fieldObjectMapping = {
      'recharge_history': 'payment_recharges',
      'reservation_history': 'reservations',
      'gifts_received': 'gifts',
      'gifts_given': 'gifts',
      'cart': 'carts',
      'cancellation_history': 'gifts',
      'redemption_history': 'gifts',
      'credits_available': 'gifts',
      'device_id': 'device',
      'device_history': 'old_consumer_device_history',
      'notepad': 'consumer_notepads'
    };
    let priority = 1;
    /* Db field names are mapped to ui names */
    dbNamesDisplayMapping = {
      'level_id': 'Current KYC Level',
      'email': 'Email ID',
      'device_id': 'Device ID',
      'full_name': 'Name',
      'dob': 'Date of Birth',
      'mobile_number': 'Mobile Number',
      'gender': 'Gender',
      'id': 'Consumer ID',
      'device_history': 'Device History',
      'credits_available': 'Credits Available',
      'cart': 'Cart',
      'recharge_history': 'Recharge History',
      'reservation_history': 'Reservation History',
      'cancellation_history': 'Cancellation History',
      'redemption_history': 'Redemption History',
      'gifts_given': 'Gifts Given',
      'gifts_received': 'Gifts Received',
      'notepad': 'Notepad'
    };
    /* Priority of each field in UI */
    dbNamesPriority = {
      '1': 'id',
      '2': 'full_name',
      '3': 'email',
      '4': 'gender',
      '5': 'dob',
      '6': 'mobile_number',
      '7': 'credits_available',
      '8': 'level_id',
      '9': 'device_id',
      '10': 'device_history',
      '11': 'cart',
      '12': 'notepad',
      '13': 'recharge_history',
      '14': 'reservation_history',
      '15': 'cancellation_history',
      '16': 'redemption_history',
      '17': 'gifts_given',
      '18': 'gifts_received'
    };

    /* Function mapping implementation */
    const calculateRecharges = (values) => {
      /* Will recieve an array of object with a key called amount */
      /*
      let returnVal = 0;
      values.forEach((value, index) => {
        returnVal += value.amount ;
      });
      */
      return values.length;
    };

    const calculateCredits = (values) => {
      /* It takes the balance object in the scope to get the amount */
      console.log(values);
      return balance.amount;
      // return values.length;
    };

    const calculateCarts = (values) => {
      let returnVal = 0;
      if (values.length > 0) {
        Object.keys(values[0]).forEach((val) => {
          returnVal += values[0][val].length;
        });
        return returnVal;
      }
      return 0;
    };

    const calculateReservations = (values) => {
      return values.length;
    };

    const reservationHistories = (values) => {
      return values.length;
    };

    const redemptionHistories = (values) => {
      return values.length;
    };

    const giftsGivens = (values) => {
      return values.length;
    };

    const giftsReceived = (values) => {
      return values.length;
    };

    const getDevice = (value) => {
      return (value.device_num) ? value.device_num : 'N/A';
    };

    const getDeviceHistory = (values) => {
      return values.length;
    };

    const getNotepads = (values) => {
      return values.length;
    };

    /* Field to function mapping */
    fieldFunctionMapping = {
      'credits_available': calculateCredits,
      'cart': calculateCarts,
      'recharge_history': calculateRecharges,
      'reservation_history': calculateReservations,
      'cancellation_history': reservationHistories,
      'redemption_history': redemptionHistories,
      'gifts_given': giftsGivens,
      'gifts_received': giftsReceived,
      'device_id': getDevice,
      'device_history': getDeviceHistory,
      'notepad': getNotepads
    };


    /* End of it */

    /* Write a custom function to make the response object consumable */
    const valueComponent = (obj, _priority) => {
      let printValue;
      const key = dbNamesPriority[_priority];
      const dbKey = fieldObjectMapping[key];
      let renderLink;
      let isLink = false;
      /* Check whether the value is an object or not */
      if (typeof(obj[dbKey]) === 'object') {
        /* Get the element to display */
        printValue = (fieldFunctionMapping[key]) ? fieldFunctionMapping[key](obj[dbKey]) : 'N/A';
        const renderValue = [
          'cart',
          'device_history',
          'recharge_history',
          'reservation_history',
          'redemption_history',
          'cancellation_history',
          'reservation_history',
          'gifts_given',
          'gifts_received',
          'notepad'
        ];

        if (renderValue.indexOf(key) !== -1) {
          if (printValue !== 'N/A' && printValue > 0) {
            printValue += ((printValue > 1) ? ' items' : ' item');
            isLink = true;
          } else {
            isLink = false;
          }
        }

        if (isLink) {
          if (key === 'cart') {
            const url = '/hadmin/consumer/profile/' + this.props.params.Id + '/cart';
            renderLink = (
                    <div className={styles.wd_60_link}>
                      <Link to={url}>
                          {printValue}
                      </Link>
                    </div>
                    );
          } else if (key === 'reservation_history') {
            renderLink = (
                    <div className={styles.wd_60_link}>
                      <Link to={'/hadmin/consumer/profile/' + obj.id + '/reservation'}> {printValue} </Link>
                    </div>
                );
          } else if (key === 'device_history') {
            renderLink = (
                    <div className={styles.wd_60_link}>
                      <Link to={'/hadmin/consumer/profile/' + obj.id + '/device_history'}> {printValue} </Link>
                    </div>
                );
          } else if (key === 'recharge_history') {
            renderLink = (
                    <div className={styles.wd_60_link}>
                      <Link to={'/hadmin/consumer/profile/' + obj.id + '/recharge_history'}> {printValue} </Link>
                    </div>
                );
          } else if (key === 'notepad') {
            renderLink = (
                    <div className={styles.wd_60_link}>
                      <Link to={'/hadmin/consumer/profile/' + obj.id + '/view_notepads'}> {printValue} </Link>
                    </div>
                );
          } else {
            renderLink = (
                    <div className={styles.wd_60_link}>
                      {printValue}
                    </div>
                );
          }
        } else {
          if (key === 'notepad') {
            renderLink = (
                <div className={styles.wd_60_notepad}>
                  <div className={styles.notepad_items}>
                    {printValue}
                  </div>
                  <Link to={'/hadmin/consumer/profile/' + userId + '/create_notepad_entry'}>
                    <button className={ 'form-control ' + styles.add_btn} id="add_notepad">
                        Create
                    </button>
                  </Link>
                </div>
              );
          } else {
            renderLink = printValue;
          }
        }
      } else {
        renderLink = obj[dbNamesPriority[_priority]];
      }
      return (
        <div className={styles.wd_60}>
            {renderLink}
        </div>
      );
    };
    const objToHtml = (obj) => {
      return (
        Object.keys(dbNamesDisplayMapping).map((key, index) => {
          const _key = dbNamesDisplayMapping[dbNamesPriority[priority]];
          return (
            <div key={index} className={styles.profile_information}>
              <div className={styles.wd_40}>
                {_key}:
              </div>
              <div className={styles.wd_60} >
                {valueComponent(obj, priority++)}
              </div>
            </div>
          );
        })
      );
    };
    let getHtml;
    let getButtons;
    let getHeader = <TableProfileHeader title={'Initial'}/>;
    /* If Last error is set */
    if (Object.keys(lastError).length > 0) {
      getHeader = <TableProfileHeader title={'Error'}/>;
      getHtml = (
                  <div className={styles.profile_information}>
                    <div className={styles.error_message}>
                      <h4> Something went wrong while fetching the data </h4>
                    </div>
                  </div>
                );
    } else if (lastSuccess.length > 0) { /* If its an object */
      getHeader = <TableProfileHeader title={lastSuccess[0].id}/>;
      getHtml = objToHtml(lastSuccess[0]);
      getButtons = (
                     <div className={styles.profile_actions}>
                       <div className={styles.profile_action_button}>
                         <Link to={'/hadmin/consumer/profile/' + userId + '/edit_account_details'} >
                           <button className="form-control" id="update_user" >
                               Update User
                           </button>
                         </Link>
                       </div>
                       <div className={styles.profile_action_button}>
                           <button className="form-control" id="reset_pin" onClick={this.clickHandler.bind(this) } >
                               Reset Pin
                           </button>
                       </div>
                       <div className={styles.profile_action_button}>
                           <button className="form-control" id="reset_password" onClick={ this.resetHandler.bind(this) }>
                               Reset Password
                           </button>
                       </div>
                       <div className={styles.profile_action_button}>
                           <button className="form-control" id="disable_user" >
                               Disable User
                           </button>
                       </div>
                       <div className={styles.profile_action_button}>
                           <button className="form-control" id="disable_device" >
                               Disable Device
                           </button>
                       </div>
                     </div>
              );
    } else if (ongoingRequest) {
      getHeader = <TableProfileHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }


    return (
      <div className={styles.profile_wrapper}>
        {getHeader}
        <div className={styles.profile_view_wrapper}>
            <div className={styles.profile_view_left}>
                <p className={styles.profile_view_header}>
                    Account Details
                </p>
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
ViewConsumerProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  balance: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.profile};
};

export default connect(mapStateToProps)(ViewConsumerProfile);
