import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { insertState, fetchState, updateState, updateStateText, resetState} from '../Action';

class ManageState extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* If On edit operation */
    let stateId = this.props.params.Id;
    if (stateId) {
      stateId = parseInt(stateId, 10);
      this.props.dispatch(fetchState(stateId));
    } else {
      this.props.dispatch(resetState());
    }
  }
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
  onClickEdit(e) {
    const stateName = document.querySelectorAll('[data-field-name="state_name"]')[0].value;
    const stateId = parseInt(e.target.getAttribute('data-state-id'), 10);
    const stateObj = {};
    stateObj.values = {};
    stateObj.values.state_name = stateName;
    stateObj.returning = ['id'];
    this.props.dispatch(updateState(stateObj, stateId));
  }
  /* Function to update the Fetched State of this component so that input field is editable */
  inputOnChange(e) {
    e.target.value = e.target.value;
    this.props.dispatch(updateStateText(e.target.value));
  }
  render() {
    const styles = require('./StateManagement.scss');

    const { ongoingRequest, lastError, lastSuccess } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);

    const htmlContent = () => {
      if (lastSuccess.length > 0) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.head_container}>
            	SKU Management / Edit State
            </div>
            <div className={styles.create_state_wrapper}>
              <p>
                Edit State
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                	<label>State Name</label>
                	<input type="text" data-field-name="state_name" onChange={this.inputOnChange.bind(this)} value={lastSuccess[0].state_name} />
                </div>
                {/*
                <div className={styles.indiv_form}>
                	<label>Status</label>
                	<select>
                		<option>Pending</option>
                	</select>
                </div>
                */}
                <button className={styles.common_btn + ' ' + styles.create_btn } data-state-id={lastSuccess[0].id} onClick={this.onClickEdit.bind(this)}>Edit state</button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={styles.wrapper}>
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
              {/*
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickHandle.bind(this)} disabled={ongoingRequest ? true : false}>Create state</button>
              */}
            </div>
          </div>
          <div className="clearfix"></div>
          <div className={styles.city_wrapper}>
            <p>CITIES</p>
            <label className={styles.add_new_btn}>+ Add New</label>
            <ul>
              <li>
                <label>Chennai</label>
                <p>3 Cities</p>
              </li>
            </ul>
          </div>
          <div className={styles.add_city_wrapper}>
            <p>Add New City</p>
            <div className={styles.input_form}>
              <label>City Name</label>
              <input type="text"/>
            </div>
            <div className={styles.user_actions}>
              <button className={styles.cancel_btn + ' ' + styles.common_btn}>Cancel</button>
              <button className={styles.save_btn + ' ' + styles.common_btn}>Save</button>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className={styles.save_lay}>
            <button className={styles.common_btn + ' ' + styles.create_btn }>Save state</button>
          </div>
        </div>
      );
    }();
    // Check if there are any results, if yes show edit state page else show create state
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          { htmlContent }
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
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data};
};

export default connect(mapStateToProps)(ManageState);
