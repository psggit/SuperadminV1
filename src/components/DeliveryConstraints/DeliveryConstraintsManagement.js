import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateConstraints, fetchGenre, INPUT_VALUE_CHANGED, insertCategory, fetchConstraints, fetchCityName, RESET, REQUEST_COMPLETED, MAKE_REQUEST } from './DeliveryConstraintsManagementActions';

import formValidator from '../Common/CommonFormValidator';

import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

class DeliveryConstraintsManagement extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Delivery Constraint Management',
      sequence: 1,
      link: '#'
    });
  }
  componentDidMount() {
    /* If On edit operation */
    let CId = this.props.params.Id;
    if (CId) {
      CId = parseInt(CId, 10);
      Promise.all([
        this.props.dispatch( { type: MAKE_REQUEST } ),
        this.props.dispatch(fetchConstraints(CId)),
        this.props.dispatch(fetchCityName(CId))
      ]).then( () => {
        this.props.dispatch( { type: REQUEST_COMPLETED } );
      });
    } else {
      this.props.dispatch(fetchGenre());
    }
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  createCategory() {
    this.props.dispatch(insertCategory());
  }
  updateConstraints() {
    this.props.dispatch(updateConstraints());
  }
  inputOnChange(e) {
    e.target.value = e.target.value;
  }
  render() {
    const styles = require('./CategoryManagement.scss');

    const { ongoingRequest,
      lastError,
      city,
      constraints
    } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);

    const htmlContent = () => {
      return (
          <div className={styles.wrapper}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <div className={styles.create_state_wrapper}>
              <p>
                Edit Delivery Constraints ({city.name})
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                	<label>Maximum Outlet Distance (KM) : </label>
                	<input type="number" value={ constraints.max_outlet_distance} data-field-name="max_outlet_distance" data-field-type="int" />
                </div>
                <div className={styles.indiv_form}>
                	<label>Maximum Delivery Person Distance (KM) : </label>
                	<input type="number" value={ constraints.max_dp_distance } data-field-name="max_dp_distance" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Delivery Charge (Rs.) : </label>
                	<input type="number" value={ constraints.delivery_charge } data-field-name="delivery_charge" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Cancellation Charge After Pick Up(Rs.) : </label>
                	<input type="number" value={ constraints.cancellation_charge_after_pickup } data-field-name="cancellation_charge_after_pickup" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Cancellation Charge Before pickup (Rs.) : </label>
                	<input type="number" value={ constraints.cancellation_charge_before_pickup } data-field-name="cancellation_charge_before_pickup" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Delivery Accept Before : </label>
                	<input type="number" value={ constraints.delivery_accept_before } data-field-name="delivery_accept_before" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Delivery Available : </label>
                	<select value = { constraints.delivery_available ? '1' : '0' } data-field-name="delivery_available" data-field-type="boolean" onChange={ () => { return true; } }>
                		<option value="1">True</option>
                		<option value="0">False</option>
                	</select>
                </div>
                <div className={styles.indiv_form}>
                	<label>Delivery Person Pool Length : </label>
                	<input type="number" value={ constraints.dp_pool_length } data-field-name="dp_pool_length" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Maximum Estimated Delivery Time (Minutes) : </label>
                	<input type="number" value={ constraints.max_est_del_time } data-field-name="max_est_del_time" data-field-type="text" onChange={ () => { return true; } } />
                </div>
                <div className={styles.indiv_form}>
                	<label>Delivery Person Waiting Time(Minutes) : </label>
                	<input type="number" value={ constraints.dp_waiting_time } data-field-name="dp_waiting_time" data-field-type="int" onChange={ () => { return true; } } />
                </div>
                <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.updateConstraints.bind(this)}>Update</button>
              </div>
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

DeliveryConstraintsManagement.propTypes = {
  params: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  constraints: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.deliveryConstraintsManagmentState };
};

const decoratedOne = formValidator(DeliveryConstraintsManagement, 'data-field-name', 'data-field-type', INPUT_VALUE_CHANGED);

const decoratedConnectedComponent = commonDecorator(decoratedOne);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
