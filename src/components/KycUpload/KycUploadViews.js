import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getUserData, uploadAndSave, RESET, uploadKycsAndUpdate, updateConsumerKyc, UPDATE_CONSUMER_COMMENT, UPDATE_ID_COMMENT, UPDATE_ADDRESS_COMMENT} from './KycUploadViewActions';
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
    // const { Id: consumerId } = this.props.params;
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

    this.props.dispatch(uploadAndSave(formData, idToTypeMap[domId]));
  }
  showHideComment(e) {
    const idToActionMap = {};
    let selectStatus = document.querySelectorAll("select[data-field-name='" + e.target.getAttribute('data-field-name') + "'] option:checked")[0].value;
    idToActionMap.consumer_status = UPDATE_CONSUMER_COMMENT;
    idToActionMap.id_status = UPDATE_ID_COMMENT;
    idToActionMap.address_status = UPDATE_ADDRESS_COMMENT;

    selectStatus = (selectStatus === 'No') ? '' : 'hide';

    this.props.dispatch({type: idToActionMap[e.target.getAttribute('data-field-name')], 'data': selectStatus});
  }
  uploadKYCDetails() {
    const { consumerPIC, idProof, addressProof, isUploaded } = this.props;

    const kycId = this.props.lastSuccess[0].kycs[0].id;
    /* Verified Status */
    let consumerPICVerification = document.querySelectorAll('[data-field-name=consumer_status] option:checked')[0].value;
    let idProofVerification = document.querySelectorAll('[data-field-name=id_status] option:checked')[0].value;
    let addressProofVerification = document.querySelectorAll('[data-field-name=address_status] option:checked')[0].value;


    /* Final KYC Status */
    let consumerKYCStatus = (consumerPICVerification === 'Yes' ? true : false ) && (idProofVerification === 'Yes' ? true : false ) && (addressProofVerification === 'Yes' ? true : false );
    consumerKYCStatus = (consumerKYCStatus) ? 'Verified' : 'Not Verified';
    /* End of it */

    /* Dom Values */
    const consumerComment = (consumerPICVerification === 'Yes' ) ? '' : document.querySelectorAll('[data-field-name=consumer_comment]')[0].value;
    const idComment = (idProofVerification === 'Yes') ? '' : document.querySelectorAll('[data-field-name=id_comment]')[0].value;
    const addressComment = (addressProofVerification === 'Yes') ? '' : document.querySelectorAll('[data-field-name=address_comment]')[0].value;
    /* End of DOM Values */

    consumerPICVerification = consumerPICVerification === 'Yes' ? 'Verified' : 'Not Verified';
    idProofVerification = idProofVerification === 'Yes' ? 'Verified' : 'Not Verified';
    addressProofVerification = addressProofVerification === 'Yes' ? 'Verified' : 'Not Verified';

    /* End of it */

    const panID = document.querySelectorAll('[data-field-name=panId]')[0].value;
    const address1 = document.querySelectorAll('[data-field-name=address1]')[0].value;
    const address2 = document.querySelectorAll('[data-field-name=address2]')[0].value;
    const city = document.querySelectorAll('[data-field-name=city]')[0].value;
    const pincode = document.querySelectorAll('[data-field-name=pincode]')[0].value;
    const proofType = document.querySelectorAll('[data-field-name=addressProofType] option:checked')[0].value;

    /* If isUploaded is true meaning we need to tag the file in kyc_files else no need for that step */
    if (isUploaded) {
      const insertObjs = [];
      consumerPIC.forEach((file) => {
        const singleObj = {};
        singleObj.proof_type = 'CONSUMERPIC';
        singleObj.file = file;
        singleObj.comment = consumerComment;
        singleObj.status = consumerPICVerification;
        singleObj.consumer_kyc_id = kycId;
        singleObj.is_active = true;
        singleObj.created_at = new Date().toISOString();
        singleObj.updated_at = new Date().toISOString();
        insertObjs.push(singleObj);
      });
      idProof.forEach((file) => {
        const singleObj = {};
        singleObj.proof_type = 'IDPROOF';
        singleObj.file = file;
        singleObj.comment = idComment;
        singleObj.status = idProofVerification;
        singleObj.consumer_kyc_id = kycId;
        singleObj.created_at = new Date().toISOString();
        singleObj.updated_at = new Date().toISOString();
        singleObj.pan_number = panID;
        singleObj.is_active = true;
        insertObjs.push(singleObj);
      });
      addressProof.forEach((file) => {
        const singleObj = {};
        singleObj.proof_type = 'ADDRESSPROOF';
        singleObj.file = file;
        singleObj.comment = addressComment;
        singleObj.status = addressProofVerification;
        singleObj.consumer_kyc_id = kycId;
        singleObj.created_at = new Date().toISOString();
        singleObj.updated_at = new Date().toISOString();
        singleObj.address1 = address1;
        singleObj.address2 = address2;
        singleObj.pin_code = pincode;
        singleObj.id_type = proofType;
        singleObj.city = city;
        singleObj.is_active = true;
        insertObjs.push(singleObj);
      });
      this.props.dispatch(uploadKycsAndUpdate(insertObjs, consumerKYCStatus, kycId));
    } else {
      this.props.dispatch(updateConsumerKyc(kycId, consumerKYCStatus));
    }
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

    const { ongoingRequest, lastError, lastSuccess, consumerPIC, idProof, addressProof, isUploaded, consumerCommentStatus, idCommentStatus, addressCommentStatus} = this.props;

    /*
     * Get the correct data (In the initial page load take the lastSuccess object and if the update happens (File upload happens) take that object)
     * */

    const populateImageHtml = () => {
      if (isUploaded) {
        consumerPic = consumerPIC.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasConsumerPic = true;
          return (
            <img key={index} src={ imgUrl } className="img-responsive"/>
          );
        });
        idPic = idProof.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasConsumerPic = true;
          return (
            <img key={index} src={ imgUrl } className="img-responsive"/>
          );
        });
        addressPic = addressProof.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasConsumerPic = true;
          return (
            <img key={index} src={ imgUrl } className="img-responsive"/>
          );
        });
      } else if (lastSuccess.length > 0) {
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
      } else {
        console.log('just ignore');
      }
    };

    populateImageHtml();

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
                  <select name="PhotoVerification" data-field-name="consumer_status" onChange={ this.showHideComment.bind(this) }>
                    <option >Choose here</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information + ' ' + consumerCommentStatus}>
                <div className={styles.wd_30}>
                  Comment
                </div>
                <div className={styles.wd_70} >
                  <textarea data-field-name="consumer_comment" rows="3" cols="30">
                  </textarea>
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
                  <div className="col-md-6">
                    PAN
                  </div>
                  {/*
                  <select name="IDType">
                    <option >Choose here</option>
                    <option value="drivinglicense">Driving License</option>
                    <option value="voterid">Voter ID</option>
                    <option value="aadhaarcard">Aadhaar Card</option>
                    <option value="pan">PAN</option>
                    <option value="passport">Passport</option>
                  </select>
                  */}
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                PAN:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="pan"data-field-name="panId"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="IdVerification" data-field-name="id_status" onChange={ this.showHideComment.bind(this) }>
                    <option >Choose here</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information + ' ' + idCommentStatus} >
                <div className={styles.wd_30}>
                  Comment
                </div>
                <div className={styles.wd_70} >
                  <textarea data-field-name="id_comment" rows="3" cols="30">
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
                  Address Line 1:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address1" data-field-name="address1"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Address Line 2:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address2" data-field-name="address2"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  City:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="city" data-field-name="city"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  PinCode:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="pincode" data-field-name="pincode"/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="AddressProofType" data-field-name="addressProofType">
                    <option >Choose here</option>
                    <option value="DrivingLicense">Driving License</option>
                    <option value="VoterID">Voter ID</option>
                    <option value="AadhaarCard">Aadhaar Card</option>
                    <option value="Pan">PAN</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="IdVerification" data-field-name="address_status" onChange={ this.showHideComment.bind(this) }>
                    <option >Choose here</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className={styles.profile_information + ' ' + addressCommentStatus}>
                <div className={styles.wd_30}>
                  Comment
                </div>
                <div className={styles.wd_70} >
                  <textarea data-field-name="address_comment" rows="3" cols="30">
                  </textarea>
                </div>
              </div>
              <div className={styles.user_actions}>
                {/*
                <button className={styles.common_btn} id="edit">
                    Edit
                </button>
                */}
                <button className={styles.common_btn} id="save" onClick={ this.uploadKYCDetails.bind(this) }>
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
  lastSuccess: PropTypes.array.isRequired,
  consumerPIC: PropTypes.array.isRequired,
  idProof: PropTypes.array.isRequired,
  addressProof: PropTypes.array.isRequired,
  isUploaded: PropTypes.bool.isRequired,
  consumerCommentStatus: PropTypes.string.isRequired,
  addressCommentStatus: PropTypes.string.isRequired,
  idCommentStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {...state.kyc, ...state.page_data};
};

export default connect(mapStateToProps)(KycUploadProfile);
