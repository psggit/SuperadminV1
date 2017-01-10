import React, { PropTypes, Component } from 'react';
import BarDetailsComponent from './BarDetailsComponent';
import { connect } from 'react-redux';
import DeviceWrapper from './DeviceWrapper';

import BreadCrumb from '../../Common/BreadCrumb';

import commonDecorator from '../../Common/CommonDecorator';

import { fetchStateCity } from '../../Common/Actions/StateCityData';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../Common/Actions/Actions';

import {
  getOrganisation,
  saveBarDetail,
  updateBarDetail,
  getBarData,
  RESET_BAR
} from './BarData';

import {
  deleteDevice,
  updateDevice,
  createDevice,
  createDeviceLocal,
  updateDeviceLocal,
  deleteDeviceLocal,
  RESET_DEVICE,
  fetchDevice
} from './DeviceAction';

class CreateBar extends Component { // eslint-disable-line no-unused-vars
  constructor( props ) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Bar Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: ( props.params.brId ? 'Edit ' : 'Create ' ) + ' Bar',
      sequence: 2,
      link: '#'
    });

    if ( props.params.brId ) {
      this.breadCrumbs.push({
        title: props.params.brId,
        sequence: 3,
        link: '#'
      });
    }
  }
  componentDidMount() {
    const brId = this.props.params.brId;
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( fetchStateCity() ),
      this.props.dispatch( getOrganisation() ),
      ( brId ? ( this.props.dispatch(getBarData( brId ) )) : Promise.resolve() ),
      (
      brId ?
        Promise.all([
          this.props.dispatch( fetchDevice( brId ) )
        ])
        :
        Promise.resolve()
      )
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET_BAR }),
      this.props.dispatch({ type: RESET_DEVICE })
    ]);
  }
  saveBar() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( saveBarDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  updateBar() {
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST }),
      this.props.dispatch( updateBarDetail())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }
  createDevice() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(createDevice())
    ])
    .then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED });
    });
  }

  deleteDevice() {
    this.props.dispatch(deleteDevice());
  }
  updateDevice() {
    this.props.dispatch(updateDevice());
  }

  createDeviceLocal() {
    this.props.dispatch(createDeviceLocal());
  }
  deleteDeviceLocal() {
    this.props.dispatch(deleteDeviceLocal());
  }
  updateDeviceLocal() {
    this.props.dispatch(updateDeviceLocal());
  }

  render() {
    const styles = require('./CreateBar.scss');

    const {
      ongoingRequest,
      genStateData,
      dispatch,
      barData
    } = this.props;

    const { organisationData
      , barContact
      , barAccountRegistered
      , barDetail
      , isBrEdit
    } = barData;

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837

    const actionButton = !this.props.params.brId ? (
      <button className={styles.edit_bar_btn} onClick={ this.saveBar.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Saving' : 'Save' ) }
      </button>
    ) : (
      <button className={styles.edit_bar_btn} onClick={ this.updateBar.bind(this) } disabled = { ( ongoingRequest ? true : false )} >
        { ( ongoingRequest ? 'Updating' : 'Update' )}
      </button>
    );

    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.bar_wrapper}>
          <div className={styles.wd_100}>
            <BarDetailsComponent
      organisationData = { organisationData }
      barContact = { barContact }
      barAccountRegistered = { barAccountRegistered }
      barDetail = { barDetail }
      genStateData = { genStateData }
      dispatch = { dispatch }
        />
          </div>
          <div className="clearfix"></div>

          <div className={ isBrEdit ? '' : 'hide' }>
            <DeviceWrapper
        { ...this.props }
        createDevice={ this.createDevice.bind(this) }
        updateDevice={ this.updateDevice.bind(this) }
        deleteDevice={ this.deleteDevice.bind(this) }
        createDeviceLocal = { this.createDeviceLocal.bind(this) }
        updateDeviceLocal = { this.updateDeviceLocal.bind(this) }
        deleteDeviceLocal = { this.deleteDeviceLocal.bind(this) }
          />
          </div>
          { actionButton }
        </div>
      </div>);
  }
}

CreateBar.propTypes = {
  params: PropTypes.object.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  barData: PropTypes.object.isRequired,
  genStateData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => {
  return { ...state.bar_data, ...state.page_data };
};

const decoratedComponent = commonDecorator(CreateBar);

export default connect(mapStateToProps)(decoratedComponent);
