import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './KycUploadViewActions';
import { makeRequest} from '../FileUpload/Actions';
import TableHeader from './TableHeader';
// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class KycUploadProfile extends Component {
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
    let keyName;
    const nameMap = (key) => {
      if (key === 'full_name') {
        keyName = 'Name';
        return keyName;
      } else if (key === 'email') {
        keyName = 'Email';
        return keyName;
      } else if (key === 'mobile_number') {
        keyName = 'Mobile Number';
        return keyName;
      }
    };

    const { ongoingRequest, lastError, lastSuccess, dispatch } = this.props;
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
            if (key === 'full_name' || key === 'mobile_number' || key === 'email') {
              keyName = nameMap(key);
              console.log({keyName});
              return (
                <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  {keyName}:
                </div>
                <div className={styles.wd_70} >
                  {valueComponent(obj, key)}
                </div>
                </div>
              );
            }
          })
        );
    };
    let getHtml;
    let getHeader = <TableHeader title={'Initial'}/>;
    let file;
    if (lastError) {
      getHeader = <TableHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess) {
      getHeader = <TableHeader title={lastSuccess[0].id}/>;
      getHtml = objToHtml(lastSuccess[0]);
    } else if (ongoingRequest) {
      getHeader = <TableHeader title={'Requesting'}/>;
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
        <div className={styles.upload_wrapper}>
          <div className={styles.upload_white}>
            <div className={styles.upload_right}>
            <p className={styles.upload_header}>
                Proof of ID
            </p>
            <div className={styles.profile_actions}>
            <input type="file" ref={(node) => {file = node;}} className="form-control" placeholder="username" />
                <div className={styles.upload_action_button}>
                    <button className="form-control" id="edit" onClick={(e) => {
                      e.preventDefault();
                      dispatch(makeRequest({file: file.files[0]}));
                    }}>
                    Upload
                    </button>
                  </div>
                </div>
            </div>
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

KycUploadProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.object.isRequired,
  fileUrl: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycupload};
};

export default connect(mapStateToProps)(KycUploadProfile);
