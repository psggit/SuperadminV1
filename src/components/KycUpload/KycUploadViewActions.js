/* State

{
  ongoingRequest : false, //true if request is:w going on
  lastError : null OR <string>
  lastSuccess: null OR <string>
}

*/

// import fetch from 'isomorphic-fetch';
import requestAction from '../Common/Actions/requestAction';
import Endpoints, { globalCookiePolicy } from '../../Endpoints';
import { MAKE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_ERROR, RESET } from '../Common/Actions/Actions';


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
            'columns': ['*']
          }
        ]}
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
const uploadAndSave = (formData, consumerId, proofType) => {
  return (dispatch) => {
    const fileUploadUrl = Endpoints.file_upload;
    const currentUser = consumerId;
    const pType = proofType;
    const fetchedObj = {};
    const options = {
      method: 'POST',
      body: formData,
      credentials: globalCookiePolicy
    };
    console.log(currentUser);
    console.log(pType);

    /* Fetch the Consumer KYC ID */
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

    return dispatch(requestAction(fileUploadUrl, options))
      .then(saveFileUrl)
      .then(consumerKycFetch)
      .then(insertIntoKyc)
      .then(processSuccess)
      .catch((resp) => {
        console.log('resp');
        console.log(resp);
        alert('something wrong happened while uploading the KYC, please try back after sometime or contact the administrator');
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

// export default kycuploadviewReducer;
export {getUserData, loadCredentials, uploadAndSave, RESET};
