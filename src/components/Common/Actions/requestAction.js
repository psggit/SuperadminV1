import fetch from 'isomorphic-fetch';
import { MAKE_REQUEST, REQUEST_COMPLETED } from '../../Common/Actions/Actions';

const requestAction = (url, options, SUCCESS, ERROR) => {
  if (!(options.credentials)) {
    options.credentials = 'include';
  }
  return (dispatch, getState) => {
    dispatch({type: MAKE_REQUEST});
    const p1 = new Promise( (resolve, reject) => {
      fetch( url, options).then(
        (response) => {
          dispatch({type: REQUEST_COMPLETED});
          if (response.ok) {
            return response.json().then((results) => {
              // completeReq(dispatch);
              if (SUCCESS) {
                dispatch({type: SUCCESS, data: results});
              }
              resolve(results);
            });
          }
          if (response.status >= 400 && response.status < 500) {
            return response.json().then((errorMsg) => {
              if (ERROR) {
                dispatch({ type: ERROR, data: errorMsg});
              }
              reject(errorMsg);
            });
          }
          if (ERROR) {
            dispatch({type: ERROR, response});
          }
          reject();
        },
        (error) => {
          dispatch({type: REQUEST_COMPLETED});
          if (ERROR) {
            dispatch({
              type: ERROR, code: 'server-connection-failed',
              message: error.message
            });
          }
          reject(error);
        }
      );
    });
    return p1;
  };
};

export default requestAction;
