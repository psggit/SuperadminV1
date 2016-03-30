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
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_ERROR, RESET } from '../Common/Actions/Actions';

/* Action Constants */
const ADD_CONSUMER_PIC = 'KYCREDUCER/ADD_CONSUMER_PIC';
const ADD_ID_PROOF = 'KYCREDUCER/ADD_ID_PROOF';
const ADD_ADDRESS_PROOF = 'KYCREDUCER/ADD_ADDRESS_PROOF';
const UPDATE_CONSUMER_COMMENT = 'KYCREDUCER/UPDATE_CONSUMER_COMMENT';
const UPDATE_ID_COMMENT = 'KYCREDUCER/UPDATE_ID_COMMENT';
const UPDATE_ADDRESS_COMMENT = 'KYCREDUCER/UPDATE_ADDRESS_COMMENT';
/* */

const getUserData = (f) => {
  return (dispatch) => {
    dispatch({ type: MAKE_REQUEST, f});
    //
    console.log(f);
    const payload = {
      'where': {'id': f},
      'columns': [
        '*', {
          'name': 'kycs',
          'columns': ['*', {
            'name': 'files',
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
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      credentials: globalCookiePolicy
    };
    // return dispatch(requestAction(url, options, V_REQUEST_SUCCESS, V_REQUEST_ERROR));

    return fetch(url, options)
           .then(
             (response) => {
               if (response.ok) { // 2xx status
                 response.json().then(
                   (d) => {
                     dispatch({type: REQUEST_SUCCESS, data: d});
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
    proofActionMap.CONSUMERPIC = ADD_CONSUMER_PIC;
    proofActionMap.IDPROOF = ADD_ID_PROOF;
    proofActionMap.ADDRESSPROOF = ADD_ADDRESS_PROOF;

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

    return dispatch(requestAction(fileUploadUrl, options, proofActionMap[pType], REQUEST_ERROR));
    /*
      .then(saveFileUrl)
      .then(consumerKycFetch)
      .then(insertIntoKyc)
      .then(processSuccess)
    */
  };
};

const updateConsumerKyc = (id, status) => {
  return (dispatch) => {
    const userUpdate = {};
    const url = Endpoints.db + '/table/consumer_kyc/update';
    userUpdate.values = {
      'status': status
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
          alert('Consumer KYC Updated Successfully');
        }
      });
  };
};

const uploadKycsAndUpdate = (insertObjs, kycStatus, kycId) => {
  return (dispatch) => {
    const url = Endpoints.db + '/table/kyc_files/insert';
    const insertObj = {};
    const currentKycId = kycId;
    const currentKycStatus = kycStatus;
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
      return dispatch(updateConsumerKyc(currentKycId, currentKycStatus));
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

const kycReducer = (state = defaultKycState, action) => {
  switch (action.type) {
    case ADD_CONSUMER_PIC:
      return {...state, consumerPIC: [...state.consumerPIC, action.data[0]], isUploaded: true};
    case ADD_ID_PROOF:
      return {...state, idProof: [...state.idProof, action.data[0]], isUploaded: true};
    case ADD_ADDRESS_PROOF:
      return {...state, addressProof: [...state.addressProof, action.data[0]], isUploaded: true};
    case UPDATE_CONSUMER_COMMENT:
      return {...state, consumerCommentStatus: action.data};
    case UPDATE_ADDRESS_COMMENT:
      return {...state, addressCommentStatus: action.data};
    case UPDATE_ID_COMMENT:
      return {...state, idCommentStatus: action.data};
    default: return state;
  }
};

export default kycReducer;
export {getUserData, loadCredentials, uploadAndSave, updateConsumerKyc, uploadKycsAndUpdate, RESET, UPDATE_CONSUMER_COMMENT, UPDATE_ID_COMMENT, UPDATE_ADDRESS_COMMENT};
