import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ADD_ROLE, REMOVE_ROLE, INPUT_CHANGED, getRolesData, createUser } from './CreateUserAction';

import TableHeader from '../../../Common/TableHeader';

class CreateUserDetails extends Component { // eslint-disable-line no-unused-vars
  componentWillMount() {
    this.props.dispatch(getRolesData());
  }
  onCreateClick() {
    this.props.dispatch(createUser());
  }
  addRole() {
    this.props.dispatch({'type': ADD_ROLE, data: {'value': document.querySelector('[data-field-name="roles"]').value}});
  }
  removeRole() {
    this.props.dispatch({'type': REMOVE_ROLE, data: {'value': document.querySelector('[data-field-name="applied-roles"]').value}});
  }
  inputEditHandler(e) {
    const keyName = e.target.getAttribute('data-field-name');
    const value = e.target.value;
    this.props.dispatch({'type': INPUT_CHANGED, data: {'value': value, 'key': keyName}});
  }
  render() {
    const styles = require('./CreateUser.scss');

    const { Id: userId } = this.props.params;
    const { operationUserData } = this.props;
    let selectVal = '';
    selectVal = (operationUserData) ? operationUserData.userData.is_active : true;
    const roleOptions = operationUserData.availableRoles.map((indiv) => {
      if (operationUserData.userData.roles.indexOf(indiv) === -1) {
        return (
          <option value={indiv} >{indiv}</option>
        );
      }
    });
    const appliedRoleOptions = operationUserData.userData.roles.map((indiv) => {
      return (
        <option value={indiv} >{indiv}</option>
      );
    });
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <TableHeader title={'Consumer/Profile/' + userId + '/Edit'} />
        <div className={styles.edit_account_details_container}>
          <div className={styles.account_details_form}>
            <label className={styles.heading}>Edit Account Details</label>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Email</label>
              <input type="text" data-field-name="email" value={ (operationUserData) ? operationUserData.userData.email : '' } onChange={ this.inputEditHandler.bind(this) }/>
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>User Name</label>
              <input type="text" data-field-name="username" value={ (operationUserData) ? operationUserData.userData.username : '' } onChange={ this.inputEditHandler.bind(this) }/>
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Mobile</label>
              <input data-field-name="mobile" type="text" value={ (operationUserData) ? operationUserData.userData.mobile : ''} onChange={ this.inputEditHandler.bind(this) } />
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Password</label>
              <input data-field-name="password" type="text" value={ (operationUserData) ? operationUserData.userData.password : ''} onChange={ this.inputEditHandler.bind(this) } />
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Roles</label>
              <select data-field-name="roles">
                  { roleOptions }
              </select>
              <div onClick={ this.addRole.bind(this) }> + Add Selected Role</div>
            </div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Applied Roles</label>
              <select data-field-name="applied-roles">
                  { appliedRoleOptions }
              </select>
              <div onClick={ this.removeRole.bind(this) }> - Remove Selected Applied Role</div>
            <div className={styles.indiv_form + ' ' + styles.wd_100}>
              <label>Activate User</label>
              <select onChange={ this.inputEditHandler.bind(this) } data-field-name="is_active">
                  <option value="true" selected={ (selectVal === true ) ? true : false } >True</option>
                  <option value="false" selected={ (selectVal === false ) ? true : false }>False</option>
              </select>
            </div>
            <div className="clearfix"></div>
            <button className={styles.update_user_btn} onClick={this.onCreateClick.bind(this)}>Create User</button>
            </div>
          </div>
        </div>
      </div>);
  }
}

CreateUserDetails.propTypes = {
  ongoingRequest: PropTypes.bool.isRequired,
  operationUserData: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(CreateUserDetails);
