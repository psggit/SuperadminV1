/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

// import fetch from 'isomorphic-fetch';
import { defaultKycState } from '../Common/Actions/DefaultState';
import requestAction from '../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import { validation } from '../Common/Actions/Validator';

import { routeActions } from 'redux-simple-router';

import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_COMPLETED,
  REQUEST_ERROR, RESET } from '../Common/Actions/Actions';

import { genOptions } from '../Common/Actions/commonFunctions';

/* Action Constants */
const ADD_CONSUMER_PIC = 'KYCREDUCER/ADD_CONSUMER_PIC';
const ADD_ID_PROOF = 'KYCREDUCER/ADD_ID_PROOF';
const ADD_ADDRESS_PROOF = 'KYCREDUCER/ADD_ADDRESS_PROOF';
const UPDATE_CONSUMER_COMMENT = 'KYCREDUCER/UPDATE_CONSUMER_COMMENT';
const UPDATE_ID_COMMENT = 'KYCREDUCER/UPDATE_ID_COMMENT';
const UPDATE_ADDRESS_COMMENT = 'KYCREDUCER/UPDATE_ADDRESS_COMMENT';
const UPDATE_ADDRESS_PROOF_PIC = 'KYCREDUCER/UPDATE_ADDRESS_PROOF_PIC';
const UPDATE_ID_PROOF_PIC = 'KYCREDUCER/UPDATE_ID_PROOF_PIC';
const UPDATE_CONSUMER_PIC = 'KYCREDUCER/UPDATE_CONSUMER_PIC';
const RETRIEVE_INITIAL_STATUSES = 'KYCREDUCER/RETRIEVE_INITIAL_STATUSES';
const RESET_KYC_DATA = 'KYCREDUCER/RESET_KYC_DATA';

const UPDATE_STATUSES = 'KYCREDUCER/UPDATE_STATUSES';
const CLEAR_LOCAL_FILES = 'KYCREDUCER/CLEAR_LOCAL_FILES';

const UPDATE_CONSUMER_COMMENT_DATA = 'KYCREDUCER/UPDATE_CONSUMER_COMMENT_DATA';
const UPDATE_ID_COMMENT_DATA = 'KYCREDUCER/UPDATE_ID_COMMENT_DATA';
const UPDATE_ADDRESS_COMMENT_DATA = 'KYCREDUCER/UPDATE_ADDRESS_COMMENT_DATA';

/* */

/* *************** Begininning of Action Creators **************** */
const getUserData = (f) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST});
    //
    console.log(f);
    const payload = {
      'where': {'id': f},
      'columns': [
        '*', {
          'name': 'kyc_requests',
          'columns': ['*', {
            'name': 'kyc_files',
            'columns': ['*'],
            'where': {
              'is_active': true
            }
          }
        ],
          'order_by': '-created_at',
          'limit': 1
        }
      ]};
    const url = Endpoints.db + '/table/' + 'consumer' + '/select';
    const options = {
      ...genOptions,
      body: JSON.stringify(payload)
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     Promise.all([
                       dispatch({type: REQUEST_SUCCESS, data: d}),
                       dispatch({type: RETRIEVE_INITIAL_STATUSES, data: d})
                     ]);
                   },
                   () => {
                     dispatch({type: REQUEST_ERROR, data: 'Error. Try again!'});
                   }
                 );
               }
               return dispatch({type: REQUEST_ERROR, data: 'Error. Try again!'});
             },
             (error) => {
               console.log(error);
               return dispatch({type: REQUEST_ERROR, data: 'Error. Try again!'});
             });
  };
};

/* Gets form data and consumer id
 *  1. Uploads the file
 *  2. Checks whether there is an entry in consumer_kyc
 *    i) If yes proceed
 *    ii) Else Create an entry
 *  3. Create an entry in kyc_files
*/
const uploadAndSave = (formData, proofType) => {
  return (dispatch) => {
    const fileUploadUrl = Endpoints.file_upload;

    // const currentUser = consumerId;
    const pType = proofType;
    // const fetchedObj = {};
    const options = {
      method: 'POST',
      body: formData,
      credentials: globalCookiePolicy
    };

    const proofActionMap = {};
    proofActionMap.USERPHOTO = ADD_CONSUMER_PIC;
    proofActionMap.IDPROOFFRONT = ADD_ID_PROOF;
    proofActionMap.ADDRESSPROOFFRONT = ADD_ADDRESS_PROOF;

    /* Fetch the Consumer KYC ID */
    /*
    const consumerKycFetch = (resp) => {
      const userFetch = {};
      const url = Endpoints.db + '/table/consumer_kyc/select';
      userFetch.columns = ['id'];
      userFetch.where = {
        'consumer_id': parseInt(currentUser, 10)
      };
      const queryObj = {
        method: 'POST',
        body: JSON.stringify(userFetch),
        headers: { 'Content-Type': 'application/json' },
        credentials: globalCookiePolicy
      };
      console.log('resp');
      console.log(resp);
      return dispatch(requestAction(url, queryObj));
    };

    const saveFileUrl = (url) => {
      fetchedObj.url = url;
      return fetchedObj;
    };

    const insertIntoKyc = (resp) => {
      fetchedObj.consumer_kyc_info = resp;
      const url = Endpoints.db + '/table/kyc_files/insert';
      const insertObj = {};
      let queryObj;
      insertObj.objects = [{
        'proof_type': pType,
        'file': fetchedObj.url[0],
        'comment': 'n/a',
        'status': 'open',
        'consumer_kyc_id': fetchedObj.consumer_kyc_info[0].id,
        'created_at': new Date().toISOString(),
        'updated_at': new Date().toISOString()
      }];
      insertObj.returning = ['id'];
      queryObj = {
        method: 'POST',
        body: JSON.stringify(insertObj),
        headers: { 'Content-Type': 'application/json' },
        credentials: globalCookiePolicy
      };

      return dispatch(requestAction(url, queryObj));
    };

    const processSuccess = (resp) => {
      const response = resp;

      if (response.returning.length > 0) {
        alert('Kyc File Upload Successfull');
        return dispatch(getUserData(parseInt(currentUser, 10)));
      }
      alert('Something went wrong');
    };
    */

    return Promise.all([
      dispatch(requestAction(fileUploadUrl, options, proofActionMap[pType], REQUEST_ERROR))
    ]);
    /*
      .then(saveFileUrl)
      .then(consumerKycFetch)
      .then(insertIntoKyc)
      .then(processSuccess)
    */
  };
};

const sendEmail = ( getState ) => {
  const emailerObj = {};
  const emailerUrl = Endpoints.blogicUrl + '/admin/trigger/email';
  const userState = getState().page_data.lastSuccess;

  emailerObj.to = [ userState[0].email ];
  emailerObj.template_name = 'consumer-kyc-verification';
  emailerObj.content = {
    'consumer': {
      'name': userState[0].full_name
    }
  };

  const emailerOptions = {
    ...genOptions,
    body: JSON.stringify(emailerObj)
  };

  return Promise.resolve(requestAction( emailerUrl, emailerOptions));
};

const sendSMS = ( getState ) => {
  const emailerObj = {};
  const emailerUrl = Endpoints.blogicUrl + '/admin/trigger/sms';
  const userState = getState().page_data.lastSuccess;

  emailerObj.to = [ userState[0].mobile_number];
  emailerObj.template_name = 'consumer-kyc-verification';
  emailerObj.content = {
    'consumer': {
      'name': userState[0].full_name
    }
  };

  const emailerOptions = {
    ...genOptions,
    body: JSON.stringify(emailerObj)
  };

  return Promise.resolve(requestAction( emailerUrl, emailerOptions));
};

const updateConsumerKyc = ( id, status ) => {
  return ( dispatch, getState ) => {
    const userUpdate = {};
    const url = Endpoints.db + '/table/kyc_request/update';
    userUpdate.values = {
      'is_sa_validated': ( status === 'Verified' ) ? true : false,
      'is_open': ( status === 'Verified' ) ? true : false
    };
    userUpdate.returning = ['id'];
    userUpdate.where = {
      'id': parseInt(id, 10)
    };
    const queryObj = {
      ...genOptions,
      body: JSON.stringify(userUpdate)
    };
    return dispatch(requestAction(url, queryObj))
      .then((resp) => {
        /* If the KYC Status Update is successfull then update consumer level_id also */
        console.log(resp);
        if ( userUpdate.values.is_sa_validated ) {
          return Promise.all([
            sendEmail(getState).then( ( asyncAction ) => { return dispatch( asyncAction ); }),
            sendSMS(getState).then( ( asyncAction ) => { return dispatch( asyncAction ); })
          ]);
        }
        return Promise.resolve();
      })
      .then( () => {
        alert('Consumer Updated Successfully');
        /*
        if (resp.returning.length > 0) {
          const consumerUpdate = {};
          const consumerUrl = Endpoints.db + '/table/consumer/update';
          consumerUpdate.values = {
            'level_id': (currStatus === 'Verified') ? 2 : 1
          };
          consumerUpdate.where = {
            'id': parseInt(currUserId, 10)
          };
          consumerUpdate.returning = ['id'];

          const consumerQueryObj = {
            method: 'POST',
            body: JSON.stringify(consumerUpdate),
            headers: { 'Content-Type': 'application/json' },
            credentials: globalCookiePolicy
          };
          return dispatch(requestAction(consumerUrl, consumerQueryObj));
        }
        */
      })
    /*
      .then( () => {
        alert('Consumer Updated Successfully');
      })
    */
      .catch( () => {
        alert('Something went wrong while updating KYC');
      });
  };
};

const uploadKycsAndUpdate = (insertObjs) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/kyc_files/insert';
    const insertObj = {};
    /*
    const currentKycId = kycId;
    const currentKycStatus = kycStatus;
    const currConsumerId = consumerId;
    */
    let queryObj;
    insertObj.objects = insertObjs;
    insertObj.returning = ['id'];
    queryObj = {
      method: 'POST',
      body: JSON.stringify(insertObj),
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };

    const updateKyc = (response) => {
      console.log('InsideUpdateKyc');
      console.log(response);
      // return response; // dispatch(updateConsumerKyc(currentKycId, currentKycStatus, currConsumerId));
      dispatch({type: CLEAR_LOCAL_FILES});// (currentKycId, currentKycStatus, currConsumerId));
    };

    return dispatch(requestAction(url, queryObj))
      .then(updateKyc)
      .catch((response) => {
        console.log('Error Caught');
        console.log(response);
      });
  };
};

const loadCredentials = () => {
  return (dispatch) => {
    const p1 = new Promise((resolve, reject) => {
      fetch(Endpoints.getCredentials, {credentials: globalCookiePolicy}).then(
        (response) => {
          if (response.ok) {
            response.json().then(
              (creds) => {
                dispatch({type: REQUEST_SUCCESS, data: (creds)});
                resolve();
              },
              () => { reject(); }
            );
          } else {
            reject();
          }
        },
        () => { reject(); }
      );
    });
    return p1;
  };
};

const deleteFromLocal = (id, imageIdentifier, userId) => {
  return (dispatch) => {
    const identActionMap = {};
    console.log(userId);
    identActionMap.consumerPic = UPDATE_CONSUMER_PIC;
    identActionMap.idPic = UPDATE_ID_PROOF_PIC;
    identActionMap.addressPic = UPDATE_ADDRESS_PROOF_PIC;
    return dispatch({type: identActionMap[imageIdentifier], data: id});
  };
};

const deleteFromServer = (id, imageIdentifier, userId) => {
  return (dispatch) => {
    const userUpdate = {};
    const currentUserId = parseInt(userId, 10);
    console.log('id');
    console.log(imageIdentifier);
    const url = Endpoints.db + '/table/kyc_files/update';
    userUpdate.values = {
      'is_active': false
    };
    userUpdate.returning = ['id'];
    userUpdate.where = {
      'id': parseInt(id, 10)
    };
    const queryObj = {
      method: 'POST',
      body: JSON.stringify(userUpdate),
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    return dispatch(requestAction(url, queryObj))
      .then((resp) => {
        if (resp.returning.length > 0) {
          // alert('Image Successfully Deleted');
          return dispatch(getUserData(currentUserId));
        }
      });
  };
};


const updateExistingKycs = (requestObjs) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/kyc_files/update';
    /*
    const currId = id;
    const currStatus = status;
    const currConsumerId = userId;
    */
    /*
    let queryObj;
    let requestCount = 0;
    let index = 0;
    */

    const executeInSeries = (requestObj, index) => {
      let queryObj = {};
      queryObj = {
        ...genOptions,
        body: JSON.stringify(requestObj)
      };
      return dispatch(requestAction(url, queryObj))
        .then(() => {
          let currIndex;
          currIndex = index + 1;
          return (currIndex === requestObjs.length) ? 'Success' : executeInSeries(requestObjs[currIndex], currIndex);
        })
        .catch(() => {
          console.log('error Creeped up');
        });
    };

    if (requestObjs.length > 0) {
      executeInSeries(requestObjs[0], 0);
    }
    /* else {
      return dispatch(updateConsumerKyc(currId, currStatus, currConsumerId));
    }*/

    /*
    requestObjs.forEach( (requestObj) => {
      queryObj = {
        method: 'POST',
        body: JSON.stringify(requestObj),
        headers: { 'Content-Type': 'application/json' },
        credentials: globalCookiePolicy
      };
      return dispatch(requestAction(url, queryObj))
        .then(() => {
          requestCount += 1;
          if (requestCount === requestObjs.length) {
            return dispatch(updateConsumerKyc(currId, currStatus));
          }
        })
        .catch( (resp) => {
          console.log('Error');
          console.log(resp);
        });
    });
    */
  };
};

/* Function to update */
// Validate all Mandatory Attributes
// Send Action
const updateKycs = (requestObjs, insertObjs, kycId, kycStatus, consumerId) => {
  const currId = kycId;
  const currStatus = kycStatus;
  const currConsumerId = consumerId;
  const listOfValidations = [];
  const commentField = [];
  let panId;
  let pinCode;
  console.log('>>> UpdateKycs-Action Received the Following :');
  console.log(JSON.stringify(requestObjs));
  requestObjs.forEach((indiv) => {
    panId = indiv.values.hasOwnProperty('pan_number') ? indiv.values.pan_number : panId;
    pinCode = indiv.values.hasOwnProperty('pin_code') ? indiv.values.pin_code : pinCode;
    if (indiv.values.status === 'Verifed') {
      commentField.push(indiv.values.comment);
    }
  });
  listOfValidations.push(validation(panId, 'pan_number'));
  listOfValidations.push(validation(pinCode, 'pin_code'));
  commentField.forEach( (indiv) => {
    listOfValidations.push(validation(indiv, 'non_empty_field'));
  });
  return (dispatch) => {
    Promise.all(listOfValidations
    ).then(() => {
      dispatch({ type: MAKE_REQUEST});
      if (insertObjs.length > 0) {
        return Promise.all([
          dispatch(updateExistingKycs(requestObjs)),
          dispatch(uploadKycsAndUpdate(insertObjs)),
          dispatch(updateConsumerKyc(currId, currStatus, currConsumerId))
        ])
        .then( () => {
          return Promise.all([
            dispatch(getUserData(parseInt(currConsumerId, 10))),
            dispatch({ type: REQUEST_COMPLETED})
          ]);
        })
        .catch( () => {
          console.log('Error Occured');
        });
      }
      return Promise.all([
        dispatch(updateExistingKycs(requestObjs)),
        dispatch(updateConsumerKyc(currId, currStatus, currConsumerId))
      ])
      .then( () => {
        return Promise.all([
          dispatch(routeActions.push('/hadmin/consumer/kycfunctions'))
        ]);
      })
      .catch( () => {
        alert('Something went wrong');
        console.log('Error Occured');
      });
    })
    .catch( () => {
      console.log('Validation Failed');
    });
  };
};
/* End of it */

/* End of Action Creators */

/* ********************* REDUCER ************************** */

const kycReducer = (state = defaultKycState, action) => {
  let expr = [];
  let flag = false;
  switch (action.type) {
    /* Reducer function for storing the recently uploaded picture */
    case ADD_CONSUMER_PIC:
      return {...state, consumerPIC: [...state.consumerPIC, action.data[0]], isConsumerPICUploaded: true};
    case ADD_ID_PROOF:
      return {...state, idProof: [...state.idProof, action.data[0]], isIdProofUploaded: true};
    case ADD_ADDRESS_PROOF:
      return {...state, addressProof: [...state.addressProof, action.data[0]], isAddressProofUploaded: true};
    /* End of It */

    /* For Showing/Hiding the comment box */
    case UPDATE_CONSUMER_COMMENT:
      return {...state, consumerCommentStatus: action.data};
    case UPDATE_ADDRESS_COMMENT:
      return {...state, addressCommentStatus: action.data};
    case UPDATE_ID_COMMENT:
      return {...state, idCommentStatus: action.data};
    /* End of It */

    /* For capturing values from all the comment boxes */
    case UPDATE_CONSUMER_COMMENT_DATA:
      return {...state, consumerPICVComment: action.data};
    case UPDATE_ID_COMMENT_DATA:
      return {...state, idProofVComment: action.data};
    case UPDATE_ADDRESS_COMMENT_DATA:
      return {...state, addressProofVComment: action.data};
    /* End of it */

    /* Reducer to manage proof pictures when consumer pic is added and removed without syncing with the server */
    case UPDATE_CONSUMER_PIC:
      expr = (action.data) ? [...state.consumerPIC.slice(0, action.data), ...state.consumerPIC.slice(action.data + 1) ] : [...state.consumerPIC.slice(action.data + 1)];
      /* If all the consumer pics are deleted disable the consumerPicUploaded Flag */
      flag = ( expr.length > 0) ? true : false;
      return {...state, consumerPIC: [...expr], isConsumerPICUploaded: flag};
    case UPDATE_ID_PROOF_PIC:
      expr = (action.data) ? [...state.idProof.slice(0, action.data), ...state.idProof.slice(action.data + 1) ] : [...state.idProof.slice(action.data + 1)];
      flag = ( expr.length > 0) ? true : false;
      return {...state, idProof: [...expr], isIdProofUploaded: flag};
    case UPDATE_ADDRESS_PROOF_PIC:
      expr = (action.data) ? [...state.addressProof.slice(0, action.data), ...state.addressProof.slice(action.data + 1) ] : [...state.addressProof.slice(action.data + 1)];
      flag = ( expr.length > 0) ? true : false;
      return {...state, addressProof: [...expr], isAddressProofUploaded: flag};
    /* End of It */
    case CLEAR_LOCAL_FILES:
      return {...state, consumerPIC: [], idProof: [], addressProof: []};
    case RETRIEVE_INITIAL_STATUSES:
      let initialConsumerVStatus = false;
      let initialIdVStatus = false;
      let initialAddressVStatus = false;
      let initialPanValue = '';
      let initialAddress1Value = '';
      let initialAddress2Value = '';
      let initialCityValue = '';
      let initialPincodeValue = '';
      let addressProofInfo = {};
      let consumerPICInfo = {};
      let idProofInfo = {};

      addressProofInfo = Object.assign({}, state.defaultAddressProof);
      consumerPICInfo = Object.assign({}, state.defaultConsumerPIC);
      idProofInfo = Object.assign({}, state.defaultIdProof);

      /* If the data is already available, populate the value properly */
      if (action.data[0].kyc_requests.length > 0) {
        const consumerPIC = action.data[0].kyc_requests[0].kyc_files.filter( (file) => {
          return (file.proof_type === 'USERPHOTO');
        });
        const idProof = action.data[0].kyc_requests[0].kyc_files.filter( (file) => {
          return (file.proof_type === 'IDPROOFFRONT') || (file.proof_type === 'IDPROOFBACK');
        });
        const addressProof = action.data[0].kyc_requests[0].kyc_files.filter( (file) => {
          return (file.proof_type === 'ADDRESSPROOFFRONT') || (file.proof_type === 'ADDRESSPROOFBACK');
        });

        if (consumerPIC.length > 0) {
          initialConsumerVStatus = consumerPIC[0].status === 'Verified' ? 'Yes' : 'No';
          consumerPICInfo.consumerPICVIStatus = initialConsumerVStatus;

          consumerPICInfo.consumerCommentStatus = (initialConsumerVStatus === 'Yes') ? 'hide' : '';
          consumerPICInfo.consumerPICVComment = consumerPIC[0].comment;
        }
        if (idProof.length > 0) {
          initialIdVStatus = idProof[0].status === 'Verified' ? 'Yes' : 'No';
          initialPanValue = idProof[0].pan_number;
          idProofInfo.idProofVIStatus = initialIdVStatus;
          idProofInfo.panIValue = initialPanValue;
          idProofInfo.idProofVComment = idProof[0].comment;

          idProofInfo.idCommentStatus = (initialIdVStatus === 'Yes') ? 'hide' : '';
        }
        if (addressProof.length > 0) {
          initialAddressVStatus = addressProof[0].status === 'Verified' ? 'Yes' : 'No';
          initialAddress1Value = addressProof[0].address1;
          initialAddress2Value = addressProof[0].address2;
          initialCityValue = addressProof[0].city;
          initialPincodeValue = addressProof[0].pin_code;

          addressProofInfo.addressProofVIStatus = initialAddressVStatus;
          addressProofInfo.address1IValue = initialAddress1Value;
          addressProofInfo.address2IValue = initialAddress2Value;
          addressProofInfo.cityIValue = initialCityValue;
          addressProofInfo.pinCodeIValue = initialPincodeValue;
          addressProofInfo.proofType = addressProof[0].id_type;

          addressProofInfo.addressCommentStatus = (initialAddressVStatus === 'Yes') ? 'hide' : '';
          addressProofInfo.addressProofVComment = addressProof[0].comment;
        }
      }
      return {...state, addressProof: [...expr], isAddressProofUploaded: flag, ...consumerPICInfo, ...idProofInfo, ...addressProofInfo};
    case UPDATE_STATUSES:
      return {...state, ...action.data};
    case RESET_KYC_DATA:
      return { ...defaultKycState };
    default: return state;
  }
};

/* End of Reducer Definition */

export {
  getUserData,
  loadCredentials,
  uploadAndSave,
  updateConsumerKyc,
  uploadKycsAndUpdate,
  RESET,
  UPDATE_CONSUMER_COMMENT,
  UPDATE_ID_COMMENT,
  UPDATE_ADDRESS_COMMENT,
  deleteFromLocal,
  deleteFromServer,
  UPDATE_STATUSES,
  UPDATE_ADDRESS_COMMENT_DATA,
  UPDATE_CONSUMER_COMMENT_DATA,
  UPDATE_ID_COMMENT_DATA,
  updateExistingKycs,
  updateKycs,
  RESET_KYC_DATA
};
export default kycReducer;
