import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import {connect} from 'react-redux';
import {RESET, getUserData, upgradeK, downgradeK, resetPin, resetPassword} from './ProfileActions';

/* Common Decorator for taking care of loading and shit */
// import commonDecorator from '../../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';
import commonDecorator from '../Common/CommonDecorator';

import { MAKE_REQUEST, REQUEST_COMPLETED } from '../Common/Actions/Actions';
/* End of it */

class ViewConsumerProfile extends Component {
  constructor(props) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Consumer Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Consumer Profile',
      sequence: 2,
      link: '/hadmin/consumer/profiles'
    });
    this.breadCrumbs.push({
      title: props.params.Id,
      sequence: 3,
      link: '#'
    });
  }
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    Promise.all([
      this.props.dispatch( { type: RESET }),
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10))),
    // this.props.dispatch(getUserStatus(parseInt(this.props.params.Id, 10)))
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    this.props.dispatch( { type: RESET });
  }
  clickHandler() {
    // Dispatch the event here
    this.props.dispatch(resetPin(parseInt(this.props.params.Id, 10)));
  }
  upgradeKyc() {
    this.props.dispatch(upgradeK(parseInt(this.props.params.Id, 10)));
  }
  downgradeKyc() {
    this.props.dispatch(downgradeK(parseInt(this.props.params.Id, 10)));
  }
  resetHandler() {
    // Dispatch the event here
    this.props.dispatch(resetPassword(this.props.lastSuccess[0].email, this.props.lastSuccess[0].dob));
  }
  render() {
    const styles = require('./Table.scss');
    const { ongoingRequest, lastError, lastSuccess } = this.props;
    const { Id: userId } = this.props.params;
    let getHtml;
    let getButtons;
    /* If Last error is set */
    if (Object.keys(lastError).length > 0) {
      getHtml = (
                  <div className={styles.profile_information}>
                    <div className={styles.error_message}>
                      <h4> Something went wrong while fetching the data </h4>
                    </div>
                  </div>
                );
    } else if (lastSuccess.length > 0) { /* If its an object */
      const profileInfo = lastSuccess[0][0];

      const cartInfo = lastSuccess[1];
      const transactionHistory = lastSuccess[2];
      const credits = lastSuccess[3];
      const notepad = lastSuccess[4];
      const kycLevelHTML = ( profileInfo.level_id === 1 ) ?
        (
          <div className={styles.wd_60_notepad}>
            <div className={styles.notepad_items}>
              { profileInfo.level_id }
            </div>
              <button onClick={this.upgradeKyc.bind(this)} className={ 'form-control ' + styles.add_btn}>
                  Ugrade To level 2
              </button>
          </div>
        ) :
        (
          <div className={styles.wd_60_notepad}>
            <div className={styles.notepad_items}>
              { profileInfo.level_id }
            </div>
              <button onClick={this.downgradeKyc.bind(this)} className={ 'form-control ' + styles.add_btn}>
                  Downgrade To level 1
              </button>
          </div>
        );

      const notepadHTML = ( notepad.length === 0 ) ?
        (
          <div className={styles.wd_60_notepad}>
            <div className={styles.notepad_items}>
              { notepad.length }
            </div>
            <Link to={'/hadmin/consumer/profile/' + userId + '/create_notepad_entry'}>
              <button className={ 'form-control ' + styles.add_btn} id="add_notepad">
                  Create
              </button>
            </Link>
          </div>
        ) :
        (
          <div className={styles.wd_60_notepad}>
            <Link to={'/hadmin/consumer/profile/' + profileInfo.id + '/view_notepads'}>
              <div className={styles.notepad_items}>
                { notepad.length }
              </div>
            </Link>
          </div>
        );

      const rechargeCount = transactionHistory.filter( ( ts ) => { return ( ts.type === 'recharge' ); }).length;
      const reservationCount = transactionHistory.filter( ( ts ) => { return ( ts.type === 'reservation' ); }).length;
      const cancellationCount = transactionHistory.filter( ( ts ) => { return ( ts.type === 'cancellation' ); }).length;
      const redemptionCount = transactionHistory.filter( ( ts ) => { return ( ts.type === 'redemption' || ts.type === 'wallet' ); }).length;

      const cartHtml = ( cartInfo.length > 0 ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer/profile/' + profileInfo.id + '/cart'}>
              { cartInfo.length }
            </Link>
          </div>
        ) :
        (
          <div >
            { cartInfo.length }
          </div>
        );

      const deviceHtml = ( profileInfo.old_devices.length ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer_transactions/devices/' + profileInfo.id }>
              { profileInfo.old_devices.length }
            </Link>
          </div>
        ) :
        (
          <div >
            { 0 }
          </div>
        );

      const rechargeHTML = ( rechargeCount ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer_transactions/' + profileInfo.id + '/recharges'}>
              { rechargeCount }
            </Link>
          </div>
        ) :
        (
          <div >
            { rechargeCount }
          </div>
        );

      const reservationHTML = ( reservationCount ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer_transactions/' + profileInfo.id + '/reservations'}>
              { reservationCount }
            </Link>
          </div>
        ) :
        (
          <div >
            { reservationCount }
          </div>
        );

      const cancellationHTML = ( cancellationCount ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer_transactions/' + profileInfo.id + '/cancellations'}>
              { cancellationCount }
            </Link>
          </div>
        ) :
        (
          <div >
            { cancellationCount }
          </div>
        );

      const consumerHistory = (
        <div className={styles.wd_60_link} >
          <Link to={'/hadmin/consumer_transactions/history/' + profileInfo.id }>
            { 'View' }
          </Link>
        </div>
      );

      const redemptionHTML = ( redemptionCount ) ?
        (
          <div className={styles.wd_60_link} >
            <Link to={'/hadmin/consumer_transactions/' + profileInfo.id + '/redemptions'}>
              { redemptionCount }
            </Link>
          </div>
        ) :
        (
          <div >
            { redemptionCount }
          </div>
        );

      getHtml = (
        <div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Consumer ID:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.id }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Name:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.full_name }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Email ID:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.email }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Email Verified:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.is_mail_verified ? 'True' : 'False' }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Gender:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.gender }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Date of Birth:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.dob }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Mobile Number:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.mobile_number }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Credits Available:
            </div>
            <div className={styles.wd_60} >
              { credits[0].sum }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Basic kyc updated date:
            </div>
            <div className={styles.wd_60} >
              { credits[0].basic_kyc_updated_date }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Current KYC Level
            </div>
            <div className={styles.wd_60} >
              { kycLevelHTML }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              KYC updated
            </div>
            <div className={styles.wd_60} >
              { profileInfo.kyc_updated ? 'Yes' : 'No' }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Device ID:
            </div>
            <div className={styles.wd_60} >
              { profileInfo.device.device_num }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Device History
            </div>
            <div className={styles.wd_60} >
              { deviceHtml }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Cart:
            </div>
            <div className={styles.wd_60} >
              { cartHtml }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              NotePad:
            </div>
            <div className={ styles.wd_60 }>
              { notepadHTML }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Statement of Account:
            </div>
            <div className={ styles.wd_60 }>
              { consumerHistory }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Recharge History:
            </div>
            <div className={ styles.wd_60 }>
              { rechargeHTML }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Reservation History:
            </div>
            <div className={ styles.wd_60 }>
              { reservationHTML }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Cancellation History:
            </div>
            <div className={ styles.wd_60 }>
              { cancellationHTML }
            </div>
          </div>
          <div className={styles.profile_information}>
            <div className={styles.wd_40}>
              Redemption History:
            </div>
            <div className={ styles.wd_60 }>
              { redemptionHTML }
            </div>
          </div>
        </div>
      );
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
                      {/*
                       <div className={styles.profile_action_button}>
                           <button className="form-control" id="reset_password" onClick={ this.resetHandler.bind(this) }>
                               Reset Password
                           </button>
                       </div>
                      */}
                       {/*
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
                       */}
                     </div>
              );
    } else if (ongoingRequest) {
      getHtml = <h4> requesting </h4>;
    }


    return (
      <div className={styles.profile_wrapper}>
        <BreadCrumb breadCrumbs={ this.breadCrumbs } />
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
  return {...state.profile, ongoingRequest: state.page_data.ongoingRequest };
};

const decoratedConnectedComponent = commonDecorator(ViewConsumerProfile);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
