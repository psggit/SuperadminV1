import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Loading from '../Common/Loading';
import {
  getUserData,
  uploadAndSave,
  UPDATE_STATUSES,
  updateKycs,
  /*
  uploadKycsAndUpdate,
  updateConsumerKyc,
  updateExistingKycs,
  */
  UPDATE_CONSUMER_COMMENT,
  UPDATE_ID_COMMENT,
  UPDATE_ADDRESS_COMMENT,
  deleteFromLocal,
  deleteFromServer,
  UPDATE_CONSUMER_COMMENT_DATA,
  UPDATE_ID_COMMENT_DATA,
  UPDATE_ADDRESS_COMMENT_DATA,
  RESET_KYC_DATA
} from './KycUploadViewActions';

import {
  MAKE_REQUEST,
  REQUEST_COMPLETED,
  RESET
} from '../Common/Actions/Actions';

import commonDecorator from '../Common/CommonDecorator';

// import { makeRequest} from '../FileUpload/Actions';
import TableProfileHeader from './TableProfileHeader';
import Endpoints from '../../Endpoints';

// import TableHeader from './TableHeader';
// import {editItem, E_ONGOING_REQ} from './EditActions';

class KycUploadProfile extends Component {
  componentWillMount() {
    // this.props.dispatch({type: GET_CONSUMER, data: this.props.params.Id});
    Promise.all([
      this.props.dispatch({ type: MAKE_REQUEST }),
      this.props.dispatch(getUserData(parseInt(this.props.params.Id, 10)))
    ])
    .then( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    })
    .catch( () => {
      this.props.dispatch({ type: REQUEST_COMPLETED});
    });
  }
  componentWillUnmount() {
    Promise.all([
      this.props.dispatch({type: RESET}),
      this.props.dispatch({type: RESET_KYC_DATA})
    ]);
  }
  /* Function which listens on upload click on the page and dispatches it to the reducer */
  onUploadClick(domId, e) {
    console.log(e.target);
    console.log(domId);
    e.preventDefault();
    // const { Id: consumerId } = this.props.params;
    const idToTypeMap = {};
    const idToFileMap = {};
    const formData = new FormData();
    // let domId;
    let fileDOM;

    idToTypeMap.customer_upload = 'USERPHOTO';
    idToTypeMap.id_proof = 'IDPROOFFRONT';
    idToTypeMap.address_proof = 'ADDRESSPROOFFRONT';

    idToFileMap.customer_upload = 'customer_upload';
    idToFileMap.id_proof = 'id_proof';
    idToFileMap.address_proof = 'address_proof';

    // domId = e.target.getAttribute('id');
    fileDOM = document.querySelectorAll("[data-field-name='" + idToFileMap[domId] + "']")[0];

    /* Check if the user has selected any files or not */
    if (fileDOM.files[0]) {
      formData.append('file', fileDOM.files[0]);

      /* Call a function to upload the file then insert it into the consumer kyc Table
       * */

      Promise.all([
        this.props.dispatch(uploadAndSave(formData, idToTypeMap[domId])),
        this.props.dispatch({ type: MAKE_REQUEST })
      ])
      .then( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      })
      .catch( () => {
        this.props.dispatch({ type: REQUEST_COMPLETED });
      });
    }
  }
  /* Function which handles image delete (Both from local and from the server)
   * Local: Image uploaded but not synced with the server
   * Server: Image present on the server
   * */
  onImageDelete(e) {
    const deleteLoc = e.target.getAttribute('data-del-loc');
    const deleteActionDictionary = {};
    const imageId = parseInt(e.target.getAttribute('id'), 10);
    const imageIdentifier = e.target.getAttribute('data-del-image');
    const { Id: userId } = this.props.params;
    deleteActionDictionary.local = deleteFromLocal;
    deleteActionDictionary.server = deleteFromServer;

    this.props.dispatch(deleteActionDictionary[deleteLoc](imageId, imageIdentifier, userId));
  }
  onInputFieldChanges(e) {
    const updateObjs = {};
    const identi = e.target.getAttribute('data-field-name');

    updateObjs.panId = {
      'panIValue': e.target.value
    };
    updateObjs.address1 = {
      'address1IValue': e.target.value
    };
    updateObjs.address2 = {
      'address2IValue': e.target.value
    };
    updateObjs.city = {
      'cityIValue': e.target.value
    };
    updateObjs.pincode = {
      'pinCodeIValue': e.target.value
    };
    if (e.target.getAttribute('data-field-name') === 'addressProofType') {
      updateObjs.addressProofType = {
        'proofType': document.querySelectorAll("select[data-field-name='" + e.target.getAttribute('data-field-name') + "'] option:checked")[0].value
      };
    }
    this.props.dispatch({type: UPDATE_STATUSES, data: updateObjs[identi]});
  }
  showHideComment(e) {
    const idToActionMap = {};
    const identi = e.target.getAttribute('data-field-name');
    const updatedStatus = {};
    let selectStatus = document.querySelectorAll("select[data-field-name='" + e.target.getAttribute('data-field-name') + "'] option:checked")[0].value;
    idToActionMap.consumer_status = UPDATE_CONSUMER_COMMENT;
    idToActionMap.id_status = UPDATE_ID_COMMENT;
    idToActionMap.address_status = UPDATE_ADDRESS_COMMENT;

    /* Update the verified status too */
    /* Check if the value changed */
    /* If yes update it else dont touch */
    /* TODO: Remove the *updated Boolean value its of no use */
    const updatedCObj = {
      isConsumerPICVUpdated: !(selectStatus === this.props.consumerPICVIStatus),
      consumerPICVCStatus: selectStatus
    };

    const updatedIObj = {
      isIdProofVUpdated: !(selectStatus === this.props.idProofVIStatus),
      idProofVCStatus: selectStatus
    };

    const updatedAObj = {
      isAddressProofVUpdated: !(selectStatus === this.props.addressProofVIStatus),
      addressProofVCStatus: selectStatus
    };

    updatedStatus.consumer_status = updatedCObj;
    updatedStatus.id_status = updatedIObj;
    updatedStatus.address_status = updatedAObj;

    this.props.dispatch({type: UPDATE_STATUSES, data: updatedStatus[identi]});

    selectStatus = (selectStatus === 'No') ? '' : 'hide';

    this.props.dispatch({type: idToActionMap[identi], 'data': selectStatus});
  }
  uploadKYCDetails() {
    const { consumerPIC, idProof, addressProof, isConsumerPICUploaded, isIdProofUploaded, isAddressProofUploaded} = this.props;

    /* Consumer KYC need to exist first then id will be present */
    const kycId = this.props.lastSuccess[0].kyc_requests[0].id;
    const { Id: userId } = this.props.params;
    /* Consumer KYC need to exist first then files will atleast be an empty array */
    const kycFiles = this.props.lastSuccess[0].kyc_requests[0].kyc_files;

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
    const insertObjs = [];

    if ( !panID ) {
      alert('Pan number is mandatory');
      return false;
    }
    if ( !address1 || !address2 || !city || !pincode || !proofType ) {
      alert('All the fields under Address are mandatory');
      return false;
    }

    /* Variable Declaration */

    const consumerObjs = {};
    const idObjs = {};
    const addressObjs = {};
    const consumerWhere = {};
    const idWhere = {};
    const addressWhere = {};
    const mRequests = [];
    let updateConsumers = false;
    let updateIdProof = false;
    let updateAddressProof = false;

    /* End of It */

    /* If isUploaded is true meaning we need to tag the file in kyc_files else no need for that step */
    if (isConsumerPICUploaded || isIdProofUploaded || isAddressProofUploaded) {
      consumerPIC.forEach((file) => {
        const singleObj = {};
        singleObj.proof_type = 'USERPHOTO';
        singleObj.file = file;
        singleObj.comment = consumerComment;
        singleObj.status = consumerPICVerification;
        singleObj.kyc_request_id = kycId;
        singleObj.is_active = true;
        singleObj.created_at = new Date().toISOString();
        singleObj.updated_at = new Date().toISOString();
        insertObjs.push(singleObj);
      });
      idProof.forEach(( file, index ) => {
        const singleObj = {};
        const existingFiles = this.props.lastSuccess[0].kyc_requests[0].kyc_files.filter( ( f ) => {
          return ( f.proof_type === 'IDPROOFFRONT' );
        });
        singleObj.proof_type = ( index === 0 && existingFiles.length === 0 ) ? 'IDPROOFFRONT' : 'IDPROOFBACK';
        singleObj.file = file;
        singleObj.comment = idComment;
        singleObj.status = idProofVerification;
        singleObj.kyc_request_id = kycId;
        singleObj.created_at = new Date().toISOString();
        singleObj.updated_at = new Date().toISOString();
        singleObj.pan_number = panID;
        singleObj.is_active = true;
        insertObjs.push(singleObj);
      });
      addressProof.forEach(( file, index ) => {
        const singleObj = {};
        const existingFiles = this.props.lastSuccess[0].kyc_requests[0].kyc_files.filter( ( f) => {
          return ( f.proof_type === 'ADDRESSPROOFFRONT' );
        });
        singleObj.proof_type = ( index === 0 && existingFiles.length === 0 ) ? 'ADDRESSPROOFFRONT' : 'ADDRESSPROOFBACK';
        singleObj.file = file;
        singleObj.comment = addressComment;
        singleObj.status = addressProofVerification;
        singleObj.kyc_request_id = kycId;
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
//      this.props.dispatch(uploadKycsAndUpdate(insertObjs, consumerKYCStatus, kycId, userId));
    }

    /* Check if there are any changes which needs to be updated */
    if (kycFiles.length > 0) {
      consumerWhere.$or = [];
      idWhere.$or = [];
      addressWhere.$or = [];

      consumerObjs.values = {
        'status': consumerPICVerification,
        'comment': consumerComment
      };

      idObjs.values = {
        'status': idProofVerification,
        'comment': idComment,
        'pan_number': panID
      };

      addressObjs.values = {
        'status': addressProofVerification,
        'comment': addressComment,
        'address1': address1,
        'address2': address2,
        'pin_code': pincode,
        'id_type': proofType,
        'city': city
      };

      /* Get kycIds for Consumer KYCS */
      kycFiles.forEach( (file) => {
        if (file.proof_type === 'USERPHOTO') {
          updateConsumers = true;
          consumerWhere.$or.push({
            'id': file.id
          });
        } else if (file.proof_type === 'IDPROOFFRONT' || file.proof_type === 'IDPROOFBACK') {
          updateIdProof = true;
          idWhere.$or.push({
            'id': file.id
          });
        } else {
          updateAddressProof = true;
          addressWhere.$or.push({
            'id': file.id
          });
        }
      });

      consumerObjs.where = consumerWhere;
      idObjs.where = idWhere;
      addressObjs.where = addressWhere;

      if (updateConsumers) {
        mRequests.push(consumerObjs);
      }
      if (updateIdProof) {
        mRequests.push(idObjs);
      }
      if (updateAddressProof) {
        mRequests.push(addressObjs);
      }
//      this.props.dispatch(updateExistingKycs(mRequests, kycId, consumerKYCStatus, userId));
      // this.props.dispatch(updateConsumerKyc(kycId, consumerKYCStatus));
    }

    /* We have both the objects */
    this.props.dispatch(updateKycs(mRequests, insertObjs, kycId, consumerKYCStatus, userId));
  }
  updateComment(e) {
    /* Depending on what the comment is for update the specific comment variable */
    const commentVal = e.target.value;
    const identi = e.target.getAttribute('data-field-name');
    const commentActionMap = {};
    commentActionMap.consumer_comment = UPDATE_CONSUMER_COMMENT_DATA;
    commentActionMap.id_comment = UPDATE_ID_COMMENT_DATA;
    commentActionMap.address_comment = UPDATE_ADDRESS_COMMENT_DATA;
    this.props.dispatch( { type: commentActionMap[identi], data: commentVal });
  }
  render() {
    const styles = require('./Table.scss');
    let consumerPic;
    let idPic;
    let addressPic;
    let currentConsumerPic;
    let currentIdPic;
    let currentAddressPic;
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

    const {
      ongoingRequest,
      lastError,
      lastSuccess,
      consumerPIC,
      idProof,
      addressProof,
      consumerCommentStatus,
      idCommentStatus,
      addressCommentStatus,
      isConsumerPICVUpdated,
      consumerPICVCStatus,
      consumerPICVIStatus,
      consumerPICVComment,
      idProofVComment,
      addressProofVComment,

      isIdProofVUpdated,
      idProofVCStatus,
      idProofVIStatus,

      isAddressProofVUpdated,
      addressProofVCStatus,
      addressProofVIStatus,

      panIValue,
      address1IValue,
      address2IValue,
      cityIValue,
      pinCodeIValue,
      proofType
    } = this.props;

    let {
      isConsumerPICUploaded,
      isIdProofUploaded,
      isAddressProofUploaded
    } = this.props;

    /*
     * Get the correct data (In the initial page load take the lastSuccess object and if the update happens (File upload happens) take that object)
     * */

    const populateImageHtml = () => {
      if (isConsumerPICUploaded || isIdProofUploaded || isAddressProofUploaded) {
        currentConsumerPic = consumerPIC.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasConsumerPic = true;
          return (
            <div className={styles.image_actions} key={index} data-field-name="consumerPic">
              <img key={index} src={ imgUrl } className="img-responsive"/>
              <p className={styles.close} data-del-image="consumerPic" id={index} data-del-loc="local" onClick={ this.onImageDelete.bind(this) }>X</p>
            </div>
          );
        });
        currentIdPic = idProof.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasIDProofPic = true;
          return (
            <div className={styles.image_actions} key={index}>
              <img key={index} src={ imgUrl } className="img-responsive"/>
              <p className={styles.close} id={index} data-del-image="idPic" data-del-loc="local" onClick={ this.onImageDelete.bind(this) }>X</p>
            </div>
          );
        });
        currentAddressPic = addressProof.map((file, index) => {
          const imgUrl = Endpoints.file_get + file;
          hasAddressPic = true;
          return (
            <div className={styles.image_actions} key={index} >
              <img key={index} src={ imgUrl } className="img-responsive"/>
              <p className={styles.close} data-del-loc="local" data-del-image="addressPic" id={index} onClick={ this.onImageDelete.bind(this) } >X</p>
            </div>
          );
        });
      } if (lastSuccess.length > 0) {
        if (lastSuccess[0].kyc_requests) {
          consumerPic = lastSuccess[0].kyc_requests[0].kyc_files.map((file, index) => {
            const imgUrl = Endpoints.file_get + file.file;
            if (file.proof_type === 'USERPHOTO') {
              // consumerComment = file.comment;
              hasConsumerPic = true;
              return (
                <div className={styles.image_actions} key={index} >
                  <img key={index} src={ imgUrl } className="img-responsive"/>
                  <p className={styles.close} id={file.id} data-del-image="consumerPic" data-del-loc="server" onClick={ this.onImageDelete.bind(this) }>X</p>
                </div>
              );
            }
          });

          idPic = lastSuccess[0].kyc_requests[0].kyc_files.map((file, index) => {
            const imgUrl = Endpoints.file_get + file.file;
            if (file.proof_type === 'IDPROOFFRONT' || file.proof_type === 'IDPROOFBACK' ) {
              // idProofComment = file.comment;
              hasIDProofPic = true;
              return (
                <div className={styles.image_actions} key={index}>
                  <img key={index} src={ imgUrl } className="img-responsive"/>
                  <p className={styles.close} id={file.id} data-del-image="idPic" data-del-loc="server" onClick={ this.onImageDelete.bind(this) }>X</p>
                </div>
              );
            }
          });

          addressPic = lastSuccess[0].kyc_requests[0].kyc_files.map((file, index) => {
            const imgUrl = Endpoints.file_get + file.file;
            if (file.proof_type === 'ADDRESSPROOFFRONT' || file.proof_type === 'ADDRESSPROOFBACK') {
              hasAddressPic = true;
              // addressProofComment = file.comment;
              return (
                <div className={styles.image_actions} key={index}>
                  <img key={index} src={ imgUrl } className="img-responsive"/>
                  <p className={styles.close} id={file.id} data-del-image="addressPic" data-del-loc="server" onClick={ this.onImageDelete.bind(this) }>X</p>
                </div>
              );
            }
          });
        }
      }
      isConsumerPICUploaded = isConsumerPICUploaded || hasConsumerPic;
      isIdProofUploaded = isIdProofUploaded || hasIDProofPic;
      isAddressProofUploaded = isAddressProofUploaded || hasAddressPic;
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
        <Loading displayStatus={ ongoingRequest ? '' : 'hide' } />
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
                  <select name="PhotoVerification" value={ ((isConsumerPICVUpdated) ? consumerPICVCStatus : consumerPICVIStatus) } data-field-name="consumer_status" onChange={ this.showHideComment.bind(this) } disabled={ isConsumerPICUploaded ? false : true }>
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
                  <textarea data-field-name="consumer_comment" rows="3" cols="30" value={ consumerPICVComment } onChange= { this.updateComment.bind(this) }>
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
                  <input type="text" name="pan" data-field-name="panId" value={ panIValue } onChange={ this.onInputFieldChanges.bind(this) }/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Verified
                </div>
                <div className={styles.wd_70} >
                  <select name="IdVerification" data-field-name="id_status" value={ ((isIdProofVUpdated) ? idProofVCStatus : idProofVIStatus) } onChange={ this.showHideComment.bind(this) } disabled={ isIdProofUploaded ? false : true }>
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
                  <textarea data-field-name="id_comment" rows="3" cols="30" value={ idProofVComment } onChange= { this.updateComment.bind(this) }>
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
                  <input type="text" name="address1" data-field-name="address1" onChange={ this.onInputFieldChanges.bind(this) } value={ address1IValue }/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Address Line 2:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="address2" data-field-name="address2" onChange={ this.onInputFieldChanges.bind(this) } value={ address2IValue }/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  City:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="city" data-field-name="city" onChange={ this.onInputFieldChanges.bind(this) } value={ cityIValue }/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  PinCode:
                </div>
                <div className={styles.wd_70} >
                  <input type="text" name="pincode" data-field-name="pincode" onChange={ this.onInputFieldChanges.bind(this) } value={ pinCodeIValue }/>
                </div>
              </div>
              <div className={styles.profile_information}>
                <div className={styles.wd_30}>
                  Proof Type
                </div>
                <div className={styles.wd_70} >
                  <select name="AddressProofType" data-field-name="addressProofType" value={ proofType } disabled= { isAddressProofUploaded ? false : true } onChange={ this.onInputFieldChanges.bind(this) }>
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
                  <select name="IdVerification" data-field-name="address_status" value={ ((isAddressProofVUpdated) ? addressProofVCStatus : addressProofVIStatus) } onChange={ this.showHideComment.bind(this) } disabled= { isAddressProofUploaded ? false : true }>
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
                  <textarea data-field-name="address_comment" rows="3" cols="30" value={ addressProofVComment } onChange= { this.updateComment.bind(this) }>
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
                { currentConsumerPic }
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="customer_upload" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="customer_upload" onClick={this.onUploadClick.bind(this, 'customer_upload')}>
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
                {currentIdPic}
                {/*
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
                */}
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="id_proof" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="id_proof" onClick={this.onUploadClick.bind(this, 'id_proof')}>
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
                {currentAddressPic}
                {/*
                <img src="" className="img-responsive"/>
                <img src="" className="img-responsive"/>
                */}
              </div>
              <div className={styles.upload_actions}>
                <input type="file" className="" data-field-name="address_proof" placeholder="username" />
                <div className={styles.upload_action_button}>
                  <button className="" id="address_proof" onClick={this.onUploadClick.bind(this, 'address_proof')}>
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
  isConsumerPICUploaded: PropTypes.bool.isRequired,
  isIdProofUploaded: PropTypes.bool.isRequired,
  isAddressProofUploaded: PropTypes.bool.isRequired,
  consumerCommentStatus: PropTypes.string.isRequired,
  addressCommentStatus: PropTypes.string.isRequired,
  idCommentStatus: PropTypes.string.isRequired,

  isConsumerPICVUpdated: PropTypes.bool.isRequired,
  consumerPICVIStatus: PropTypes.string.isRequired,
  consumerPICVCStatus: PropTypes.string.isRequired,


  isIdProofVUpdated: PropTypes.bool.isRequired,
  idProofVIStatus: PropTypes.string.isRequired,
  idProofVCStatus: PropTypes.string.isRequired,

  panIValue: PropTypes.string.isRequired,
  address1IValue: PropTypes.string.isRequired,
  address2IValue: PropTypes.string.isRequired,
  cityIValue: PropTypes.string.isRequired,
  pinCodeIValue: PropTypes.string.isRequired,
  proofType: PropTypes.string.isRequired,

  isAddressProofVUpdated: PropTypes.bool.isRequired,
  addressProofVIStatus: PropTypes.string.isRequired,
  addressProofVCStatus: PropTypes.string.isRequired,

  addressProofVComment: PropTypes.string.isRequired,
  consumerPICVComment: PropTypes.string.isRequired,
  idProofVComment: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {...state.kyc, ...state.page_data};
};

const decoratedComponent = commonDecorator(KycUploadProfile);// connect(mapStateToProps)(CommonDecorator);
export default connect(mapStateToProps)(decoratedComponent);
