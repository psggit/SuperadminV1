import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getConsumerData, updateName, updateDob, updateUser} from './EditAction';

import TableHeader from '../../../Common/TableHeader';

class EditAccountDetails extends Component { // eslint-disable-line no-unused-vars
  componentWillMount() {
    let { Id: userId } = this.props.params;

    if (userId) {
      userId = parseInt(userId, 10);
      this.props.dispatch(getConsumerData(userId));
    } else {
      console.log('Raise an error');
    }
  }
  onUpdateClick() {
    const fullName = document.querySelectorAll('[data-field-name="full_name"]')[0].value;
    const dob = document.querySelectorAll('[data-field-name="dob"]')[0].value;
    const gender = document.querySelectorAll('[data-field-name="gender"] option:checked')[0].value;
    const updateObj = {};
    let { Id: userId } = this.props.params;
    userId = parseInt(userId, 10);
    updateObj.values = {
      'full_name': fullName,
      'dob': dob,
      'gender': gender
    };
    updateObj.where = {
      'id': userId
    };
    updateObj.returning = ['id'];

    this.props.dispatch(updateUser(updateObj, userId));
  }
  inputEditHandler(e) {
    const functionMap = {};
    const keyName = e.target.getAttribute('data-field-name');
    const value = e.target.value;
    functionMap.full_name = updateName;
    functionMap.dob = updateDob;

    this.props.dispatch(functionMap[keyName](value));
  }
  render() {
    const styles = require('./EditAccountDetails.scss');

    const { Id: userId } = this.props.params;
    let { userData } = this.props;
    let selectVal = '';
    userData = userData[0];
    selectVal = (userData) ? userData.gender : 'N/A';
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <TableHeader title={'Consumer/Profile/' + userId + '/Edit'} />
        <div className={styles.edit_account_details_container}>
          <div className={styles.account_details_form}>
            <label className={styles.heading}>Edit Account Details</label>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Name</label>
              <input type="text" data-field-name="full_name" value={ (userData) ? userData.full_name : '' } onChange={ this.inputEditHandler.bind(this) }/>
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Date of Birth</label>
              <input data-field-name="dob" type="text" value={ (userData) ? userData.dob : ''} onChange={ this.inputEditHandler.bind(this) } />
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Gender</label>
              <select data-field-name="gender">
                  <option value="male" selected={ (selectVal === 'male') ? true : false } >Male</option>
                  <option value="female" selected={ (selectVal === 'female') ? true : false }>Female</option>
              </select>
            </div>
            <div className="clearfix"></div>
            <button className={styles.update_user_btn} onClick={this.onUpdateClick.bind(this)}>Update user</button>
          </div>
        </div>
      </div>);
  }
}

EditAccountDetails.propTypes = {
  ongoingRequest: PropTypes.bool.isRequired,
  userData: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {...state.user_data, ...state.page_data };
};

export default connect(mapStateToProps)(EditAccountDetails);
