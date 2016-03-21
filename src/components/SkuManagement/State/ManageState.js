import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertState } from '../Action';

class ManageState extends React.Component { // eslint-disable-line no-unused-vars
  onClickHandle() {
    // e.preventDefault();
    const stateName = document.querySelectorAll('[data-field-name="state_name"]')[0].value;
    const stateObj = {};
    stateObj.state_billing_id = 1;
    stateObj.state_name = stateName;
    stateObj.created_at = new Date().toISOString();
    stateObj.updated_at = new Date().toISOString();
    this.props.dispatch(insertState(stateObj));
  }
  render() {
    const styles = require('./StateManagement.scss');
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          <div className={styles.head_container}>
         		SKU Management / Create State
         	</div>
          <div className={styles.create_state_wrapper}>
            <p>
              Create State
            </p>
            <div className={styles.create_form}>
              <div className={styles.indiv_form}>
              	<label>State Name</label>
              	<input type="text" data-field-name="state_name" />
              </div>
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickHandle.bind(this)}>Create state</button>
            </div>
          </div>
        </div>
      );
  }
}

ManageState.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

export default connect(mapStateToProps)(ManageState);
