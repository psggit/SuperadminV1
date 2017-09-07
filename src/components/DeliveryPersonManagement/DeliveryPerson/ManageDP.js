import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updateStateText
} from './DPActions';

import ImageUpload from './ImageUpload';

import {
  TOGGLE_CITY_COMPONENT,
  CITY_INPUT_CHANGED,
  STATE_INPUT_CHANGED,
  fetchCities,
  fetchDP,
  fetchOrganisations,
  fetchRetailer,
  fetchAllRetailer,
  createDeliveryPerson,
  updateDeliveryPerson,
  RESET,
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  LICENSE_COPY_UPLOADED,
  LICENSE_COPY_CANCELLED,
  LICENSE_COPY_ERROR,
  PROOF_COPY_UPLOADED,
  PROOF_COPY_CANCELLED,
  PROOF_COPY_ERROR
} from './DPActions';
import commonDecorator from '../../Common/CommonDecorator';

class ManageDP extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* If On edit operation */
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(fetchCities()),
      this.props.dispatch(fetchRetailer()),
      this.props.dispatch(fetchAllRetailer()),
      this.props.dispatch(fetchOrganisations()),
    ])
    .then( () => {
      if (this.props.params.Id) {
        this.props.dispatch(fetchDP(parseInt(this.props.params.Id, 10)));
      }
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickSave() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(createDeliveryPerson())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  onClickUpdate() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(updateDeliveryPerson())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  /* Function to update the Fetched State of this component so that input field is editable */
  inputOnChange(e) {
    e.target.value = e.target.value;
    this.props.dispatch(updateStateText(e.target.value));
  }
  toggleCityComponent() {
    this.props.dispatch({ type: TOGGLE_CITY_COMPONENT });
  }
  storeCityInput(e) {
    const inputVal = e.target.getAttribute('data-field-name');
    this.props.dispatch({ type: CITY_INPUT_CHANGED, data: { 'key': inputVal, 'value': e.target.value } });
  }
  storeStateInput(e) {
    const inputVal = e.target.getAttribute('data-field-name');
    let value = e.target.value;
    const type = e.target.getAttribute('data-field-type');
    console.log(type);
    if (type === 'boolean') {
      value = Boolean(parseInt(value, 10));
    }
    if (type === 'int') {
      value = parseInt(value, 10);
    }
    this.props.dispatch({ type: STATE_INPUT_CHANGED, data: { 'key': inputVal, 'value': value } });
  }
  render() {
    const styles = require('./DPManagement.scss');

    const { ongoingRequest
      , lastError
      , image
      , proofimage
      , cities
      , attrs
      , retailers
    } = this.props;
    /* Handle Error */
    console.log(ongoingRequest);
    console.log(lastError);

    const citiesDropdownHtml = cities.map((city) => {
      return (<option value={city.id}> {city.name} </option>);
    });
    const retailersDropdownHtml = retailers.map((indiv) => {
      return (<option value={indiv.id}> {indiv.org_name} </option>);
    });
    const htmlContent = () => {
      return (
        <div className={styles.wrapper}>
          <div className={styles.head_container}>
          	DP Management / Create Delivery Person
          </div>
          <div className={styles.create_state_wrapper}>
            <p>
              Create Delivery Person
            </p>
            <div className={styles.create_form}>
            <p>
              EMPLOYEE INFO:
            </p>
              <div className={styles.indiv_form}>
              	<label>Employee Id:</label>
              	<input type="number" value={attrs.employee_id} data-field-name="employee_id" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Employee Name</label>
              	<input type="text" value={attrs.name} data-field-name="name" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Contact Number</label>
              	<input type="integer" value={attrs.contact_number} data-field-name="contact_number" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Date Of Birth</label>
              	<input type="date" value={attrs.dob} data-field-name="dob" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Nationality</label>
              	<input type="text" value={attrs.nationality} data-field-name="nationality" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>City</label>
                <select value={(attrs.city_id ? attrs.city_id.toString() : '')} data-field-name="city_id" data-field-type="int" onChange={ this.storeStateInput.bind(this) }>
                  <option>Select</option>
                    {citiesDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Branch</label>
                <select value={(attrs.branch ? attrs.branch.toString() : '')} data-field-name="branch" data-field-type="int" onChange={ this.storeStateInput.bind(this) }>
                  <option>Select</option>
                    {retailersDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Device Number</label>
              	<input value={attrs.device_num} type="Text" data-field-name="device_num" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Device Operator</label>
              	<input value={attrs.operator} type="Text" data-field-name="operator" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Email ID</label>
              	<input value={attrs.email_id} type="Text" data-field-name="email_id" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Is FreeLancer</label>
                <select value={(attrs.is_freelancer ? '1' : '0')} data-field-name="is_freelancer" data-field-type="boolean" onChange={ this.storeStateInput.bind(this) }>
                  <option>Select</option>
                  <option value="1"> True </option>
                  <option value="0"> False </option>
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Is Active</label>
                <select value={(attrs.is_active ? '1' : '0')} data-field-name="is_active" data-field-type="boolean" onChange={ this.storeStateInput.bind(this) }>
                  <option>Select</option>
                  <option value="1"> True </option>
                  <option value="0"> False </option>
                </select>
              </div>
            <p>
              EMPLOYEE ID'S:
            </p>
              <div className={styles.indiv_form}>
                <label>Proof Type</label>
                <input value={attrs.proof_type} type="Text" data-field-name="proof_type" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
                <label>Proof Text</label>
                <input value={attrs.proof_text} type="Text" data-field-name="proof_text" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Proof Image</label>
              	<textarea className="hide" value={ proofimage } data-field-name="proof_image" data-field-type="text"></textarea>
              </div>
              <div className={ styles.image_container }>
                  <ImageUpload imageUrl={proofimage ? proofimage : ''} elementId="proof_image" requestSuccess={PROOF_COPY_UPLOADED} requestError={ PROOF_COPY_ERROR } cancelImage={ PROOF_COPY_CANCELLED }/>
              </div>
            <p>

            </p>
            <p>
              VEHICLE INFORMATION:
            </p>
              <div className={styles.indiv_form}>
              	<label>Vehicle Number Registration</label>
              	<input value={attrs.vehicle_number_registration} type="Text" data-field-name="vehicle_number_registration" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Vehicle Type</label>
              	<input value={attrs.vehicle_type} type="Text" data-field-name="vehicle_type" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Driving License Number</label>
              	<input value={attrs.driving_license_number} type="Text" data-field-name="driving_license_number" onChange={ this.storeStateInput.bind(this) } />
              </div>
              <div className={styles.indiv_form}>
              	<label>Driver License Image</label>
              	<textarea className="hide" value={ image } data-field-name="driving_license_image" data-field-type="text"></textarea>
              </div>
              <div className={ styles.image_container }>
                  <ImageUpload imageUrl={image ? image : ''} elementId="license_image" requestSuccess={LICENSE_COPY_UPLOADED} requestError={ LICENSE_COPY_ERROR } cancelImage={ LICENSE_COPY_CANCELLED }/>
              </div>
             <button className={(this.props.params.Id ? 'hide ' : 'show ' ) + styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickSave.bind(this)}>Create</button>
             <button className={(this.props.params.Id ? 'show ' : 'hide ' ) + styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickUpdate.bind(this)}>Update</button>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      );
    }();
    // Bool
    // Drop Down
    // Image
    // Check if there are any results, if yes show edit state page else show create state
    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
        <div className={styles.container}>
          { htmlContent }
        </div>
      );
  }
}

ManageDP.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hideCityComponent: PropTypes.bool.isRequired,
  cities: PropTypes.object.isRequired,
  retailers: PropTypes.object.isRequired,
  attrs: PropTypes.object.isRequired,
  cityInput: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  proofimage: PropTypes.string.isRequired,
  cityGPS: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  isAvailable: PropTypes.string.isRequired,
  isDeliverable: PropTypes.string.isRequired,
  isCityEdit: PropTypes.bool.isRequired,
  isCityLocal: PropTypes.bool.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  fromDB: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.deliveryPersonState};
};

export default connect(mapStateToProps)(commonDecorator(ManageDP));
