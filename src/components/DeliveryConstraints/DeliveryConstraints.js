import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {
  getAllDeliveryConstraints
} from './DeliveryConstraintsActions';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../Common/Actions/Actions';
import BreadCrumb from '../Common/BreadCrumb';

import commonDecorator from '../Common/CommonDecorator';

class DeliveryConstraints extends Component {
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
  componentWillMount() {
    console.log('Will mount called');
  }
  componentDidMount() {
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getAllDeliveryConstraints())
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({ type: RESET })
    ]);
  }

  render() {
    const styles = require('./DeliveryConstraints.scss');
    const templateBody = this.props.deliverableCities.map((dat) => {
      return (
              <tr>
                <td>
                  {dat.name}
                </td>
                <td>
                  <Link to={'/hadmin/delivery_constraints/edit/' + dat.id }>
                    <button> Edit </button>
                  </Link>
                </td>
                <td>
                  <Link to={'/hadmin/work_times/edit/' + dat.id }>
                    <button> Edit </button>
                  </Link>
                </td>
                <td>
                  <Link to={'/hadmin/holidays/edit/' + dat.id }>
                    <button> Add </button>
                  </Link>
                </td>
              </tr>
      );
    });
    return (
          <div className={styles.delivery_container}>
            <BreadCrumb breadCrumbs={this.breadCrumbs} />
            <div className={styles.wrapper}>
              <table>
                <thead>
                <tr>
                  <th>
                    City
                  </th>
                  <th>
                    Delivery Constraints
                  </th>
                  <th>
                    Configure Delivery Days
                  </th>
                  <th>
                    Add Holidays
                  </th>
                </tr>
                </thead>
                <tbody>
                {templateBody}
                </tbody>
              </table>
            </div>
          </div>
        );
  }
}

DeliveryConstraints.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  deliverableCities: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { ...state.page_data, ...state.deliveryConstraintsState};
};


const decoratedConnectedComponent = commonDecorator(DeliveryConstraints);// connect(mapStateToProps)(CommonDecorator);

export default connect(mapStateToProps)(decoratedConnectedComponent);
