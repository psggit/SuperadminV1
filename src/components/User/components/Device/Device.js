import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getDeviceData} from '../../ProfileActions';
// import {editItem, E_ONGOING_REQ} from './EditActions';

import BreadCrumb from '../../../Common/BreadCrumb';
import commonDecorator from '../../../Common/CommonDecorator';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED
} from '../../../Common/Actions/Actions';

import SearchWrapper from './SearchWrapper';

class ViewDevice extends Component {
  constructor(props) {
    super();
    /* Data required for the bread component to render correctly */
    this.breadCrumbs = [];
    this.breadCrumbs.push({
      title: 'Consumer Management',
      sequence: 1,
      link: '#'
    });
    this.breadCrumbs.push({
      title: 'Profile',
      sequence: 2,
      link: '/hadmin/consumer/profiles'
    });
    this.breadCrumbs.push({
      title: props.params.Id,
      sequence: 3,
      link: '/hadmin/consumer/profile/' + props.params.Id
    });
    this.breadCrumbs.push({
      title: 'Device History',
      sequence: 4,
      link: '#'
    });
  }
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getDeviceData(parseInt(this.props.params.Id, 10)))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED });
    });
  }
  render() {
    const styles = require('./Device.scss');
    const {
      lastSuccess
      , lastError
    } = this.props;

    const checkForError = () => {
      if ( 'error' in lastError ) {
        return (
          <div className={ styles.error_message }>
            Something went wrong while fetching cart data, kindly contact the administrator
          </div>
        );
      }
      return (
        <div className={ styles.error_message }>
          Loading...
        </div>
      );
    };
    const searchWrapper = ( lastSuccess.length > 0 ) ?
      (
        <SearchWrapper data={lastSuccess}/>
      )
    : (
      checkForError()
    );
    return (
      <div className={styles.container}>
        <BreadCrumb breadCrumbs={this.breadCrumbs} />
        <div className={styles.search_wrapper + ' ' + styles.wd_100}>
        	<p>Search</p>
        	<div className={styles.search_form + ' ' + styles.wd_100}>
        		<input type="text" placeholder="Mobile Number" />
        		<input type="text" placeholder="Contains" />
        		<input type="number" />
        		<button className={styles.common_btn}>Search</button>
        	</div>
        </div>
        { searchWrapper }
     </div>
    );
  }
}

/* lastSuccess is an array in the beginning and it is populated as an array by the Hasura Response */
/* lastError is an object in the beginning and it is made an object in case of error conditions */
ViewDevice.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.profile, ongoingRequest: state.page_data.ongoingRequest };
};

const decoratedConnectedComponent = commonDecorator(ViewDevice);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedConnectedComponent);
