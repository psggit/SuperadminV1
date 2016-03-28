import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData} from './KycUploadViewActions';
import { makeRequest} from '../FileUpload/Actions';
import TableProfileHeader from './TableProfileHeader';
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
    let getHeader = <TableProfileHeader title={'Initial'}/>;
    let file;
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
        <div className={styles.profile_view_wrapper}>
          <div className={styles.profile_view_left}>
              <p className={styles.profile_view_header}>
                  Account Details
              </p>
              {getHtml}
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                PAN:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="pan"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Adress Line 1:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address1"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Adress Line 2:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address2"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <p className={styles.profile_view_header}>
                    Customer Photo
                </p>
                </div>
                <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Available
                </div>
                <div className={styles.wd_70} >
                  <select name="PhotoAvailability">
                    <option selected disabled>Choose here</option>
                    <option value="yesphoto">Yes</option>
                    <option value="nophoto">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="PhotoVerification">
                    <option selected disabled>Choose here</option>
                    <option value="yesverify">Yes</option>
                    <option value="noverify">No</option>
                  </select>
                </div>
              </div>

              <div className={styles.profile_information}>
                <p className={styles.profile_view_header}>
                    ID Proof Details
                </p>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Available
                </div>
                <div className={styles.wd_70} >
                  <select name="IDAvailability">
                    <option selected disabled>Choose here</option>
                    <option value="yesavailable">Yes</option>
                    <option value="noavailable">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="IDType">
                    <option selected disabled>Choose here</option>
                    <option value="drivinglicense">Driving License</option>
                    <option value="voterid">Voter ID</option>
                    <option value="aadhaarcard">Aadhaar Card</option>
                    <option value="pan">PAN</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="IdVerification">
                    <option selected disabled>Choose here</option>
                    <option value="yesidverify">Yes</option>
                    <option value="noidverify">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Comment
                </div>
                <div className={styles.wd_70} >
                  <textarea rows="3" cols="30">
                  </textarea>
                </div>
              </div>
              <div className={styles.profile_information}>
                <p className={styles.profile_view_header}>
                    Address Proof Details
                </p>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Available
                </div>
                <div className={styles.wd_70} >
                  <select name="addressAvailability">
                    <option selected disabled>Choose here</option>
                    <option value="yesavailable">Yes</option>
                    <option value="noavailable">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="AddressProofType">
                    <option selected disabled>Choose here</option>
                    <option value="drivinglicense">Driving License</option>
                    <option value="voterid">Voter ID</option>
                    <option value="aadhaarcard">Aadhaar Card</option>
                    <option value="pan">PAN</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="IdVerification">
                    <option selected disabled>Choose here</option>
                    <option value="yesidverify">Yes</option>
                    <option value="noidverify">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.user_actions}>
                <button className={styles.common_btn} id="edit">
                    Edit
                </button>
                <button className={styles.common_btn} id="save">
                    Save
                </button>
              </div>
          </div>
          <div className={styles.profile_view_right}>
            <div className={styles.upload_white}>
              <p className={styles.upload_header}>
                  Customer Photo
              </p>
              <div className={styles.uploaded_images}>
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
              </div>
              <div className={styles.upload_actions}>
                <input type="file" ref={(node) => {file = node;}} className="" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="edit" onClick={(e) => {
                    e.preventDefault();
                    dispatch(makeRequest({file: file.files[0]}));
                  }}>
                  Upload
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.upload_white}>
              <p className={styles.upload_header}>
                  Proof of ID
              </p>
              <div className={styles.uploaded_images}>
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
              </div>
              <div className={styles.upload_actions}>
                <input type="file" ref={(node) => {file = node;}} className="" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="edit" onClick={(e) => {
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
