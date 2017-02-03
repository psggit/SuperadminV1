import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updateStateText
  , resetState
} from '../Action';

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
  fetchState,
  saveCity,
  updateStateSaveCity,
  RESET,
  deleteCity,
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from './StateActions';

import commonDecorator from '../../Common/CommonDecorator';

class ManageState extends React.Component { // eslint-disable-line no-unused-vars
  componentDidMount() {
    /* If On edit operation */
    let stateId = this.props.params.Id;
    if (stateId) {
      stateId = parseInt(stateId, 10);
      Promise.all([
        this.props.dispatch({ type: MAKE_REQUEST }),
        this.props.dispatch(fetchState(stateId)),
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    } else {
      this.props.dispatch(resetState());
    }
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
    this.props.dispatch({ type: EDIT_SERVER_CITY, data: {
      'type': e.target.getAttribute('data-type'),
      'id': e.target.getAttribute('data-city-id'),
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
    const styles = require('./StateManagement.scss');

    const { ongoingRequest
      , lastError
      , fromDB
      , hideCityComponent
      , cities
      , cityInput
      , cityGPS
      , isCityEdit
      , isCityLocal
      , stateInput
      , shortName
    } = this.props;
    /* Handle Error */
    console.log(ongoingRequest);
    console.log(lastError);

    const cityObjs = Object.keys(cities).map(
        (city) => {
          return (
                <li key={ city } data-city-id={ city } type="local">
                  <label data-city-id={ city } data-type="local"> { cities[city].cityInput } </label>
                  <p data-city-name={ cities[city].cityInput } data-city-id={ city } data-type="local" onClick={ this.editCity.bind(this) }>(Unsaved) Edit</p>
                  {/*
                  <p>3 Cities</p>
                  */}
                </li>
              );
        });

    const htmlContent = () => {
      if (fromDB.length > 0) {
        const serverCities = fromDB[0].cities;
        let serverCityObjs = [];
        serverCityObjs = serverCities.map((sCity) => {
          return (
                <li key={ sCity.id } data-city-id={ sCity.id} type="server">
                  <label data-city-id={ sCity.id} data-type="server"> { sCity.name } </label>
                  <p data-city-name={ sCity.name } data-city-id={ sCity.id } data-city-gps={ sCity.gps } data-type="server" onClick={ this.editServerCity.bind(this) }>Edit</p>
                  {/*
                  <p>3 Cities</p>
                  */}
                </li>
              );
        });
        cityObjs.map( (cityObj) => {
          return serverCityObjs.push(cityObj);
        });

        return (
          <div className={styles.wrapper}>
            <div className={styles.head_container}>
            	SKU Management / Edit State
            </div>
            <div className={styles.create_state_wrapper}>
              <p>
                Save Changes
              </p>
              <div className={styles.create_form}>
                <div className={styles.indiv_form}>
                	<label>State Name</label>
                	<input type="text" data-field-name="stateInput" onChange={this.storeStateInput.bind(this)} value={stateInput} />
                </div>
              <div className={styles.indiv_form}>
              	<label>Short Name</label>
              	<input maxLength={2} type="text" data-field-name="shortName" onChange={ this.storeStateInput.bind(this) } value={ shortName } />
              </div>
                {/*
                <div className={styles.indiv_form}>
                	<label>Status</label>
                	<select>
                		<option>Pending</option>
                	</select>
                </div>
                */}

              </div>
            </div>
            <div className="clearfix"></div>
            <div className={styles.city_wrapper}>
              <p>CITIES</p>
              <label className={styles.add_new_btn} onClick={ this.toggleCityComponent.bind(this) }>+ Add New</label>
              <ul>
                { serverCityObjs }
              </ul>
            </div>
            <div className={styles.add_city_wrapper + (( hideCityComponent ) ? ' hide' : '') }>
              <p >Add New City</p>
              <div className={styles.input_form}>
                <label>City Name</label>
                <input type="text" data-field-name="cityInput" onChange={ this.storeCityInput.bind(this) } value= { cityInput } />
              </div>
              <div className={styles.input_form}>
                <label>City GPS</label>
                <input type="text" data-field-name="cityGPS" onChange={ this.storeCityInput.bind(this) } value= { cityGPS } />
              </div>
              { (!isCityEdit ?
                (
                  <div className={styles.user_actions}>
                    <button className={styles.cancel_btn + ' ' + styles.common_btn} onClick={ this.toggleCityComponent.bind(this) } >Cancel</button>
                    <button className={styles.save_btn + ' ' + styles.common_btn} onClick={ this.saveCityToLocal.bind(this) } >Save</button>
                  </div>
                )
                :
                (
                  <div className={styles.user_actions}>
                    <button data-city-local= { isCityLocal } className={styles.cancel_btn + ' ' + styles.common_btn} onClick={ isCityLocal ? this.deleteCityLocal.bind(this) : this.deleteCityServer.bind(this) } >Delete</button>
                    <button data-city-local= { isCityLocal } className={styles.save_btn + ' ' + styles.common_btn} onClick={ isCityLocal ? this.updateCityToLocal.bind(this) : this.updateCityToServer.bind(this) } >Update</button>
                  </div>
                ))
              }
            </div>
            <div className="clearfix"></div>
            <div className={styles.save_lay}>
              {/*
              <button onClick={ this.saveCurrentState.bind(this) } className={styles.common_btn + ' ' + styles.create_btn }>Save state</button>
              */}
             <button className={styles.common_btn + ' ' + styles.create_btn } data-state-id={fromDB[0].id} onClick={this.onClickEdit.bind(this)}>Edit state</button>
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
              	<input type="text" data-field-name="stateInput" onChange={ this.storeStateInput.bind(this) } value={ stateInput }/>
              </div>
              <div className={styles.indiv_form}>
              	<label>Short Name</label>
              	<input type="text" maxLength={2} data-field-name="shortName" onChange={ this.storeStateInput.bind(this) } value={ shortName }/>
              </div>
              {/*
              <div className={styles.indiv_form}>
              	<label>Status</label>
              	<select>
              		<option>Pending</option>
              	</select>
              </div>
              */}
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="hide">
            <p>CITIES</p>
            <label className={styles.add_new_btn} onClick={ this.toggleCityComponent.bind(this) }>+ Add New</label>
            <ul>
              { cityObjs }
            </ul>
          </div>
          <div className={styles.add_city_wrapper + (( hideCityComponent ) ? ' hide' : '') }>
            <p >Add New City</p>
            <div className={styles.input_form}>
              <label>City Name</label>
              <input type="text" data-field-name="cityInput" onChange={ this.storeCityInput.bind(this) } value= { cityInput } />
            </div>
            <div className={styles.input_form}>
              <label>City GPS</label>
              <input type="text" data-field-name="cityGPS" onChange={ this.storeCityInput.bind(this) } value= { cityGPS } />
            </div>
            { (!isCityEdit ?
              (
                <div className={styles.user_actions}>
                  <button className={styles.cancel_btn + ' ' + styles.common_btn} onClick={ this.toggleCityComponent.bind(this) } >Cancel</button>
                  <button className={styles.save_btn + ' ' + styles.common_btn} onClick={ this.saveCityToLocal.bind(this) } >Save 1</button>
                </div>
              )
              :
              (
                <div className={styles.user_actions}>
                  <button className={styles.cancel_btn + ' ' + styles.common_btn} onClick={ this.deleteCityLocal.bind(this) } >Delete</button>
                  <button className={styles.save_btn + ' ' + styles.common_btn} onClick={ this.updateCityToLocal.bind(this) } >Update</button>
                </div>
              ))
            }
          </div>
          <div className="clearfix"></div>
          <div className={styles.save_lay}>
            <button onClick={ this.saveCurrentState.bind(this) } className={styles.common_btn + ' ' + styles.create_btn }>Save state</button>
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
  hideCityComponent: PropTypes.bool.isRequired,
  cities: PropTypes.object.isRequired,
  cityInput: PropTypes.string.isRequired,
  cityGPS: PropTypes.string.isRequired,
  stateInput: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  isCityEdit: PropTypes.bool.isRequired,
  isCityLocal: PropTypes.bool.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  fromDB: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.sku_data, ...state.state_data, ...state.page_data};
};

export default connect(mapStateToProps)(commonDecorator(ManageState));
