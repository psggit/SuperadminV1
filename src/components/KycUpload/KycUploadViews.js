import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData, uploadAndSave, RESET} from './KycUploadViewActions';
// import { makeRequest} from '../FileUpload/Actions';
import TableProfileHeader from './TableProfileHeader';
import Endpoints from '../../Endpoints';

// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class KycUploadProfile extends Component {
  componentWillMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)));
  }
  componentWillUnmount() {
    this.props.dispatch({type: RESET});
  }
  onUploadClick(e) {
    e.preventDefault();
    const { Id: consumerId } = this.props.params;
    const idToTypeMap = {};
    const idToFileMap = {};
    const formData = new FormData();
    let domId;
    let fileDOM;

    idToTypeMap.customer_upload = 'CONSUMERPIC';
    idToTypeMap.id_proof = 'IDPROOF';
    idToTypeMap.address_proof = 'ADDRESSPROOF';

    idToFileMap.customer_upload = 'customer_upload';
    idToFileMap.id_proof = 'id_proof';
    idToFileMap.address_proof = 'address_proof';

    domId = e.target.getAttribute('id');
    fileDOM = document.querySelectorAll("[data-field-name='" + idToFileMap[domId] + "']")[0];

    formData.append('file', fileDOM.files[0]);

    /* Call a function to upload the file then insert it into the consumer kyc Table
     * */

    this.props.dispatch(uploadAndSave(formData, consumerId, idToTypeMap[domId]));
  }
  render() {
    const styles = require('./Table.scss');
    let consumerPic;
    let idPic;
    let addressPic;
    let hasConsumerPic = false;
    let hasIDProofPic = false;
    let hasAddressPic = false;

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

    const { ongoingRequest, lastError, lastSuccess} = this.props;

    if (lastSuccess.length > 0) {
      if (lastSuccess[0].kycs) {
        consumerPic = lastSuccess[0].kycs[0].files.map((file, index) => {
          const imgUrl = Endpoints.file_get + file.file;
          if (file.proof_type === 'CONSUMERPIC') {
            hasConsumerPic = true;
            return (
              <img key={index} src={ imgUrl } className="img-responsive"/>
            );
          }
        });

        idPic = lastSuccess[0].kycs[0].files.map((file, index) => {
          const imgUrl = Endpoints.file_get + file.file;
          if (file.proof_type === 'IDPROOF') {
            hasIDProofPic = true;
            return (
              <img key={index} src={ imgUrl } className="img-responsive"/>
            );
          }
        });

        addressPic = lastSuccess[0].kycs[0].files.map((file, index) => {
          const imgUrl = Endpoints.file_get + file.file;
          if (file.proof_type === 'ADDRESSPROOF') {
            hasAddressPic = true;
            return (
              <img key={index} src={ imgUrl } className="img-responsive"/>
            );
          }
        });
      }
    }

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
          Object.keys(obj).map((key, index) => {
            if (key === 'full_name' || key === 'mobile_number' || key === 'email') {
              keyName = nameMap(key);
              console.log({keyName});
              return (
                <div key={index} className={styles.profile_information}>
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
    // let file;
    if (Object.keys(lastError).length > 0) {
      getHeader = <TableProfileHeader title={'Error'}/>;
      getHtml = (<h4> error </h4>);
    } else if (lastSuccess.length > 0) {
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
                  Address Line 1:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address1"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Address Line 2:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address2"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  City:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="city"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  PinCode:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="pincode"/>
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

                  <div className="col-md-6">
                    { (hasConsumerPic) ? 'Yes' : 'No' }
                  </div>
                  {/*
                  <select name="PhotoAvailability" disabled>
                    <option >Choose here</option>
                    <option value="yesphoto" selected={ hasConsumerPic ? true : false }>Yes</option>
                    <option value="nophoto" selected={ !hasConsumerPic ? true : false } >No</option>
                  </select>
                  */}
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="PhotoVerification">
                    <option >Choose here</option>
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
                  <div className="col-md-6">
                    { (hasIDProofPic) ? 'Yes' : 'No' }
                  </div>
                  {/*
                  <select name="IDAvailability" disabled>
                    <option >Choose here</option>
                    <option value="yesavailable" selected={ hasIDProofPic ? true : false }>Yes</option>
                    <option value="noavailable" selected={ !hasIDProofPic ? true : false } >No</option>
                  </select>
                  */}
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="IDType">
                    <option >Choose here</option>
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
                    <option >Choose here</option>
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
                  <div className="col-md-6">
                    { (hasAddressPic) ? 'Yes' : 'No' }
                  </div>
                  {/*
                  <select name="addressAvailability" disabled>
                    <option >Choose here</option>
                    <option value="yesavailable" selected={ hasAddressPic ? true : false }>Yes</option>
                    <option value="noavailable" selected={ !hasAddressPic ? true : false } >No</option>
                  </select>
                  */}
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="AddressProofType">
                    <option >Choose here</option>
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
                    <option >Choose here</option>
                    <option value="yesidverify">Yes</option>
                    <option value="noidverify">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.user_actions}>
                {/*
                <button className={styles.common_btn} id="edit">
                    Edit
                </button>
                */}
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
                {/*
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
                */}
                { consumerPic }
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="customer_upload" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="customer_upload" onClick={this.onUploadClick.bind(this)}>
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
                {idPic}
                {/*
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
                */}
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="id_proof" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="id_proof" onClick={this.onUploadClick.bind(this)}>
                  Upload
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.upload_white}>
              <p className={styles.upload_header}>
                  Proof of Address
              </p>
              <div className={styles.uploaded_images}>
                {addressPic}
                {/*
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
                */}
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="address_proof" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="address_proof" onClick={this.onUploadClick.bind(this)}>
                  Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
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
        */}
      </div>
    );
  }
}

KycUploadProfile.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  ongoingRequest: PropTypes.bool.isRequired,
  lastError: PropTypes.object.isRequired,
  lastSuccess: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kycupload, ...state.page_data};
};

export default connect(mapStateToProps)(KycUploadProfile);
