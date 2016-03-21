import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './KycViewActions';
import TableProfileHeader from './TableProfileHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

const lastPathname = location.pathname.split('/');
console.log('path');
console.log(lastPathname);
class KycViewProfile extends Component {
  componentDidMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
  }
  render() {
    const styles = require('./Table.scss');
    const reservationHtml = () => {
      return (
        <button className="btn btn-default btn-xs" onClick={() =>{
          // this.props.dispatch(getSecondaryData(arr));
        }}> View All </button>
      );
    };
    const funcMap = {
      'reservations': reservationHtml
    };

    const { ongoingRequest, lastError, lastSuccess } = this.props;
    const valueComponent = (obj, key) => {
      if (funcMap.hasOwnProperty(key)) {
        return funcMap[key]();
      }
      return (
          <div className="col-md-6">
              {obj[key] ? obj[key] : 'N/A'}
          </div>
      );
    };
    const objToHtml = (obj) => {
      return (
        Object.keys(obj).map((key) => {
          return (
            <div className={styles.profile_information}>
              <div className={styles.wd_30}>
                {key}:
              </div>
              <div className={styles.wd_70} >
                {valueComponent(obj, key)}
              </div>
            </div>
          );
        })
      );
    };
    let getHtml;
    let getHeader = <TableProfileHeader title={'Initial'}/>;
    if (lastError) {
      getHeader = <TableProfileHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableProfileHeader title={lastSuccess[0].id}/>;
      getHtml = objToHtml(lastSuccess[0]);
    } else if (ongoingRequest) {
      getHeader = <TableProfileHeader title={'Requesting'}/>;
      getHtml = <h4> requesting </h4>;
    }
    return (

        <div className={styles.profile_wrapper}>
          {getHeader}
          <div className={styles.white_width}>
          </div>
          <div className={styles.profile_view_wrapper}>
              <div className={styles.profile_view_left}>
                  <p className={styles.profile_view_header}>
                      Account Details
                  </p>
                  {getHtml}
              </div>
              <div className={styles.profile_view_right}>
              </div>
          </div>
          <div className={styles.profile_actions}>
              <div className={styles.profile_action_button}>
                  <button className="form-control" id="edit">
                      Edit User
                  </button>
              </div>
              <div className={styles.profile_action_button}>
                  <button className="form-control" id="reset_pin">
                      Reset Pin
                  </button>
              </div>
              <div className={styles.profile_action_button}>
                  <button className="form-control" id="reset_password">
                      Reset Password
                  </button>
              </div>
          </div>
        </div>
      );
  }
}
KycViewProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycviewprofile};
};

export default connect(mapStateToProps)(KycViewProfile);
