import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updateStateText
} from './DPActions';

import { validation } from '../../Common/Actions/Validator';

import {
  TOGGLE_CITY_COMPONENT,
  CITY_INPUT_CHANGED,
  STATE_INPUT_CHANGED,
  STORE_CITY_LOCAL,
  EDIT_CITY,
  EDIT_SERVER_CITY,
  UPDATE_CITY_LOCAL,
  DELETE_CITY_LOCAL,
  saveState,
  fetchCities,
  fetchOrganisations,
  fetchRetailer,
  fetchAllRetailer,
  saveCity,
  disableCity,
  enableCityDelivery,
  updateStateSaveCity,
  RESET,
  deleteCity,
  MAKE_REQUEST,
  REQUEST_COMPLETED
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
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  onClickEdit() {
    /*
    const stateName = document.querySelectorAll('[data-field-name="state_name"]')[0].value;
    const stateId = parseInt(e.target.getAttribute('data-state-id'), 10);
    const stateObj = {};
    stateObj.values = {};
    stateObj.values.state_name = stateName;
    stateObj.returning = ['id'];
    */
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(updateStateSaveCity())
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
    console.log('!!!!!!!!!!!!!!!!!!!');
    console.log(CITY_INPUT_CHANGED);
    console.log(this.props);
    this.props.dispatch({ type: CITY_INPUT_CHANGED, data: { 'key': inputVal, 'value': e.target.value } });
  }
  storeStateInput(e) {
    const inputVal = e.target.getAttribute('data-field-name');
    this.props.dispatch({ type: STATE_INPUT_CHANGED, data: { 'key': inputVal, 'value': e.target.value } });
  }
  saveCityToLocal() {
    const listOfValidation = [];
    listOfValidation.push(validation(this.props.cityInput, 'non_empty_text'));
    listOfValidation.push(validation(this.props.cityGPS, 'gps'));
    Promise.all(listOfValidation
    ).then(() => {
      this.props.dispatch({ type: STORE_CITY_LOCAL });
    });
  }
  updateCityToLocal() {
    this.props.dispatch({ type: UPDATE_CITY_LOCAL});
  }
  toggleCityToServer() {
    this.props.dispatch(disableCity(this.props.cityId, !(this.props.isAvailable), this.props.fromDB[0].id));
  }
  toggleDeliveryToServer() {
    this.props.dispatch(enableCityDelivery(this.props.cityId, !(this.props.isDeliverable), this.props.fromDB[0].id));
  }
  updateCityToServer() {
    /* Check for no Data */
    this.props.dispatch(saveCity(this.props.cityId, this.props.cityInput, this.props.cityGPS, this.props.fromDB[0].id));
  }
  deleteCityServer() {
    this.props.dispatch(deleteCity(this.props.cityId, this.props.cityInput, this.props.fromDB[0].id));
  }
  deleteCityLocal() {
    this.props.dispatch({ type: DELETE_CITY_LOCAL});
  }
  editCity(e) {
    this.props.dispatch({ type: EDIT_CITY, data: {
      'type': e.target.getAttribute('data-type'),
      'id': e.target.getAttribute('data-city-id')
    }});
  }
  editServerCity(e) {
    console.log('AAAAH');
    this.props.dispatch({ type: EDIT_SERVER_CITY, data: {
      'type': e.target.getAttribute('data-type'),
      'id': e.target.getAttribute('data-city-id'),
      'isAvailable': (e.target.getAttribute('data-is-available') === 'true' ? true : false),
      'isDeliverable': (e.target.getAttribute('data-is-deliverable') === 'true' ? true : false),
      'name': e.target.getAttribute('data-city-name'),
      'gps': e.target.getAttribute('data-city-gps')
    }});
  }
  saveCurrentState() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(saveState(this.props))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./DPManagement.scss');

    const { ongoingRequest
      , lastError
      , stateInput
      , cities
      , allRetailers
      , retailers
      , organisations
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
    const allRetailersDropdownHtml = allRetailers.map((indiv) => {
      return (<option value={indiv.id}> {indiv.org_name} </option>);
    });
    const organisationsDropdownHtml = organisations.map((indiv) => {
      return (<option value={indiv.id}> {indiv.name} </option>);
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
              <div className={styles.indiv_form}>
              	<label>Employee Id</label>
              	<input type="integer" data-field-name="employee_id" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Employee Name</label>
              	<input type="text" data-field-name="name" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Contact Number</label>
              	<input type="integer" data-field-name="contact_number" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>City</label>
                <select data-field-name="city_id" data-field-type="city_id">
                  <option>Select</option>
                    {citiesDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Organisations</label>
                <select data-field-name="city_id" data-field-type="city_id">
                  <option>Select</option>
                    {organisationsDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Retailers</label>
                <select data-field-name="city_id" data-field-type="city_id">
                  <option>Select</option>
                    {retailersDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>All Retailer</label>
                <select data-field-name="city_id" data-field-type="city_id">
                  <option>Select</option>
                    {allRetailersDropdownHtml}
                </select>
              </div>
              <div className={styles.indiv_form}>
              	<label>Device Number</label>
              	<input type="integer" data-field-name="device_number" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>ReEnter Device Number</label>
              	<input type="integer" data-field-name="contact_number" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Mobile Number</label>
              	<input type="integer" data-field-name="contact_number" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Device Operator</label>
              	<input type="Text" data-field-name="contact_number" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
             <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.onClickEdit.bind(this)}>Create</button>
            </div>
          </div>
          <div className="clearfix"></div>
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

ManageDP.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hideCityComponent: PropTypes.bool.isRequired,
  cities: PropTypes.object.isRequired,
  retailers: PropTypes.object.isRequired,
  allRetailers: PropTypes.object.isRequired,
  organisations: PropTypes.object.isRequired,
  cityInput: PropTypes.string.isRequired,
  cityGPS: PropTypes.string.isRequired,
  stateInput: PropTypes.string.isRequired,
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
