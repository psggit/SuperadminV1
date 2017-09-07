import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchWorkTimes, SCHEDULE_TIME, updateOperationTimes, UPDATE_TIME, RESET, REQUEST_COMPLETED, MAKE_REQUEST } from './DeliveryConstraintsManagementActions';
import formValidator from '../Common/CommonFormValidator';

import commonDecorator from '../Common/CommonDecorator';
import BreadCrumb from '../Common/BreadCrumb';

class ConfigureWorkTimes extends React.Component { // eslint-disable-line no-unused-vars
  constructor() {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Delivery Constraint Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: '1',
      sequence: 2,
      link: '#'
    });
  }
  componentDidMount() {
    /* If On edit operation */
    let CategoryId = this.props.params.Id;
    CategoryId = parseInt(CategoryId, 10);
    Promise.all([
      this.props.dispatch( { type: MAKE_REQUEST } ),
      this.props.dispatch(fetchWorkTimes(CategoryId))
    ]).then( () => {
      this.props.dispatch( { type: REQUEST_COMPLETED } );
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  updateConstraint() {
    this.props.dispatch(updateOperationTimes());
  }
  /* Function to update the Fetched Category of this component so that input field is editable */
  inputOnChange(e) {
    this.props.dispatch({ type: UPDATE_TIME, data: {index: e.target.getAttribute('data-field-index'), value: e.target.value, type: e.target.getAttribute('data-field-name')}});
  }
  render() {
    const styles = require('./DeliveryConstraints.scss');

    const { ongoingRequest,
      lastError
    } = this.props;
    console.log(ongoingRequest);
    console.log(lastError);
    const templateBody = this.props.workTime.map((dat, index) => {
      return (
              <tr>
                <td>
                  {dat.weekday.day}
                </td>
                <td>
                	<input type="time" value={ dat.start_time.split('+')[0] } data-field-id={ dat.id } data-field-index={index} data-field-name="start_time" data-field-type="text" onChange={ this.inputOnChange.bind(this) } />
                </td>
                <td>
                	<input type="time" value={ dat.end_time.split('+')[0] } data-field-id={ dat.id } data-field-index={index} data-field-name="end_time" data-field-type="end_time" onChange={ this.inputOnChange.bind(this) } />
                </td>
                <td>
                  {(dat.is_active ? 'Active' : 'InActive')}
                </td>
                <td>
                  {(dat.is_active ? <button> Deactivate </button> : <button> InActivate </button> )}
                </td>
              </tr>
      );
    });

    const htmlContent = () => {
      return (
        <div className={styles.delivery_container}>
          <div className={styles.wrapper}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <div className={styles.create_state_wrapper}>
              <table>
                <thead>
                <tr>
                  <th>
                    Day
                  </th>
                  <th>
                    Start Time
                  </th>
                  <th>
                    End Time
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                  </th>
                </tr>
                </thead>
                <tbody>
                {templateBody}
                </tbody>
              </table>
              <button className={styles.common_btn + ' ' + styles.create_btn } onClick={this.updateConstraint.bind(this)}>Update</button>
            </div>
          </div>
        </div>
        );
    }();
    return (
        <div className={styles.container}>
          { htmlContent }
        </div>
      );
  }
}

ConfigureWorkTimes.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired,
  workTime: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data, ...state.deliveryConstraintsManagmentState};
};

const decoratedOne = formValidator(ConfigureWorkTimes, 'data-field-name', 'data-field-type', SCHEDULE_TIME);

const decoratedConnectedComponent = commonDecorator(decoratedOne);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
